<?php

namespace App\Http\Controllers;

use App\Models\Court;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CourtController extends Controller
{

    public function list() {
        return response()->json(Court::all(), 200);
    }

    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'number' => 'required'      
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
            $court = Court::create([
                'number' => $request->number
            ]);
        }

        if($court)
        {
            return response()->json([
                'status' => 200,
                'message' => "Court Created Succesfully"
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
        $court = Court::find($id);

        if($court)
        {
            return response()->json([
                'status' => 200,
                'court' => $court
            ]);
        }
        else
        {
            return response()->json([
                'status' => 404,
                'message' => "No such Court Found"
            ],404);
        }
    }

    public function edit($id)
    {
        $court = Court::find($id);

        if($court)
        {
            return response()->json([
                'status' => 200,
                'court' => $court
            ]);
        }
        else
        {
            return response()->json([
                'status' => 404,
                'message' => "No such Blocked Found"
            ],404);
        }
    }

    public function update(Request $request, int $id)
    {
        $validator = Validator::make($request->all(), [
            'number' => 'required'      
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
            $court = Court::find($id);            
        }

        if($court)
        {
            $court->update([
                'number' => $request->number
            ]);       

            return response()->json([
                'status' => 200,
                'message' => "Court Updated Succesfully"
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
        $court = Court::find($id);

        if($court)
        {
            $court->delete();

            return response()->json([
                'status' => 200,
                'message' => "Delete Success"
            ], 200);
        }
        else
        {
            return response()->json([
                'status' => 404,
                'message' => "No such Court Found"
            ], 404);
        }
    }
}
