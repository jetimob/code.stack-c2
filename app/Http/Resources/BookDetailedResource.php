<?php

namespace App\Http\Resources;

use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin Book
 */
class BookDetailedResource extends JsonResource
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
            'title' => $this->title,
            'description' => $this->description,
            'rating' => $this->rating,
            'isbn' => $this->isbn,
            'genre' => GenreResource::make($this->genre),
            'author' => AuthorResource::make($this->author),
            'cover' => CoverResource::make($this->cover),
            'publisher' => PublisherResource::make($this->publisher),
            'created_at' => $this->created_at->format('F j, Y')
        ];
    }
}
