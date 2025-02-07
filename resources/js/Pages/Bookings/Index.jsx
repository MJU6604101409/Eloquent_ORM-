import React from 'react';
import { Head, Link } from '@inertiajs/react';

export default function Index({ bookings, stats }) {
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

    // คำนวณเปอร์เซ็นต์สำหรับกราฟแท่ง
    const maxValue = Math.max(stats.total, stats.checked_in, stats.upcoming);
    const getPercentage = (value) => (value / maxValue) * 100;

    return (
        <>
            <Head title="การจองห้องพัก" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                            <div className="text-gray-500 text-sm">การจองทั้งหมด</div>
                            <div className="text-2xl font-bold">{stats.total} รายการ</div>
                        </div>
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                            <div className="text-gray-500 text-sm">เช็คอินแล้ว</div>
                            <div className="text-2xl font-bold text-green-600">{stats.checked_in} ห้อง</div>
                        </div>
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                            <div className="text-gray-500 text-sm">การจองที่กำลังจะมาถึง</div>
                            <div className="text-2xl font-bold text-blue-600">{stats.upcoming} รายการ</div>
                        </div>
                    </div>

                    {/* Simple Bar Chart */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-6">
                        <div className="p-6">
                            <h2 className="text-lg font-semibold mb-6">สถิติการจอง</h2>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span>การจองทั้งหมด</span>
                                        <span className="font-semibold">{stats.total}</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-4">
                                        <div
                                            className="bg-blue-500 h-4 rounded-full transition-all duration-500"
                                            style={{ width: `${getPercentage(stats.total)}%` }}
                                        ></div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span>เช็คอินแล้ว</span>
                                        <span className="font-semibold">{stats.checked_in}</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-4">
                                        <div
                                            className="bg-green-500 h-4 rounded-full transition-all duration-500"
                                            style={{ width: `${getPercentage(stats.checked_in)}%` }}
                                        ></div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span>การจองที่กำลังจะมาถึง</span>
                                        <span className="font-semibold">{stats.upcoming}</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-4">
                                        <div
                                            className="bg-yellow-500 h-4 rounded-full transition-all duration-500"
                                            style={{ width: `${getPercentage(stats.upcoming)}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bookings Table */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h2 className="text-lg font-semibold mb-6">รายการจองห้องพัก</h2>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                ห้อง
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                ลูกค้า
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                วันที่เข้าพัก
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                วันที่ออก
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                ราคารวม
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                สถานะ
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                การจัดการ
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {bookings.map((booking) => (
                                            <tr key={booking.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {booking.room.number}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {booking.room.type}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {booking.customer.name}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {booking.customer.phone}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {booking.check_in_date}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {booking.check_out_date}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    ฿{booking.total_price.toLocaleString()}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(booking.status)}`}>
                                                        {booking.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    <Link
                                                        href={route('bookings.show', booking.id)}
                                                        className="text-indigo-600 hover:text-indigo-900"
                                                    >
                                                        ดูรายละเอียด
                                                    </Link>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex space-x-2">
                                                <Link href={route('bookings.edit', booking.id)} className="text-blue-600 hover:text-blue-900">
                                                    แก้ไข
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(booking.id)}
                                                    className="text-red-600 hover:text-red-900"
                                                >
                                                    ลบ
                                                </button>
                                            </td>

                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
