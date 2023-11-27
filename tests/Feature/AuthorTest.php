<?php
use Carbon\Carbon;

use App\Models\Author;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;

uses(WithFaker::class, RefreshDatabase::class)->group('authors.index');

function getLastAuthor(): Author
{
    return Author::query()->latest()->first();
}

test('should return a list of paginated authors', function () {
    $concreteAuthor = Author::factory()->create();
    $response = $this->getJson(route('authors.index'));
    $paginatedResponse = $response->json();

    expect($paginatedResponse)
        ->toBePaginated()
        ->and($paginatedResponse['data'])
        ->toHaveCount(1)
        ->sequence(
            fn(\Pest\Expectation $author) => $author
                ->toMatchArray([
                    'id' => $concreteAuthor->getKey(),
                    'name' => $concreteAuthor->name,
                ]),
        );
});

test('can create a author', function () {
    $arrData = [
        'name' => fake()->word,
        'biography' => fake()->sentence,
        'birth_date' => fake()->date
    ];

    $response = $this->postJson(route('authors.store'), $arrData);
    $author = getLastAuthor();

    $response->assertCreated();
    $expectedAuthor = Author::factory()->make($arrData)->toArray();
    expect($author)->toMatchArray($expectedAuthor);
});

test('can update a author', function () {
    $author = Author::factory()->create();
    $arrData = [
        'name' => fake()->word,
        'biography' => fake()->sentence,
        'birth_date' => fake()->date('Y-m-d')
    ];

    $response = $this->putJson(route('authors.update', $author->getKey()), $arrData);
    $response->assertOk();

    $updatedAuthor = $author->fresh();

    $response->assertOk();
    $expectedData['birth_date'] = Carbon::parse($arrData['birth_date'])->format('Y-m-d\TH:i:s.u\Z');
    expect($updatedAuthor->toArray())->toMatchArray($expectedData)->and($updatedAuthor->id)->toBe($author->getKey());
});

test('will fail when creating a author with invalid data', function () {
    $response = $this->postJson(route('authors.store'), [
        'name' => '',
    ]);

    $response->assertUnprocessable();
});

test('can show a author correctly', function () {
    $author = Author::factory()->create();
    $response = $this->getJson(route('authors.show', $author->getKey()));
    $authorData = $response->json();

    $response->assertOk();
    expect($authorData['data'])
        ->toMatchArray([
            'id' => $author->getKey(),
            'name' => $author->name,
        ]);
});

test('will fail when updating a author with invalid data', function () {
    $author = Author::factory()->create();
    $response = $this->putJson(route('authors.update', $author->getKey()), [
        'name' => '',
    ]);

    $response->assertUnprocessable();
});

test('can delete a author', function () {
    $author = Author::factory()->create();

    $response = $this->delete(route('authors.destroy', $author->getKey()));

    $response->assertNoContent();
    $this->assertDatabaseMissing('authors', ['id' => $author->id]);
});
