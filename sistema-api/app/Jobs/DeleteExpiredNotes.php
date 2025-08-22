<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Models\Nota;
use Carbon\Carbon;
use App\Services\NoteService;
use Log;

class DeleteExpiredNotes implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct()
    {
    }

    public function handle(NoteService $noteService): void
    {
        $today = Carbon::today();

        $expiredNotes = Nota::whereNotNull('fecha_expiracion')
                            ->whereDate('fecha_expiracion', '<=', $today)
                            ->get();
        $notesCount = 0;

        foreach ($expiredNotes as $note) {
            try {
                $noteService->deleteNote($note->id);
                $notesCount++;
            } catch (\Exception $e) {
                Log::error("Error al eliminar la nota con ID {$note->id}: " . $e->getMessage());
            }
        }

        Log::info("Job DeleteExpiredNotes ejecutado. Se eliminaron {$notesCount} notas y sus imágenes.");
    }
}
