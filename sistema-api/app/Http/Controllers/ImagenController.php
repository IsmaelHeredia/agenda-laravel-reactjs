<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Imagen;
use App\Traits\RespuestaTrait;
use App\Http\Requests\GuardarImagenRequest;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ImagenController extends Controller
{
    use RespuestaTrait;

    public function listar(Request $request)
    {
        $porUUID = $request->input('uuid');
        
        $resultado = Imagen::where('uuid', '%' . $porUUID . '%')
                      ->orderBy('created_at', 'ASC')
                      ->get();

        return $this->success('Se envío listado de imágenes', $resultado);
    }

    public function cargar(string $id)
    {
        $imagen = Imagen::find($id);

        if($imagen)
        {
            return $this->success('Se envío datos de la imagen', $imagen);
        }
        else
        {
            return $this->error('La imagen no existe');
        }
    }

    public function crear(GuardarImagenRequest $request)
    {
        $validated = $request->validated();

        $imagen_contenido = $validated['base64'];

        if (preg_match('/^data:image\/(\w+);base64,/', $imagen_contenido, $formato)) {

            $imagen_contenido = substr($imagen_contenido, strpos($imagen_contenido, ',') + 1);
            $formato = strtolower($formato[1]);
        
            if (!in_array($formato,['jpg','jpeg','gif','png'])) {
                return $this->error('El formato de la imagen es incorrecto');
            }

            $imagen_contenido = str_replace(' ','+',$imagen_contenido);
            $imagen_contenido = base64_decode($imagen_contenido);

        }

        $imagen_nuevo_nombre = Str::random(10) . '.jpg';
    
        Storage::disk('public')->put($imagen_nuevo_nombre, $imagen_contenido);

        $imagen = new Imagen;

        $imagen->uuid = $validated['uuid'];
        $imagen->nombre_archivo = $imagen_nuevo_nombre; 
        
        $guardado = $imagen->save();

        if($guardado)
        {
            return $this->success('La imagen fue creada', $imagen_nuevo_nombre);
        }
        else
        {
            return $this->error('Ocurrió un error creando la imagen');
        }
    }

    public function actualizar(GuardarImagenRequest $request, string $id)
    {
        $validated = $request->validated();

        $imagen = Imagen::find($id);

        if(!$imagen)
        {
            return $this->error('La imagen no existe');
        }

        $imagen->uuid = $validated['uuid'];
        $imagen->nombre_archivo = $validated['nombre_archivo']; 

        $guardado = $imagen->save();

        if($guardado)
        {
            return $this->success('La imagen fue actualizada');
        }
        else
        {
            return $this->error('Ocurrió un error actualizando la imagen');
        }
    }

    public function borrar(string $id)
    {
        $imagen = Imagen::find($id);

        if(!$imagen)
        {
            return $this->error('La imagen no existe');
        }

        if($imagen->delete())
        {
            return $this->success('La imagen fue borrada');
        }
        else
        {
            return $this->error('Ocurrió un error borrando la imagen');
        }
    }
}
