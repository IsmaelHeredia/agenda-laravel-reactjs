<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('cache_versions', function (Blueprint $table) {
            $table->string('key')->primary();
            $table->string('version');
            $table->timestamps();
        });
        DB::table('cache_versions')->insert([
            'key' => 'notes_list_version',
            'version' => now()->timestamp,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }

    public function down(): void
    {
        Schema::dropIfExists('cache_versions');
    }
};
