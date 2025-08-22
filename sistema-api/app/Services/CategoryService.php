<?php

namespace App\Services;

use App\Interfaces\CategoryRepositoryInterface;
use App\Http\Requests\GuardarCategoriaRequest;
use App\Http\Requests\ListarCategoriasRequest;
use App\Exceptions\CategoryException;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Pagination\LengthAwarePaginator;
use App\Models\Categoria;

class CategoryService
{
    protected $categoryRepository;

    public function __construct(CategoryRepositoryInterface $categoryRepository)
    {
        $this->categoryRepository = $categoryRepository;
    }

    public function getAllCategories(): array
    {
        return $this->categoryRepository->getAllOrderedByName();
    }

    public function getPaginatedCategories(ListarCategoriasRequest $request, string $pagina): LengthAwarePaginator
    {
        $validated = $request->validated();
        $porNombre = $validated['nombre'] ?? null;
        $pagina = (int) $pagina;
        if ($pagina < 1) {
            $pagina = 1;
        }

        return $this->categoryRepository->getPaginated($porNombre, $pagina);
    }

    public function getCategoryById(string $id): Categoria
    {
        $categoria = $this->categoryRepository->findById($id);

        if (!$categoria) {
            throw new CategoryException('La categoría no existe', Response::HTTP_NOT_FOUND);
        }

        return $categoria;
    }

    public function createCategory(GuardarCategoriaRequest $request): Categoria
    {
        $nombre = $request->validated('nombre');

        if ($this->categoryRepository->existsByName($nombre)) {
            throw new CategoryException('Ya existe una categoría con ese nombre', Response::HTTP_CONFLICT);
        }

        return $this->categoryRepository->create(['nombre' => $nombre]);
    }

    public function updateCategory(GuardarCategoriaRequest $request, string $id): Categoria
    {
        $nombre = $request->validated('nombre');
        $categoria = $this->categoryRepository->findById($id);

        if (!$categoria) {
            throw new CategoryException('La categoría no existe', Response::HTTP_NOT_FOUND);
        }

        if ($nombre !== $categoria->nombre && $this->categoryRepository->existsByName($nombre)) {
            throw new CategoryException('Ya existe otra categoría con ese nombre', Response::HTTP_CONFLICT);
        }

        $datos = $this->categoryRepository->update($categoria, ['nombre' => $nombre]);

        if (!$datos) {
            throw new CategoryException('Ocurrió un error actualizando la categoría', Response::HTTP_INTERNAL_SERVER_ERROR);
        } else {
            return $datos;
        }
    }

    public function deleteCategory(string $id): void
    {
        $categoria = $this->categoryRepository->findById($id);

        if (!$categoria) {
            throw new CategoryException('La categoría no existe', Response::HTTP_NOT_FOUND);
        }

        if (!$this->categoryRepository->delete($categoria)) {
            throw new CategoryException('Ocurrió un error borrando la categoría', Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}