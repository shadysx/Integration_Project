<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    public function list() {
        return response()->json(Category::with('users')->get(), 200);
    }

    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required'            
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
            $category = Category::create([
                'name' => $request->name,
                'ageMin' => $request->ageMin,
                'ageMax' => $request->ageMax
            ]);
        }

        if($category)
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
        $category = Category::find($id);

        if($category)
        {
            return response()->json([
                'status' => 200,
                'member' => $category
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
        $category = Category::find($id);

        if($category)
        {
            return response()->json([
                'status' => 200,
                'member' => $category
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
            'name' => 'required'
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
            $category = Category::find($id);            
        }

        if($category)
        {
            $category->update([
                'name' => $request->name,
                'ageMin' => $request->ageMin,
                'ageMax' => $request->ageMax
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
        $category = Category::find($id);

        if($category)
        {
            $category->delete();

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
