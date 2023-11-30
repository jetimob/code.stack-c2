<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateGenreRequest;
use App\Http\Resources\GenreResource;
use App\Models\Genre;
use App\Services\GenreService;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Response;

class GenreController extends Controller
{
    protected $genreService;

    public function __construct(GenreService $genreService)
    {
        $this->genreService = $genreService;
    }

    public function index(): JsonResource
    {
        $genres = $this->genreService->getAllGenres();
        return GenreResource::collection($genres);
    }

    public function store(CreateGenreRequest $request): JsonResource
    {
        $genre = $this->genreService->createGenre($request->validated());
        return new GenreResource($genre);
    }

    public function show(Genre $genre): JsonResource
    {
        return new GenreResource($genre);
    }

    public function update(CreateGenreRequest $request, Genre $genre): JsonResource
    {
        $updatedGenre = $this->genreService->updateGenre($genre, $request->validated());
        return new GenreResource($updatedGenre);
    }

    public function destroy(Genre $genre): Response
    {
        $this->genreService->deleteGenre($genre);
        return response()->noContent();
    }
}
