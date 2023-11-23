<?php

use App\Models\Author;
use App\Models\User;

beforeEach(function () {
    $user = User::factory()->create();
    $this->actingAs($user, 'sanctum');
});

uses()->group('authors');

test('should return a list of authors', function () {
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

test('will fail when creating a author with invalid data', function () {
    $response = $this->postJson(route('books.store'), [
        'name' => '',
        'biography' => '',
        'birth_date' => null
    ]);

    $response->assertUnprocessable();
});

test('can show a author correctly', function () {
    $author = Author::factory()->create();
    $creationResponse = $this->getJson(route('authors.show', $author->getKey()));
    $authorData = $creationResponse->json();

    $creationResponse->assertOk();
    expect($authorData['data'])
        ->toMatchArray([
            'id' => $author->getKey(),
            'name' => $author->name,
            'biography' => $author->biography,
            'birth_date' => !null,
            'age' => now()->diffInYears($author->birth_date),
            'book_count' => $author->books_count,
        ]);
});

test('will fail when updating a author with invalid data', function () {
    $author = Author::factory()->create();
    $response = $this->putJson(route('authors.update', $author->getKey()), [
        'name' => '',
        'biography' => '',
        'birth_date' => null
    ]);

    $response->assertUnprocessable();
});

test('can update a author', function () {
    $author = Author::factory()->create();
    $name = fake()->name();
    $biography = fake()->text();
    $birthDate = $author->birth_date->toDateString();

    $response = $this->putJson(route('authors.update', $author->getKey()), [
        'name' => $name,
        'biography' => $biography,
        'birth_date' => $birthDate
    ]);

    $response->assertOk();
});


test('can remove a author', function () {
    $author = Author::factory()->create();
    $response = $this->delete(route('authors.destroy', [$author->getKey(), $author->id]));

    $response->assertNoContent();
});
