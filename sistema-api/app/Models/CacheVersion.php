<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CacheVersion extends Model
{
    protected $table = 'cache_versions';
    protected $primaryKey = 'key';
    public $incrementing = false;
    protected $keyType = 'string';
    protected $fillable = ['key', 'version'];
}