<?php

namespace App\Models;
use Database\Factories\PublisherFactory;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Publisher extends Model
{

    public $fillable = [
            'name',
            'normalized_name'
    ];
    public function books(): HasMany
    {
        return $this->hasMany(Book::class);
    }
    public function scopeSearch(Builder $query, string $search): Builder
    {
        return $query->where('name', 'like', "%{$search}%");
    }
    protected static function factory(): PublisherFactory
    {
        return PublisherFactory::new();
    }
}