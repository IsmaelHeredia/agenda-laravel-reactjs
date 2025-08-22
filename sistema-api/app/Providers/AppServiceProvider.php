<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

use App\Interfaces\UserRepositoryInterface;
use App\Repositories\UserRepository;
use App\Interfaces\CategoryRepositoryInterface;
use App\Repositories\CategoryRepository;
use App\Interfaces\NoteRepositoryInterface;
use App\Repositories\NoteRepository;
use App\Interfaces\ReportServiceInterface;
use App\Services\ReportService;
use App\Interfaces\ImageRepositoryInterface;
use App\Repositories\ImageRepository;

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
        //
    }
}
