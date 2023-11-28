<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreGenreRequest;
use App\Http\Resources\GenreResource;
use App\Models\Genre;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Http\Response;

class GenreController extends Controller
{
    public function index(): ResourceCollection
    {
        return GenreResource::collection(
            Genre::withCount('books')
                ->orderBy('name')
                ->paginate()
        );
    }

    public function show(Genre $genre): GenreResource
    {
        $genre->loadCount('books');
        return GenreResource::make($genre);
    }

    public function store(StoreGenreRequest $request): GenreResource
    {
        $genre = Genre::create($request->validated());
        return GenreResource::make($genre);
    }

    public function update(StoreGenreRequest $request, Genre $genre): GenreResource
    {
        $genre->update($request->validated());
        return GenreResource::make($genre);
    }

    public function destroy(Genre $genre): Response
    {
        $genre->delete();
        return response()->noContent();
    }
}
