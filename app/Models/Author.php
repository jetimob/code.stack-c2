<?php

namespace App\Models;

use Database\Factories\AuthorFactory;
use Eloquent;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Carbon;

/**
 * \App\Models\Author
 *
 * @property int $id
 * @property string $name
 * @property string $biography
 * @property string $normalized_name
 * @property string $last_name
 * @property Carbon $birth_date
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property-read Collection<int, Book> $books
 * @property-read int|null $books_count
 * @property-read int $age
 * @method static \Database\Factories\AuthorFactory factory($count = null, $state = [])
 * @method static Builder|Author lastName(string $lastName)
 * @method static Builder|Author newModelQuery()
 * @method static Builder|Author newQuery()
 * @method static Builder|Author query()
 * @method static Builder|Author search(?string $search)
 * @method static Builder|Author whereBiography($value)
 * @method static Builder|Author whereBirthDate($value)
 * @method static Builder|Author whereCreatedAt($value)
 * @method static Builder|Author whereId($value)
 * @method static Builder|Author whereLastName($value)
 * @method static Builder|Author whereName($value)
 * @method static Builder|Author whereNormalizedName($value)
 * @method static Builder|Author whereUpdatedAt($value)
 * @mixin Eloquent
 */
class Author extends Model
{
    protected $fillable = [
        'name',
        'biography',
        'birth_date',
    ];

    protected $casts = [
        'birth_date' => 'date',
    ];

    public function books(): HasMany
    {
        return $this->hasMany(Book::class);
    }

    public function getAgeAttribute(): int
    {
        return now()->diffInYears($this->birth_date);
    }

    public function scopeSearch(Builder $query, ?string $search): Builder
    {
        if (blank($search) || strlen($search) < 3) {
            return $query;
        }

        $search = mb_strtoupper($search);
        return $query->where('normalized_name', 'like', "%{$search}%");
    }

    public function scopeLastName(Builder $query, string $lastName): Builder
    {
        return $query->where('last_name', $lastName);
    }

    protected static function newFactory(): AuthorFactory
    {
        return AuthorFactory::new();
    }
}
