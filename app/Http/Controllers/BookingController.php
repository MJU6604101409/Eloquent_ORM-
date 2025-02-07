<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Customer;
use App\Models\Room;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookingController extends Controller
{
    public function index()
    {
        $bookings = Booking::with(['room.roomType', 'customer'])
            ->latest()
            ->get()
            ->map(function ($booking) {
                return [
                    'id' => $booking->id,
                    'room' => [
                        'number' => $booking->room->room_number,
                        'type' => $booking->room->roomType->name
                    ],
                    'customer' => [
                        'name' => $booking->customer->name,
                        'phone' => $booking->customer->phone
                    ],
                    'check_in_date' => $booking->check_in_date,
                    'check_out_date' => $booking->check_out_date,
                    'total_price' => $booking->total_price,
                    'status' => $booking->status,
                ];
            });

        $stats = [
            'total' => Booking::count(),
            'checked_in' => Booking::where('status', 'checked_in')->count(),
            'upcoming' => Booking::where('status', 'confirmed')->count(),
        ];

        return Inertia::render('Bookings/Index', [
            'bookings' => $bookings,
            'stats' => $stats
        ]);
    }

    public function show(Booking $booking)
    {
        $booking->load(['room.roomType', 'customer']);

        return Inertia::render('Bookings/Show', [
            'booking' => [
                'id' => $booking->id,
                'room' => [
                    'number' => $booking->room->room_number,
                    'type' => $booking->room->roomType->name,
                    'price' => $booking->room->roomType->price_per_night
                ],
                'customer' => [
                    'name' => $booking->customer->name,
                    'email' => $booking->customer->email,
                    'phone' => $booking->customer->phone,
                    'id_card_number' => $booking->customer->id_card_number
                ],
                'check_in_date' => $booking->check_in_date,
                'check_out_date' => $booking->check_out_date,
                'total_price' => $booking->total_price,
                'status' => $booking->status,
                'created_at' => $booking->created_at
            ]
        ]);
    }

    public function create()
    {
        $customers = Customer::all();
        $rooms = Room::where('is_available', true)->get();
        return view('bookings.create', compact('customers', 'rooms'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'customer_id' => 'required|exists:customers,id',
            'room_id' => 'required|exists:rooms,id',
            'check_in' => 'required|date|after_or_equal:today',
            'check_out' => 'required|date|after:check_in',
        ]);

        Booking::create($request->all());

        return redirect()->route('bookings.index')->with('success', 'Booking created successfully.');
    }
}
