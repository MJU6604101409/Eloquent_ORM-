<?php

namespace Database\Factories;
use App\Models\Order;
use App\Models\CustPd;  
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
{
    protected $model = Order::class;

    public function definition()
    {
        return [
            'cust_pd_id' => CustPd::factory(),
            'order_date' => fake()->dateTimeThisYear(),
            'total_amount' => fake()->randomFloat(2, 1000, 50000),
            'status' => $this->faker->randomElement(['pending', 'processing', 'completed', 'cancelled'])
        ];
    }
}
