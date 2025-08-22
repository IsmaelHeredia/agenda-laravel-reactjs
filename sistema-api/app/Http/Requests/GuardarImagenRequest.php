<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class GuardarImagenRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }
    
    public function rules(): array
    {
        return [
            'uuid' => 'required',
            'base64' => 'required',
            'nombre_archivo' => 'nullable',
        ];
    }

    public function messages(): array
    {
        return [
            'uuid.required' => 'El UUID es obligatorio',
            'uuid.string' => 'El UUID debe ser una cadena de texto',
            'uuid.uuid' => 'El UUID no tiene un formato válido',
            
            'base64.required' => 'El contenido de la imagen en base64 es obligatorio',
            'base64.string' => 'El contenido de la imagen debe ser una cadena de texto',

            'nombre_archivo.string' => 'El nombre del archivo debe ser una cadena de texto',
            'nombre_archivo.max' => 'El nombre del archivo no debe exceder los :max caracteres',
        ];
    }
}
