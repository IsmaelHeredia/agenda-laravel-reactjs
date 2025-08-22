<?php

namespace App\Http\Controllers;

use App\Http\Requests\CuentaRequest;
use App\Services\AuthService;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\JsonResponse;

class CuentaController extends Controller
{
    protected $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function actualizarDatos(CuentaRequest $request): JsonResponse
    {
        $user = $request->user();
        
        $userUpdated = $this->authService->actualizarDatos($request, $user);

        return response()->json([
            'message' => 'Los datos de la cuenta se actualizaron correctamente',
            'user' => $userUpdated
        ], Response::HTTP_OK);
    }
}