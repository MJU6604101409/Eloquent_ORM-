<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = ['cust_pd_id', 'order_date', 'total_amount'];

    public function custPd()
    {
        return $this->belongsTo(Cust_pd::class);
    }

    public function orderDetails()
    {
        return $this->hasMany(OrderDetail::class);
    }
}