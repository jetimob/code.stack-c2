<?php

use App\Models\Book;

uses(
    Tests\TestCase::class,
    Illuminate\Foundation\Testing\RefreshDatabase::class,
)->in('Feature');

beforeAll(function () {
    $this->withoutExceptionHandling();
});

expect()->extend('toBePaginated', function () {
    $this->toHaveKeys([
        'data',
        'links.first',
        'links.last',
        'links.prev',
        'links.next',
        'meta.current_page',
        'meta.from',
        'meta.last_page',
        'meta.links',
        'meta.path',
        'meta.per_page',
        'meta.to',
        'meta.total',
    ]);
});

expect()->extend('toBeBook', function (array $arrData) {
    expect($this->value)->not->toBeNull()
        ->and($this->value->title)->toBe($arrData['title'])
        ->and($this->value->description)->toBe($arrData['description'])
        ->and($this->value->rating)->toBe($arrData['rating'])
        ->and($this->value->isbn)->toBe($arrData['isbn'])
        ->and($this->value->author->getKey())->toBe($arrData['author_id'])
        ->and($this->value->genre->getKey())->toBe($arrData['genre_id'])
        ->and($this->value->publisher->getKey())->toBe($arrData['publisher_id']);

});
