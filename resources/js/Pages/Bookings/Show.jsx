import React from 'react';
import { Head, Link } from '@inertiajs/react';

export default function Show({ booking }) {
    const getStatusColor = (status) => {
        const colors = {
            'pending': 'bg-yellow-100 text-yellow-800',
            'confirmed': 'bg-blue-100 text-blue-800',
            'checked_in': 'bg-green-100 text-green-800',
            'checked_out': 'bg-gray-100 text-gray-800',
            'cancelled': 'bg-red-100 text-red-800'
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    return (
        <>
            <Head title={`การจองห้อง ${booking.room.number}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="mb-6">
                        <Link
                            href={route('bookings.index')}
                            className="text-indigo-600 hover:text-indigo-800"
                        >
                            ← กลับไปหน้ารายการจอง
                        </Link>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* ข้อมูลการจอง */}
                                <div>
                                    <h2 className="text-2xl font-bold mb-6">รายละเอียดการจอง</h2>

                                    <div className="space-y-6">
                                        <div>
                                            <h3 className="text-lg font-semibold mb-2">สถานะการจอง</h3>
                                            <span className={`px-3 py-1 text-sm rounded-full ${getStatusColor(booking.status)}`}>
                                                {booking.status}
                                            </span>
                                        </div>

                                        <div>
                                            <h3 className="text-lg font-semibold mb-2">ข้อมูลห้องพัก</h3>
                                            <div className="bg-gray-50 p-4 rounded-lg">
                                                <p className="font-medium">ห้อง {booking.room.number}</p>
                                                <p className="text-gray-600">{booking.room.type}</p>
                                                <p className="text-gray-600">ราคา/คืน: ฿{booking.room.price.toLocaleString()}</p>
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="text-lg font-semibold mb-2">ข้อมูลการเข้าพัก</h3>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <p className="text-gray-600">วันที่เช็คอิน</p>
                                                    <p className="font-medium">{booking.check_in_date}</p>
                                                </div>
                                                <div>
                                                    <p className="text-gray-600">วันที่เช็คเอาท์</p>
                                                    <p className="font-medium">{booking.check_out_date}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="text-lg font-semibold mb-2">ราคารวม</h3>
                                            <p className="text-2xl font-bold text-indigo-600">
                                                ฿{booking.total_price.toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* ข้อมูลลูกค้า */}
                                <div>
                                    <h2 className="text-2xl font-bold mb-6">ข้อมูลผู้จอง</h2>

                                    <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                                        <div>
                                            <p className="text-gray-600">ชื่อ-นามสกุล</p>
                                            <p className="font-medium">{booking.customer.name}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-600">อีเมล</p>
                                            <p className="font-medium">{booking.customer.email}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-600">เบอร์โทรศัพท์</p>
                                            <p className="font-medium">{booking.customer.phone}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-600">เลขบัตรประชาชน</p>
                                            <p className="font-medium">{booking.customer.id_card_number}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
