<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
class Chirp extends Model
{
    // ฟิลด์ที่อนุญาตให้บันทึกข้อมูลได้
    protected $fillable = [
        'message',
    ];
        // เชื่อมความสัมพันธ์กับ User (เจ้าของ Chirp)
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
