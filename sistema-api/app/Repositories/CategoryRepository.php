<?php

namespace App\Repositories;

use App\Interfaces\CategoryRepositoryInterface;
use App\Models\Categoria;
use Illuminate\Support\Facades\Cache;
use App\Models\CacheVersion;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class CategoryRepository implements CategoryRepositoryInterface
{
    protected const CACHE_VERSION_KEY = 'categories_list_version';
    protected const CACHE_KEY_ALL = 'categories.all.';
    protected const CACHE_KEY_PREFIX_ID = 'categories.id.';
    protected const CACHE_KEY_PREFIX_LIST = 'categories.list.';
    protected const CACHE_TTL_PAGINATED = 60 * 24 * 7;
    protected const CACHE_TTL_SINGLE_ITEM = 60 * 60 * 24;
    protected const CACHE_TTL_ALL_ITEMS = 60 * 60 * 24;

    private function getCurrentListVersion(): int
    {
        $versionEntry = CacheVersion::where('key', self::CACHE_VERSION_KEY)->first();
        if (!$versionEntry) {
            $versionEntry = CacheVersion::create([
                'key' => self::CACHE_VERSION_KEY,
                'version' => now()->timestamp
            ]);
        }
        return $versionEntry->version;
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

    public function getAllOrderedByName(): array
    {
        $version = $this->getCurrentListVersion();
        $cacheKey = self::CACHE_KEY_ALL . $version;

        return Cache::remember($cacheKey, self::CACHE_TTL_ALL_ITEMS, function () {
            return Categoria::orderBy('nombre')->get()->toArray();
        });
    }

    public function getPaginated(?string $nombre = null, int $pagina = 1, int $perPage = 25): LengthAwarePaginator
    {
        $version = $this->getCurrentListVersion();
        $cacheKey = self::CACHE_KEY_PREFIX_LIST . $version . '_' . md5(json_encode([
            'nombre' => $nombre,
            'pagina' => $pagina,
            'perPage' => $perPage
        ]));

        return Cache::remember($cacheKey, self::CACHE_TTL_PAGINATED, function () use ($nombre, $pagina, $perPage) {
            $query = Categoria::orderBy('nombre', 'ASC');

            if ($nombre) {
                $query->where('nombre', 'like', '%' . $nombre . '%');
            }

            return $query->paginate($perPage, ['*'], 'page', $pagina);
        });
    }

    public function findById(string $id): Categoria|null
    {
        $cacheKey = self::CACHE_KEY_PREFIX_ID . $id;

        return Cache::remember($cacheKey, self::CACHE_TTL_SINGLE_ITEM, function () use ($id) {
            return Categoria::find($id);
        });
    }

    public function create(array $data): Categoria
    {
        $categoria = new Categoria;
        $categoria->nombre = $data['nombre'];
        $categoria->save();

        $this->incrementListVersion(); 

        return $categoria;
    }

    public function update(Categoria $categoria, array $data): Categoria
    {
        $categoria->nombre = $data['nombre'];
        $updated = $categoria->save();

        if ($updated) {
            $this->incrementListVersion();
            Cache::forget(self::CACHE_KEY_PREFIX_ID . $categoria->id);
            $categoria->refresh();
            return $categoria;
        }

        throw new \Exception('No se pudo actualizar la categoría');
    }

    public function delete(Categoria $categoria): bool
    {
        $deleted = $categoria->delete();

        if ($deleted) {
            $this->incrementListVersion();
            Cache::forget(self::CACHE_KEY_PREFIX_ID . $categoria->id);
        }

        return $deleted;
    }

    public function existsByName(string $nombre): bool
    {
        return Categoria::where('nombre', $nombre)->exists();
    }
}