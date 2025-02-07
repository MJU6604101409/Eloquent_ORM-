<?php

namespace Database\Seeders;

use App\Models\Teacher;
use App\Models\Student;
use App\Models\Course;
use App\Models\Register;
use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Factories\Sequence;

class RegisterSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // สร้างข้อมูลพื้นฐานถ้ายังไม่มี
        if (Teacher::count() === 0) {
            Teacher::factory()
                ->count(10)
                ->state(new Sequence(
                    fn ($sequence) => [
                        'teacher_id' => 'T' . str_pad($sequence->index + 1, 4, '0', STR_PAD_LEFT),
                    ],
                ))
                ->create();
        }

        // สร้างนักศึกษาเพิ่ม 10 คน
        $newStudents = Student::factory(5)->create();

        if (Course::count() === 0) {
            Course::factory()
                ->count(20)
                ->state(new Sequence(
                    fn ($sequence) => [
                        'course_code' => 'CS' . str_pad($sequence->index + 1, 3, '0', STR_PAD_LEFT),
                    ],
                ))
                ->create();
        }

        // สร้างข้อมูลการลงทะเบียนสำหรับนักศึกษาใหม่
        $courses = Course::all();
        
        $newStudents->each(function ($student) use ($courses) {
            // สุ่มเลือกวิชา 3-6 วิชา
            $selectedCourses = $courses->random(fake()->numberBetween(3, 6));
            
            foreach ($selectedCourses as $course) {
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
