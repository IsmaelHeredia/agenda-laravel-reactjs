<?php

namespace App\Services;

use App\Interfaces\ReportServiceInterface;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Cache;

class ReportService implements ReportServiceInterface
{
    protected const CACHE_KEY_TOP_CATEGORIES_REPORT = 'reports.top_categories';
    protected const CACHE_TTL_REPORT = 60 * 60 * 24;

    public function getTopCategoriesReport(): Collection
    {
        return Cache::remember(self::CACHE_KEY_TOP_CATEGORIES_REPORT, self::CACHE_TTL_REPORT, function () {
            $datos = DB::table('categoria_nota')
                ->join('categorias', 'categoria_nota.categoria_id', '=', 'categorias.id')
                ->join('notas', 'categoria_nota.nota_id', '=', 'notas.id')
                ->select(DB::raw('count(categoria_nota.categoria_id) as cantidad, categorias.nombre as nombre_categoria'))
                ->groupBy('categorias.nombre')
                ->orderBy('cantidad', 'DESC')
                ->take(3)
                ->get();
            return $datos;
        });
    }

    public function invalidateTopCategoriesReportCache(): void
    {
        Cache::forget(self::CACHE_KEY_TOP_CATEGORIES_REPORT);
    }
}