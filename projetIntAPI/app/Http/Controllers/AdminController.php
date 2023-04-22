<?php

namespace App\Http\Controllers;
use App\Models\Admin;

use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function getAdmin()
    {
        return response()->json(Admin::all(),200);
    }
}
