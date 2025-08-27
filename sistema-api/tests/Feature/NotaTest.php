<?php

namespace Tests\Feature;

use App\Models\Nota;
use App\Models\Categoria;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Tests\Helpers\AuthHelper;
use Illuminate\Support\Str;
use PHPUnit\Framework\Attributes\Test;

class NotaTest extends TestCase
{
    use RefreshDatabase, AuthHelper;

    protected string $token;

    protected function setUp(): void
    {
        parent::setUp();
        $this->token = $this->authenticate();
    }

    #[Test]
    public function se_pueden_listar_notas()
    {
        Nota::factory()->count(5)->create();

        $response = $this->getJson('/api/notas/listar/1', [
            'Authorization' => 'Bearer ' . $this->token,
        ]);

        $response->assertStatus(200)
            ->assertJsonStructure([
                'message',
                'data'
            ]);
    }

    #[Test]
    public function se_puede_cargar_una_nota()
    {
        $nota = Nota::factory()->create();

        $response = $this->getJson("/api/notas/{$nota->id}", [
            'Authorization' => 'Bearer ' . $this->token,
        ]);

        $response->assertStatus(200)
            ->assertJsonPath('data.id', $nota->id);
    }

    #[Test]
    public function se_puede_crear_una_nota()
    {
        $categoria = Categoria::factory()->create();

        $response = $this->postJson('/api/notas', [
            'titulo' => 'Nota de prueba',
            'contenido' => 'Contenido secreto',
            'favorita' => true,
            'fecha_expiracion' => now()->addDays(7)->toDateString(),
            'uuid' => Str::uuid()->toString(),
            'categorias' => [$categoria->id],
        ], [
            'Authorization' => 'Bearer ' . $this->token,
        ]);

        $response->assertStatus(201)
            ->assertJsonPath('data.titulo', 'Nota de prueba');

        $this->assertDatabaseHas('notas', [
            'titulo' => 'Nota de prueba',
        ]);
    }

    #[Test]
    public function se_puede_actualizar_una_nota()
    {
        $nota = Nota::factory()->create();
        $categoria = Categoria::factory()->create();

        $response = $this->putJson("/api/notas/{$nota->id}", [
            'titulo' => 'Nota actualizada',
            'contenido' => 'Contenido actualizado',
            'favorita' => false,
            'fecha_expiracion' => now()->addDays(10)->toDateString(),
            'uuid' => $nota->uuid,
            'categorias' => [$categoria->id],
        ], [
            'Authorization' => 'Bearer ' . $this->token,
        ]);

        $response->assertStatus(200)
            ->assertJsonPath('data.titulo', 'Nota actualizada');

        $this->assertDatabaseHas('notas', [
            'id' => $nota->id,
            'titulo' => 'Nota actualizada',
        ]);
    }


    #[Test]
    public function se_puede_eliminar_una_nota()
    {
        $nota = Nota::factory()->create();

        $response = $this->deleteJson("/api/notas/{$nota->id}", [], [
            'Authorization' => 'Bearer ' . $this->token,
        ]);

        $response->assertStatus(204);

        $this->assertDatabaseMissing('notas', [
            'id' => $nota->id,
        ]);
    }

    #[Test]
    public function se_puede_cambiar_favorito()
    {
        $nota = Nota::factory()->create(['favorita' => false]);

        $response = $this->patchJson("/api/notas/{$nota->id}/cambiar-favorito", [], [
            'Authorization' => 'Bearer ' . $this->token,
        ]);

        $response->assertStatus(200)
            ->assertJsonPath('data.favorita', true);
    }
}
