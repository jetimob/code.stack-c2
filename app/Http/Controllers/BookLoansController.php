<?php

namespace App\Http\Controllers;

use App\Http\Resources\LoanResource;
use App\Models\Book;
use Illuminate\Http\Resources\Json\ResourceCollection;

class BookLoansController extends Controller
{
    public function index(Book $book): ResourceCollection
    {
        return LoanResource::collection(
            $book->loans()
                ->orderBy('id')
                ->paginate()
        );
    }
}
