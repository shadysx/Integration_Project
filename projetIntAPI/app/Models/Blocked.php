<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Blocked extends Model
{
    use HasFactory;

    protected $table = 'blockeds';

    protected $fillable = [
        'begin_hour',
        'date',
        'duration',
        'reason',
        'user_id',
        'court_id'
    ];
}
