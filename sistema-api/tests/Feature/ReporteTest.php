<?php

namespace Tests\Feature;

use App\Models\Categoria;
use App\Models\Nota;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Tests\Helpers\AuthHelper;
use PHPUnit\Framework\Attributes\Test;

class ReporteTest extends TestCase
{
    use RefreshDatabase, AuthHelper;

    protected string $token;

    protected function setUp(): void
    {
        parent::setUp();
        $this->token = $this->authenticate();
    }

    #[Test]
    public function devuelve_las_tres_categorias_mas_usadas()
    {
        $cat1 = Categoria::factory()->create(['nombre' => 'Trabajo']);
        $cat2 = Categoria::factory()->create(['nombre' => 'Personal']);
        $cat3 = Categoria::factory()->create(['nombre' => 'Estudio']);
        $cat4 = Categoria::factory()->create(['nombre' => 'Viajes']);

        Nota::factory()->count(7)->create()->each(fn($nota) => $nota->categorias()->attach($cat3->id));
        Nota::factory()->count(5)->create()->each(fn($nota) => $nota->categorias()->attach($cat1->id));
        Nota::factory()->count(3)->create()->each(fn($nota) => $nota->categorias()->attach($cat2->id));
        Nota::factory()->count(1)->create()->each(fn($nota) => $nota->categorias()->attach($cat4->id));

        $response = $this->getJson('/api/reportes', [
            'Authorization' => 'Bearer ' . $this->token,
        ]);

        $response->assertStatus(200)
                 ->assertJson([
                     'message' => 'Se enviaron los datos para el gráfico',
                 ])
                 ->assertJsonStructure([
                     'message',
                     'data' => [
                         '*' => ['cantidad', 'nombre_categoria']
                     ]
                 ]);

        $data = $response->json('data');
        $this->assertCount(3, $data);

        $this->assertEquals('Estudio', $data[0]['nombre_categoria']);
        $this->assertEquals(7, $data[0]['cantidad']);

        $this->assertEquals('Trabajo', $data[1]['nombre_categoria']);
        $this->assertEquals(5, $data[1]['cantidad']);

        $this->assertEquals('Personal', $data[2]['nombre_categoria']);
        $this->assertEquals(3, $data[2]['cantidad']);
    }
}
