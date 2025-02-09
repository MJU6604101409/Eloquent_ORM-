import React from 'react';
import { Head, Link } from '@inertiajs/react';

export default function Show({ booking }) {
    const getStatusColor = (status) => {
        const colors = {
            'pending': 'bg-yellow-100 text-yellow-800 border border-yellow-300',
            'confirmed': 'bg-blue-100 text-blue-800 border border-blue-300',
            'checked_in': 'bg-green-100 text-green-800 border border-green-300',
            'checked_out': 'bg-gray-100 text-gray-800 border border-gray-300',
            'cancelled': 'bg-red-100 text-red-800 border border-red-300'
        };
        return colors[status] || 'bg-gray-100 text-gray-800 border border-gray-300';
    };

    return (
        <>
            <Head title={`การจองห้อง ${booking.room.number}`} />

            <div className="py-12 bg-gray-100 min-h-screen">
                <div className="max-w-5xl mx-auto sm:px-6 lg:px-8">

                    {/* ปุ่มย้อนกลับ */}
                    <div className="mb-6">
                        <Link
                            href={route('bookings.index')}
                            className="inline-flex items-center bg-gray-600 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-700 transition"
                        >
                            ⬅ กลับไปหน้าการจอง
                        </Link>
                    </div>

                    {/* กล่องข้อมูล */}
                    <div className="bg-white shadow-lg rounded-xl p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                            {/* ข้อมูลการจอง */}
                            <div>
                                <h2 className="text-3xl font-extrabold text-gray-800 mb-6">📌 รายละเอียดการจอง</h2>

                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-lg font-semibold mb-2 text-gray-700">สถานะการจอง</h3>
                                        <span className={`px-4 py-1 text-sm font-medium rounded-full ${getStatusColor(booking.status)}`}>
                                            {booking.status}
                                        </span>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-semibold mb-2 text-gray-700">🏨 ข้อมูลห้องพัก</h3>
                                        <div className="bg-gray-50 p-4 rounded-lg border">
                                            <p className="font-medium text-gray-900">ห้อง {booking.room.number}</p>
                                            <p className="text-gray-600">{booking.room.type}</p>
                                            <p className="text-gray-600">💰 ราคา/คืน: ฿{booking.room.price.toLocaleString()}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-semibold mb-2 text-gray-700">📅 ข้อมูลการเข้าพัก</h3>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="bg-blue-50 p-3 rounded-lg text-center">
                                                <p className="text-gray-600">เช็คอิน</p>
                                                <p className="font-medium">{booking.check_in_date.substring(0, 10)}</p>
                                            </div>
                                            <div className="bg-red-50 p-3 rounded-lg text-center">
                                                <p className="text-gray-600">เช็คเอาท์</p>
                                                <p className="font-medium">{booking.check_out_date.substring(0, 10)}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-semibold mb-2 text-gray-700">💳 ราคารวม</h3>
                                        <p className="text-3xl font-bold text-indigo-600">
                                            ฿{booking.total_price.toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* ข้อมูลลูกค้า */}
                            <div>
                                <h2 className="text-3xl font-extrabold text-gray-800 mb-6">👤 ข้อมูลผู้จอง</h2>

                                <div className="bg-gray-50 p-6 rounded-lg border space-y-4">
                                    <div>
                                        <p className="text-gray-600">🆔 ชื่อ-นามสกุล</p>
                                        <p className="font-medium text-gray-900">{booking.customer.name}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">📧 อีเมล</p>
                                        <p className="font-medium text-gray-900">{booking.customer.email}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">📞 เบอร์โทรศัพท์</p>
                                        <p className="font-medium text-gray-900">{booking.customer.phone}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">🆔 เลขบัตรประชาชน</p>
                                        <p className="font-medium text-gray-900">{booking.customer.id_card_number}</p>
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
