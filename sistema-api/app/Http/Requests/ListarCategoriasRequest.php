<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ListarCategoriasRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; 
    }

    public function rules(): array
    {
        return [
            'nombre' => ['nullable', 'string', 'max:255'],
        ];
    }

    public function messages(): array
    {
        return [
            'nombre.string' => 'El nombre a buscar debe ser una cadena de texto',
            'nombre.max' => 'El nombre a buscar no debe exceder los :max caracteres',
        ];
    }
}
