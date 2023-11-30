<?php

namespace App\Http\Controllers;

use App\Http\Requests\SignInRequest;
use App\Http\Requests\StoreUserRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Request;

class AuthenticationController extends Controller
{
    public function signIn(SignInRequest $request): JsonResponse
    {
        if (\Auth::attempt($request->validated())) {
            $user = \Auth::user();
            $token = $user->createToken('api-token')->plainTextToken;
    
            return response()->json(['token' => $token, 'user' => $user]);
        }
    
        return response()->json(['message' => 'Invalid credentials'], 401);
    }

    public function signUp(StoreUserRequest $request): JsonResponse
    {
        $user = User::create($request->validated());
        return response()->json($user, 201);
    }

    public function signOut(Request $request): Response
    {
        $request->user()->tokens()->delete();
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
