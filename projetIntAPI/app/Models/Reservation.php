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
        'user1_id',
        'user2_id' ,
        'user3_id' ,
        'user4_id',
        'court_id'  
    ];

     
}


