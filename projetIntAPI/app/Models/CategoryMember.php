<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CategoryMember extends Model
{
    use HasFactory;

    protected $table = 'category_members';

    protected $fillable = [
        'member_id',
        'category_id'
    ];
}
