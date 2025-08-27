<?php

namespace App\Exceptions;

use Exception;
use Throwable;
use Symfony\Component\HttpFoundation\Response;

class ImageException extends Exception
{
    protected $statusCode;
    protected $data;

    public function __construct(string $message = "", int $statusCode = Response::HTTP_BAD_REQUEST, $data = null, ?Throwable $previous = null)
    {
        parent::__construct($message, 0, $previous);
        $this->statusCode = $statusCode;
        $this->data = $data;
    }

    public function getStatusCode(): int
    {
        return $this->statusCode;
    }

    public function getData(): mixed
    {
        return $this->data;
    }
}