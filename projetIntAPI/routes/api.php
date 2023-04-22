<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\AdminController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//Route::get('members', 'App\Http\Controllers\MemberController@getMember');

Route::get('members',[MemberController::class, 'list']);
Route::get('members/{id}',[MemberController::class, 'detail']);
Route::post('members/create',[MemberController::class, 'create']);
Route::get('members/edit/{id}',[MemberController::class, 'edit']);
Route::put('members/edit/{id}',[MemberController::class, 'update']);
Route::delete('members/delete/{id}',[MemberController::class, 'delete']);


Route::get('admins',[AdminController::class, 'list']);
Route::get('admins/{id}',[AdminController::class, 'detail']);
Route::post('admins/create',[AdminController::class, 'create']);
Route::get('admins/edit/{id}',[AdminController::class, 'edit']);
Route::put('admins/edit/{id}',[AdminController::class, 'update']);
Route::delete('admins/delete/{id}',[AdminController::class, 'delete']);
