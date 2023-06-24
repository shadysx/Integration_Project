<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        if (!Auth::attempt($request->only('affiliationNumber', 'password'))) {
            return response([
                'message' => 'Invalid credentials!'
            ], Response::HTTP_UNAUTHORIZED);
        }

        $user = Auth::user();

        $token = JWTAuth::fromUser($user);

        return response([
            'token' => $token,
            'user' => $user,
            'message' => 'Successfully Logged in!'
        ]);
    }

    public function register(Request $request)
    {
        error_log($request);
        $validator = Validator::make($request->all(), [
            'affiliationNumber' => 'required|max:191',
            'lastName' => 'required|max:191',
            'firstName' => 'required|max:191',
            'gender' => 'required|max:191',
            'ranking' => 'required|max:191',
            'dateOfBirth' => 'required|max:191',
            'mobile' => 'required|digits:10',
            'email' => 'required|max:191|unique:users,email',
            'password' => 'required|max:191',
            'status' => 'required|max:191',
            'street' => 'required|max:191',
            'postalCode' => 'required|max:191',
            'locality' => 'required|max:191',
            'categoryId' => 'required|max:191',
        ]);

        if($validator->fails())
        {
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages()
            ],422);
        }
        else
        {
            $member = User::create([
                'affiliationNumber'=> $request->affiliationNumber,  
                'lastName' => $request->lastName, 
                'firstName'=> $request->firstName, 
                'gender'=> $request->gender, 
                'ranking'=> $request->ranking, 
                'dateOfBirth'=> $request->dateOfBirth,  
                'mobile' => $request->mobile, 
                'email' => $request->email, 
                'password' => Hash::make($request->password),
                'status'=> $request->status, 
                'street'=> $request->street, 
                'postalCode'=> $request->postalCode, 
                'locality'=> $request->locality
            ]);
        }

        $categoryIds = $request->input('categoryId', []); // Assuming the categories are sent as an array of IDs
        $member->categories()->sync($categoryIds);

        if($member)
        {
            return response()->json([
                'status' => 200,
                'message' => "Student Created Succesfully"
            ], 200);
        }
        else
        {
            return response()->json([
                'status' => 500,
                'message' => "Something Went Wrong"
            ], 500);
        }

    }

    public function user()
    {
        return Auth::user();
    }
}
