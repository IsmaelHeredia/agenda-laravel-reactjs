<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\Pivot;

class NotaCategoria extends Pivot
{
    use HasFactory;

    protected $table = 'notas_categorias';

    protected $fillable = ['nota', 'categoria'];
}
