<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\RoomType;
use App\Models\Room;
use App\Models\Customer;
use App\Models\Booking;
use App\Models\Product;
use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\Teacher;
use App\Models\Student;
use App\Models\Course;
use App\Models\Register;
use Illuminate\Database\Eloquent\Factories\Sequence;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $this->call([
            ProductSeeder::class,
            BookingSeeder::class,
            RegisterSeeder::class,
        ]);
    }

    private function seedHotelSystem()
    {
        // สร้างประเภทห้องพัก
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

        // สร้างลูกค้า
        Customer::factory(20)->create();

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

    private function seedProductSystem()
    {
        // สร้างสินค้า
        Product::factory(50)->create();

        // สร้างคำสั่งซื้อ
        $customers = Customer::all();
        $products = Product::all();

        // สร้าง 30 คำสั่งซื้อ
        for ($i = 0; $i < 30; $i++) {
            $order = Order::create([
                'customer_id' => $customers->random()->id,
                'order_date' => fake()->dateTimeBetween('-1 month', 'now'),
                'total_price' => 0,
                'status' => fake()->randomElement(['pending', 'processing', 'completed', 'cancelled'])
            ]);

            // สุ่มจำนวนสินค้าในแต่ละคำสั่งซื้อ (1-5 ชิ้น)
            $orderProducts = $products->random(fake()->numberBetween(1, 5));
            $total = 0;

            foreach ($orderProducts as $product) {
                $quantity = fake()->numberBetween(1, 3);
                $price = $product->price;
                
                OrderDetail::create([
                    'order_id' => $order->id,
                    'product_id' => $product->id,
                    'quantity' => $quantity,
                    'price' => $price
                ]);

                $total += $price * $quantity;
            }

            $order->update(['total_price' => $total]);
        }
    }

    private function seedRegistrationSystem()
    {
        // สร้างข้อมูลอาจารย์ 10 คน
        Teacher::factory()
            ->count(10)
            ->state(new Sequence(
                fn ($sequence) => [
                    'teacher_id' => 'T' . str_pad($sequence->index + 1, 4, '0', STR_PAD_LEFT),
                ],
            ))
            ->create();

        // สร้างข้อมูลนักศึกษา 50 คน
        Student::factory(50)->create();

        // สร้างข้อมูลรายวิชา 20 วิชา
        Course::factory()
            ->count(20)
            ->state(new Sequence(
                fn ($sequence) => [
                    'course_code' => 'CS' . str_pad($sequence->index + 1, 3, '0', STR_PAD_LEFT),
                ],
            ))
            ->create();

        // สร้างข้อมูลการลงทะเบียน
        Student::all()->each(function ($student) {
            $courses = Course::inRandomOrder()->take(fake()->numberBetween(3, 6))->get();
            
            foreach ($courses as $course) {
                Register::create([
                    'student_id' => $student->id,
                    'course_id' => $course->id,
                    'semester' => fake()->randomElement(['1/2566', '2/2566']),
                    'academic_year' => fake()->numberBetween(2022, 2023),
                    'grade' => fake()->randomFloat(2, 0, 4)
                ]);
            }
        });
    }
}