<?php

namespace App\Services\Cache;

use App\Interfaces\ReportServiceInterface;
use App\Repositories\Concerns\HasListVersion;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class NoteCacheInvalidator
{
    use HasListVersion;

    protected const CACHE_VERSION_KEY = 'notes_list_version';
    protected const CACHE_KEY_PREFIX_ID = 'notes.id.';

    public function __construct(private ReportServiceInterface $reportService)
    {
    }

    public function noteIdsForCategory(int $categoriaId): array
    {
        return DB::table('categoria_nota')
            ->where('categoria_id', $categoriaId)
            ->pluck('nota_id')
            ->all();
    }

    public function invalidateForCategory(array $noteIds): void
    {
        DB::afterCommit(function () use ($noteIds) {
            $this->forgetNotes($noteIds);
            $this->incrementListVersion();
            $this->reportService->invalidateTopCategoriesReportCache();
        });
    }

    public function forgetNotes(array $noteIds): void
    {
        if ($noteIds === []) {
            return;
        }

        Cache::deleteMultiple(
            array_map(fn ($id) => self::CACHE_KEY_PREFIX_ID . $id, $noteIds)
        );
    }
}