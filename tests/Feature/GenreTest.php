<?php

use App\Models\Genre;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class)->group('genres.index');

function getLastGenre(): Genre
{
    return Genre::query()->latest()->first();
}

expect()->extend('toBeGenre', function (Genre $expectedGenre) {
    return $this->toMatchArray([
        'id' => $expectedGenre->getKey(),
        'name' => $expectedGenre->name,
        'created_at' => $expectedGenre->created_at ? $expectedGenre->created_at->toISOString() : null,
        'updated_at' => $expectedGenre->updated_at ? $expectedGenre->updated_at->toISOString() : null,
    ]);
});

test('should return a list of paginated genres', function () {
    $concreteGenre = Genre::factory()->create();
    $response = $this->getJson(route('genres.index'));
    $paginatedResponse = $response->json();

    expect($paginatedResponse)
        ->toBePaginated()
        ->and($paginatedResponse['data'])
        ->toHaveCount(1)
        ->sequence(
            fn(\Pest\Expectation $genre) => $genre
                ->toMatchArray([
                    'id' => $concreteGenre->getKey(),
                    'name' => $concreteGenre->name,
                ]),
        );
});

test('can create a genre', function () {
    $genreName = fake()->word;
    $arrData = [
        'name' => $genreName,
    ];

    $response = $this->postJson(route('genres.store'), $arrData);
    $genre = getLastGenre();

    $response->assertCreated();
    expect($genre)->toBeGenre($genre);
});

test('will fail when creating a genre with invalid data', function () {
    $response = $this->postJson(route('genres.store'), [
        'name' => '',
    ]);

    $response->assertUnprocessable();
});

test('can show a genre correctly', function () {
    $genre = Genre::factory()->create();
    $response = $this->getJson(route('genres.show', $genre->getKey()));
    $genreData = $response->json();

    $response->assertOk();
    expect($genreData['data'])
        ->toMatchArray([
            'id' => $genre->getKey(),
            'name' => $genre->name,
        ]);
});

test('will fail when updating a genre with invalid data', function () {
    $genre = Genre::factory()->create();
    $response = $this->putJson(route('genres.update', $genre->getKey()), [
        'name' => '',
    ]);

    $response->assertUnprocessable();
});

test('can update a genre', function () {
    $genre = Genre::factory()->create();
    $genreName = fake()->word;
    $arrData = [
        'name' => $genreName,
    ];

    $response = $this->putJson(route('genres.update', $genre->getKey()), $arrData);
    $response->assertOk();

    $updatedGenre = $genre->fresh();

    $response->assertOk();
    expect($updatedGenre)->toMatchArray($arrData)
        ->and($updatedGenre->id)->toBe($genre->getKey());
});

test('can delete a genre', function () {
    $genre = Genre::factory()->create();

    $response = $this->delete(route('genres.destroy', $genre->getKey()));

    $response->assertNoContent();
    $this->assertDatabaseMissing('genres', ['id' => $genre->id]);
});
