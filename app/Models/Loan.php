<?php

namespace App\Models;

use Database\Factories\LoanFactory;
use Eloquent;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

/**
 * \App\Models\Loan
 *
 * @property int $id
 * @property string $status
 * @property string $return_date
 * @property int $book_id
 * @property int $people_id
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property-read Book|null $book
 * @property-read People|null $people
 * @method static LoanFactory factory($count = null, $state = [])
 * @method static Builder|Loan newModelQuery()
 * @method static Builder|Loan newQuery()
 * @method static Builder|Loan query()
 * @method static Builder|Loan whereBookId($value)
 * @method static Builder|Loan wherePeopleId($value)
 * @method static Builder|Loan whereCreatedAt($value)
 * @method static Builder|Loan whereId($value)
 * @method static Builder|Loan whereStatus($value)
 * @mixin Eloquent
 */
class Loan extends Model
{
    protected $table = "loans";

    protected $fillable = [
        'book_id',
        'people_id',
        'status',
        'return_date',
    ];

    public function book(): BelongsTo
    {
        return $this->belongsTo(Book::class);
    }

    public function people(): BelongsTo
    {
        return $this->belongsTo(People::class);
    }

    protected static function newFactory(): LoanFactory
    {
        return LoanFactory::new();
    }
}
