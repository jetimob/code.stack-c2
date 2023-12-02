<?php

namespace App\Services;

use App\Http\Requests\StoreBookCoverRequest;
use App\Http\Requests\StoreBookRequest;
use App\Models\Book;
use App\Models\File;

class BookService
{
    public function __construct(
        private readonly FileService $fileService
    )
    {
    }

    public function upsertBook(StoreBookRequest $request, ?Book $book = null): Book
    {
        return \DB::transaction(function () use ($request, $book) {
            if ($book === null) {
                return $this->createBook($request);
            }

            return $this->updateBook($request, $book);
        });
    }

    public function attachCover(StoreBookCoverRequest $request, Book $book): Book
    {
        if (
            $request->getUploadedImage() !== null
           && !$this->fileService->isSameFile($book->cover, $request->getUploadedImage())
        ) {
            $this->fileService->delete($book->cover);
           $file = $this->fileService->store($request->getUploadedImage());
          $book->cover()->associate($file);
       } else
        return \DB::transaction(function () use ($request, $book) {
            if ($request->getUploadedImage() === null) {
                return $book;
            }

            $file = $this->fileService->store($request->getUploadedImage());
            $book->cover()->associate($file);
            $book->save();
            return $book;
        });
    }

    private function updateBook(StoreBookRequest $request, Book $book): Book
    {
        if (
            $request->get('cover_id') === null
            && $book->cover_id !== null
        ) {
            $this->fileService->delete($book->cover);
            $book->cover()->dissociate();
            $book->save();
        }

        $book->update($request->validated());
        return $book;
    }


    private function createBook(StoreBookRequest $request): Book
    {
        return Book::create(
            $request->validated(),
        );
    }

    public function deleteCover(Book $book, File $file): void
    {
        $book->cover()->dissociate();
        $book->save();
        $this->fileService->delete($file);
    }

    public function deleteBook(Book $book): void
    {
        \DB::transaction(function () use ($book) {
            if ($book->cover !== null) {
                $this->fileService->delete($book->cover);
            }

            $book->delete();
        });
    }
}
