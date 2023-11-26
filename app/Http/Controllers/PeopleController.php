<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreatePeopleRequest;
use App\Http\Resources\PeopleDetailedResource;
use App\Http\Resources\PeopleResource;
use App\Models\People;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Http\Response;

class PeopleController extends Controller
{
    public function index(): ResourceCollection
    {
        return PeopleResource::collection(
            People::withCount('loans')->orderBy('id')->paginate()
        );
    }

    public function show(People $people): PeopleDetailedResource
    {
        $people->loadCount('loans');
        return PeopleDetailedResource::make($people);
    }

    public function store(CreatePeopleRequest $request): PeopleDetailedResource
    {
        $people = People::create($request->validated());
        return PeopleDetailedResource::make($people);
    }

    public function update(CreatePeopleRequest $request, People $people): PeopleDetailedResource
    {
        $people->update($request->validated());
        return PeopleDetailedResource::make($people);
    }

    public function destroy(People $people): Response
    {
        $people->delete();
        return response()->noContent();
    }

}
