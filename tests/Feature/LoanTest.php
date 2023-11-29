<?php

use App\Models\Book;
use App\Models\Loan;
use App\Models\People;
use App\Models\User;

beforeEach(function () {
    $user = User::factory()->create();
    $this->actingAs($user, 'sanctum');
});

uses()->group('loans');

test('should return a list of paginated loans', function () {
    Loan::factory()->create();
    $response = $this->getJson(route('loans.index'));
    $paginatedResponse = $response->json();

    $responseData = $paginatedResponse['data'][0];

    expect($responseData)
        ->toMatchArray([
            'id' => $responseData['id'],
            'status' => $responseData['status'],
            'book' => [
                'id' => $responseData['book']['id'],
                'title' => $responseData['book']['title'],
                'rating' => $responseData['book']['rating'],
                'author' => $responseData['book']['author'],
                'genre' => $responseData['book']['genre'],
                'publisher' => $responseData['book']['publisher'],
                'cover' => $responseData['book']['cover'],
            ],
            'people' => [
                'id' => $responseData['people']['id'],
                'name' => $responseData['people']['name'],
            ],
        ]);
});

test('will fail when creating a loan with invalid data', function () {
    $response = $this->postJson(route('loans.store'), [
        'people_id' => '',
        'book_id' => '',
    ]);

    $response->assertUnprocessable();
});

test('will fail when creating a loan with a book that already has an active loan', function () {
    $book = Book::factory()->create();
    $people = People::factory()->create();

    Loan::factory()->create([
        'book_id' => $book->id,
        'status' => 'Borrowed', 
    ]);

    $response = $this->postJson(route('loans.store'), [
        'people_id' => $people->getKey(),
        'book_id' => $book->getKey(),
        'status' => 'Borrowed',
    ]);
    
    $response->assertStatus(400); 
    $response->assertJson(['error' => 'There is already a loan for this book with status Borrowed or Delayed']);
});

test('will fail when creating a loan with a person with more than three open loans', function () {
    $book = Book::factory()->create();
    $people = People::factory()->create();

    Loan::factory()->count(3)->create([
        'book_id' => $book->getKey(),
        'people_id' => $people->getKey(),
        'status' => 'Borrowed',
    ]);

    $response = $this->postJson(route('loans.store'), [
        'people_id' => $people->getKey(),
        'book_id' => $book->getKey(),
        'status' => 'Borrowed',
    ]);

    $response->assertStatus(400);
    $response->assertJson(['error' => 'The person already has more than two loans open']);
});

test('can show a loan correctly', function () {
    $loan = Loan::factory()->create();

    $response = $this->getJson(route('loans.show', $loan->getKey()));
    $loanData = $response->json()['data'];

    $response->assertOk();
    expect($loanData)->toMatchArray([
        'id' => $loan->getKey(),
        'status' => $loan->status,
        'return_date' => $loan->return_date ? date('Y-m-d', strtotime($loan->return_date)) : null,
        'book' => [
            'id' => $loan->book->getKey(),
            'title' => $loan->book->title,
        ],
        'people' => [
            'id' => $loan->people->getKey(),
            'name' => $loan->people->name,
        ],
        'created_at' => $loan->created_at->format('F j, Y'),
    ]);

    $expectedKeys = ['id', 'status', 'return_date', 'book', 'people', 'created_at'];
    $this->assertEquals($expectedKeys, array_keys($loanData));
});

test('will fail when updating a loan with invalid data', function () {
    $loan = Loan::factory()->create();
    $response = $this->putJson(route('loans.update', $loan->getKey()), [
        'people_id' => '',
        'book_id' => '',
    ]);

    $response->assertUnprocessable();
});

test('can update a loan', function () {
    $loan = Loan::factory()->create();
    $book = Book::factory()->create();
    $people = People::factory()->create();

    // fake status and return_date for test
    $status = "Returned";
    $return_date = Date::now()->addDays(5);
    
    $arrData = [
        'status' => $status,
        'return_date' => $return_date,
        'people_id' => $people->getKey(),
        'book_id' => $book->getKey(),
    ];

    $response = $this->putJson(route('loans.update', $loan->getKey()), $arrData);
    $response->assertOk();
});

test('can remove a loan', function () {
    $loan = Loan::factory()->create();
    $response = $this->delete(route('loans.destroy', [$loan->getKey(), $loan->id]));

    $response->assertNoContent();
});
