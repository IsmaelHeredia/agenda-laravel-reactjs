<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Nota;
use App\Models\Categoria;
use App\Traits\RespuestaTrait;
use Illuminate\Support\Facades\DB;

class ReporteController extends Controller
{
    use RespuestaTrait;

    public function generarReporte()
    {
        $datos = DB::table('categoria_nota')
        ->join('categorias', 'categoria_nota.categoria_id', '=', 'categorias.id')
        ->join('notas', 'categoria_nota.nota_id', '=', 'notas.id')
        ->select(DB::raw('count(categoria_nota.categoria_id) as cantidad, categorias.nombre as nombre_categoria'))
        ->groupBy('categorias.nombre')
        ->orderBy('cantidad', 'DESC')
        ->take(3)
        ->get();

        return $this->success('Se enviaron los datos para el gráfico', $datos);
    }
}
