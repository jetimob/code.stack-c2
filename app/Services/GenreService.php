<?php

namespace app\Services;

use app\Models\Genre;
use App\Http\Requests\StoreGenreRequest;

Class GenreService
{

    public function upsertGenre(StoreGenreRequest $request, ?Genre $genre = null): Genre
    {
        return \DB::transaction(function () use ($request, $genre) {
            if ($genre === null) {
                return $this->createGenre($request);
            }

            return $this->updateGenre($request, $genre);
        });
    }
 
    private function createGenre(StoreGenreRequest $request): Genre
    {
        return Genre::create($request->validated());
    }

    private function updateGenre(StoreGenreRequest $request, Genre $genre): genre
    {
        $genre->update($request->validated());
        return $genre;
    }

    public function deleteGenre(Genre $genre): void
    {
        \DB::transaction(function () use ($genre) { 

            $genre->delete();

        });
    }

    

}