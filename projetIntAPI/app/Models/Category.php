<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $table = 'categories';

    protected $fillable = [
        'name',
        'ageMin',
        'ageMax'
    ];

    public function members()
    {
        return $this->belongsToMany(Member::class, 'members')
            ->withPivot('member_id','category_id')
            ->withTimestamps();
    }
}
