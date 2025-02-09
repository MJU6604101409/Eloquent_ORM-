<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Customer;
use App\Models\Room;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookingController extends Controller
{
    // 1. แสดงรายการจองทั้งหมด
    public function index()
    {
        // ดึงข้อมูลการจองพร้อมความสัมพันธ์ (room, roomType, customer)
        $bookings = Booking::with(['room.roomType', 'customer'])
            ->latest() // เรียงตามวันที่ล่าสุด
            ->get()
            ->map(function ($booking) {
                // จัดรูปแบบข้อมูลสำหรับส่งไป frontend
                return [
                    'id' => $booking->id, // รหัสการจอง
                    'room' => [
                        'number' => $booking->room->room_number, // เลขห้อง
                        'type' => $booking->room->roomType->name // ประเภทห้อง
                    ],
                    'customer' => [
                        'name' => $booking->customer->name, // ชื่อลูกค้า
                        'phone' => $booking->customer->phone // เบอร์โทรลูกค้า
                    ],
                    'check_in_date' => $booking->check_in_date->format('d/m/Y'), // วันที่เช็คอิน
                    'check_out_date' => $booking->check_out_date->format('d/m/Y'), // วันที่เช็คเอาท์
                    'total_price' => $booking->total_price, // ราคารวม
                    'status' => $booking->status // สถานะการจอง
                ];
            });
        // สถิติการจอง
        $stats = [
            'total' => Booking::count(),  // จำนวนการจองทั้งหมด
            'checked_in' => Booking::where('status', 'checked_in')->count(), // จำนวนการจองที่เช็คอิน
            'upcoming' => Booking::where('status', 'confirmed')->count(), // จำนวนการจองที่ยังไม่เช็คเอาท์
        ];

        return Inertia::render('Bookings/Index', [
            'bookings' => $bookings, // ข้อมูลการจอง
            'stats' => $stats // สถิติการจอง
        ]);
    }

    // 2. แสดงรายละเอียดการจอง
    public function show(Booking $booking)
    {
        $booking->load(['room.roomType', 'customer']);
        // ส่งข้อมูลรายละเอียดไป frontend
        return Inertia::render('Bookings/Show', [
            'booking' => [
                'id' => $booking->id, // รหัสการจอง
                'room' => [
                    'number' => $booking->room->room_number, // เลขห้อง
                    'type' => $booking->room->roomType->name, // ประเภทห้อง
                    'price' => $booking->room->roomType->price_per_night // ราคาห้อง
                ],
                'customer' => [
                    'name' => $booking->customer->name, // ชื่อลูกค้า
                    'email' => $booking->customer->email, // อีเมลลูกค้า
                    'phone' => $booking->customer->phone, // เบอร์โทรลูกค้า
                    'id_card_number' => $booking->customer->id_card_number // เลขบัตรประชาชน
                ],
                'check_in_date' => $booking->check_in_date, // วันที่เช็คอิน
                'check_out_date' => $booking->check_out_date, // วันที่เช็คเอาท์
                'total_price' => $booking->total_price, // ราคารวม
                'status' => $booking->status, // สถานะการจอง
                'created_at' => $booking->created_at // วันที่สร้าง
            ]
        ]);
    }

    // 3. สร้างการจอง
    public function create()
    {
        // ดึงข้อมูลห้องที่ว่างทั้งหมด
        $rooms = Room::with('roomType')
            ->where('is_available', true) // ห้องว่าง
            ->get()
            ->map(function ($room) {
                return [
                    'id' => $room->id, // รหัสห้อง
                    'number' => $room->room_number, // เลขห้อง
                    'type' => $room->roomType->name, // ประเภทห้อง
                    'price' => $room->roomType->price_per_night // ราคาห้อง
                ];
            });

        return Inertia::render('Bookings/Create', [
            'rooms' => $rooms // ข้อมูลห้อง
        ]);
    }

    // 4. บันทึกการจองใหม่
    public function store(Request $request)
    {
        // ตรวจสอบความถูกต้องของข้อมูล
        $validated = $request->validate([
            'customer_name' => 'required|string|max:255', // ชื่อลูกค้า
            'customer_phone' => 'required|string|max:20', // เบอร์โทรลูกค้า
            'customer_email' => 'required|email|max:255', // อีเมลลูกค้า
            'customer_address' => 'required|string', // ที่อยู่ลูกค้า
            'customer_id_card_number' => 'required|string|max:13', // เลขบัตรประชาชน
            'room_id' => 'required|exists:rooms,id', // รหัสห้อง
            'check_in_date' => 'required|date|after_or_equal:today', // วันที่เช็คอิน
            'check_out_date' => 'required|date|after:check_in_date', // วันที่เช็คเอาท์
        ]);
        // สร้างข้อมูลลูกค้าใหม่
        $customer = Customer::create([
            'name' => $validated['customer_name'], // ชื่อลูกค้า
            'phone' => $validated['customer_phone'], // เบอร์โทรลูกค้า
            'email' => $validated['customer_email'], // อีเมลลูกค้า
            'address' => $validated['customer_address'], // ที่อยู่ลูกค้า
            'id_card_number' => $validated['customer_id_card_number'] // เลขบัตรประชาชน
        ]);
        // คำนวณจำนวนวันและราคารวม
        $checkIn = \Carbon\Carbon::parse($validated['check_in_date']); //Carbon: ไลบรารีจัดการวันที่ของ PHP
        $checkOut = \Carbon\Carbon::parse($validated['check_out_date']);
        $numberOfDays = $checkIn->diffInDays($checkOut);

        $room = Room::with('roomType')->find($validated['room_id']); //roomType: ความสัมพันธ์ที่เชื่อมไปยังข้อมูลประเภทห้องที่มีราคาต่อคืน
        $totalPrice = $room->roomType->price_per_night * $numberOfDays; //ราคารวม = ราคาต่อคืน × จำนวนวัน
        // สร้างข้อมูลการจองใหม่
        Booking::create([
            'customer_id' => $customer->id, // ลูกค้า
            'room_id' => $validated['room_id'], // ห้อง
            'check_in_date' => $validated['check_in_date'], // วันที่เช็คอิน
            'check_out_date' => $validated['check_out_date'], // วันที่เช็คเอาท์
            'total_price' => $totalPrice, // ราคารวม
            'status' => 'confirmed' // สถานะการจอง
        ]);
        // อัปเดตสถานะห้องเป็นไม่ว่าง
        $room->update(['is_available' => false]);

        return redirect()->route('bookings.index')
            ->with('success', 'สร้างการจองเรียบร้อยแล้ว');
    }
    // 5. แก้ไขการจอง
    public function edit(Booking $booking)
    {
        // ดึงข้อมูลห้องที่ว่างและห้องปัจจุบัน
        $booking->load(['room.roomType', 'customer']);

        $rooms = Room::with('roomType')
            ->where('is_available', true) // ห้องว่าง
            ->orWhere('id', $booking->room_id) // รวมห้องปัจจุบันด้วย
            ->get()
            ->map(function ($room) {
                return [
                    'id' => $room->id,
                    'number' => $room->room_number,
                    'type' => $room->roomType->name,
                    'price' => $room->roomType->price_per_night
                ];
            });

        return Inertia::render('Bookings/Edit', [
            'booking' => [
                'id' => $booking->id, // รหัสการจอง
                'room' => [
                    'id' => $booking->room->id, // รหัสห้อง
                    'number' => $booking->room->room_number, // เลขห้อง
                    'type' => $booking->room->roomType->name, // ประเภทห้อง
                    'price' => $booking->room->roomType->price_per_night // ราคาห้อง
                ],
                'customer' => [
                    'name' => $booking->customer->name, // ชื่อลูกค้า
                    'email' => $booking->customer->email, // อีเมลลูกค้า
                    'phone' => $booking->customer->phone, // เบอร์โทรลูกค้า
                    'address' => $booking->customer->address, // ที่อยู่ลูกค้า
                    'id_card_number' => $booking->customer->id_card_number // เลขบัตรประชาชน
                ],
                'check_in_date' => $booking->check_in_date->format('Y-m-d'), // วันที่เช็คอิน
                'check_out_date' => $booking->check_out_date->format('Y-m-d') // วันที่เช็คเอาท์
            ],
            'rooms' => $rooms // ข้อมูลห้อง
        ]);
    }
    // 6. อัปเดตข้อมูลการจอง
    public function update(Request $request, Booking $booking)
    {
        // ตรวจสอบความถูกต้องของข้อมูล
        $validated = $request->validate([
            'customer_name' => 'required|string|max:255', // ชื่อลูกค้า
            'customer_phone' => 'required|string|max:20', // เบอร์โทรลูกค้า
            'customer_email' => 'required|email|max:255', // อีเมลลูกค้า
            'customer_address' => 'required|string', // ที่อยู่ลูกค้า
            'customer_id_card_number' => 'required|string|max:13', // เลขบัตรประชาชน
            'room_id' => 'required|exists:rooms,id', // รหัสห้อง
            'check_in_date' => 'required|date', // วันที่เช็คอิน
            'check_out_date' => 'required|date|after:check_in_date', // วันที่เช็คเอาท์
        ]);

        // อัปเดตข้อมูลลูกค้า
        $booking->customer->update([
            'name' => $validated['customer_name'], // ชื่อลูกค้า
            'phone' => $validated['customer_phone'], // เบอร์โทรลูกค้า
            'email' => $validated['customer_email'], // อีเมลลูกค้า
            'address' => $validated['customer_address'], // ที่อยู่ลูกค้า
            'id_card_number' => $validated['customer_id_card_number'] // เลขบัตรประชาชน
        ]);

        // คำนวณราคาใหม่
        $checkIn = \Carbon\Carbon::parse($validated['check_in_date']); //Carbon: ไลบรารีจัดการวันที่ของ PHP
        $checkOut = \Carbon\Carbon::parse($validated['check_out_date']);
        $numberOfDays = $checkIn->diffInDays($checkOut); //diffInDays(): เมธอดของ Carbon สำหรับคำนวณจำนวนวันระหว่าง 2 วันที่

        $room = Room::with('roomType')->find($validated['room_id']); //roomType: ความสัมพันธ์ที่เชื่อมไปยังข้อมูลประเภทห้องที่มีราคาต่อคืน
        $totalPrice = $room->roomType->price_per_night * $numberOfDays; //ราคารวม = ราคาต่อคืน × จำนวนวัน

        // อัปเดตข้อมูลการจอง
        $booking->update([
            'room_id' => $validated['room_id'], // รหัสห้อง
            'check_in_date' => $validated['check_in_date'], // วันที่เช็คอิน
            'check_out_date' => $validated['check_out_date'], // วันที่เช็คเอาท์
            'total_price' => $totalPrice // ราคารวม
        ]);

        return redirect()->route('bookings.show', $booking->id)
            ->with('success', 'อัปเดตข้อมูลการจองเรียบร้อยแล้ว');
    }

    // 7. ลบการจอง
    public function destroy(Booking $booking)
    {
        // ลบข้อมูลการจอง
        $booking->delete();
        // ส่งข้อความสำเร็จ
        return redirect()->route('bookings.index')
            ->with('success', 'ยกเลิกการจองเรียบร้อยแล้ว');
    }
}
