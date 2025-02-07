<?php

// database/seeders/ProductSeeder.php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\Customer;

class ProductSeeder extends Seeder
{
    public function run()
    {
        // สร้างลูกค้าก่อน
        if (Customer::count() === 0) {
            Customer::factory(20)->create();
        }

        // สร้างสินค้า
        Product::factory(50)->create();

        // ตรวจสอบว่ามีลูกค้าและสินค้าก่อนสร้างคำสั่งซื้อ
        $customers = Customer::all();
        $products = Product::all();

        if ($customers->isNotEmpty() && $products->isNotEmpty()) {
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
    }
}

// database