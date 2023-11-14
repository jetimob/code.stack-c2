<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBookCoverRequest;
use App\Http\Resources\CoverResource;
use App\Models\File;
use App\Services\FileService;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Response;

class CoverController extends Controller
{
    public function __construct(
        protected readonly FileService $fileService
    )
    {
    }

    public function show(File $cover): JsonResource
    {
        return CoverResource::make($cover);
    }

    public function store(StoreBookCoverRequest $request): JsonResource
    {
        return CoverResource::make(
            $this->fileService->store($request->getUploadedImage())
        );
    }

    public function destroy(File $cover): Response
    {
        $this->fileService->delete($cover);
        return response()->noContent();
    }
}
