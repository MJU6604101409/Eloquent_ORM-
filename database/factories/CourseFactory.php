<?php

namespace Database\Factories;

use App\Models\Course;
use App\Models\Teacher;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Course>
 */
class CourseFactory extends Factory
{
    protected $model = Course::class;

    public function definition()
    {
        return [
            'course_code' => fake()->unique()->numerify('CS###'),
            'course_name' => fake()->sentence(3),
            'description' => fake()->paragraph(),
            'credit' => fake()->numberBetween(1, 3),
            'teacher_id' => Teacher::factory(),
        ];
    }
}