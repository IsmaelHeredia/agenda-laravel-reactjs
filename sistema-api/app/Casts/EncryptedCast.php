<?php

namespace App\Casts;

use Illuminate\Contracts\Database\Eloquent\CastsAttributes;
use App\Traits\CifradoTrait;

class EncryptedCast implements CastsAttributes
{
    use CifradoTrait;

    public function get($model, string $key, $value, array $attributes)
    {
        return $this->descifrar($value);
    }

    public function set($model, string $key, $value, array $attributes)
    {
        return $this->cifrar($value);
    }
}
