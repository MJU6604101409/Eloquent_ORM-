<?php
//สร้างฐานข้อมูล
use Illuminate\Database\Migrations\Migration; 
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
        
// สร้างตาราง chirps 
    public function up(): void
    {
        Schema::create('chirps', function (Blueprint $table) {
            $table->id(); // Primary Key
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('message'); // เก็บข้อความของ Chirp
            $table->timestamps(); // เก็บเวลาสร้างและแก้ไข
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('chirps');
    }
};
