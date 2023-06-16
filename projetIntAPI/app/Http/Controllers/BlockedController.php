<?php

namespace App\Http\Controllers;

use App\Models\Blocked;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BlockedController extends Controller
{
    public function list() {
        return response()->json(Blocked::all(), 200);
    }

    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'begin_hour' => 'required',
            'date' => 'required|max:191',
            'duration' => 'required',
            'reason' => 'required|max:191',
            'user_id' => 'required',
            'court_id' => 'required'            
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
            $blocked = Blocked::create([
                'begin_hour' => $request->begin_hour,
                'date' => $request->date,
                'duration' => $request->duration,
                'reason' => $request->reason,
                'user_id' => $request->user_id,
                'court_id' => $request->court_id
            ]);
        }

        if($blocked)
        {
            return response()->json([
                'status' => 200,
                'message' => "Blocked Created Succesfully"
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
        $blocked = Blocked::find($id);

        if($blocked)
        {
            return response()->json([
                'status' => 200,
                'blocked' => $blocked
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

    public function edit($id)
    {
        $blocked = Blocked::find($id);

        if($blocked)
        {
            return response()->json([
                'status' => 200,
                'blocked' => $blocked
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
            'begin_hour' => 'required',
            'date' => 'required|max:191',
            'duration' => 'required',
            'reason' => 'required|max:191',
            'user_id' => 'required',
            'court_id' => 'required'            
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
            $blocked = Blocked::find($id);            
        }

        if($blocked)
        {
            $blocked->update([
                'begin_hour' => $request->begin_hour,
                'date' => $request->date,
                'duration' => $request->duration,
                'reason' => $request->reason,
                'user_id' => $request->user_id,
                'court_id' => $request->court_id
            ]);       

            return response()->json([
                'status' => 200,
                'message' => "Blocked Updated Succesfully"
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
        $blocked = Blocked::find($id);

        if($blocked)
        {
            $blocked->delete();

            return response()->json([
                'status' => 200,
                'message' => "Delete Success"
            ], 200);
        }
        else
        {
            return response()->json([
                'status' => 404,
                'message' => "No such Blocked Found"
            ], 404);
        }
    }

}
