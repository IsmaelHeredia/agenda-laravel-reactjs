<?php

namespace App\Services;

use App\Http\Requests\IngresoRequest;
use App\Http\Requests\CuentaRequest;
use App\Interfaces\UserRepositoryInterface;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\Response;

class AuthService
{
    protected $userRepository;

    public function __construct(UserRepositoryInterface $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function login(IngresoRequest $request): array
    {
        $credentials = $request->validated();

        $user = $this->userRepository->findByNombre($credentials['usuario']);

        if (!$user || !Hash::check($credentials['clave'], $user->password)) {
            throw new \App\Exceptions\AuthException('Credenciales incorrectas', Response::HTTP_UNAUTHORIZED);
        }

        $token = $user->createToken($user->name)->plainTextToken;

        return [
            'access_token' => $token,
            'user_name' => $user->name,
            'token_type' => 'Bearer',
        ];
    }

    public function actualizarDatos(CuentaRequest $request, $user)
    {
        if (!Hash::check($request->clave_actual, $user->password)) {
            throw new \App\Exceptions\AuthException('La clave actual es incorrecta', Response::HTTP_UNAUTHORIZED);
        }

        if ($request->hasFile('avatar')) {
            if ($user->avatar) {
                Storage::disk('public')->delete('imagenes/' . basename($user->avatar));
            }
            $path = $request->file('avatar')->store('imagenes', 'public');
            $user->avatar = basename($path);
        }

        if ($request->filled('nuevo_nombre')) {
            $nuevo_nombre = $request->nuevo_nombre;
            if ($nuevo_nombre !== $user->name && $this->userRepository->existsByNombre($nuevo_nombre)) {
                throw new \App\Exceptions\AuthException('El nuevo nombre de usuario ya está en uso', Response::HTTP_CONFLICT);
            }
            $user->name = $nuevo_nombre;
        }

        if ($request->filled('nueva_clave')) {
            $user->password = Hash::make($request->nueva_clave);
        }

        if (!$this->userRepository->save($user)) {
            throw new \App\Exceptions\AuthException('Ocurrió un error al actualizar los datos de la cuenta', Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $user;
    }
}