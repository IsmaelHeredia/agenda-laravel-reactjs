<?php

namespace App\Http\Controllers;

use App\Services\NoteService;
use App\Http\Requests\GuardarNotaRequest;
use App\Http\Requests\ListarNotasRequest;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\JsonResponse;

class NotaController extends Controller
{
    protected $noteService;

    public function __construct(NoteService $noteService)
    {
        $this->noteService = $noteService;
    }

    public function listar(ListarNotasRequest $request, string $pagina): JsonResponse
    {
        $resultado = $this->noteService->getPaginatedNotes($request, $pagina);
        return response()->json([
            'message' => 'Se envió el listado de las notas',
            'data' => $resultado
        ], Response::HTTP_OK);
    }

    public function cargar(string $id): JsonResponse
    {
        $nota = $this->noteService->getNoteById($id);
        return response()->json([
            'message' => 'Se enviaron los datos de la nota',
            'data' => $nota
        ], Response::HTTP_OK);
    }

    public function crear(GuardarNotaRequest $request): JsonResponse
    {
        $nota = $this->noteService->createNote($request);
        return response()->json([
            'message' => 'La nota fue creada correctamente',
            'data' => $nota
        ], Response::HTTP_CREATED);
    }

    public function actualizar(GuardarNotaRequest $request, string $id): JsonResponse
    {
        $nota = $this->noteService->updateNote($request, $id);
        return response()->json([
            'message' => 'La nota fue actualizada correctamente',
            'data' => $nota
        ], Response::HTTP_OK);
    }

    public function borrar(string $id): JsonResponse
    {
        $this->noteService->deleteNote($id);
        return response()->json([
            'message' => 'La nota fue borrada correctamente'
        ], Response::HTTP_NO_CONTENT);
    }

    public function cambiarFavorito(string $id): JsonResponse
    {
        $nota = $this->noteService->toggleNoteFavorite($id);
        $message = $nota->favorita ? 'Nota marcada como favorita' : 'Nota desmarcada como favorita';

        return response()->json([
            'message' => $message,
            'data' => [
                'id' => $nota->id,
                'favorita' => $nota->favorita,
            ]
        ], Response::HTTP_OK);
    }
}