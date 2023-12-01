<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreGenreRequest;
use App\Http\Resources\GenreResource;
use App\Models\Genre;
use App\Services\GenreService;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Http\Response;

class GenreController extends Controller
{
    public function __construct(
        protected readonly GenreService $genreService
    )
    {
    }

    public function index(): ResourceCollection
    {
        return GenreResource::collection(
            Genre::withCount('books')->orderBy('id')->paginate()
        );
    }

    public function show(Genre $genre): JsonResource
    {
        return GenreResource::make($genre);
    }

    public function store(StoreGenreRequest $request, Genre $genre)
    {
        return GenreResource::make(
            $this->genreService->upsertGenre($request)
        );

    }

    public function update(StoreGenreRequest $request, Genre $genre): JsonResource
    {
        return GenreResource::make(
            $this->genreService->upsertGenre($request, $genre)
        );
    }

    public function destroy(Genre $genre): Response
    {
        $this->genreService->deleteGenre($genre);
        return response()->noContent();
    }
    
}
