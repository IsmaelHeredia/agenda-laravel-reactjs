<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('notas', function (Blueprint $table) {
            $table->id();
            $table->string('titulo');
            $table->longText('contenido');
            $table->integer('favorita');
            $table->date('fecha_expiracion')->nullable();
            $table->string('uuid');
            $table->timestamps();
        });
    }
    
    public function down(): void
    {
        Schema::dropIfExists('notas');
    }
};
