<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CategoryMemberController;
use App\Http\Controllers\ReservationController;

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

Route::get('reservation',[ReservationController::class, 'list']);
Route::get('reservation/{id}',[ReservationController::class, 'detail']);
Route::post('reservation/create',[ReservationController::class, 'create']);
Route::get('reservation/edit/{id}',[ReservationController::class, 'edit']);
Route::put('reservation/edit/{id}',[ReservationController::class, 'update']);
Route::delete('reservation/delete/{id}',[ReservationController::class, 'delete']);

Route::get('category',[CategoryController::class, 'list']);
Route::get('category/{id}',[CategoryController::class, 'detail']);
Route::post('category/create',[CategoryController::class, 'create']);
Route::get('category/edit/{id}',[CategoryController::class, 'edit']);
Route::put('category/edit/{id}',[CategoryController::class, 'update']);
Route::delete('category/delete/{id}',[CategoryController::class, 'delete']);

Route::get('category_member',[CategoryMemberController::class, 'list']);
Route::get('category_member/{id}',[CategoryMemberController::class, 'detail']);
Route::post('category_member/create',[CategoryMemberController::class, 'create']);
Route::get('category_member/edit/{id}',[CategoryMemberController::class, 'edit']);
Route::put('category_member/edit/{id}',[CategoryMemberController::class, 'update']);
Route::delete('category_member/delete/{id}',[CategoryMemberController::class, 'delete']);