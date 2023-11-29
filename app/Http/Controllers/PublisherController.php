<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreatePublisherRequest;
use App\Http\Resources\PublisherResource;
use App\Models\Publisher;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Http\Response;

class PublisherController extends Controller
{
    public function index(): ResourceCollection
    {
        return PublisherResource::collection(
            Publisher::with('books')->withCount('books')->orderBy('id')->paginate()
        );
    }

    public function show(Publisher $publisher): PublisherResource
    {
        $publisher->loadCount('books');
        return PublisherResource::make($publisher);
    }

    public function store(CreatePublisherRequest $request): PublisherResource
    {
        $publisher = Publisher::create($request->validated());
        return PublisherResource::make($publisher);
    }

    public function update(CreatePublisherRequest $request, Publisher $publisher): PublisherResource
    {
        $publisher->update($request->validated());
        return PublisherResource::make($publisher);
    }

    public function destroy(Publisher $publisher): Response
    {
        $publisher->delete();
        return response()->noContent();
    }

}
