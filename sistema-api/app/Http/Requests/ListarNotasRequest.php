<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ListarNotasRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'titulo' => ['nullable', 'string', 'max:255'],
            'categorias' => ['nullable', 'array'],
            'categorias.*' => ['integer', 'exists:categorias,id'],
            'favorita' => ['nullable', 'boolean'],
            'cantidad' => ['nullable', 'integer', 'min:1'],
        ];
    }
    
    public function validationData(): array
    {
        return array_merge($this->request->all(), $this->query->all());
    }

    public function messages(): array
    {
        return [
            'titulo.string' => 'El título debe ser una cadena de texto',
            'titulo.max' => 'El título no debe exceder los :max caracteres',
            'categorias.array' => 'Las categorías deben ser un array',
            'categorias.*.integer' => 'Cada categoría debe ser un número entero',
            'categorias.*.exists' => 'Alguna de las categorías proporcionadas no existe',
            'favorita.boolean' => 'El campo favorita debe ser verdadero o falso',
            'cantidad.integer' => 'La cantidad de notas por página debe ser un número entero',
            'cantidad.min' => 'La cantidad de notas por página debe ser al menos 1',
        ];
    }
}