import React from 'react';
import { Head, Link } from '@inertiajs/react';

export default function Show({ room }) {
    return (
        <>
            <Head title={`ห้อง ${room.room_number} - รายละเอียด`} />
            
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="mb-6">
                        <Link 
                            href={route('rooms.index')} 
                            className="text-indigo-600 hover:text-indigo-800"
                        >
                            ← กลับไปหน้ารายการห้องพัก
                        </Link>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Room Info */}
                                <div>
                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <h1 className="text-3xl font-bold">
                                                ห้อง {room.room_number}
                                            </h1>
                                            <p className="text-gray-500">
                                                {room.type.name} • ชั้น {room.floor}
                                            </p>
                                        </div>
                                        <span className={`px-3 py-1 text-sm rounded-full ${
                                            room.is_available 
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-red-100 text-red-800'
                                        }`}>
                                            {room.is_available ? 'ว่าง' : 'ไม่ว่าง'}
                                        </span>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="border-t border-b border-gray-200 py-4">
                                            <h2 className="text-lg font-semibold mb-2">รายละเอียดห้องพัก</h2>
                                            <p className="text-gray-600 whitespace-pre-line">
                                                {room.type.description}
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <span className="text-gray-500">ราคา/คืน</span>
                                                <div className="text-2xl font-bold text-indigo-600">
                                                    ฿{room.type.price.toLocaleString()}
                                                </div>
                                            </div>
                                            <div>
                                                <span className="text-gray-500">ความจุสูงสุด</span>
                                                <div className="text-2xl font-bold">
                                                    {room.type.capacity} ท่าน
                                                </div>
                                            </div>
                                        </div>

                                        {room.current_booking && (
                                            <div className="border-t border-gray-200 pt-4">
                                                <h2 className="text-lg font-semibold mb-4">ผู้เข้าพักปัจจุบัน</h2>
                                                <div className="bg-gray-50 p-4 rounded-lg">
                                                    <p className="font-medium">{room.current_booking.customer.name}</p>
                                                    <p className="text-gray-500 text-sm">
                                                        เช็คอิน: {room.current_booking.check_in_date}
                                                    </p>
                                                    <p className="text-gray-500 text-sm">
                                                        เช็คเอาท์: {room.current_booking.check_out_date}
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Room Image (Mock) */}
                                <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                                    <img 
                                        src={`https://picsum.photos/seed/${room.id}/800/800`}
                                        alt={`ห้อง ${room.room_number}`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
} 