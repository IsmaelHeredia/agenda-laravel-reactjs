<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('categoria_nota', function (Blueprint $table) {
            $table->foreignId('categoria_id');
            $table->foreignId('nota_id');
            $table->primary(['categoria_id', 'nota_id']);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('categoria_nota');
    }
};
