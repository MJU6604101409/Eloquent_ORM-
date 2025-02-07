<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Gate;
use Illuminate\Http\RedirectResponse;
use App\Models\Chirp;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ChirpController extends Controller
{
    // แสดงรายการ Chirps ทั้งหมด

    public function index(): Response
    {
        return Inertia::render('Chirps/Index', [
            'chirps' => Chirp::with('user:id,name')->latest()->get(), // ดึงข้อมูล Chirps พร้อม User

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
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([ // ตรวจสอบความถูกต้องของข้อมูล
            'message' => 'required|string|max:255',
        ]);

        $request->user()->chirps()->create($validated); // สร้าง Chirp ใหม่โดยผู้ใช้ที่ล็อกอิน

        return redirect(route('chirps.index'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Chirp $chirp)
    {
        return Inertia::render('Chirps/Show', [
            'chirp' => $chirp,
        ]);
    }
    /**
     * Show the form for editing the specified resource.
    public function edit(Chirp $chirp)
    {
        return Inertia::render('Chirps/Edit', [
            'chirp' => $chirp,
        ]);
    }
    }

    /**
     * Update the specified resource in storage.
     */
    // อัปเดต Chirp
    public function update(Request $request, Chirp $chirp): RedirectResponse
    {
        //ตรวจสอบสิทธิ์การแก้ไข
        Gate::authorize('update', $chirp);

        $validated = $request->validate([
            'message' => 'required|string|max:255',
        ]);

        $chirp->update($validated); // ตรวจสอบสิทธิ์การแก้ไข Chirp

        return redirect(route('chirps.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    // ลบ Chirp

    public function destroy(Chirp $chirp): RedirectResponse
    {
        //
        Gate::authorize('delete', $chirp); // ตรวจสอบสิทธิ์การลบ

        $chirp->delete();

        return redirect(route('chirps.index'));
    }
}
