<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Categoria;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Tests\Helpers\AuthHelper;
use PHPUnit\Framework\Attributes\Test;

class CategoriaTest extends TestCase
{
    use RefreshDatabase, AuthHelper;

    protected string $token;

    protected function setUp(): void
    {
        parent::setUp();
        $this->token = $this->authenticate();
    }

    #[Test]
    public function se_pueden_listar_categorias()
    {
        Categoria::factory()->count(3)->create();

        $response = $this->getJson('/api/categorias', [
            'Authorization' => 'Bearer ' . $this->token,
        ]);

        $response->assertStatus(200)
                 ->assertJsonStructure([
                     'message',
                     'data' => [
                         '*' => ['id', 'nombre', 'created_at', 'updated_at']
                     ]
                 ]);
    }

    #[Test]
    public function se_puede_crear_una_categoria()
    {
        $response = $this->postJson('/api/categorias', [
            'nombre' => 'Categoría de prueba'
        ], [
            'Authorization' => 'Bearer ' . $this->token,
        ]);

        $response->assertStatus(201)
                 ->assertJsonPath('data.nombre', 'Categoría de prueba');

        $this->assertDatabaseHas('categorias', [
            'nombre' => 'Categoría de prueba',
        ]);
    }

    #[Test]
    public function se_puede_cargar_una_categoria()
    {
        $categoria = Categoria::factory()->create();

        $response = $this->getJson("/api/categorias/{$categoria->id}", [
            'Authorization' => 'Bearer ' . $this->token,
        ]);

        $response->assertStatus(200)
            ->assertJsonPath('data.id', $categoria->id);
    }

    #[Test]
    public function se_puede_actualizar_una_categoria()
    {
        $categoria = Categoria::factory()->create();

        $response = $this->putJson("/api/categorias/{$categoria->id}", [
            'nombre' => 'Categoría actualizada'
        ], [
            'Authorization' => 'Bearer ' . $this->token,
        ]);

        $response->assertStatus(200)
                 ->assertJsonPath('data.nombre', 'Categoría actualizada');

        $this->assertDatabaseHas('categorias', [
            'id' => $categoria->id,
            'nombre' => 'Categoría actualizada',
        ]);
    }

    #[Test]
    public function se_puede_eliminar_una_categoria()
    {
        $categoria = Categoria::factory()->create();

        $response = $this->deleteJson("/api/categorias/{$categoria->id}", [], [
            'Authorization' => 'Bearer ' . $this->token,
        ]);

        $response->assertStatus(204);

        $this->assertDatabaseMissing('categorias', [
            'id' => $categoria->id,
        ]);
    }
}
