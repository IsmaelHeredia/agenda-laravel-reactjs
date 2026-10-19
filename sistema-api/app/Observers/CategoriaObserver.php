<?php

namespace App\Observers;

use App\Models\Categoria;
use App\Services\Cache\NoteCacheInvalidator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class CategoriaObserver
{
    private array $pendingNoteIds = [];

    public function __construct(private NoteCacheInvalidator $invalidator)
    {
    }

    public function updated(Categoria $categoria): void
    {
        $this->invalidator->invalidateForCategory(
            $this->invalidator->noteIdsForCategory($categoria->id)
        );
    }

    public function deleting(Categoria $categoria): void
    {
        $noteIds = $this->invalidator->noteIdsForCategory($categoria->id);
        $this->pendingNoteIds[$categoria->id] = $noteIds;

        $detached = DB::table('categoria_nota')
            ->where('categoria_id', $categoria->id)
            ->delete();

        if ($detached !== count($noteIds)) {
            Log::warning('Detach de categoria_nota inconsistente', [
                'categoria_id' => $categoria->id,
                'esperadas' => count($noteIds),
                'eliminadas' => $detached,
            ]);
        }
    }

    public function deleted(Categoria $categoria): void
    {
        $noteIds = $this->pendingNoteIds[$categoria->id] ?? [];
        unset($this->pendingNoteIds[$categoria->id]);

        $this->invalidator->invalidateForCategory($noteIds);
    }
}