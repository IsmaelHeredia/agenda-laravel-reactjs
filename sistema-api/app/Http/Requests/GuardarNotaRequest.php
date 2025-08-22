<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class GuardarNotaRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'titulo' => 'required',
            'contenido' => 'required',
            'favorita' => 'required',
            'fecha_expiracion' => 'nullable',
            'uuid' => 'required',
            'categorias' => 'required|array',
        ];
    }

    public function messages(): array
    {
        return [
            'titulo.required' => 'El título es obligatorio',
            'titulo.string' => 'El título debe ser una cadena de texto',
            'titulo.max' => 'El título no debe exceder los :max caracteres',

            'contenido.required' => 'El contenido es obligatorio',
            'contenido.string' => 'El contenido debe ser una cadena de texto',

            'favorita.required' => 'El campo favorita es obligatorio',
            'favorita.boolean' => 'El campo favorita debe ser verdadero o falso',

            'fecha_expiracion.date' => 'La fecha de expiración debe ser una fecha válida',

            'uuid.required' => 'El UUID es obligatorio',
            'uuid.string' => 'El UUID debe ser una cadena de texto',
            'uuid.uuid' => 'El UUID no tiene un formato válido',

            'categorias.required' => 'Debe seleccionar al menos una categoría',
            'categorias.array' => 'Las categorías deben ser un formato de lista',
        ];
    }
}
