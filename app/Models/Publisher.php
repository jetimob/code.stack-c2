<?php

namespace App\Models;

use Database\Factories\PublisherFactory;
use Eloquent;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Carbon;

/**
 * \App\Models\Publisher
 *
 * @property int $id
 * @property string $name
 * @property string $normalized_name
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property-read Collection<int, Book> $books
 * @property-read int|null $books_count
 * @method static Builder|Publisher newModelQuery()
 * @method static Builder|Publisher newQuery()
 * @method static Builder|Publisher query()
 * @method static Builder|Publisher whereCreatedAt($value)
 * @method static Builder|Publisher whereId($value)
 * @method static Builder|Publisher whereName($value)
 * @method static Builder|Publisher whereNormalizedName($value)
 * @method static Builder|Publisher whereUpdatedAt($value)
 * @mixin Eloquent
 */
class Publisher extends Model
{
    protected $fillable = [
        'name',
    ];

    public function books(): HasMany
    {
        return $this->hasMany(Book::class);
    }

    public function scopeSearch(Builder $query, string $search): Builder
    {
        return $query->where('name', 'like', "%{$search}%");
    }

    protected static function newFactory(): PublisherFactory
    {
        return PublisherFactory::new();
    }
}
