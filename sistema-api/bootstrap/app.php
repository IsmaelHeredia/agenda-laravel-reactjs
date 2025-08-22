<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Console\Scheduling\Schedule;
use App\Jobs\CleanOrphanedImages;
use App\Jobs\DeleteExpiredNotes;
use App\Exceptions\AuthException;
use App\Exceptions\CategoryException;
use App\Exceptions\NoteException;
use App\Exceptions\ImageException;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Illuminate\Auth\AuthenticationException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->alias([
            'admin' => \App\Http\Middleware\AdminMiddleware::class,
        ]);
        
        $middleware->redirectGuestsTo(function ($request) {
            if ($request->is('api/*')) {
                return null;
            }
            return route('login');
        });
    })
    ->withExceptions(function (Exceptions $exceptions) {
        $exceptions->renderable(function (AuthenticationException $e, $request) {
            if ($request->is('api/*')) {
                return response()->json([
                    'message' => 'Acceso denegado. Se requiere un token de autenticación.',
                ], Response::HTTP_UNAUTHORIZED);
            }
            return false;
        });
        
        $exceptions->renderable(function (AuthException $e, $request) {
            if ($request->is('api/*')) {
                return response()->json([
                    'message' => $e->getMessage(),
                ], $e->getStatusCode());
            }
            return false;
        });

        $exceptions->renderable(function (CategoryException $e, $request) {
            if ($request->is('api/*')) {
                return response()->json([
                    'message' => $e->getMessage(),
                ], $e->getStatusCode());
            }
            return false;
        });

        $exceptions->renderable(function (NoteException $e, $request) {
            if ($request->is('api/*')) {
                return response()->json([
                    'message' => $e->getMessage(),
                ], $e->getStatusCode());
            }
            return false;
        });

        $exceptions->renderable(function (ImageException $e, $request) {
            if ($request->is('api/*')) {
                return response()->json([
                    'message' => $e->getMessage(),
                ], $e->getStatusCode());
            }
            return false;
        });

        $exceptions->renderable(function (ValidationException $e, $request) {
            if ($request->is('api/*')) {
                return response()->json([
                    'message' => 'Los datos proporcionados son inválidos',
                    'errors' => $e->errors()
                ], Response::HTTP_UNPROCESSABLE_ENTITY);
            }
            return false;
        });

        $exceptions->renderable(function (HttpException $e, $request) {
            if ($request->is('api/*')) {
                $message = $e->getMessage() ?: Response::$statusTexts[$e->getStatusCode()] ?? 'Error HTTP';
                return response()->json([
                    'message' => $message,
                ], $e->getStatusCode());
            }
            return false;
        });

        $exceptions->renderable(function (Throwable $e, $request) {
            if ($request->is('api/*')) {
                return response()->json([
                    'message' => config('app.debug') ? $e->getMessage() : 'Ocurrió un error inesperado en el servidor',
                    'trace' => config('app.debug') ? $e->getTraceAsString() : null,
                ], Response::HTTP_INTERNAL_SERVER_ERROR);
            }
            return false;
        });

        $exceptions->reportable(function (Throwable $e) {
            if (!$e instanceof HttpException && !$e instanceof ValidationException && !$e instanceof AuthenticationException && !$e instanceof AuthException && !$e instanceof CategoryException && !$e instanceof NoteException && !$e instanceof ImageException) {
                \Log::error("Unhandled exception: " . $e->getMessage(), [
                    'exception' => $e,
                    'file' => $e->getFile(),
                    'line' => $e->getLine(),
                    'request_url' => request()->fullUrl(),
                ]);
            }
        });
    })
    ->withSchedule(function (Schedule $schedule) {
        $schedule->job(new CleanOrphanedImages())->everyFiveMinutes();
        $schedule->job(new DeleteExpiredNotes())->everyFiveMinutes();
    })->create();
