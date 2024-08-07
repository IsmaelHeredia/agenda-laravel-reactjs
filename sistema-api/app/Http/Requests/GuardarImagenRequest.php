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
            'uuid.required' => 'El uuid es obligatorio',
            'base64.required' => 'El campo base64 es obligatorio',
        ];
    }
}
