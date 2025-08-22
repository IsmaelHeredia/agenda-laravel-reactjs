<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Models\Imagen;
use App\Models\Nota;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;

class CleanOrphanedImages implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct()
    {
    }

    public function handle(): void
    {
        Log::info('Iniciando limpieza de imágenes huérfanas.');

        $existingNoteUuids = Nota::pluck('uuid')->toArray();

        $imagenesPotencialmenteHuerfanas = Imagen::whereNotIn('uuid', $existingNoteUuids)
                                                ->where('created_at', '<=', Carbon::now()->subHour())
                                                ->get();

        $countDeletedFiles = 0;
        $countDeletedRecords = 0;

        foreach ($imagenesPotencialmenteHuerfanas as $imagen) {
            $notaCheck = Nota::where('uuid', $imagen->uuid)->first();

            if (!$notaCheck) { 
                if (Storage::disk('public')->exists($imagen->nombre_archivo)) {
                    try {
                        Storage::disk('public')->delete($imagen->nombre_archivo);
                        Log::info("Imagen eliminada de storage: {$imagen->nombre_archivo} (UUID: {$imagen->uuid})");
                        $countDeletedFiles++;
                    } catch (\Exception $e) {
                        Log::error("Error al eliminar archivo de imagen del storage: {$imagen->nombre_archivo}. Error: " . $e->getMessage());
                    }
                } else {
                    Log::warning("Archivo de imagen no encontrado en storage, pero el registro existe: {$imagen->nombre_archivo} (ID: {$imagen->id}, UUID: {$imagen->uuid})");
                }

                try {
                    $imagen->delete();
                    Log::info("Registro de imagen eliminado de la BD: {$imagen->id} (Nombre: {$imagen->nombre_archivo})");
                    $countDeletedRecords++;
                } catch (\Exception $e) {
                    Log::error("Error al eliminar registro de imagen de la BD: {$imagen->id}. Error: " . $e->getMessage());
                }
            }
        }

        Log::info("Limpieza de imágenes huérfanas finalizada. Archivos eliminados: {$countDeletedFiles}, Registros eliminados de BD: {$countDeletedRecords}.");
    }
}