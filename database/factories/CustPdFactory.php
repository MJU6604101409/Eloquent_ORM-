<?php

namespace Database\Factories;

use App\Models\CustPd;
use Illuminate\Database\Eloquent\Factories\Factory;

class CustPdFactory extends Factory
{
    protected $model = CustPd::class;

    public function definition()
    {
        return [
            'name' => $this->faker->name,
            'email' => $this->faker->unique()->safeEmail, // Ensure unique email
            'phone' => $this->faker->phoneNumber,
            'address' => $this->faker->address,
        ];
    }
}