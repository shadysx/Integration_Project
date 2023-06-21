<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function list() {
        return response()->json(User::with('categories')->get(), 200);
    }

    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'affiliationNumber' => 'required|max:191',
            'lastName' => 'required|max:191',
            'firstName' => 'required|max:191',
            'gender' => 'required|max:191',
            'ranking' => 'required|max:191',
            'dateOfBirth' => 'required|max:191',
            'mobile' => 'required|digits:10',
            'email' => 'required|max:191',
            'password' => 'required|max:191',
            'status' => 'required|max:191',
            'street' => 'required|max:191',
            'postalCode' => 'required|max:191',
            'locality' => 'required|max:191',
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
                'password'=> $request->password, 
                'status'=> $request->status, 
                'street'=> $request->street, 
                'postalCode'=> $request->postalCode, 
                'locality'=> $request->locality
            ]);
        }



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

    public function detail($id)
    {
        $member = User::find($id);

        if($member)
        {
            return response()->json([
                'status' => 200,
                'member' => $member
            ]);
        }
        else
        {
            return response()->json([
                'status' => 404,
                'message' => "No such User Found"
            ],404);
        }
    }

    public function edit($id)
    {
        $member = User::find($id);

        if($member)
        {
            return response()->json([
                'status' => 200,
                'member' => $member
            ]);
        }
        else
        {
            return response()->json([
                'status' => 404,
                'message' => "No such User Found"
            ],404);
        }
    }

    public function update(Request $request, int $id)
    {
        $validator = Validator::make($request->all(), [
            'affiliationNumber' => 'required|max:191',
            'lastName' => 'required|max:191',
            'firstName' => 'required|max:191',
            'gender' => 'required|max:191',
            'ranking' => 'required|max:191',
            'dateOfBirth' => 'required|max:191',
            'mobile' => 'required|digits:10',
            'email' => 'required|max:191',
            'password' => 'required|max:191',
            'status' => 'required|max:191',
            'street' => 'required|max:191',
            'postalCode' => 'required|max:191',
            'locality' => 'required|max:191',
            'isAdmin' => 'required|max:191'
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
            $member = User::with('categories')->find($id);         
        }

        if($member)
        {
            $member->update([
                'affiliationNumber'=> $request->affiliationNumber,  
                'lastName' => $request->lastName, 
                'firstName'=> $request->firstName, 
                'gender'=> $request->gender, 
                'ranking'=> $request->ranking, 
                'dateOfBirth'=> $request->dateOfBirth,  
                'mobile' => $request->mobile, 
                'email' => $request->email, 
                'password'=> $request->password, 
                'status'=> $request->status, 
                'street'=> $request->street, 
                'postalCode'=> $request->postalCode, 
                'locality'=> $request->locality,
                'isAdmin' => $request->isAdmin,
            ]);

            $categoryIds = $request->input('categoryId', []); // Assuming the categories are sent as an array of IDs
            $member->categories()->sync($categoryIds);

            return response()->json([
                'status' => 200,
                'message' => "Student Updated Succesfully"
            ], 200);
        }
        else
        {
            return response()->json([
                'status' => 404,
                'message' => "Not Found"
            ], 404);
        }
    }


    public function delete($id)
    {
        $member = User::find($id);

        if($member)
        {
            $member->delete();

            return response()->json([
                'status' => 200,
                'message' => "Delete Success"
            ], 200);
        }
        else
        {
            return response()->json([
                'status' => 404,
                'message' => "No such member Found"
            ], 404);
        }
    }
}
