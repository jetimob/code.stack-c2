<?php

namespace App\Http\Controllers;

use App\Http\Resources\BookResource;
use App\Models\Publisher;
use Illuminate\Http\Resources\Json\ResourceCollection;

class PublisherBooksController extends Controller
{
    public function index(Publisher $publisher): ResourceCollection
    {
        return BookResource::collection(
            $publisher->books()
                ->orderBy('id')
                ->paginate()
        );
    }
}
