<?php

namespace App\Models;

use Database\Factories\BookFactory;
use Eloquent;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

/**
 * \App\Models\Book
 *
 * @property int $id
 * @property string $title
 * @property string $description
 * @property string $image
 * @property int $rating
 * @property string $isbn
 * @property int $author_id
 * @property int $genre_id
 * @property int|null $cover_id
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property-read Author|null $author
 * @property-read File|null $cover
 * @property-read Genre|null $genre
 * @method static BookFactory factory($count = null, $state = [])
 * @method static Builder|Book newModelQuery()
 * @method static Builder|Book newQuery()
 * @method static Builder|Book query()
 * @method static Builder|Book whereAuthorId($value)
 * @method static Builder|Book whereCoverId($value)
 * @method static Builder|Book whereCreatedAt($value)
 * @method static Builder|Book whereDescription($value)
 * @method static Builder|Book whereGenreId($value)
 * @method static Builder|Book whereId($value)
 * @method static Builder|Book whereImage($value)
 * @method static Builder|Book whereIsbn($value)
 * @method static Builder|Book whereRating($value)
 * @method static Builder|Book whereTitle($value)
 * @method static Builder|Book whereUpdatedAt($value)
 * @mixin Eloquent
 */
class Book extends Model
{
    protected $fillable = [
        'title',
        'description',
        'rating',
        'isbn',
        'author_id',
        'genre_id',
        'cover_id',
        'publisher_id',
    ];

    protected $casts = [
        'rating' => 'integer',
    ];

    public function author(): BelongsTo
    {
        return $this->belongsTo(Author::class);
    }

    public function genre(): BelongsTo
    {
        return $this->belongsTo(Genre::class);
    }
    public function publisher():BelongsTo
    {
        return $this->belongsTo(Publisher::class);
    }

    public function cover(): BelongsTo
    {
        return $this->belongsTo(File::class, 'cover_id');
    }

    protected static function newFactory(): BookFactory
    {
        return BookFactory::new();
    }
}
