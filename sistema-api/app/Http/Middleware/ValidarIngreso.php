<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Traits\SeguridadTrait;

class ValidarIngreso
{
    use SeguridadTrait;

    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->headers->get('Authorization');

        if($token != '')
        {
            $arr = explode(' ', $token);
            $jwt = $arr[1];

            if($this->validarToken($jwt))
            {
                return $next($request);
            }
        }

        return response()->json([ 'estado' => 0, 'mensaje' => 'Acceso denegado' ]);
    }
}
