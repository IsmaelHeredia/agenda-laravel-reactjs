<?php

namespace App\Services;

use App\Interfaces\NoteRepositoryInterface;
use App\Http\Requests\GuardarNotaRequest;
use App\Http\Requests\ListarNotasRequest;
use App\Models\Nota;
use App\Exceptions\NoteException;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Pagination\LengthAwarePaginator;
use App\Traits\CifradoTrait;
use App\Interfaces\ReportServiceInterface;
use Illuminate\Database\Eloquent\Collection;

class NoteService
{
    use CifradoTrait;

    protected NoteRepositoryInterface $noteRepository;
    protected ReportServiceInterface $reportService;

    public function __construct(NoteRepositoryInterface $noteRepository, ReportServiceInterface $reportService)
    {
        $this->noteRepository = $noteRepository;
        $this->reportService = $reportService;
    }

    public function cleanExpiredNotesAutomatically(): void
    {
        $this->noteRepository->deleteExpiredNotes();
    }

    public function getPaginatedNotes(ListarNotasRequest $request, string $pagina): LengthAwarePaginator
    {
        $validated = $request->validated();
        $porTitulo = $validated['titulo'] ?? null;
        $porCategorias = $validated['categorias'] ?? null;
        $porFavorita = $validated['favorita'] ?? null;
        $porCantidad = $validated['cantidad'] ?? 25;
        $notasPaginadas = $this->noteRepository->getPaginated(
            $porTitulo,
            $porCategorias,
            $porFavorita,
            $porCantidad,
            $pagina
        );
        return $notasPaginadas;
    }

    public function getNoteById(string $id): Nota
    {
        $nota = $this->noteRepository->findById($id);
        if (!$nota) {
            throw new NoteException('La nota no existe', Response::HTTP_NOT_FOUND);
        }
        return $nota;
    }

    public function createNote(GuardarNotaRequest $request): Nota
    {
        $validated = $request->validated();
        $data = [
            'titulo' => $validated['titulo'],
            'contenido' => $validated['contenido'],
            'favorita' => $validated['favorita'],
            'uuid' => $validated['uuid'],
            'fecha_expiracion' => $validated['fecha_expiracion'] ?? null,
        ];
        $categorias = $validated['categorias'] ?? [];
        $nota = $this->noteRepository->create($data, $categorias);
        $this->reportService->invalidateTopCategoriesReportCache();
        return $nota;
    }

    public function updateNote(GuardarNotaRequest $request, string $id): Nota
    {
        $validated = $request->validated();
        $nota = $this->noteRepository->findById($id);
        if (!$nota) {
            throw new NoteException('La nota no existe', Response::HTTP_NOT_FOUND);
        }
        $contenido = $validated['contenido'];
        $uuid = $nota->uuid;
        $oldContent = $this->descifrar($nota->contenido);
        preg_match_all('/src=["\']([^"\']+\/uploads\/([a-zA-Z0-9]{10}\.(?:jpg|jpeg|gif|png)))["\']/i', $oldContent, $oldImageMatches);
        $oldImagesInContent = array_map('basename', $oldImageMatches[2]);
        preg_match_all('/src=["\']([^"\']+\/uploads\/([a-zA-Z0-9]{10}\.(?:jpg|jpeg|gif|png)))["\']/i', $contenido, $newImageMatches);
        $newImagesInContent = array_map('basename', $newImageMatches[2]);
        foreach ($oldImagesInContent as $oldImage) {
            if (!in_array($oldImage, $newImagesInContent)) {
                $imagenRecord = $this->noteRepository->getImagesByUuid($uuid)
                    ->where('nombre_archivo', $oldImage)
                    ->first();
                if ($imagenRecord) {
                    $this->noteRepository->deleteImageFile($imagenRecord->nombre_archivo);
                    $this->noteRepository->deleteImageRecord($imagenRecord);
                }
            }
        }
        $data = [
            'titulo' => $validated['titulo'],
            'contenido' => $contenido,
            'favorita' => $validated['favorita'],
            'uuid' => $validated['uuid'],
            'fecha_expiracion' => $validated['fecha_expiracion'] ?? null,
        ];
        $categorias = $validated['categorias'] ?? [];
        $datos = $this->noteRepository->update($nota, $data, $categorias);
        if (!$datos) {
            throw new NoteException('Ocurrió un error actualizando la nota', Response::HTTP_INTERNAL_SERVER_ERROR);
        }
        $this->reportService->invalidateTopCategoriesReportCache();
        return $datos;
    }

    public function deleteNote(string $id): void
    {
        $nota = $this->noteRepository->findById($id);
        if (!$nota) {
            throw new NoteException('La nota no existe', Response::HTTP_NOT_FOUND);
        }
        $this->deleteNoteImagesForDeletion($nota->uuid);
        if (!$this->noteRepository->delete($nota)) {
            throw new NoteException('Ocurrió un error borrando la nota', Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    protected function deleteNoteImagesForDeletion(string $uuid): void
    {
        $imagenes = $this->noteRepository->getImagesByUuid($uuid);
        foreach ($imagenes as $imagen) {
            $this->noteRepository->deleteImageFile($imagen->nombre_archivo);
            $this->noteRepository->deleteImageRecord($imagen);
        }
    }

    public function toggleNoteFavorite(string $id): Nota
    {
        $nota = $this->noteRepository->toggleFavorite($id);
        if (!$nota) {
            throw new NoteException('La nota no existe o no se pudo actualizar su estado favorito', Response::HTTP_NOT_FOUND);
        }
        $this->reportService->invalidateTopCategoriesReportCache();
        return $nota;
    }
}