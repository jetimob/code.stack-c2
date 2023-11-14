<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBookCoverRequest;
use App\Http\Resources\CoverResource;
use App\Models\Book;
use App\Models\File;
use App\Services\BookService;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Response;

class BookCoverController extends Controller
{
    public function __construct(
        protected readonly BookService $bookService
    )
    {
    }


    public function store(StoreBookCoverRequest $request): JsonResource
    {
        return CoverResource::make();
    }

    public function destroy(Book $book, File $cover): Response
    {
        $this->bookService->deleteCover($book, $cover);
        return response()->noContent();
    }
}
