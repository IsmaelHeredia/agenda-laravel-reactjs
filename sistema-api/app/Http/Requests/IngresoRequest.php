<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class IngresoRequest extends FormRequest
{    
    public function authorize(): bool
    {
        return true;
    }
    
    public function rules(): array
    {
        return [
            'usuario' => 'required',
            'clave' => 'required'
        ];
    }

    public function messages(): array
    {
        return [
            'usuario.required' => 'El usuario es obligatorio',
            'usuario.string' => 'El usuario debe ser una cadena de texto',
            'usuario.min' => 'El usuario debe tener al menos :min caracteres',
            'usuario.max' => 'El usuario no debe exceder los :max caracteres',
            
            'clave.required' => 'La clave es obligatoria',
            'clave.string' => 'La clave debe ser una cadena de texto',
            'clave.min' => 'La clave debe tener al menos :min caracteres',
        ];
    }
}
