<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Categoria extends Model
{
    use HasFactory;

    protected $table = 'categorias';

    protected $fillable = ['nombre'];

    public function notas()
    {
        return $this->belongsToMany(Nota::class, 'categoria_nota', 'categoria_id', 'nota_id')->withTimestamps();
    }

}
