<?php

namespace App\Http\Controllers;

use App\Services\CategoryService;
use App\Http\Requests\GuardarCategoriaRequest;
use App\Http\Requests\ListarCategoriasRequest;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\JsonResponse;

class CategoriaController extends Controller
{
    protected $categoryService;

    public function __construct(CategoryService $categoryService)
    {
        $this->categoryService = $categoryService;
    }

    public function listarTodo(): JsonResponse
    {
        $categorias = $this->categoryService->getAllCategories();
        return response()->json([
            'message' => 'Se envió el listado completo de las categorías',
            'data' => $categorias
        ], Response::HTTP_OK);
    }

    public function listar(ListarCategoriasRequest $request, string $pagina): JsonResponse
    {
        $resultado = $this->categoryService->getPaginatedCategories($request, $pagina);
        return response()->json([
            'message' => 'Se envió el listado de las categorías',
            'data' => $resultado
        ], Response::HTTP_OK);
    }

    public function cargar(string $id): JsonResponse
    {
        $categoria = $this->categoryService->getCategoryById($id);
        return response()->json([
            'message' => 'Se enviaron los datos de la categoría',
            'data' => $categoria
        ], Response::HTTP_OK);
    }

    public function crear(GuardarCategoriaRequest $request): JsonResponse
    {
        $categoria = $this->categoryService->createCategory($request);
        return response()->json([
            'message' => 'La categoría fue creada correctamente',
            'data' => $categoria
        ], Response::HTTP_CREATED);
    }

    public function actualizar(GuardarCategoriaRequest $request, string $id): JsonResponse
    {
        $categoria = $this->categoryService->updateCategory($request, $id);
        return response()->json([
            'message' => 'La categoría fue actualizada correctamente',
            'data' => $categoria
        ], Response::HTTP_OK);
    }

    public function borrar(string $id): JsonResponse
    {
        $this->categoryService->deleteCategory($id);
        return response()->json([
            'message' => 'La categoría fue borrada correctamente'
        ], Response::HTTP_NO_CONTENT);
    }
}