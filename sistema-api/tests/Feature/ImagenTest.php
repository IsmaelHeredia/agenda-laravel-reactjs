<?php

namespace Tests\Feature;

use App\Models\Imagen;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;
use Tests\Helpers\AuthHelper;
use PHPUnit\Framework\Attributes\Test;

class ImagenTest extends TestCase
{
    use RefreshDatabase, AuthHelper;

    protected string $token;

    protected function setUp(): void
    {
        parent::setUp();
        $this->token = $this->authenticate();

        Storage::fake('public');
    }

    protected function generateBase64Image(): string
    {
        $image = imagecreatetruecolor(1, 1);
        ob_start();
        imagepng($image);
        $imgData = ob_get_clean();
        imagedestroy($image);

        return 'data:image/png;base64,' . base64_encode($imgData);
    }

    #[Test]
    public function se_pueden_listar_imagenes()
    {
        Imagen::factory()->count(3)->create();

        $response = $this->getJson('/api/imagenes', [
            'Authorization' => 'Bearer ' . $this->token,
        ]);

        $response->assertStatus(200)
            ->assertJsonStructure([
                'message',
                'data' => [
                    '*' => ['id', 'uuid', 'nombre_archivo', 'created_at', 'updated_at']
                ]
            ]);
    }

    #[Test]
    public function se_puede_crear_una_imagen()
    {
        $payload = [
            'uuid' => '123e4567-e89b-12d3-a456-426614174000',
            'base64' => $this->generateBase64Image(),
            'nombre_archivo' => 'imagen_prueba.png'
        ];

        $response = $this->postJson('/api/imagenes', $payload, [
            'Authorization' => 'Bearer ' . $this->token,
        ]);

        $response->assertStatus(201);
    }

    #[Test]
    public function se_puede_cargar_una_imagen()
    {
        $imagen = Imagen::factory()->create();

        $response = $this->getJson("/api/imagenes/{$imagen->id}", [
            'Authorization' => 'Bearer ' . $this->token,
        ]);

        $response->assertStatus(200)
            ->assertJsonPath('data.id', $imagen->id);
    }

    #[Test]
    public function se_puede_actualizar_una_imagen()
    {
        $imagen = Imagen::factory()->create([
            'nombre_archivo' => 'imagen_a_actualizar.png'
        ]);

        $payload = [
            'uuid' => $imagen->uuid,
            'base64' => $this->generateBase64Image(),
            'nombre_archivo' => 'imagen_actualizada.png'
        ];

        $response = $this->putJson("/api/imagenes/{$imagen->id}", $payload, [
            'Authorization' => 'Bearer ' . $this->token,
        ]);

        $response->assertStatus(200)
            ->assertJsonPath('message', 'La imagen fue actualizada correctamente');
    }

    #[Test]
    public function se_puede_eliminar_una_imagen()
    {
        $imagen = Imagen::factory()->create([
            'nombre_archivo' => 'imagen_a_borrar.png'
        ]);

        $response = $this->deleteJson("/api/imagenes/{$imagen->id}", [], [
            'Authorization' => 'Bearer ' . $this->token,
        ]);

        $response->assertStatus(204);
    }
}
