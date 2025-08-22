<?php

namespace App\Http\Controllers;

use App\Services\ImageService;
use App\Http\Requests\GuardarImagenRequest;
use App\Http\Requests\ListarImagenesRequest;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\JsonResponse;

class ImagenController extends Controller
{
    protected $imageService;

    public function __construct(ImageService $imageService)
    {
        $this->imageService = $imageService;
    }

    public function listar(ListarImagenesRequest $request): JsonResponse
    {
        $resultado = $this->imageService->listImages($request);
        return response()->json([
            'message' => 'Se envió el listado de las imágenes',
            'data' => $resultado
        ], Response::HTTP_OK);
    }

    public function cargar(string $id): JsonResponse
    {
        $imagen = $this->imageService->getImageById($id);
        return response()->json([
            'message' => 'Se enviaron los datos de la imagen',
            'data' => $imagen
        ], Response::HTTP_OK);
    }

    public function crear(GuardarImagenRequest $request): JsonResponse
    {
        $newFileName = $this->imageService->createImage($request);
        return response()->json([
            'message' => 'La imagen fue creada correctamente',
            'data' => $newFileName
        ], Response::HTTP_CREATED);
    }

    public function actualizar(GuardarImagenRequest $request, string $id): JsonResponse
    {
        $this->imageService->updateImage($request, $id);
        return response()->json([
            'message' => 'La imagen fue actualizada correctamente'
        ], Response::HTTP_OK);
    }

    public function borrar(string $id): JsonResponse
    {
        $this->imageService->deleteImage($id);
        return response()->json([
            'message' => 'La imagen fue borrada correctamente'
        ], Response::HTTP_NO_CONTENT);
    }
}