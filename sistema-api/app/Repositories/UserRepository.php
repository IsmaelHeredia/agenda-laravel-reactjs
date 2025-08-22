<?php

namespace App\Repositories;

use App\Interfaces\UserRepositoryInterface;
use App\Models\User;

class UserRepository implements UserRepositoryInterface
{
    public function findByNombre(string $nombre): ?User
    {
        return User::where('name', $nombre)->first();
    }

    public function save(User $user): bool
    {
        return $user->save();
    }

    public function existsByNombre(string $nombre): bool
    {
        return User::where('name', $nombre)->exists();
    }
}