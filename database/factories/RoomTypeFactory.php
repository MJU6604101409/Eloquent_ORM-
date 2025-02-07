<?php

namespace Database\Factories;
use App\Models\RoomType;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\RoomType>
 */
class RoomTypeFactory extends Factory
{
    protected $model = RoomType::class;
    public function definition()
    {
        return [
            'name' => $this->faker->randomElement(['Standard', 'Deluxe', 'Suite', 'Family']),
            'description' => $this->faker->paragraph(),
            'price_per_night' => $this->faker->numberBetween(1000, 5000),
            'capacity' => $this->faker->numberBetween(1, 4)
        ];
    }
}
