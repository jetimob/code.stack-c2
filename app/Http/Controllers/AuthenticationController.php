<?php

namespace App\Http\Controllers;

use App\Http\Requests\SignInRequest;
use App\Http\Requests\StoreUserRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

class AuthenticationController extends Controller
{
    public function signIn(SignInRequest $request): JsonResponse
    {
        if (\Auth::attempt($request->validated())) {
            $request->session()->regenerate();
            return response()->json(\Auth::user());
        }

        return response()->json([
            'message' => 'Invalid credentials'
        ], 401);
    }

    public function signUp(StoreUserRequest $request): JsonResponse
    {
        $user = User::create($request->validated());
        return response()->json($user, 201);
    }

    public function signOut(): Response
    {
        if (!\Auth::check()) {
            return response()->noContent();
        }

        \Auth::logout();
        request()->session()->invalidate();
        request()->session()->regenerateToken();
        return response()->noContent();
    }

    public function me(): JsonResponse
    {
        if (!\Auth::check()) {
            return response()->json([
                'message' => 'Unauthenticated'
            ], 401);
        }

        return response()->json(\Auth::user());
    }
}
