<?php

namespace Database\Factories;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Student; // Ensure this is imported
use App\Models\Course; // Ensure this is imported
use App\Models\Register; // Ensure this is imported

class RegisterFactory extends Factory
{
    protected $model = Register::class; // Ensure this is set correctly

    public function definition()
    {
        return [
            'student_id' => Student::factory(),
            'course_id' => Course::factory(),
            'semester' => $this->faker->randomElement(['1', '2', 'Summer']),
            'academic_year' => $this->faker->numberBetween(2023, 2024),
            'grade' => $this->faker->randomElement(['A', 'B+', 'B', 'C+', 'C', 'D+', 'D', 'F']),
        ];
    }
}