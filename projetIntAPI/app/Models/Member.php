<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Tymon\JWTAuth\Contracts\JWTSubject;

class Member extends Model implements JWTSubject
{
    use HasFactory;

    protected $table = 'members';

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
        'locality'
    ];

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }

    protected $dates = ['dateOfBirth'];

    protected $hidden = ['password'];

    public function setPasswordAttribute($password)
    {
        $this->attributes['password'] = bcrypt($password);
    }

    public function courts()
    {
        return $this->belongsToMany(Court::class, 'reservations')
            ->withPivot('date', 'starting_hour', 'user1_id', 'user2_id', 'user3_id', 'user_4','court_id')
            ->withTimestamps();
    }

    public function categories()
    {
        return $this->belongsToMany(Category::class, 'category_user')
            ->withPivot('user_id','category_id')
            ->withTimestamps();
    }



}
