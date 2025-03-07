<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Room extends Model {
    use HasFactory;
    protected $fillable = [
        'room_number',
        'room_type_id',
        'floor',
        'is_available'
    ];

    protected $casts = [
        'is_available' => 'boolean'
    ];

    public function roomType() {
        return $this->belongsTo(RoomType::class);
    }

    public function bookings() {
        return $this->hasMany(Booking::class);
    }
}