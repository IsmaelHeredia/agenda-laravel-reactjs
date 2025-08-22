<?php

namespace App\Services;

use App\Interfaces\ImageRepositoryInterface;
use App\Http\Requests\GuardarImagenRequest;
use App\Http\Requests\ListarImagenesRequest;
use App\Exceptions\ImageException;
use App\Models\Imagen;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Database\Eloquent\Collection;

class ImageService
{
    protected ImageRepositoryInterface $imageRepository;

    public function __construct(ImageRepositoryInterface $imageRepository)
    {
        $this->imageRepository = $imageRepository;
    }

    public function listImages(ListarImagenesRequest $request): Collection
    {
        $validated = $request->validated();
        $porUUID = $validated['uuid'] ?? null;
        return $this->imageRepository->getByUuid($porUUID);
    }

    public function getImageById(string $id): Imagen
    {
        $imagen = $this->imageRepository->findById($id);

        if (!$imagen) {
            throw new ImageException('La imagen no existe', Response::HTTP_NOT_FOUND);
        }
        return $imagen;
    }

    public function createImage(GuardarImagenRequest $request): string
    {
        $validated = $request->validated();
        $base64Content = $validated['base64'];
        $uuid = $validated['uuid'];

        if (preg_match('/^data:image\/(\w+);base64,/', $base64Content, $formatMatches)) {
            $imageData = substr($base64Content, strpos($base64Content, ',') + 1);
            $format = strtolower($formatMatches[1]);

            if (!in_array($format, ['jpg', 'jpeg', 'gif', 'png'])) {
                throw new ImageException('El formato de la imagen es incorrecto', Response::HTTP_BAD_REQUEST);
            }

            $imageData = str_replace(' ', '+', $imageData);
            $decodedImage = base64_decode($imageData);

        } else {
            throw new ImageException('Formato de imagen base64 inválido', Response::HTTP_BAD_REQUEST);
        }

        $newFileName = Str::random(10) . '.jpg';

        if (!$this->imageRepository->saveFile($newFileName, $decodedImage)) {
            throw new ImageException('Ocurrió un error guardando el archivo de imagen', Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        $data = [
            'uuid' => $uuid,
            'nombre_archivo' => $newFileName,
        ];

        $this->imageRepository->create($data);

        return $newFileName;
    }

    public function updateImage(GuardarImagenRequest $request, string $id): void
    {
        $validated = $request->validated();
        $imagen = $this->imageRepository->findById($id);

        if (!$imagen) {
            throw new ImageException('La imagen no existe', Response::HTTP_NOT_FOUND);
        }

        $data = [
            'uuid' => $validated['uuid'],
            'nombre_archivo' => $validated['nombre_archivo'],
        ];

        if (!$this->imageRepository->update($imagen, $data)) {
            throw new ImageException('Ocurrió un error actualizando la imagen', Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function deleteImage(string $id): void
    {
        $imagen = $this->imageRepository->findById($id);

        if (!$imagen) {
            throw new ImageException('La imagen no existe', Response::HTTP_NOT_FOUND);
        }

        if (!$this->imageRepository->deleteFile($imagen->nombre_archivo)) {
            error_log("No se pudo borrar el archivo físico: " . $imagen->nombre_archivo);
        }

        if (!$this->imageRepository->delete($imagen)) {
            throw new ImageException('Ocurrió un error borrando la imagen', Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}