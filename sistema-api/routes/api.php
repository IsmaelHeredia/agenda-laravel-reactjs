<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\HomeController;
use App\Http\Controllers\IngresoController;
use App\Http\Controllers\CuentaController;
use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\NotaController;
use App\Http\Controllers\ImagenController;
use App\Http\Controllers\ReporteController;

use App\Http\Middleware\ValidarIngreso;

Route::post('/ingreso', [IngresoController::class, 'ingreso'])->name('ingreso');
Route::post('/validar', [IngresoController::class, 'validar'])->name('validar');

Route::middleware([ValidarIngreso::class])->group(function () {
    
    Route::post('/datosCompletos', [HomeController::class, 'listarDatosCompletos'])->name('listarDatosCompletos');

    Route::get('/categorias', [CategoriaController::class, 'listarTodo'])->name('listarCategoriasCompletas');
    Route::post('/categorias/pagina/{pagina}', [CategoriaController::class, 'listar'])->name('listarCategorias');
    Route::get('/categorias/{id}', [CategoriaController::class, 'cargar'])->name('cargarCategoria');
    Route::post('/categorias', [CategoriaController::class, 'crear'])->name('crearCategoria');
    Route::put('/categorias/{id}', [CategoriaController::class, 'actualizar'])->name('actualizarCategoria');
    Route::delete('/categorias/{id}', [CategoriaController::class, 'borrar'])->name('borrarCategoria');

    Route::post('/notas/pagina/{pagina}', [NotaController::class, 'listar'])->name('listarNotas');
    Route::get('/notas/{id}', [NotaController::class, 'cargar'])->name('cargarNota');
    Route::post('/notas', [NotaController::class, 'crear'])->name('crearNota');
    Route::put('/notas/{id}', [NotaController::class, 'actualizar'])->name('actualizarNota');
    Route::delete('/notas/{id}', [NotaController::class, 'borrar'])->name('borrarNota');

    Route::post('imagenes', [ImagenController::class, 'listar'])->name('listarImagenes');
    Route::get('/imagenes/{id}', [ImagenController::class, 'cargar'])->name('cargarImagen');
    Route::post('/imagenes', [ImagenController::class, 'crear'])->name('crearImagen');
    Route::put('/imagenes/{id}', [ImagenController::class, 'actualizar'])->name('actualizarImagen');
    Route::delete('/imagenes/{id}', [ImagenController::class, 'borrar'])->name('borrarImagen');

    Route::get('/reportes', [ReporteController::class, 'generarReporte'])->name('generarReporte');

    Route::post('/cuenta', [CuentaController::class, 'actualizarDatos'])->name('actualizarDatos');
});
