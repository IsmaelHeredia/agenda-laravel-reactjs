<?php

namespace App\Interfaces;

use App\Models\Imagen;
use Illuminate\Database\Eloquent\Collection;

interface ImageRepositoryInterface
{
    public function getByUuid(string $uuid = null): Collection;
    public function findById(string $id): ?Imagen;
    public function create(array $data): Imagen;
    public function update(Imagen $imagen, array $data): bool;
    public function delete(Imagen $imagen): bool;
    public function saveFile(string $fileName, string $content): bool;
    public function deleteFile(string $filePath): bool;
}