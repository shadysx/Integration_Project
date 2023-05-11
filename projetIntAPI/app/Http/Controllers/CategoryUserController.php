<?php

namespace App\Http\Controllers;

use App\Models\CategoryUser;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Validator;

class CategoryUserController extends Controller
{
    public function list() {
        return response()->json(CategoryUser::all(), 200);
    }

    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'member_id' => 'required',
            'category_id' => 'required'                 
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
            $categoryMember = CategoryUser::create([
                'member_id' => $request->member_id,
                'category_id' => $request->category_id     
            ]);
        }

        if($categoryMember)
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
        $categoryMember = CategoryUser::find($id);

        if($categoryMember)
        {
            return response()->json([
                'status' => 200,
                'member' => $categoryMember
            ]);
        }
        else
        {
            return response()->json([
                'status' => 404,
                'message' => "No such Member Found"
            ],404);
        }
    }

    public function edit($id)
    {
        $categoryMember = CategoryUser::find($id);

        if($categoryMember)
        {
            return response()->json([
                'status' => 200,
                'member' => $categoryMember
            ]);
        }
        else
        {
            return response()->json([
                'status' => 404,
                'message' => "No such Member Found"
            ],404);
        }
    }

    public function update(Request $request, int $id)
    {
        $validator = Validator::make($request->all(), [
            'member_id' => 'required',
            'category_id' => 'required'
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
            $categoryMember = CategoryUser::find($id);            
        }

        if($categoryMember)
        {
            $categoryMember->update([
                'member_id' => $request->member_id,
                'category_id' => $request->category_id    
            ]);


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
        $categoryMember = CategoryUser::find($id);

        if($categoryMember)
        {
            $categoryMember->delete();

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
