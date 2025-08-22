<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ListarImagenesRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; 
    }

    public function rules(): array
    {
        return [
            'uuid' => ['nullable', 'string', 'uuid'], 
        ];
    }

    public function messages(): array
    {
        return [
            'uuid.string' => 'El UUID debe ser una cadena de texto',
            'uuid.uuid' => 'El UUID no tiene un formato válido',
        ];
    }
}
