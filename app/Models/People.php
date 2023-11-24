<?php

namespace App\Models;

use Database\Factories\PeopleFactory;
use Eloquent;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Carbon;

/**
 * \App\Models\People
 *
 * @property int $id
 * @property string $name
 * @property string $normalized_name
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property-read Collection<int, Loan> $loans
 * @property-read int|null $loans_count
 * @method static Builder|People newModelQuery()
 * @method static Builder|People newQuery()
 * @method static Builder|People query()
 * @method static Builder|People whereCreatedAt($value)
 * @method static Builder|People whereId($value)
 * @method static Builder|People whereName($value)
 * @method static Builder|People whereNormalizedName($value)
 * @method static Builder|People whereUpdatedAt($value)
 * @mixin Eloquent
 */
class People extends Model
{
    protected $table = 'peoples';

    protected $fillable = [
        'name',
    ];

    public function loans(): HasMany
    {
        return $this->hasMany(Loan::class);
    }

    public function scopeSearch(Builder $query, string $search): Builder
    {
        return $query->where('name', 'like', "%{$search}%");
    }

    protected static function newFactory(): PeopleFactory
    {
        return PeopleFactory::new();
    }
}
