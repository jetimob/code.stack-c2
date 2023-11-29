<?php

use App\Models\Publisher;
use App\Models\User;

beforeEach(function () {
    $user = User::factory()->create();
    $this->actingAs($user, 'sanctum');
});

uses()->group('publishers');

test('should return a list of publishers', function () {
    $concretePublisher = Publisher::factory()->create();
    $response = $this->getJson(route('publishers.index'));
    $paginatedResponse = $response->json();

    expect($paginatedResponse)
        ->toBePaginated()
        ->and($paginatedResponse['data'])
        ->toHaveCount(1)
        ->sequence(
            fn(\Pest\Expectation $publisher) => $publisher
                ->toMatchArray([
                    'id' => $concretePublisher->getKey(),
                    'name' => $concretePublisher->name,
                ]),
        );

});

test('will fail when creating a publisher with invalid data', function () {
    $response = $this->postJson(route('books.store'), [
        'name' => '',
    ]);

    $response->assertUnprocessable();
});

test('can show a publisher correctly', function () {
    $publisher = Publisher::factory()->create();
    $creationResponse = $this->getJson(route('publishers.show', $publisher->getKey()));
    $publisherData = $creationResponse->json();
    
    $creationResponse->assertOk();
    expect($publisherData['data'])
        ->toMatchArray([
            'id' => $publisher->getKey(),
            'name' => $publisher->name,
        ]);
});

test('will fail when updating a publisher with invalid data', function () {
    $publisher = Publisher::factory()->create();
    $response = $this->putJson(route('publishers.update', $publisher->getKey()), [
        'name' => '',
    ]);

    $response->assertUnprocessable();
});

test('can update a publisher', function () {
    $publisher = Publisher::factory()->create();
    $name = fake()->name();

    $response = $this->putJson(route('publishers.update', $publisher->getKey()), [
        'name' => $name,
    ]);

    $response->assertOk();
});


test('can remove a publisher', function () {
    $publisher = Publisher::factory()->create();
    $response = $this->delete(route('publishers.destroy', [$publisher->getKey(), $publisher->id]));

    $response->assertNoContent();
});
