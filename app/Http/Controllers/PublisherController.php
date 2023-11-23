<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreatePublisherRequest;
use App\Http\Resources\PublisherDetailResource;
use App\Http\Resources\PublisherResource;
use App\Models\Publisher;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Http\Response;

class PublisherController extends Controller
{
    public function index(): ResourceCollection
    {
        return PublisherResource::collection(
            Publisher::withCount('books')->orderBy('id')->paginate()
        );
    }

    public function show(Publisher $publisher): PublisherDetailResource
    {
        $publisher->loadCount('books');
        return PublisherDetailResource::make($publisher);
    }

    public function store(CreatePublisherRequest $request): PublisherDetailResource
    {
        $publisher = Publisher::create($request->validated());
        return PublisherDetailResource::make($publisher);
    }

    public function update(CreatePublisherRequest $request, Publisher $publisher): PublisherDetailResource
    {
        $publisher->update($request->validated());
        return PublisherDetailResource::make($publisher);
    }

    public function destroy(Publisher $publisher): Response
    {
        $publisher->delete();
        return response()->noContent();
    }

}
