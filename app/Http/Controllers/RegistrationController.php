<?php

namespace App\Http\Controllers;

use App\Models\Register;
use App\Models\Course;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class RegistrationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $registrations = Register::with(['student', 'course.teacher'])
            ->latest()
            ->paginate(12);

        // เพิ่มการ debug
        // dd($registrations->total()); // ดูจำนวนข้อมูลทั้งหมด
        // dd(Register::count()); // ดูจำนวนข้อมูลทั้งหมดในตาราง registers
        // dd(Student::count()); // ดูจำนวนข้อมูลทั้งหมดในตาราง students

        return Inertia::render('StudentReg/Index', [
            'registrations' => $registrations,
            'filters' => request()->all(['search', 'field', 'direction']),
            'total_students' => Student::count(),
            'total_registrations' => Register::count(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function stats()
    {
        // สถิติเกรดเฉลี่ยแต่ละวิชา
        $courseStats = Course::select('courses.course_name')
            ->selectRaw('AVG(registers.grade) as average_grade')
            ->selectRaw('COUNT(registers.id) as student_count')
            ->leftJoin('registers', 'courses.id', '=', 'registers.course_id')
            ->groupBy('courses.id', 'courses.course_name')
            ->get();

        // จำนวนนักศึกษาที่ลงทะเบียนในแต่ละเทอม
        $semesterStats = Register::select('semester', 'academic_year')
            ->selectRaw('COUNT(DISTINCT student_id) as student_count')
            ->groupBy('semester', 'academic_year')
            ->orderBy('academic_year')
            ->orderBy('semester')
            ->get();

        return view('registration.stats', compact('courseStats', 'semesterStats'));
    }
}
