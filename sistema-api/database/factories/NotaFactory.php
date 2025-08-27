<?php

namespace Database\Factories;

use App\Models\Nota;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class NotaFactory extends Factory
{
    protected $model = Nota::class;

    public function definition(): array
    {
        return [
            'titulo' => $this->faker->sentence(3),
            'contenido' => $this->faker->paragraph(),
            'favorita' => $this->faker->boolean(),
            'fecha_expiracion' => $this->faker->optional()->date(),
            'uuid' => Str::uuid()->toString(),
        ];
    }
}
