<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class EmployeeController extends Controller
{
    public function index(Request $request)
    { 
        $query = $request->input('search'); 
        $sortBy = $request->input('sortBy', 'emp_no'); 
        $sortDirection = $request->input('sortDirection', 'asc'); 

        $employees = DB::table("employees")
                ->where(function($q) use ($query) { 
                    if ($query) { 
                        $q->where('first_name', 'like', '%' . $query . '%') 
                          ->orWhere('last_name', 'like', '%' . $query . '%'); 
                    }
                })
                ->orderBy($sortBy, $sortDirection) 
                ->paginate(10)  
                ->appends(['search' => $query, 'sortBy' => $sortBy, 'sortDirection' => $sortDirection]); 
     
        return Inertia::render('Employee/Index', [
            'employees' => $employees, 
            'query' => $query, 
            'sortBy' => $sortBy, 
            'sortDirection' => $sortDirection, 
        ]); 
    }

    public function create()
    {   
        $departments = DB::table('departments')
            ->select('dept_no', 'dept_name')
            ->get();
        
        return inertia('Employee/Create', [
            'departments' => $departments
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'birth_date' => 'required|date|before:today',
            'hire_date' => 'required|date',
            'dept_no' => 'required|string|exists:departments,dept_no',
            'gender' => 'nullable|string|in:Male,Female',
            'profile_picture' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]); 

        $profilePicturePath = null;
        if ($request->hasFile('profile_picture')) {
            $profilePicturePath = $request->file('profile_picture')->store('profile_pictures', 'public');
        }
        
        DB::transaction(function () use ($validated, $profilePicturePath) {
            $latestEmpNo = DB::table('employees')->max('emp_no') ?? 0;
            $newEmpNo = $latestEmpNo + 1;

            DB::table('employees')->insert([
                'emp_no' => $newEmpNo,
                'first_name' => $validated['first_name'],
                'last_name' => $validated['last_name'],
                'birth_date' => $validated['birth_date'],
                'hire_date' => $validated['hire_date'],
                'gender' => $validated['gender'] === 'Male' ? 'M' : 'F',
                'profile_picture' => $profilePicturePath ? 'storage/' . $profilePicturePath : null,
            ]);
            // insert to dept_emp table
            DB::table('dept_emp')->insert([
                'emp_no' => $newEmpNo,
                'dept_no' => $validated['dept_no'],
                'from_date' => now(),
                'to_date' => now()->addYears(5)->format('Y-m-d'), 
            ]);
        });

        return redirect()->route('employees.index')
            ->with('success', 'Employee created successfully.');
    }

    // Optional: Add a method to display employee details with profile picture
    public function show(string $id)
    {
        $employee = DB::table('employees')
            ->join('dept_emp', 'employees.emp_no', '=', 'dept_emp.emp_no')
            ->join('departments', 'dept_emp.dept_no', '=', 'departments.dept_no')
            ->where('employees.emp_no', $id)
            ->select('employees.*', 'departments.dept_name')
            ->first();

        return Inertia::render('Employee/Show', [
            'employee' => $employee
        ]);
    }
}