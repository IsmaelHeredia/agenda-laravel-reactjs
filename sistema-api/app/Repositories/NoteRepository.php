<?php

namespace App\Repositories;

use App\Interfaces\NoteRepositoryInterface;
use App\Models\Nota;
use App\Models\Imagen;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;
use App\Models\CacheVersion;
use Illuminate\Database\Eloquent\Collection;
use Carbon\Carbon;

class NoteRepository implements NoteRepositoryInterface
{
    protected const CACHE_VERSION_KEY = 'notes_list_version';
    protected const CACHE_KEY_PREFIX_ID = 'notes.id.';
    protected const CACHE_KEY_PREFIX_LIST = 'notes.list.';
    protected const CACHE_TTL_PAGINATED = 60 * 24 * 7;
    protected const CACHE_TTL_SINGLE_ITEM = 60 * 60 * 24;

    private function getCurrentListVersion(): string
    {
        $versionEntry = CacheVersion::where('key', self::CACHE_VERSION_KEY)->first();
        if (!$versionEntry) {
            $versionEntry = CacheVersion::create([
                'key' => self::CACHE_VERSION_KEY,
                'version' => now()->timestamp
            ]);
        }
        return (string) $versionEntry->version;
    }

    private function incrementListVersion(): void
    {
        $versionEntry = CacheVersion::where('key', self::CACHE_VERSION_KEY)->first();
        if ($versionEntry) {
            $versionEntry->update(['version' => now()->timestamp]);
        } else {
            CacheVersion::create([
                'key' => self::CACHE_VERSION_KEY,
                'version' => now()->timestamp
            ]);
        }
    }

    public function getPaginated(
        ?string $titulo = null,
        ?array $categorias = null,
        ?bool $favorita = null,
        int $cantidad = 25,
        int $pagina = 1
    ): LengthAwarePaginator {
        $version = $this->getCurrentListVersion();
        $cacheKey = self::CACHE_KEY_PREFIX_LIST . $version . '_' . md5(json_encode([
            'titulo' => $titulo,
            'categorias' => $categorias,
            'favorita' => $favorita,
            'cantidad' => $cantidad,
            'pagina' => $pagina
        ]));

        return Cache::remember($cacheKey, self::CACHE_TTL_PAGINATED, function () use ($titulo, $categorias, $favorita, $cantidad, $pagina) {
            $query = Nota::select('id', 'titulo', 'contenido', 'favorita', 'fecha_expiracion', 'uuid')->with('categorias');
            if ($titulo) {
                $query->where('titulo', 'like', '%' . $titulo . '%');
            }
            if ($categorias && count($categorias) > 0) {
                $query->whereHas('categorias', function ($q) use ($categorias) {
                    $q->whereIn('categoria_id', $categorias);
                });
            }
            if (is_bool($favorita)) {
                $query->where('favorita', $favorita ? 1 : 0);
            }
            $query->orderBy('updated_at', 'DESC');
            return $query->paginate($cantidad, ['*'], 'page', $pagina);
        });
    }

    public function findById(string $id): ?Nota
    {
        $cacheKey = self::CACHE_KEY_PREFIX_ID . $id;
        return Cache::remember($cacheKey, self::CACHE_TTL_SINGLE_ITEM, function () use ($id) {
            return Nota::select('id', 'titulo', 'contenido', 'favorita', 'fecha_expiracion', 'uuid')->with('categorias')->find($id);
        });
    }

    public function create(array $data, array $categoriesIds): Nota
    {
        $nota = new Nota;
        $nota->titulo = $data['titulo'];
        $nota->contenido = $data['contenido'];
        $nota->favorita = $data['favorita'];
        $nota->uuid = $data['uuid'];
        $nota->fecha_expiracion = $data['fecha_expiracion'] ?? null;
        $nota->save();
        $nota->categorias()->attach($categoriesIds);
        $nota->load('categorias');
        $this->incrementListVersion();
        Cache::forget(self::CACHE_KEY_PREFIX_ID . $nota->id);
        return $nota;
    }

    public function update(Nota $nota, array $data, array $categoriesIds): Nota
    {
        $nota->titulo = $data['titulo'];
        $nota->contenido = $data['contenido'];
        $nota->favorita = $data['favorita'];
        $nota->uuid = $data['uuid'];
        $nota->fecha_expiracion = $data['fecha_expiracion'] ?? null;
        $updated = $nota->save();
        $nota->categorias()->sync($categoriesIds);
        if ($updated) {
            $this->incrementListVersion();
            Cache::forget(self::CACHE_KEY_PREFIX_ID . $nota->id);
            $nota->refresh();
            return $nota;
        }
        return $nota;
    }

    public function delete(Nota $nota): bool
    {
        $nota->categorias()->detach();
        $deleted = $nota->delete();
        if ($deleted) {
            $this->incrementListVersion();
            Cache::forget(self::CACHE_KEY_PREFIX_ID . $nota->id);
        }
        return $deleted;
    }

    public function deleteExpiredNotes(): void
    {
        $notasExpiradas = Nota::whereDate('fecha_expiracion', '<=', now())->get();
        if ($notasExpiradas->count() > 0) {
            foreach ($notasExpiradas as $notaEx) {
                $notaEx->categorias()->detach();
                $this->deleteNoteImages($notaEx->uuid);
                $notaEx->delete();
            }
            $this->incrementListVersion();
        }
    }

    public function getImagesByUuid(string $uuid): Collection
    {
        return Imagen::where('uuid', $uuid)->get();
    }

    public function deleteImageFile(string $fileName): void
    {
        $filePath = 'imagenes/' . $fileName;
        if (Storage::disk('public')->exists($filePath)) {
            Storage::disk('public')->delete($filePath);
        }
    }

    public function deleteImageRecord(Imagen $imagen): void
    {
        $imagen->delete();
    }

    protected function deleteNoteImages(string $uuid): void
    {
        $imagenes = $this->getImagesByUuid($uuid);
        foreach ($imagenes as $imagen) {
            $this->deleteImageFile($imagen->nombre_archivo);
            $this->deleteImageRecord($imagen);
        }
    }

    public function toggleFavorite(string $id): ?Nota
    {
        $nota = $this->findById($id);
        if ($nota) {
            $nota->favorita = !$nota->favorita;
            $nota->save();
            Cache::forget(self::CACHE_KEY_PREFIX_ID . $nota->id);
            $this->incrementListVersion();
            return $nota;
        }
        return null;
    }
}