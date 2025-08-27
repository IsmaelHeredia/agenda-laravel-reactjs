<?php

namespace Tests\Helpers;

use App\Models\User;

trait AuthHelper
{
    protected function authenticate(): string
    {
        $user = User::factory()->create([
            'name' => 'admin',
            'email' => 'admin@example.com',
            'password' => bcrypt('Admin1234!'),
        ]);

        $response = $this->postJson('/api/ingreso', [
            'usuario' => 'admin',
            'clave'   => 'Admin1234!',
        ]);

        $response->assertStatus(200);

        $token = $response->json('data.access_token');

        if (!$token) {
            dump($response->json());
            $this->fail('El login no devolvió un access_token');
        }

        return $token;
    }
}
