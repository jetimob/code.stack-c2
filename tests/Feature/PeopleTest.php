<?php

use App\Models\People;
use App\Models\User;

beforeEach(function () {
    $user = User::factory()->create();
    $this->actingAs($user, 'sanctum');
});

uses()->group('peoples');

test('should return a list of peoples', function () {
    $concretePeople = People::factory()->create();
    $response = $this->getJson(route('peoples.index'));
    $paginatedResponse = $response->json();

    expect($paginatedResponse)
        ->toBePaginated()
        ->and($paginatedResponse['data'])
        ->toHaveCount(1)
        ->sequence(
            fn(\Pest\Expectation $people) => $people
                ->toMatchArray([
                    'id' => $concretePeople->getKey(),
                    'name' => $concretePeople->name,
                ]),
        );

});

test('will fail when creating a people with invalid data', function () {
    $response = $this->postJson(route('peoples.store'), [
        'name' => '',
    ]);

    $response->assertUnprocessable();
});

test('can show a people correctly', function () {
    $people = People::factory()->create();
    $creationResponse = $this->getJson(route('peoples.show', $people->getKey()));
    $peopleData = $creationResponse->json();

    $creationResponse->assertOk();
    expect($peopleData['data'])
        ->toMatchArray([
            'id' => $people->getKey(),
            'name' => $people->name,
            'loans_count' => $people->loans_count,
        ]);
});

test('will fail when updating a people with invalid data', function () {
    $people = People::factory()->create();
    $response = $this->putJson(route('peoples.update', $people->getKey()), [
        'name' => '',
    ]);

    $response->assertUnprocessable();
});

test('can update a people', function () {
    $people = People::factory()->create();
    $name = fake()->name();

    $response = $this->putJson(route('peoples.update', $people->getKey()), [
        'name' => $name,
    ]);

    $response->assertOk();
});


test('can remove a people', function () {
    $people = People::factory()->create();
    $response = $this->delete(route('peoples.destroy', [$people->getKey(), $people->id]));

    $response->assertNoContent();
});
