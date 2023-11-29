<?php

namespace App\Http\Controllers;

use App\Http\Resources\LoanResource;
use App\Models\People;
use Illuminate\Http\Resources\Json\ResourceCollection;

class PeopleLoansController extends Controller
{
    public function index(People $people): ResourceCollection
    {
        return LoanResource::collection(
            $people->loans()
                ->orderBy('id')
                ->paginate()
        );
    }
}
