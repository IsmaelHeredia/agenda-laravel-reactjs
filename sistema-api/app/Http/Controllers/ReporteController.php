<?php

namespace App\Http\Controllers;

use App\Interfaces\ReportServiceInterface;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\JsonResponse;

class ReporteController extends Controller
{
    protected $reportService;

    public function __construct(ReportServiceInterface $reportService)
    {
        $this->reportService = $reportService;
    }

    public function generarReporte(): JsonResponse
    {
        $datos = $this->reportService->getTopCategoriesReport();

        return response()->json([
            'message' => 'Se enviaron los datos para el gráfico',
            'data' => $datos
        ], Response::HTTP_OK);
    }
}