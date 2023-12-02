<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePublisherRequest;
use App\Http\Resources\PublisherResource;
use App\Services\PublisherService;
use App\Models\Publisher;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Resources\Json\ResourceCollection;

class PublisherController extends Controller
{
    public function __construct(
        protected readonly PublisherService $publishService
    )
    {
    }
    public function index(): ResourceCollection{
        return PublisherResource::collection(Publisher::withCount('books')->orderBy('id','asc')->paginate());
    }
    public function show(Publisher $publisher):JsonResource{
        return PublisherResource::make($publisher);
    }
    public function store(StorePublisherRequest $request, Publisher $publisher){
        return PublisherResource::make($this->publishService->upsertPublisher($request));
    }
    public function update(StorePublisherRequest $request, Publisher $publisher):JsonResource{
        return PublisherResource::make($this->publishService->upsertPublisher($request, $publisher));
    }
    public function destroy(Publisher $publisher){
        $this->publishService->deletePublisher($publisher);
        return response()->noContent();
    }
}
