<?php

namespace App\Http\Controllers;

use App\Http\Requests\IngresoRequest;
use Illuminate\Http\Request;
use App\Services\AuthService;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\JsonResponse;

class IngresoController extends Controller
{
    protected $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function ingreso(IngresoRequest $request): JsonResponse
    {
        $data = $this->authService->login($request);

        return response()->json([
            'message' => 'El usuario fue logeado correctamente',
            'data' => $data
        ], Response::HTTP_OK);
    }

    public function validar(Request $request): JsonResponse
    {
        $user = $request->user();

        return response()->json([
            'message' => 'Acceso validado y datos de usuario obtenidos',
            'data' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'avatar' => $user->avatar,
                'role' => $user->role,
            ]
        ], Response::HTTP_OK);
    }
}