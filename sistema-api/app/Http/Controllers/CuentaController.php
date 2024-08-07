<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Usuario;
use App\Traits\RespuestaTrait;
use App\Http\Requests\CuentaRequest;

use Illuminate\Support\Facades\Hash;

class CuentaController extends Controller
{
    use RespuestaTrait;

    public function actualizarDatos(CuentaRequest $request)
    {
        $validated = $request->validated();

        $usuario = $validated['usuario'];
        $nuevo_usuario = $validated['nuevo_usuario'];
        $clave = $validated['clave'];
        $nueva_clave = $validated['nueva_clave'];

        $usuario_bd = Usuario::where('nombre', $usuario)->first();

        if(!$usuario_bd)
        {
            return $this->error('El usuario no existe');
        }

        if (!Hash::check($clave, $usuario_bd->clave))
        {
            return $this->error('La clave es incorrecta');
        }

        $usuario_bd->nombre = $nuevo_usuario;
        $usuario_bd->clave = Hash::make($nueva_clave);

        $guardado = $usuario_bd->save();

        if($guardado)
        {
            return $this->success('Los datos de la cuenta se actualizaron correctamente');
        }
        else
        {
            return $this->error('Ocurrió un error actualizando los datos');
        }
    }
}
