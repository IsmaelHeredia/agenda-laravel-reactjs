<?php

namespace App\Interfaces;

use Illuminate\Support\Collection;

interface ReportServiceInterface
{
    public function getTopCategoriesReport(): Collection;
    public function invalidateTopCategoriesReportCache(): void;
}