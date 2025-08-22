<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class GuardarCategoriaRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }
    
    public function rules(): array
    {
        return [
            'nombre' => 'required',
        ];
    }

    public function messages(): array
    {
        return [
            'nombre.required' => 'El nombre de la categoría es obligatorio',
            'nombre.string' => 'El nombre de la categoría debe ser una cadena de texto',
            'nombre.max' => 'El nombre de la categoría no debe exceder los :max caracteres',
        ];
    }
}
