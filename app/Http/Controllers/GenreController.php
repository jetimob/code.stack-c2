<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateGenreRequest;
use App\Http\Resources\GenreResource;
use App\Models\Genre;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Http\Response;

class GenreController extends Controller
{
    public function index(): ResourceCollection
    {
        return GenreResource::collection(
            Genre::withCount('books')->paginate()
        );
    }
}
