<?php

namespace Database\Factories;

use App\Models\Imagen;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class ImagenFactory extends Factory
{
    protected $model = Imagen::class;

    public function definition(): array
    {
        return [
            'uuid' => $this->faker->uuid,
            'nombre_archivo' => $this->faker->word . '.jpg',
        ];
    }
}
