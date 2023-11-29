<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBookRequest;
use App\Http\Resources\BookDetailedResource;
use App\Http\Resources\BookResource;
use App\Models\Book;
use App\Services\BookService;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Response;

class BookController extends Controller
{
    public function __construct(
        protected readonly BookService $bookService
    )
    {
    }

    public function index(Request $request)
    {
        $orderBy = $request->query('orderBy', 'id');
        $query = Book::query();

        if ($orderBy === 'rating') {
            $query->orderByDesc($orderBy);
        } else {
            $query->orderBy($orderBy);
        }

        return BookResource::collection($query->paginate());
    }

    public function show(Book $book): JsonResource
    {
        return BookDetailedResource::make($book);
    }

    public function store(StoreBookRequest $request): JsonResource
    {
        return BookDetailedResource::make(
            $this->bookService->upsertBook($request)
        );
    }

    public function update(StoreBookRequest $request, Book $book): JsonResource
    {
        return BookDetailedResource::make(
            $this->bookService->upsertBook($request, $book)
        );
    }

    public function destroy(Book $book): Response
    {
        $this->bookService->deleteBook($book);
        return response()->noContent();
    }
}
