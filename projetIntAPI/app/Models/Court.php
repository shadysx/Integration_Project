<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Court extends Model
{
    use HasFactory;

    protected $table = 'courts';

    protected $fillable = [        
        'number'
    ];
    
    public function users()
    {
        return $this->belongsToMany(User::class, 'blocked')
            ->withPivot('user_id','court_id', 'begin_hour')
            ->withTimestamps();
    }
}
