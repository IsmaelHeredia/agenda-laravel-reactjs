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
            'titulo.required' => 'El titulo es obligatorio',
            'contenido.required' => 'El contenido es obligatorio',
            'favorita.required' => 'El campo favorita es obligatorio',
            'uuid.required' => 'El campo uuid es obligatorio',
            'categorias.required' => 'Seleccione una o varias categorias',
        ];
    }
}
