<?php

namespace App\Repositories\Concerns;

use App\Models\CacheVersion;
use Illuminate\Support\Facades\Cache;

trait HasListVersion
{
    private function usesRedis(): bool
    {
        return config('cache.default') === 'redis';
    }

    private function getCurrentListVersion(): string
    {
        $key = static::CACHE_VERSION_KEY;

        if ($this->usesRedis()) {
            if (!Cache::has($key)) {
                Cache::forever($key, now()->timestamp);
            }
            return (string) Cache::get($key);
        }

        $entry = CacheVersion::firstOrCreate(
            ['key' => $key],
            ['version' => now()->timestamp]
        );

        return (string) $entry->version;
    }

    private function incrementListVersion(): void
    {
        $key = static::CACHE_VERSION_KEY;

        if ($this->usesRedis()) {
            if (!Cache::has($key)) {
                Cache::forever($key, now()->timestamp);
            }
            Cache::increment($key);
            return;
        }

        $entry = CacheVersion::firstOrCreate(
            ['key' => $key],
            ['version' => now()->timestamp]
        );

        $entry->update([
            'version' => max(now()->timestamp, (int) $entry->version + 1)
        ]);
    }
}