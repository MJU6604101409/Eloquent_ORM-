<?php

namespace App\Http\Controllers;

use App\Models\RoomType;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RoomTypeController extends Controller
{
    public function index()
    {
        $roomTypes = RoomType::withCount(['rooms' => function($query) {
            $query->where('is_available', true);
        }])->get()->map(function ($type) {
            return [
                'id' => $type->id,
                'name' => $type->name,
                'description' => $type->description,
                'price' => $type->price_per_night,
                'capacity' => $type->capacity,
                'total_rooms' => $type->rooms()->count(),
                'available_rooms' => $type->rooms_count
            ];
        });

        return Inertia::render('RoomTypes/Index', [
            'roomTypes' => $roomTypes
        ]);
    }

    public function show(RoomType $roomType)
    {
        $roomType->load(['rooms' => function($query) {
            $query->with('bookings.customer');
        }]);

        return Inertia::render('RoomTypes/Show', [
            'roomType' => $roomType
        ]);
    }
} 