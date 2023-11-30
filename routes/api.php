<?php

use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\AuthorBooksController;
use App\Http\Controllers\AuthorController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\BookCoverController;
use App\Http\Controllers\CoverController;
use App\Http\Controllers\GenreController;
use Illuminate\Support\Facades\Route;


Route::prefix('/v1')->group(function () {
    Route::apiResource('books', BookController::class)->only(['index', 'show']);
    Route::apiResource('authors', AuthorController::class)->only(['index', 'show']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::apiResource('books', BookController::class)->except(['index', 'show']);;
        Route::apiResource('authors', AuthorController::class)->except(['index', 'show']);
        Route::apiResource('genres', GenreController::class);
        Route::apiResource('authors.books', AuthorBooksController::class)->only(['index']);
        Route::apiResource('books.cover', BookCoverController::class)->only(['store', 'destroy']);
        Route::apiResource('covers', CoverController::class)->only(['show', 'store', 'destroy']);
    });
    
    Route::prefix('/auth')->group(function () {
        Route::post('/sign-in', [AuthenticationController::class, 'signIn']);
        Route::post('/sign-up', [AuthenticationController::class, 'signUp']);
        Route::post('/sign-out', [AuthenticationController::class, 'signOut']);
        Route::get('/me', [AuthenticationController::class, 'me']);
    });
});
