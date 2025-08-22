<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ListarDatosCompletosRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; 
    }

    public function rules(): array
    {
        return [
            'nombre' => ['nullable', 'string', 'max:255'],
            'titulo' => ['nullable', 'string', 'max:255'],
            'pagina' => ['nullable', 'integer', 'min:1'],
        ];
    }

    public function messages(): array
    {
        return [
            'nombre.string' => 'El filtro de nombre de categoría debe ser una cadena de texto',
            'nombre.max' => 'El filtro de nombre de categoría no debe exceder los :max caracteres',
            'titulo.string' => 'El filtro de título de nota debe ser una cadena de texto',
            'titulo.max' => 'El filtro de título de nota no debe exceder los :max caracteres',
            'pagina.integer' => 'El número de página debe ser un número entero',
            'pagina.min' => 'El número de página debe ser al menos 1',
        ];
    }
}
