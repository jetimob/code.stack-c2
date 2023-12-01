<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePublisherRequest;
use App\Http\Resources\PublisherResource;
use App\Models\Publisher;
use App\Services\PublisherService;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Http\Response;

class PublisherController extends Controller
{
    public function __construct(
        protected readonly PublisherService $publisherService
    )
    {
    }

    public function index(): ResourceCollection
    {
        return PublisherResource::collection(
            Publisher::orderBy('id')->paginate()
        );
    }

    public function show(Publisher $publisher): JsonResource
    {
        return PublisherResource::make($publisher);
    }

    public function store(StorePublisherRequest $request, Publisher $publisher)
    {
        return PublisherResource::make(
            $this->publisherService->upsertPublisher($request)
        );

    }

    public function update(StorePublisherRequest $request, Publisher $publisher): JsonResource
    {
        return PublisherResource::make(
            $this->publisherService->upsertPublisher($request, $publisher)
        );
    }

    public function destroy(Publisher $publisher): Response
    {
        $this->publisherService->deletePublisher($publisher);
        return response()->noContent();
    }
    
}
