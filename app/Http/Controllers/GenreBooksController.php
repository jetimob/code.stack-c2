<?php

namespace App\Http\Controllers;

use App\Http\Resources\BookResource;
use App\Models\Genre;
use Illuminate\Http\Resources\Json\ResourceCollection;

class GenreBooksController extends Controller
{
    public function index(Genre $genre): ResourceCollection
    {
        return BookResource::collection(
            $genre->books()
                ->orderBy('id')
                ->paginate()
        );
    }
}
