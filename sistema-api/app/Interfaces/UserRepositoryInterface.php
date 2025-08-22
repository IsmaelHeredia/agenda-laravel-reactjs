<?php

namespace App\Interfaces;

use App\Models\User;

interface UserRepositoryInterface
{
    public function findByNombre(string $nombre): ?User;

    public function save(User $user): bool;

    public function existsByNombre(string $nombre): bool;
}