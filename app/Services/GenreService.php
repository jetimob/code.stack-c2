<?php

namespace App\Services;

use App\Models\Genre;

class GenreService
{
    public function getAllGenres()
    {
        // Logic to retrieve all genres
        return Genre::withCount('books')->paginate();
    }

    public function createGenre(array $data): Genre
    {
        // Logic to create a new genre
        return Genre::create($data);
    }

    public function updateGenre(Genre $genre, array $data): Genre
    {
        // Logic to update a genre
        $genre->update($data);
        return $genre;
    }

    public function deleteGenre(Genre $genre)
    {
        // Logic to delete a genre
        $genre->delete();
    }
}
