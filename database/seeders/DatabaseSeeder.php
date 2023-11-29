<?php

namespace Database\Seeders;

use App\Models\Loan;
use App\Models\People;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Author;
use App\Models\Book;
use App\Models\Publisher;
use App\Models\Genre;
use App\Models\User;
use DB;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        DB::transaction(function () {
            User::factory(10)->create();

            User::factory()->create([
                'name' => 'Test User',
                'email' => 'test@example.com',
                'password' => bcrypt('password'),
            ]);

            $peoples = People::factory(10)->create();
            $genres = Genre::factory(10)->create();
            $authors = Author::factory(20)->create();
            $publishers = Publisher::factory(10)->create();

            $books = Book::factory(200)
                ->recycle($genres)
                ->recycle($authors)
                ->recycle($publishers)
                ->create();

            Loan::factory(20)
                ->recycle($books)
                ->recycle($peoples)
                ->create();
        });
    }
}
