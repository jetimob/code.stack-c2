<?php

namespace App\Http\Resources;

use App\Models\Loan;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin Loan
 */
class LoanDetailedResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'status' => $this->status,
            'return_date' => $this->return_date,
            'book' => [
                'id' => $this->book->id,
                'title' => $this->book->title,
            ],
            'people' => PeopleResource::make($this->people),
            'created_at' => $this->created_at->format('F j, Y')
        ];
    }
}
