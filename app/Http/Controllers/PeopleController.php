<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreatePeopleRequest;
use App\Http\Resources\PeopleResource;
use App\Models\People;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Http\Response;

class PeopleController extends Controller
{
    public function index(): ResourceCollection
    {
        return PeopleResource::collection(
            People::with('loans')->withCount('loans')->orderBy('id')->paginate()
        );
    }

    public function show(People $people): PeopleResource
    {
        $people->loadCount('loans');
        return PeopleResource::make($people);
    }

    public function store(CreatePeopleRequest $request): PeopleResource
    {
        $people = People::create($request->validated());
        return PeopleResource::make($people);
    }

    public function update(CreatePeopleRequest $request, People $people): PeopleResource
    {
        $people->update($request->validated());
        return PeopleResource::make($people);
    }

    public function destroy(People $people): Response
    {
        $people->delete();
        return response()->noContent();
    }

}
