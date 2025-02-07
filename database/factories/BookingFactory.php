<?php

namespace Database\Factories;
use App\Models\Cust; // Import the correct model
use App\Models\Room;
use App\Models\Booking;
use App\Models\Customer;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Booking>
 */
class BookingFactory extends Factory
{
    protected $model = Booking::class; // ทำการเปลี่ยนชื่อคลาสเป็น BookingFactory และเปลี่ยนชื่อโมเดลเป็น Booking

    public function definition()
    {
        $checkIn = $this->faker->dateTimeBetween('now', '+2 months');
        $checkOut = $this->faker->dateTimeBetween($checkIn, '+5 days');

        return [
            'customer_id' => Customer::factory(),
            'room_id' => Room::factory(),
            'check_in_date' => $checkIn,
            'check_out_date' => $checkOut,
            'total_price' => $this->faker->numberBetween(1000, 15000),
            'status' => $this->faker->randomElement(['pending', 'confirmed', 'checked_in', 'checked_out', 'cancelled'])
        ];
    }
}
