<?php

namespace App\Http\Controllers;
use App\Models\Court;
use App\Models\Reservation;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Validator;

class ReservationController extends Controller
{
    public function list() {

        return response()->json(Reservation::all(), 200);
        // foreach ($court->members as $member) {
        //     echo $member->pivot->date . ' ' . $member->pivot->starting_hour . ' ' . $member->firstname . PHP_EOL;
        // }
        
    }

    

    public function create(Request $request)
    {
        // $validator = Validator::make($request->all(), [
        //     'affiliationNumber' => 'required|max:191',
        //     'lastName' => 'required|max:191',
        //     'firstName' => 'required|max:191',
        //     'gender' => 'required|max:191',
        //     'ranking' => 'required|max:191',
        //     'dateOfBirth' => 'required|max:191',
        //     'mobile' => 'required|digits:10',
        //     'email' => 'required|max:191',
        //     'password' => 'required|max:191',
        //     'status' => 'required|max:191',
        //     'street' => 'required|max:191',
        //     'postalCode' => 'required|max:191',
        //     'locality' => 'required|max:191',
        // ]);

        // if($validator->fails())
        // {
        //     return response()->json([
        //         'status' => 422,
        //         'errors' => $validator->messages()
        //     ],422);
        // }
        
        
        $reservation = Reservation::create([

            //////

        ]);
        

        if($reservation)
        {
            return response()->json([
                'status' => 200,
                'message' => "Reservation Created Succesfully"
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
        $reservation = Reservation::find($id);

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
                'message' => "No such Reservation Found"
            ],404);
        }
    }

    public function edit($id)
    {
        $reservation = Reservation::find($id);

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
            //////////
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
            $reservation = Reservation::find($id);            
        }

        if($reservation)
        {
            $reservation->update([
                 

                //////////

            ]);


            return response()->json([
                'status' => 200,
                'message' => "Reservation Updated Succesfully"
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
        $reservation = Reservation::find($id);

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
