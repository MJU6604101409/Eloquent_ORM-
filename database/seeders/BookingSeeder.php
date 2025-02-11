<?php

namespace Database\Seeders;

use App\Models\RoomType;
use App\Models\Room;
use App\Models\Customer;
use App\Models\Booking;
use Illuminate\Database\Seeder;

class BookingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // สร้าง RoomTypes 4 ประเภท
        $roomTypes = collect(['Standard Room', 'Deluxe Room', 'Family Suite', 'Presidential Suite']);
        $roomTypeIds = [];

        foreach ($roomTypes as $i => $type) {
            $roomType = RoomType::create([
                'name' => $type,
                'description' => fake()->paragraph(),
                'price_per_night' => fake()->randomElement([1000, 2000, 3500, 5000]),
                'capacity' => fake()->randomElement([2, 4]),
                'prefix' => chr(65 + $i) // A, B, C, D
            ]);
            $roomTypeIds[] = $roomType->id;
        }

        // สร้างห้องพัก 20 ห้อง (5 ห้องต่อประเภท)
        $rooms = [];
        foreach ($roomTypeIds as $index => $roomTypeId) {
            $roomType = RoomType::find($roomTypeId); // ดึงข้อมูล RoomType เพื่อใช้ prefix
            for ($i = 1; $i <= 5; $i++) {
                $rooms[] = Room::create([
                    'room_type_id' => $roomTypeId,
                    'room_number' => $roomType->prefix . str_pad($i, 3, '0', STR_PAD_LEFT), // A001, A002, ...
                    'floor' => fake()->numberBetween(1, 5),
                    'is_available' => fake()->boolean(),
                ]);
            }
        }

        // สร้างลูกค้า 100 คน
        Customer::factory()->count(100)->create();

        // ดึงข้อมูลห้องและลูกค้า
        $customers = Customer::all();

        // สร้างการจอง 100 รายการ
        $bookings = [];
        for ($i = 0; $i < 100; $i++) {
            $room = fake()->randomElement($rooms);
            $checkIn = fake()->dateTimeBetween('-3 days', '+1 week');
            $checkOut = fake()->dateTimeBetween($checkIn, '+2 weeks');

            $bookings[] = [
                'customer_id' => $customers->random()->id,
                'room_id' => $room->id,
                'check_in_date' => $checkIn,
                'check_out_date' => $checkOut,
                'total_price' => $room->roomType->price_per_night * fake()->numberBetween(1, 5),
                'status' => fake()->randomElement(['confirmed', 'checked_in', 'checked_out']),
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        Booking::insert($bookings); // ใช้ insert() เพื่อให้เร็วขึ้น
    }
}
