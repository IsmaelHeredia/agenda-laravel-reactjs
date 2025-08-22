<?php

namespace App\Repositories;

use App\Interfaces\ImageRepositoryInterface;
use App\Models\Imagen;
use Illuminate\Support\Facades\Storage;
use Illuminate\Database\Eloquent\Collection;

class ImageRepository implements ImageRepositoryInterface
{
    public function getByUuid(string $uuid = null): Collection
    {
        $query = Imagen::orderBy('created_at', 'ASC');

        if ($uuid) {
            $query->where('uuid', 'like', '%' . $uuid . '%');
        }

        return $query->get();
    }

    public function findById(string $id): ?Imagen
    {
        return Imagen::find($id);
    }

    public function create(array $data): Imagen
    {
        $imagen = new Imagen;
        $imagen->uuid = $data['uuid'];
        $imagen->nombre_archivo = $data['nombre_archivo'];
        $imagen->save();
        return $imagen;
    }

    public function update(Imagen $imagen, array $data): bool
    {
        $imagen->uuid = $data['uuid'];
        $imagen->nombre_archivo = $data['nombre_archivo'];
        return $imagen->save();
    }

    public function delete(Imagen $imagen): bool
    {
        return $imagen->delete();
    }

    public function saveFile(string $fileName, string $content): bool
    {
        $path = 'imagenes/' . $fileName;

        return Storage::disk('public')->put($path, $content);
    }

    public function deleteFile(string $fileName): bool
    {
        $path = 'imagenes/' . $fileName;

        if (Storage::disk('public')->exists($path)) {
            return Storage::disk('public')->delete($path);
        }

        return false;
    }
}