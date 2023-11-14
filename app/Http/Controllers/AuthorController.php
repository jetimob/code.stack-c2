<?php

namespace App\Http\Controllers;

use App\Http\Requests\QueryRequest;
use App\Http\Requests\StoreAuthorRequest;
use App\Http\Resources\AuthorDetailedResource;
use App\Http\Resources\AuthorResource;
use App\Models\Author;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Http\Response;

class AuthorController extends Controller
{
    public function index(QueryRequest $request): ResourceCollection
    {
        return AuthorResource::collection(
            Author::withCount('books')
                ->orderBy('id')
                ->search($request->getQuery())
                ->paginate()
        );
    }

    public function show(Author $author): AuthorDetailedResource
    {
        $author->loadCount('books');
        return AuthorDetailedResource::make($author);
    }

    public function store(StoreAuthorRequest $request): AuthorDetailedResource
    {
        $author = Author::create($request->validated());
        return AuthorDetailedResource::make($author);
    }

    public function update(StoreAuthorRequest $request, Author $author): AuthorDetailedResource
    {
        $author->update($request->validated());
        return AuthorDetailedResource::make($author);
    }

    public function destroy(Author $author): Response
    {
        $author->delete();
        return response()->noContent();
    }
}
