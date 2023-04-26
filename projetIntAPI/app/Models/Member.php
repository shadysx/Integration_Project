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

    public function courts()
    {
        return $this->belongsToMany(Court::class, 'reservation')
            ->withPivot('date', 'starting_hour', 'member1_id', 'member2_id', 'member3_id', 'member4_id','court_id')
            ->withTimestamps();
    }



}
