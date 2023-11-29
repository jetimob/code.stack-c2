<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateGenreRequest;
use App\Http\Resources\GenreDetailedResource;
use App\Http\Resources\GenreResource;
use App\Models\Genre;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Http\Response;

class GenreController extends Controller
{
    public function index(): ResourceCollection
    {
        return GenreResource::collection(
            Genre::with('books')->withCount('books')->orderBy('id')->paginate()
        );
    }

    public function show(Genre $genre): GenreDetailedResource
    {
        $genre->loadCount('books');
        return GenreDetailedResource::make($genre);
    }

    public function store(CreateGenreRequest $request): GenreDetailedResource
    {
        $genre = Genre::create($request->validated());
        return GenreDetailedResource::make($genre);
    }

    public function update(CreateGenreRequest $request, Genre $genre): GenreDetailedResource
    {
        $genre->update($request->validated());
        return GenreDetailedResource::make($genre);
    }

    public function destroy(Genre $genre): Response
    {
        $genre->delete();
        return response()->noContent();
    }

}
