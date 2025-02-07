<?php

namespace App\Http\Controllers;

use App\Models\Room;
use App\Models\RoomType;
use Inertia\Inertia;

class RoomController extends Controller
{
    public function index()
    {
        $rooms = Room::with('roomType')
            ->get()
            ->map(function ($room) {
                return [
                    'id' => $room->id,
                    'room_number' => $room->room_number,
                    'floor' => $room->floor,
                    'is_available' => $room->is_available,
                    'type' => [
                        'name' => $room->roomType->name,
                        'price' => $room->roomType->price_per_night,
                        'capacity' => $room->roomType->capacity
                    ]
                ];
            });

        $stats = [
            'total' => Room::count(),
            'available' => Room::where('is_available', true)->count(),
            'occupied' => Room::where('is_available', false)->count()
        ];

        return Inertia::render('Rooms/Index', [
            'rooms' => $rooms,
            'stats' => $stats
        ]);
    }

    public function show(Room $room)
    {
        $room->load('roomType', 'bookings.customer');
        
        return Inertia::render('Rooms/Show', [
            'room' => [
                'id' => $room->id,
                'room_number' => $room->room_number,
                'floor' => $room->floor,
                'is_available' => $room->is_available,
                'type' => [
                    'name' => $room->roomType->name,
                    'description' => $room->roomType->description,
                    'price' => $room->roomType->price_per_night,
                    'capacity' => $room->roomType->capacity
                ],
                'current_booking' => $room->bookings()
                    ->where('status', 'checked_in')
                    ->with('customer')
                    ->first()
            ]
        ]);
    }
}
