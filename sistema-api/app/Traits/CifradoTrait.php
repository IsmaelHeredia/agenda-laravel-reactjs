<?php

namespace App\Traits;

trait CifradoTrait
{
    protected const ENCRYPT_METHOD = 'AES-128-ECB';

    protected function cifrar(?string $text): bool|string|null
    {
        if ($text === null) {
            return null;
        }

        $output = openssl_encrypt($text, self::ENCRYPT_METHOD, $_ENV['ENCRYPT_KEY']);
      
        return $output;
    }

    protected function descifrar(?string $text): bool|string|null
    {
        if ($text === null) {
            return null;
        }

        $output = openssl_decrypt($text, self::ENCRYPT_METHOD, $_ENV['ENCRYPT_KEY']);
      
        return $output;
    }
}
