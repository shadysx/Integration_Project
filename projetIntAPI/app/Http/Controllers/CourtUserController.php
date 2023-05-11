<?php

namespace App\Http\Controllers;
use App\Models\Court;
use App\Models\CourtUser;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Validator;

class CourtUserController extends Controller
{
    public function list() {

        return response()->json(CourtUser::all(), 200);
        // foreach ($court->members as $member) {
        //     echo $member->pivot->date . ' ' . $member->pivot->starting_hour . ' ' . $member->firstname . PHP_EOL;
        // }
        
    }    

    public function create(Request $request)
    {             

        $validator = Validator::make($request->all(), [
            'starting_hour' => 'required',            
            'date' => 'required',
            'member1_id' => 'required',
            'member2_id' => 'required',         
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
            $reservation = CourtUser::create([                
                'starting_hour' => $request->starting_hour,
                'ending_hour' => $request->ending_hour,
                'date' => $request->date,
                'member1_id' => $request->member1_id,
                'member2_id' => $request->member2_id,
                'member3_id' => $request->member3_id,
                'member4_id' => $request->member4_id,
                'court_id' => $request->court_id                
            ]);
        }       
                

        if($reservation)
        {
            return response()->json([
                'status' => 200,
                'message' => "CourtUser Created Succesfully"
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
        $reservation = CourtUser::find($id);

        if($reservation)
        {
            return response()->json([
                'status' => 200,
                'reservation' => $reservation
            ]);
        }
        else
        {
            return response()->json([
                'status' => 404,
                'message' => "No such CourtUser Found"
            ],404);
        }
    }

    public function edit($id)
    {
        $reservation = CourtUser::find($id);

        if($reservation)
        {
            return response()->json([
                'status' => 200,
                'reservation' => $reservation
            ]);
        }
        else
        {
            return response()->json([
                'status' => 404,
                'message' => "No such reservation Found"
            ],404);
        }
    }

    public function update(Request $request, int $id)
    {
        $validator = Validator::make($request->all(), [
            'starting_hour' => 'required',            
            'date' => 'required',
            'member1_id' => 'required',
            'member2_id' => 'required',         
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
            $reservation = CourtUser::find($id);            
        }

        if($reservation)
        {
            $reservation->update([               
                'starting_hour' => $request->starting_hour,
                'ending_hour' => $request->ending_hour,
                'date' => $request->date,
                'member1_id' => $request->member1_id,
                'member2_id' => $request->member2_id,
                'member3_id' => $request->member3_id,
                'member4_id' => $request->member4_id,
                'court_id' => $request->court_id      
            ]);


            return response()->json([
                'status' => 200,
                'message' => "CourtUser Updated Succesfully"
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
        $reservation = CourtUser::find($id);

        if($reservation)
        {
            $reservation->delete();

            return response()->json([
                'status' => 200,
                'message' => "Delete Success"
            ], 200);
        }
        else
        {
            return response()->json([
                'status' => 404,
                'message' => "No such reservation Found"
            ], 404);
        }
    }
}
