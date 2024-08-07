<?php

namespace App\Traits;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

use App\Models\Usuario;

trait SeguridadTrait
{
    protected function generarToken($username,$id)
    {
        $issuedAt = time();
        $expirationTime = $issuedAt + 60 * 60 * 24 * 60;

        $token = array(
            'iat' => $issuedAt,
            'exp' => $expirationTime,
            'data' => array(
                'id' => $id,
                'username' => $username,
                'email' => $username . '@localhost.com',
        ));

        $jwt = JWT::encode($token, $_ENV['SECRET_KEY'], 'HS256');

        return $jwt;
    }

    protected function validarToken($jwt)
    {
        if($jwt == null) {
            return false;
        }
        
        try 
        {
            $decoded = JWT::decode($jwt, new Key($_ENV['SECRET_KEY'], 'HS256'));
            $data = json_decode(json_encode($decoded), true);
            $id = $data['data']['id'];
            if(Usuario::findOrFail($id))
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        catch(\Exception $e)
        {
            return false;
        }
    }

    protected function mostrarDatosToken($jwt)
    {        
        try 
        {
            $decoded = JWT::decode($jwt, new Key($_ENV['SECRET_KEY'], 'HS256'));
            $data = json_decode(json_encode($decoded), true);
            return $data['data'];
        }
        catch(\Exception $e)
        {
            return null;
        }
    }

}
