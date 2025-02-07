<?php

namespace Database\Factories;
use App\Models\Teacher;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Teacher>
 */
class TeacherFactory extends Factory
{
    protected $model = Teacher::class;

    public function definition()
    {
        static $teacherNumber = 1;  // เพิ่มตัวแปร static เพื่อนับลำดับ

        return [
            'teacher_id' => 'T' . str_pad($teacherNumber++, 4, '0', STR_PAD_LEFT),  // เพิ่ม teacher_id กลับมา
            'first_name' => fake()->firstName(),
            'last_name' => fake()->lastName(),
            'email' => fake()->unique()->safeEmail(),
            'phone' => fake()->numerify('08########'),
            'position' => fake()->randomElement([
                'อาจารย์',
                'ผู้ช่วยศาสตราจารย์',
                'รองศาสตราจารย์',
                'ศาสตราจารย์'
            ]),
            'department' => 'วิทยาการคอมพิวเตอร์'
        ];
    }
}
