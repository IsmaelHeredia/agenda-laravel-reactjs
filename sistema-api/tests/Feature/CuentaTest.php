<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\UploadedFile;
use Tests\TestCase;
use Tests\Helpers\AuthHelper;
use PHPUnit\Framework\Attributes\Test;

class CuentaTest extends TestCase
{
    use RefreshDatabase, AuthHelper;

    protected string $token;

    protected function setUp(): void
    {
        parent::setUp();

        Storage::fake('public');

        $this->token = $this->authenticate();
    }

    #[Test]
    public function un_usuario_puede_actualizar_su_nombre_y_clave()
    {
        $payload = [
            'clave_actual' => 'Admin1234!',
            'nuevo_nombre' => 'admin2',
            'nueva_clave' => 'NuevoPass123!',
        ];

        $response = $this->putJson('/api/cuenta', $payload, [
            'Authorization' => 'Bearer ' . $this->token,
        ]);

        $response->assertStatus(200)
                 ->assertJson([
                     'message' => 'Los datos de la cuenta se actualizaron correctamente',
                     'user' => [
                         'name' => 'admin2',
                     ],
                 ]);

        $this->assertTrue(Hash::check('NuevoPass123!', auth()->user()->fresh()->password));
    }

    #[Test]
    public function un_usuario_puede_actualizar_su_avatar()
    {
        $file = UploadedFile::fake()->image('avatar.png');

        $payload = [
            'clave_actual' => 'Admin1234!',
            'avatar' => $file,
        ];

        $response = $this->putJson('/api/cuenta', $payload, [
            'Authorization' => 'Bearer ' . $this->token,
        ]);

        $response->assertStatus(200)
                 ->assertJson([
                     'message' => 'Los datos de la cuenta se actualizaron correctamente',
                 ]);
    }

    #[Test]
    public function no_se_puede_actualizar_con_una_clave_incorrecta()
    {
        $payload = [
            'clave_actual' => 'clave_incorrecta',
            'nuevo_nombre' => 'nombre_invalido',
        ];

        $response = $this->putJson('/api/cuenta', $payload, [
            'Authorization' => 'Bearer ' . $this->token,
        ]);

        $response->assertStatus(401)
                 ->assertJson([
                     'message' => 'La clave actual es incorrecta',
                 ]);
    }
}
