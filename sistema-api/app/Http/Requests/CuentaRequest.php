<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CuentaRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }
    
    public function rules(): array
    {
        return [
            'usuario' => 'required',
            'nuevo_usuario' => 'required',
            'nueva_clave' => 'required',
            'clave' => 'required',
        ];
    }

    public function messages(): array
    {
        return [
            'usuario.required' => 'El usuario es obligatorio',
            'nuevo_usuario.required' => 'El nuevo usuario es obligatorio',
            'clave.required' => 'La clave es obligatoria',
            'nueva_clave.required' => 'La nueva clave es obligatoria'
        ];
    }
}
