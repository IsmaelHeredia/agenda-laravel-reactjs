<?php

namespace App\Providers;

use App\Interfaces\CategoryRepositoryInterface;
use App\Interfaces\ImageRepositoryInterface;
use App\Interfaces\NoteRepositoryInterface;
use App\Interfaces\ReportServiceInterface;
use App\Interfaces\UserRepositoryInterface;
use App\Models\Categoria;
use App\Observers\CategoriaObserver;
use App\Repositories\CategoryRepository;
use App\Repositories\ImageRepository;
use App\Repositories\NoteRepository;
use App\Repositories\UserRepository;
use App\Services\ReportService;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->bind(UserRepositoryInterface::class, UserRepository::class);
        $this->app->bind(CategoryRepositoryInterface::class, CategoryRepository::class);
        $this->app->bind(NoteRepositoryInterface::class, NoteRepository::class);
        $this->app->bind(ReportServiceInterface::class, ReportService::class);
        $this->app->bind(ImageRepositoryInterface::class, ImageRepository::class);
    }

    public function boot(): void
    {
        Categoria::observe(CategoriaObserver::class);
    }
}