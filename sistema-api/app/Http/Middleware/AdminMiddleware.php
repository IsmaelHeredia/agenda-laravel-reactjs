<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class AdminMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = Auth::user();

        if ($user->role !== 'admin') {
            return response()->json([
                'message' => 'Acceso no autorizado. Se requiere rol de administrador.',
            ], Response::HTTP_FORBIDDEN);
        }

        return $next($request);
    }
}
