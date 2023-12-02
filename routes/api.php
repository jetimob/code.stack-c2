<?php

use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\AuthorBooksController;
use App\Http\Controllers\AuthorController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\BookCoverController;
use App\Http\Controllers\CoverController;
use App\Http\Controllers\GenreController;
use App\Http\Controllers\PublisherController;
use App\Models\Publisher;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function () {

});

Route::prefix('/v1')->middleware('auth:sanctum')->group(function () {
    // parece que tem um middleware faltando aqui para autenticar as rotas
    Route::apiResource('books', BookController::class);
    Route::apiResource('authors', AuthorController::class);
    Route::apiResource('genres', GenreController::class);
    Route::apiResource('publishers', PublisherController::class);
    Route::apiResource('authors.books', AuthorBooksController::class)->only(['index']);
    Route::apiResource('books.cover', BookCoverController::class)->only(['store', 'destroy']);
    Route::apiResource('covers', CoverController::class)->only(['show', 'store', 'destroy']);
});
    Route::prefix('/v1/auth')->group(function () {
        Route::post('/sign-in', [AuthenticationController::class, 'signIn']);
        Route::post('/sign-up', [AuthenticationController::class, 'signUp']);
        Route::post('/sign-out', [AuthenticationController::class, 'signOut']);
        Route::get('/me', [AuthenticationController::class, 'me']);
});

