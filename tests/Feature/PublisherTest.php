<?php

use App\Models\Publisher;


uses()->group('publishers');

function getLastPublisher(): Publisher
{
    return Publisher::query()->latest()->first();
}

expect()->extend('toBePublisher', function (Publisher $expectedPublisher) {
    return $this->toMatchArray([
        'id' => $expectedPublisher->getKey(),
        'name' => $expectedPublisher->name,
        'created_at' => $expectedPublisher->created_at ? $expectedPublisher->created_at->toISOString() : null,
        'updated_at' => $expectedPublisher->updated_at ? $expectedPublisher->updated_at->toISOString() : null,
    ]);
});

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
            'book_count' => $publisher->books_count,
        ]);
});

test('can create a publisher', function () {
    $publisherName = fake()->word;
    $arrData = [
        'name' => $publisherName,
    ];

    $response = $this->postJson(route('publishers.store'), $arrData);
    $publisher = getLastPublisher();

    $response->assertCreated();
    expect($publisher)->toBePublisher($publisher);
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
