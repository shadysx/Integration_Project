<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Member;

class MemberController extends Controller
{
    public function getMember() {
        return response()->json(Member::all(), 200);
    }
}