<?php

namespace App\Interfaces;

use App\Models\Categoria;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

interface CategoryRepositoryInterface
{
    public function getAllOrderedByName(): array;
    public function getPaginated(string $nombre = null, int $pagina = 1, int $perPage = 25) : LengthAwarePaginator;
    public function findById(string $id): Categoria|null;
    public function create(array $data): Categoria;
    public function update(Categoria $categoria, array $data): Categoria;
    public function delete(Categoria $categoria): bool;
    public function existsByName(string $nombre): bool;
}