<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Author;
use App\Models\Book;
use App\Models\Genre;
use App\Models\Publisher;
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
            $publishers = Publisher::factory(10)->create();
            $genres = Genre::factory(10)->create();
            $authors = Author::factory(20)->create();


            Book::factory(40)
                ->recycle($genres)
                ->recycle($authors)
                ->recycle($publishers)
                ->create();
        });
    }
}