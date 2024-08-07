<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Nota;
use App\Traits\RespuestaTrait;
use App\Traits\CifradoTrait;
use App\Http\Requests\GuardarNotaRequest;
use App\Models\Imagen;
use Illuminate\Support\Facades\Storage;

class NotaController extends Controller
{
    use RespuestaTrait;
    use CifradoTrait;

    public function listar(Request $request, string $pagina)
    {
        $porTitulo = $request->input('titulo');
        $porCategorias = $request->input('categorias');
        $porFavorita = $request->input('favorita');
        $porCantidad = $request->input('cantidad');

        $notasExpiradas = Nota::whereDate('fecha_expiracion', '<=' , date('Y-m-d'))->get();
        
        foreach($notasExpiradas as $notasEx) {
            $id = $notasEx->id;
            $nota = Nota::find($id);
            $nota->categorias()->detach();
            $nota->delete();
        }
 
        if(!is_numeric($pagina))
        {
            $pagina = 1;
        }
        
        $notas = Nota::select('id','titulo','favorita','fecha_expiracion')->with('categorias');
        
        if($porTitulo != null && $porTitulo != "") {
            $notas->where('titulo', 'like', '%' . $porTitulo . '%');
        }

        if($porCategorias != null && count($porCategorias) > 0) {
            $notas->whereHas('categorias', function($query) use ($porCategorias) {
                $query->whereIn('categoria_id', $porCategorias);
            });
        }

        if($porFavorita != null && is_bool($porFavorita)) {
            $notas->where('favorita', ($porFavorita == true) ? 1 : 0);
        }

        $notas->orderBy('updated_at', 'DESC');

        $per_page = ($porCantidad != null && $porCantidad > 0) ? $porCantidad : $_ENV['PER_PAGE'];

        $resultado = $notas->paginate($per_page, ['*'], 'page', $pagina);

        return $this->success('Se envío listado de notas', $resultado);
    }

    public function cargar(string $id)
    {
        $nota = Nota::select('id','titulo','contenido','favorita','fecha_expiracion','uuid')->with('categorias')->find($id);

        if($nota)
        {
            return $this->success('Se envío datos de la nota', $nota);
        }
        else
        {
            return $this->error('La nota no existe');
        }
    }

    public function crear(GuardarNotaRequest $request)
    {
        $validated = $request->validated();

        $nota = new Nota;

        $nota->titulo = $validated['titulo'];
        $nota->contenido = $validated['contenido'];
        $nota->favorita = $validated['favorita'];
        $nota->uuid = $validated['uuid'];
        $nota->fecha_expiracion = isset($validated['fecha_expiracion']) ? $validated['fecha_expiracion'] : null;
        
        $categorias = $validated['categorias'];

        $guardado = $nota->save();
        
        $nota->categorias()->attach($categorias);

        if($guardado)
        {
            return $this->success('La nota fue creada');
        }
        else
        {
            return $this->error('Ocurrió un error creando la nota');
        }
    }

    public function actualizar(GuardarNotaRequest $request, string $id)
    {
        $validated = $request->validated();

        $nota = Nota::find($id);

        if(!$nota)
        {
            return $this->error('La nota no existe');
        }

        $contenido = $validated['contenido'];

        $uuid = $nota->uuid;
        $imagenes = Imagen::where('uuid', $uuid)->get();

        foreach($imagenes as $imagen) {
            $nombre_archivo = $imagen->nombre_archivo;
            if(!str_contains($contenido, $nombre_archivo)) {
                Storage::disk('public')->delete($nombre_archivo);
                $imagen->delete();
            }
        }

        $nota->titulo = $validated['titulo'];
        $nota->contenido = $contenido;
        $nota->favorita = $validated['favorita'];
        $nota->uuid = $validated['uuid'];
        $nota->fecha_expiracion = isset($validated['fecha_expiracion']) ? $validated['fecha_expiracion'] : null;

        $categorias = $validated['categorias'];

        $guardado = $nota->save();

        $nota->categorias()->sync($categorias);

        if($guardado)
        {
            return $this->success('La nota fue actualizada');
        }
        else
        {
            return $this->error('Ocurrió un error actualizando la nota');
        }
    }

    public function borrar(string $id)
    {
        $nota = Nota::find($id);

        if(!$nota)
        {
            return $this->error('La nota no existe');
        }

        $nota->categorias()->detach();

        $uuid = $nota->uuid;
        $imagenes = Imagen::where('uuid', $uuid)->get();

        foreach($imagenes as $imagen) {
            Storage::disk('public')->delete($imagen->nombre_archivo);
            $imagen->delete();
        }

        if($nota->delete())
        {
            return $this->success('La nota fue borrada');
        }
        else
        {
            return $this->error('Ocurrió un error borrando la nota');
        }
    }
}
