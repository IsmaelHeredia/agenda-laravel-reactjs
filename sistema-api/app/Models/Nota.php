<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use App\Traits\CifradoTrait;

class Nota extends Model
{
    use HasFactory;
    use CifradoTrait;

    protected $table = 'notas';

    protected $fillable = ['titulo', 'contenido', 'favorita', 'fecha_expiracion', 'uuid'];

    protected function contenido(): Attribute
    {
        return Attribute::make(
            get: fn (string $value) => $this->desencriptar($value),
            set: fn (string $value) => $this->encriptar($value),
        );
    }

    public function categorias()
    {
        return $this->belongsToMany(Categoria::class, 'categoria_nota', 'nota_id', 'categoria_id')->withTimestamps();
    }

}
