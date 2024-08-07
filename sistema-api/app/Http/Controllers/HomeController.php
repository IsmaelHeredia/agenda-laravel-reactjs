<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Categoria;
use App\Models\Nota;
use App\Traits\RespuestaTrait;

class HomeController extends Controller
{
    use RespuestaTrait;

    public function listarDatosCompletos(Request $request) 
    {
        $porNombre = "";
        $porTitulo = "";

        $pagina = 1;

        $categorias_lista = Categoria::orderBy('nombre')->get();

        $categorias = Categoria::where('nombre', 'like', '%' . $porNombre . '%')
                    ->orderBy('nombre', 'ASC')
                    ->paginate($_ENV['PER_PAGE'], ['*'], 'page', $pagina);

        $notas = Nota::with('categorias')->where('titulo', 'like', '%' . $porTitulo . '%')
            ->orderBy('updated_at', 'DESC')
            ->paginate($_ENV['PER_PAGE'], ['*'], 'page', $pagina);

        return $this->data($categorias_lista, $categorias, $notas);
    }
}
