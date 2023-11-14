<?php

namespace App\Http\Controllers;

use App\Http\Resources\BookResource;
use App\Models\Author;
use Illuminate\Http\Resources\Json\ResourceCollection;

class AuthorBooksController extends Controller
{
    public function index(Author $author): ResourceCollection
    {
        return BookResource::collection(
            $author->books()
                ->orderBy('id')
                ->paginate()
        );
    }
}
