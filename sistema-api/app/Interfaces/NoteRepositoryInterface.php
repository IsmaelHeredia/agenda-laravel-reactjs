<?php

namespace App\Interfaces;

use App\Models\Nota;
use App\Models\Imagen;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

interface NoteRepositoryInterface
{
    public function getPaginated(
        string $titulo = null,
        ?array $categorias = null,
        ?bool $favorita = null,
        int $cantidad = 25,
        int $pagina = 1
    ): LengthAwarePaginator;
    public function findById(string $id): ?Nota;
    public function create(array $data, array $categoriesIds): Nota;
    public function update(Nota $nota, array $data, array $categoriesIds): Nota;
    public function delete(Nota $nota): bool;
    public function deleteExpiredNotes(): void;
    public function getImagesByUuid(string $uuid): Collection;
    public function deleteImageFile(string $filePath): void;
    public function deleteImageRecord(Imagen $imagen): void;
    public function toggleFavorite(string $id): ?Nota;
}