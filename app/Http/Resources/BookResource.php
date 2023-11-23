<?php

namespace App\Http\Resources;

use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin Book
 */
class BookResource extends JsonResource
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
            'rating' => $this->rating,
            'author' => AuthorResource::make($this->author),
            'genre' => GenreResource::make($this->genre),
            'publisher' => PublisherResource::make($this->publisher),
            'cover' => CoverResource::make($this->cover),
        ];
    }
}
