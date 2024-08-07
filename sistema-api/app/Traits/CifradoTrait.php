<?php

namespace App\Traits;

trait CifradoTrait
{
    protected function encriptar($text)
    {
        $output = openssl_encrypt($text, $_ENV['ENCRYPT_METHOD'], $_ENV['ENCRYPT_KEY']);
     
        return $output;
    }

    protected function desencriptar($text)
    {
        $output = openssl_decrypt($text, $_ENV['ENCRYPT_METHOD'], $_ENV['ENCRYPT_KEY']);
     
        return $output;
    }
}
