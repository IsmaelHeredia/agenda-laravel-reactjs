<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CuentaRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'clave_actual' => 'required|string',
            'nuevo_nombre' => 'sometimes|string|max:255',
            'nueva_clave' => 'sometimes|string|min:6',
            'avatar' => 'sometimes|nullable|file|image|mimes:jpeg,png,jpg,gif|max:20480',
        ];
    }

    public function messages(): array
    {
        return [
            'clave_actual.required' => 'La clave actual es obligatoria',
            'nuevo_nombre.string' => 'El nuevo nombre de usuario debe ser una cadena de texto',
            'nuevo_nombre.max' => 'El nuevo nombre de usuario no debe exceder los :max caracteres',
            'nueva_clave.string' => 'La nueva clave debe ser una cadena de texto',
            'nueva_clave.min' => 'La nueva clave debe tener al menos :min caracteres',
            'avatar.file' => 'El avatar debe ser un archivo',
            'avatar.image' => 'El avatar debe ser un archivo de imagen',
            'avatar.mimes' => 'El avatar debe ser un archivo de tipo: jpeg, png, jpg o gif',
            'avatar.max' => 'El tamaño del avatar no debe ser superior a 20MB',
        ];
    }
}