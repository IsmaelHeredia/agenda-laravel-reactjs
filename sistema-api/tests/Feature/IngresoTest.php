<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use PHPUnit\Framework\Attributes\Test;

class IngresoTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function un_usuario_puede_loguearse_correctamente()
    {
        $user = User::factory()->create([
            'name' => 'admin',
            'email' => 'admin@example.com',
            'password' => bcrypt('Admin1234!'),
        ]);

        $response = $this->postJson('/api/ingreso', [
            'usuario' => 'admin',
            'clave' => 'Admin1234!',
        ]);

        $response->assertStatus(200)
            ->assertJsonStructure([
                'message',
                'data' => [
                    'access_token',
                    'user_name',
                    'token_type',
                ]
            ]);
    }

    #[Test]
    public function un_usuario_autenticado_puede_validar_su_token()
    {
        $user = User::factory()->create();

        $token = $user->createToken('auth_token')->plainTextToken;

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->getJson('/api/validar');

        $response->assertStatus(200)
            ->assertJson([
                'message' => 'Acceso validado y datos de usuario obtenidos',
                'data' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                ]
            ]);
    }
}
