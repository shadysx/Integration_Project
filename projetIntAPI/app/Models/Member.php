<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Member extends Model
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

    protected $dates = ['dateOfBirth'];

    protected $hidden = ['password'];

    public function setPasswordAttribute($password)
    {
        $this->attributes['password'] = bcrypt($password);
    }



}
