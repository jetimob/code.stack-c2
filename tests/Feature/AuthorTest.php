<?php

use App\Models\Author;
use App\Models\User;

uses()->group('authors');

test('successfully create an author', function () {
    $user = User::factory()->create();
    $authorData = [
        'name' => fake()->name(),
        'biography' => fake()->text(),
        'birth_date' => fake()->date('Y-m-d', 'now'),
    ];

    $this->actingAs($user, 'sanctum')->postJson(route('authors.store'), $authorData)->assertCreated();
    $createdAuthor = Author::latest()->first();

    expect($createdAuthor->name)->toBe($authorData['name']);
    expect($createdAuthor->biography)->toBe($authorData['biography']);
    expect($createdAuthor->birth_date->format('Y-m-d'))->toBe($authorData['birth_date']);
});

test('successfully update an author', function () {
    $user = User::factory()->create();
    $createAuthorData = [
        'name' => fake()->name(),
        'biography' => fake()->text(),
        'birth_date' => fake()->date('Y-m-d', 'now'),
    ];

    $this->actingAs($user, 'sanctum')->postJson(route('authors.store'), $createAuthorData)->assertCreated();
    $createdAuthor = Author::latest()->first();

    $updateAuthorData = [
        'name' => fake()->name(),
        'biography' => fake()->text(),
        'birth_date' => fake()->dateTimeBetween('-30 years', '-1 day')->format('Y-m-d'),
    ];

    $this->actingAs($user, 'sanctum')->putJson(route('authors.update', $createdAuthor->id), $updateAuthorData)->assertOk();
    $createdAuthor->refresh();

    expect($createdAuthor->name)->toBe($updateAuthorData['name']);
    expect($createdAuthor->biography)->toBe($updateAuthorData['biography']);
    expect($createdAuthor->birth_date->format('Y-m-d'))->toBe($updateAuthorData['birth_date']);
});

test('fail to update an author with invalid data', function () {
    $user = User::factory()->create();
    $author = Author::factory()->create();

    $invalidData = [
        'name' => '', 
        'biography' => null, 
        'birth_date' => '2099-01-01', 
    ];

    $response = $this->actingAs($user, 'sanctum')->putJson(route('authors.update', $author->id), $invalidData);
    
    $response->assertStatus(422);
    $response->assertJsonValidationErrors(['name', 'biography', 'birth_date']);
});


test('successfully delete an author', function () {
    $user = User::factory()->create();
    $author = Author::factory()->create();

    $response = $this->actingAs($user, 'sanctum')->deleteJson(route('authors.destroy', $author->id));

    $response->assertNoContent();

    $this->assertDatabaseMissing('authors', ['id' => $author->id]);
});

test('show all authors for authenticated users', function () {
    Author::factory()->count(3)->create(); 
    $user = User::factory()->create();

    $response = $this->actingAs($user, 'sanctum')->getJson(route('authors.index'));
    $response->assertOk();
    $response->assertJsonCount(3, 'data');
});

test('show all authors for unauthenticated users', function () {
    Author::factory()->count(3)->create(); 

    $response = $this->getJson(route('authors.index'));
    $response->assertOk();
    $response->assertJsonCount(3, 'data');
});

test('show a specific author for authenticated users', function () {
    $author = Author::factory()->create();
    $user = User::factory()->create();

    $response = $this->actingAs($user, 'sanctum')->getJson(route('authors.show', $author->id));
    $response->assertOk();
    $response->assertJson([
        'data' => [
            'id' => $author->id,
            'name' => $author->name,
            
        ]
    ]);
});

test('show a specific author for unauthenticated users', function () {
    $author = Author::factory()->create();

    $response = $this->getJson(route('authors.show', $author->id));
    $response->assertOk();
    $response->assertJson([
        'data' => [
            'id' => $author->id,
            'name' => $author->name,
            
        ]
    ]);
});
