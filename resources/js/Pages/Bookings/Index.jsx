import React from 'react';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Index({ bookings }) {
    const { delete: destroy } = useForm();

    const getStatusColor = (status) => {
        const colors = {
            'confirmed': 'bg-blue-100 text-blue-800 border border-blue-300',
            'checked_in': 'bg-green-100 text-green-800 border border-green-300',
            'checked_out': 'bg-gray-100 text-gray-800 border border-gray-300'
        };
        return colors[status] || 'bg-gray-100 text-gray-800 border border-gray-300';
    };

    const handleDelete = (booking) => {
        if (confirm('ต้องการยกเลิกการจองนี้?')) {
            destroy(route('bookings.destroy', booking.id));
        }
    };

    return (
        <>
            <Head title="รายการจองห้องพัก" />

            <div className="container mx-auto p-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                    <h1 className="text-3xl font-extrabold text-gray-800">📋 รายการจองห้องพัก</h1>
                    <Link
                        href={route('bookings.create')}
                        className="mt-4 sm:mt-0 bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
                    >
                        ➕ สร้างการจองใหม่
                    </Link>
                </div>

                {/* Table */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <table className="min-w-full border-collapse">
                        <thead className="bg-blue-50 text-gray-600 uppercase text-sm font-semibold">
                            <tr>
                                {['ห้อง', 'ผู้จอง', 'เช็คอิน', 'เช็คเอาท์', 'ราคารวม', 'สถานะ', 'จัดการ'].map((header, index) => (
                                    <th key={index} className="px-6 py-3 text-left border-b">{header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {bookings.map((booking) => (
                                <tr key={booking.id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4">
                                        <span className="font-medium text-gray-900">{booking.room.number}</span>
                                        <div className="text-gray-500 text-sm">{booking.room.type}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="font-medium text-gray-900">{booking.customer.name}</span>
                                        <div className="text-gray-500 text-sm">{booking.customer.phone}</div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">{booking.check_in_date}</td>
                                    <td className="px-6 py-4 text-gray-600">{booking.check_out_date}</td>
                                    <td className="px-6 py-4 font-semibold text-gray-900">
                                        ฿{booking.total_price.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 text-xs rounded-full ${getStatusColor(booking.status)}`}>
                                            {booking.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex space-x-3">
                                            <Link
                                                href={route('bookings.show', booking.id)}
                                                className="text-blue-500 hover:text-blue-700"
                                            >
                                                🔍 รายละเอียด
                                            </Link>
                                            <Link
                                                href={route('bookings.edit', booking.id)}
                                                className="text-green-500 hover:text-green-700"
                                            >
                                                ✏️ แก้ไข
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(booking)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                ❌ ลบทิ้ง
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
