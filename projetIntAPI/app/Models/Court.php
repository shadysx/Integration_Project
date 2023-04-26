<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Court extends Model
{
    use HasFactory;

    public function members()
    {
        return $this->belongsToMany(Member::class, 'reservation')
            ->withPivot('date', 'starting_hour', 'member1_id', 'member2_id', 'member3_id', 'member4_id','court_id')
            ->withTimestamps();
    }
}
