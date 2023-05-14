<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CategoryMemberController;
use App\Http\Controllers\CourtController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\UserController;

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

Route::get('users',[UserController::class, 'list']);
Route::get('users/{id}',[UserController::class, 'detail']);
Route::post('users/create',[UserController::class, 'create']);
Route::get('users/edit/{id}',[UserController::class, 'edit']);
Route::put('users/edit/{id}',[UserController::class, 'update']);
Route::delete('users/delete/{id}',[UserController::class, 'delete']);

Route::get('reservations',[ReservationController::class, 'list']);
Route::get('reservations/{id}',[ReservationController::class, 'detail']);
Route::post('reservations/create',[ReservationController::class, 'create']);
Route::get('reservations/edit/{id}',[ReservationController::class, 'edit']);
Route::put('reservations/edit/{id}',[ReservationController::class, 'update']);
Route::delete('reservations/delete/{id}',[ReservationController::class, 'delete']);

Route::get('categories',[CategoryController::class, 'list']);
Route::get('categories/{id}',[CategoryController::class, 'detail']);
Route::post('categories/create',[CategoryController::class, 'create']);
Route::get('categories/edit/{id}',[CategoryController::class, 'edit']);
Route::put('categories/edit/{id}',[CategoryController::class, 'update']);
Route::delete('categories/delete/{id}',[CategoryController::class, 'delete']);

Route::get('category_member',[CategoryMemberController::class, 'list']);
Route::get('category_member/{id}',[CategoryMemberController::class, 'detail']);
Route::post('category_member/create',[CategoryMemberController::class, 'create']);
Route::get('category_member/edit/{id}',[CategoryMemberController::class, 'edit']);
Route::put('category_member/edit/{id}',[CategoryMemberController::class, 'update']);
Route::delete('category_member/delete/{id}',[CategoryMemberController::class, 'delete']);

Route::post('auth/login',[AuthController::class, 'login']);
Route::post('auth/register',[AuthController::class, 'register']);

Route::get('courts',[CourtController::class, 'list']);