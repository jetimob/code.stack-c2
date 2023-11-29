<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateLoanRequest;
use App\Http\Resources\LoanDetailedResource;
use App\Http\Resources\LoanResource;
use App\Models\Loan;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Http\Response;

class LoanController extends Controller
{

    public function index(): ResourceCollection
    {
        return LoanResource::collection(
            Loan::orderByRaw("CASE WHEN status = 'Delayed' THEN 0 ELSE 1 END, status")->paginate()
        );
    }

    public function show(Loan $loan): LoanDetailedResource
    {
        return LoanDetailedResource::make($loan);
    }

    public function store(CreateLoanRequest $request)
{
    $validated = $request->validated();

    $people_id = $validated['people_id'];
    $book_id = $validated['book_id'];

    $openLoansCount = Loan::where('people_id', $people_id)
                        ->whereIn('status', ['Borrowed', 'Delayed'])
                        ->count();

    if ($openLoansCount > 2) {
        return response()->json(['error' => 'The person already has more than two loans open', 'status' => 'loan_limit_exceeded'], 400);
    }

    $existingOpenLoan = Loan::where('book_id', $book_id)
                        ->whereIn('status', ['Borrowed', 'Delayed'])
                        ->first();

    if ($existingOpenLoan) {
        return response()->json(['error' => 'There is already a loan for this book with status Borrowed or Delayed', 'status' => 'book_unavailable'], 400);
    }

    $loan = Loan::create($validated);

    return LoanDetailedResource::make($loan);
}


    public function update(CreateLoanRequest $request, Loan $loan): LoanDetailedResource
    {
        $validated = $request->validated();
        $people_id = $validated['people_id'];
        $book_id = $validated['book_id'];

        $openLoansCount = Loan::where('people_id', $people_id)
                            ->whereIn('status', ['Borrowed', 'Delayed'])
                            ->count();

        if ($openLoansCount > 2) {
            return response()->json(['error' => 'The person already has more than two loans open', 'status' => 'loan_limit_exceeded'], 400);
        }

        $existingOpenLoan = Loan::where('book_id', $book_id)
                            ->whereIn('status', ['Borrowed', 'Delayed'])
                            ->first();

        if ($existingOpenLoan) {
            return response()->json(['error' => 'There is already a loan for this book with status Borrowed or Delayed', 'status' => 'book_unavailable'], 400);
        }

        $loan->update($validated);
        return LoanDetailedResource::make($loan);
    }

    public function destroy(Loan $loan): Response
    {
        $loan->delete();
        return response()->noContent();
    }
}
