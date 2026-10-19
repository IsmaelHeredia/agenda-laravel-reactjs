<?php

namespace App\Repositories;

use App\Interfaces\CategoryRepositoryInterface;
use App\Models\Categoria;
use App\Repositories\Concerns\HasListVersion;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class CategoryRepository implements CategoryRepositoryInterface
{
    use HasListVersion;

    protected const CACHE_VERSION_KEY = 'categories_list_version';
    protected const CACHE_KEY_ALL = 'categories.all.';
    protected const CACHE_KEY_PREFIX_ID = 'categories.id.';
    protected const CACHE_KEY_PREFIX_LIST = 'categories.list.';
    protected const CACHE_TTL_PAGINATED = 60 * 60 * 24 * 7;
    protected const CACHE_TTL_SINGLE_ITEM = 60 * 60 * 24;
    protected const CACHE_TTL_ALL_ITEMS = 60 * 60 * 24;

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
        $deleted = (bool) DB::transaction(fn () => $categoria->delete());

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