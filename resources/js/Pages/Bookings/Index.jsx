import React from 'react';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Index({ bookings }) {
    const { delete: destroy } = useForm();

    const getStatusColor = (status) => {
        const colors = {
            'confirmed': 'bg-blue-100 text-blue-800',
            'checked_in': 'bg-green-100 text-green-800',
            'checked_out': 'bg-gray-100 text-gray-800'
        };
        return colors[status];
    };

    const handleDelete = (booking) => {
        if (confirm('ต้องการยกเลิกการจองนี้?')) {
            destroy(route('bookings.destroy', booking.id));
        }
    };

    return (
        <>
            <Head title="รายการจองห้องพัก" />

            <div className="container mx-auto p-4">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">รายการจองห้องพัก</h1>
                    <Link
                        href={route('bookings.create')}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        สร้างการจองใหม่
                    </Link>
                </div>

                <div className="bg-white rounded-lg shadow overflow-x-auto">
                    <table className="min-w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    ห้อง
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    ผู้จอง
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    เช็คอิน
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    เช็คเอาท์
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    ราคารวม
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    สถานะ
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    จัดการ
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {bookings.map((booking) => (
                                <tr key={booking.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-medium text-gray-900">
                                            {booking.room.number}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {booking.room.type}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-medium text-gray-900">
                                            {booking.customer.name}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {booking.customer.phone}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {booking.check_in_date}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {booking.check_out_date}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                        ฿{booking.total_price.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(booking.status)}`}>
                                            {booking.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        <div className="flex space-x-2">
                                            <Link
                                                href={route('bookings.show', booking.id)}
                                                className="text-indigo-600 hover:text-indigo-900"
                                            >
                                                รายละเอียด
                                            </Link>
                                            <Link
                                                href={route('bookings.edit', booking.id)}
                                                className="text-blue-600 hover:text-blue-900"
                                            >
                                                แก้ไข
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(booking)}
                                                className="text-red-600 hover:text-red-900"
                                            >
                                                ลบขว้าง
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
