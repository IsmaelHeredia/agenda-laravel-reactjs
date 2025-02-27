<?php

namespace Database\Seeders;

use App\Models\Usuario;
use App\Models\Categoria;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $datetime = date('Y-m-d H:i:s');

        Usuario::insert([
            ['nombre' => 'admin', 'clave' => Hash::make('admin'), 'created_at' => $datetime, 'updated_at' => $datetime],
        ]);

        Categoria::insert([
            ['nombre' => 'General', 'created_at' => $datetime, 'updated_at' => $datetime],
        ]);

    }
}
