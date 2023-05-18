<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\Response;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response([
                'message' => 'Invalid credentials!'
            ], Response::HTTP_UNAUTHORIZED);
        }

        $user = Auth::user();

        $token = JWTAuth::fromUser($user);

        return response([
            'token' => $token,
            'user' => $user
        ]);
    }

    public function register(Request $request)
    {
        return User::create([
            'affiliationNumber'=> $request->affiliationNumber,  
            'lastName' => $request->lastName, 
            'firstName'=> $request->firstName, 
            'gender'=> $request->gender, 
            'ranking'=> $request->ranking, 
            'dateOfBirth'=> $request->dateOfBirth,  
            'mobile' => $request->mobile, 
            'email' => $request->email, 
            'password'=> Hash::make($request->password), 
            'status'=> $request->status, 
            'street'=> $request->street, 
            'postalCode'=> $request->postalCode, 
            'locality'=> $request->locality
        ]);
    }

    public function user()
    {
        return Auth::user();
    }
}
