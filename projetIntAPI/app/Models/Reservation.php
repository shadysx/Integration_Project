<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    use HasFactory;

    protected $table = 'reservations';

    protected $fillable = [
        'starting_hour',
        'ending_hour',
        'date',
        'member1_id',
        'member2_id' ,
        'member3_id' ,
        'member4_id',
        'court_id'  
    ];

     
}


