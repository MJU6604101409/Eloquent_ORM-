import React, { useState } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";


export default function Index({ bookings }) {
    const { delete: destroy } = useForm();

    // ✅ สร้าง State สำหรับค้นหา & การแบ่งหน้า
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // ✅ แสดงหน้าละ 10 รายการ

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

    // ✅ ฟิลเตอร์ข้อมูลตามคำค้นหา
    const filteredBookings = bookings.filter((booking) =>
        booking.room?.number.includes(search) || booking.customer?.name.includes(search)
    );

    // ✅ คำนวณหน้าปัจจุบัน
    const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
    const paginatedBookings = filteredBookings.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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

                {/* ✅ ช่องค้นหา */}
                <div className="mb-4">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="🔍 ค้นหาหมายเลขห้อง หรือชื่อลูกค้า"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
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
                            {paginatedBookings.length > 0 ? (
                                paginatedBookings.map((booking) => (
                                    <tr key={booking.id} className="hover:bg-gray-50 transition">
                                        {/* ห้องพัก */}
                                        <td className="px-6 py-4">
                                            {booking.room ? (
                                                <>
                                                    <span className="font-medium text-gray-900">{booking.room?.number}</span>
                                                    <div className="text-gray-500 text-sm">{booking.room?.type}</div>
                                                </>
                                            ) : (
                                                <span className="text-gray-500">ไม่มีข้อมูลห้อง</span>
                                            )}
                                        </td>

                                        {/* ผู้จอง */}
                                        <td className="px-6 py-4">
                                            {booking.customer ? (
                                                <>
                                                    <span className="font-medium text-gray-900">{booking.customer?.name}</span>
                                                    <div className="text-gray-500 text-sm">{booking.customer?.phone}</div>
                                                </>
                                            ) : (
                                                <span className="text-gray-500">ไม่มีข้อมูลลูกค้า</span>
                                            )}
                                        </td>

                                        {/* เช็คอิน & เช็คเอาท์ */}
                                        <td className="px-6 py-4 text-gray-600">{booking.check_in_date || '-'}</td>
                                        <td className="px-6 py-4 text-gray-600">{booking.check_out_date || '-'}</td>

                                        {/* ราคารวม */}
                                        <td className="px-6 py-4 font-semibold text-gray-900">
                                            ฿{booking.total_price ? booking.total_price.toLocaleString() : '0'}
                                        </td>

                                        {/* สถานะ */}
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 text-xs rounded-full ${getStatusColor(booking.status)}`}>
                                                {booking.status}
                                            </span>
                                        </td>

                                        {/* ปุ่มจัดการ */}
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
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="text-center py-6 text-gray-500">ไม่มีข้อมูลการจอง</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>



                {/* ✅ ปุ่มเปลี่ยนหน้า (Pagination) */}
                <div className="flex justify-center items-center mt-6 space-x-2">
                    {/* 🔹 ปุ่มย้อนกลับ */}
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className={`flex items-center px-3 py-2 rounded-md transition ${
                            currentPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'
                        }`}
                    >
                        <ChevronLeftIcon className="w-5 h-5" />
                    </button>

                    {/* 🔹 หมายเลขหน้า */}
                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentPage(index + 1)}
                            className={`px-4 py-2 rounded-md font-medium transition ${
                                currentPage === index + 1
                                    ? 'bg-blue-600 text-white shadow-md'
                                    : 'bg-gray-100 text-gray-700 hover:bg-blue-500 hover:text-white'
                            }`}
                        >
                            {index + 1}
                        </button>
                    ))}

                    {/* 🔹 ปุ่มไปต่อ */}
                    <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className={`flex items-center px-3 py-2 rounded-md transition ${
                            currentPage === totalPages ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'
                        }`}
                    >
                        <ChevronRightIcon className="w-5 h-5" />
                    </button>
                </div>

            </div>
        </>
    );
}
