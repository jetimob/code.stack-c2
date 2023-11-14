<?php

namespace Database\Factories;

use App\Models\Author;
use App\Models\Book;
use App\Models\File;
use App\Models\Genre;
use App\Services\FileService;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Book>
 */
class BookFactory extends Factory
{
    protected $model = Book::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => $this->faker->text(50),
            'description' => $this->faker->realText(),
            'rating' => $this->faker->numberBetween(1, 5),
            'isbn' => $this->faker->isbn13(),
            'author_id' => Author::factory(),
            'genre_id' => Genre::factory(),
            'cover_id' => File::factory(),
        ];
    }
}
