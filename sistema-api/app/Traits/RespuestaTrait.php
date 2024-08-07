<?php

namespace App\Traits;

use Symfony\Component\HttpFoundation\Response;

trait RespuestaTrait
{
    protected function success($message, $data = null)
    {
        return response()->json(['estado' => 1, 'mensaje' => $message, 'datos' => $data]);
    }

    protected function error($message, $data = null)
    {
        return response()->json(['estado' => 0, 'mensaje' => $message, 'datos' => $data]);
    }

    protected function data($categorias_lista = null, $categorias = null, $notas = null)
    {
        return response()->json(['estado' => 1, 'categorias_lista' => $categorias_lista, 'categorias' => $categorias, 'notas' => $notas]);
    }

    protected function data2($cancion = null, $capturas = null)
    {
        return response()->json(['estado' => 1, 'cancion' => $cancion, 'capturas' => $capturas]);
    }

}
