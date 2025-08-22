<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Nota extends Model
{
    use HasFactory;

    protected $table = 'notas';

    protected $fillable = ['titulo', 'contenido', 'favorita', 'fecha_expiracion', 'uuid'];

    protected $casts = [
        'contenido' => \App\Casts\EncryptedCast::class,
    ];

    public function categorias()
    {
        return $this->belongsToMany(
            Categoria::class,
            'categoria_nota',
            'nota_id',
            'categoria_id'
        )->withTimestamps();
    }
}
