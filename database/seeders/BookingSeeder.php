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
        // สร้างข้อมูลลูกค้า
        for ($i = 0; $i < 4; $i++) {
            RoomType::create([
                'name' => fake()->unique()->randomElement(['Standard Room', 'Deluxe Room', 'Family Suite', 'Presidential Suite']),
                'description' => fake()->paragraph(),
                'price_per_night' => fake()->randomElement([1000, 2000, 3500, 5000]),
                'capacity' => fake()->randomElement([2, 4]),
                'prefix' => chr(65 + $i) // A, B, C, D
            ]);
        }

        // สร้างห้องพัก
        RoomType::all()->each(function ($roomType) {
            $numberOfRooms = fake()->randomElement([6, 12]);

            for ($floor = 1; $floor <= 4; $floor++) {
                for ($room = 1; $room <= ($numberOfRooms / 4); $room++) {
                    Room::create([
                        'room_type_id' => $roomType->id,
                        'room_number' => $roomType->prefix . $floor . str_pad($room, 2, '0', STR_PAD_LEFT),
                        'floor' => $floor,
                        'is_available' => fake()->boolean()
                    ]);
                }
            }
        });

        // สร้างการจอง
        $rooms = Room::where('is_available', false)->get();
        $customers = Customer::all();

        foreach ($rooms as $room) {
            $checkIn = fake()->dateTimeBetween('-3 days', '+1 week');
            $checkOut = fake()->dateTimeBetween($checkIn, '+2 weeks');

            Booking::create([
                'customer_id' => $customers->random()->id,
                'room_id' => $room->id,
                'check_in_date' => $checkIn,
                'check_out_date' => $checkOut,
                'total_price' => $room->roomType->price_per_night * fake()->numberBetween(1, 5),
                'status' => fake()->randomElement(['confirmed', 'checked_in', 'checked_out'])
            ]);
        }
    }
}
