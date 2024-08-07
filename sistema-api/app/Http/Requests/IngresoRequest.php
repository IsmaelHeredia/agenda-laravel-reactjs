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
            'clave.required' => 'La clave es obligatoria'
        ];
    }
}
