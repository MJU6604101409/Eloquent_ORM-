<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CustPd extends Model
{
    use HasFactory;

    protected $table = 'custpds';
    
    protected $fillable = [
        'name',
        'email',
        'phone',
        'address'
    ];

    public function orders()
    {
        return $this->hasMany(Order::class, 'cust_pd_id');
    }
}