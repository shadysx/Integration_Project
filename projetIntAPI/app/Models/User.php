<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use HasFactory, Notifiable, HasApiTokens;

    protected $fillable = [
        'affiliationNumber', 
        'lastName', 
        'firstName', 
        'gender', 
        'ranking',
        'dateOfBirth', 
        'mobile', 
        'email', 
        'password', 
        'status', 
        'street',
        'postalCode', 
        'locality',
        'isAdmin',
        "categoryId",
        "hasPaidDues"
    ];

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }

    //Working
    public function categories()
    {
        return $this->belongsToMany(Category::class);
    }
    
}