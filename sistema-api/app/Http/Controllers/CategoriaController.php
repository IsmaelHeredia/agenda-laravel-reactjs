<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Categoria;
use App\Traits\RespuestaTrait;
use App\Http\Requests\GuardarCategoriaRequest;

class CategoriaController extends Controller
{
    use RespuestaTrait;

    public function listarTodo() 
    {
        return $this->success('Se envío listado completo de categorías', Categoria::orderBy('nombre')->get());
    }

    public function listar(Request $request, string $pagina)
    {
        $porNombre = $request->input('nombre');

        if(!is_numeric($pagina))
        {
            $pagina = 1;
        }
        
        $resultado = Categoria::where('nombre', 'like', '%' . $porNombre . '%')
                      ->orderBy('nombre', 'ASC')
                      ->paginate($_ENV['PER_PAGE'], ['*'], 'page', $pagina);

        return $this->success('Se envío listado de categorías', $resultado);
    }

    public function cargar(string $id)
    {
        $categoria = Categoria::find($id);

        if($categoria)
        {
            return $this->success('Se envío datos de la categoría', $categoria);
        }
        else
        {
            return $this->error('La categoría no existe');
        }
    }

    public function crear(GuardarCategoriaRequest $request)
    {
        $validated = $request->validated();

        $categoria = new Categoria;

        $categoria->nombre = $validated['nombre'];

        $guardado = $categoria->save();

        if($guardado)
        {
            return $this->success('La categoría fue creada', $categoria->id);
        }
        else
        {
            return $this->error('Ocurrió un error creando la categoría');
        }
    }

    public function actualizar(GuardarCategoriaRequest $request, string $id)
    {
        $validated = $request->validated();

        $categoria = Categoria::find($id);

        if(!$categoria)
        {
            return $this->error('La categoría no existe');
        }

        $categoria->nombre = $validated['nombre'];

        $guardado = $categoria->save();

        if($guardado)
        {
            return $this->success('La categoría fue actualizada');
        }
        else
        {
            return $this->error('Ocurrió un error actualizando la categoría');
        }
    }

    public function borrar(string $id)
    {
        $categoria = Categoria::find($id);

        if(!$categoria)
        {
            return $this->error('La categoría no existe');
        }

        if($categoria->delete())
        {
            return $this->success('La categoría fue borrada');
        }
        else
        {
            return $this->error('Ocurrió un error borrando la categoría');
        }
    }
}
