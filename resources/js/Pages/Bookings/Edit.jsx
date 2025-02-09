import React from 'react';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Edit({ booking, rooms }) {
    const { data, setData, put, processing, errors } = useForm({
        room_id: booking.room.id,
        check_in_date: booking.check_in_date,
        check_out_date: booking.check_out_date,
        customer_name: booking.customer.name,
        customer_phone: booking.customer.phone,
        customer_email: booking.customer.email,
        customer_address: booking.customer.address,
        customer_id_card_number: booking.customer.id_card_number
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('bookings.update', booking.id));
    };

    return (
        <>
            <Head title="แก้ไขข้อมูลการจอง" />

            <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
                <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-lg">

                    {/* เพิ่มปุ่มกลับไปหน้าการจองและหน้ารายละเอียด */}
                    <div className="mb-4 flex justify-between">
                        <Link
                            href={route('bookings.index')}
                            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                        >
                            ⬅ กลับไปหน้าการจอง
                        </Link>
                        <Link
                            href={route('bookings.show', booking.id)}
                            className="text-blue-600 hover:text-blue-800"
                        >
                            ⬅ กลับไปหน้ารายละเอียด
                        </Link>
                    </div>

                    <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
                        🏨 แก้ไขข้อมูลการจอง #{booking.id}
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* ข้อมูลลูกค้า */}
                        <div>
                            <label className="block text-gray-700 font-semibold">ชื่อลูกค้า</label>
                            <input
                                type="text"
                                value={data.customer_name}
                                onChange={e => setData('customer_name', e.target.value)}
                                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
                            />
                            {errors.customer_name && <p className="text-red-500 text-sm">{errors.customer_name}</p>}
                        </div>

                        <div>
                            <label className="block text-gray-700 font-semibold">เบอร์โทรศัพท์</label>
                            <input
                                type="tel"
                                value={data.customer_phone}
                                onChange={e => setData('customer_phone', e.target.value)}
                                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
                            />
                            {errors.customer_phone && <p className="text-red-500 text-sm">{errors.customer_phone}</p>}
                        </div>

                        <div>
                            <label className="block text-gray-700 font-semibold">อีเมล</label>
                            <input
                                type="email"
                                value={data.customer_email}
                                onChange={e => setData('customer_email', e.target.value)}
                                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
                            />
                            {errors.customer_email && <p className="text-red-500 text-sm">{errors.customer_email}</p>}
                        </div>

                        <div>
                            <label className="block text-gray-700 font-semibold">ที่อยู่</label>
                            <textarea
                                value={data.customer_address}
                                onChange={e => setData('customer_address', e.target.value)}
                                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
                                rows="3"
                            />
                            {errors.customer_address && <p className="text-red-500 text-sm">{errors.customer_address}</p>}
                        </div>

                        {/* ข้อมูลการจอง */}
                        <div>
                            <label className="block text-gray-700 font-semibold">ห้องพัก</label>
                            <select
                                value={data.room_id}
                                onChange={e => setData('room_id', e.target.value)}
                                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
                            >
                                {rooms.map(room => (
                                    <option key={room.id} value={room.id}>
                                        {room.number} - {room.type} (฿{room.price.toLocaleString()}/คืน)
                                    </option>
                                ))}
                            </select>
                            {errors.room_id && <p className="text-red-500 text-sm">{errors.room_id}</p>}
                        </div>

                        <div>
                            <label className="block text-gray-700 font-semibold">วันที่เช็คอิน</label>
                            <input
                                type="date"
                                value={data.check_in_date}
                                onChange={e => setData('check_in_date', e.target.value)}
                                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
                            />
                            {errors.check_in_date && <p className="text-red-500 text-sm">{errors.check_in_date}</p>}
                        </div>

                        <div>
                            <label className="block text-gray-700 font-semibold">วันที่เช็คเอาท์</label>
                            <input
                                type="date"
                                value={data.check_out_date}
                                onChange={e => setData('check_out_date', e.target.value)}
                                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
                                min={data.check_in_date}
                            />
                            {errors.check_out_date && <p className="text-red-500 text-sm">{errors.check_out_date}</p>}
                        </div>

                        <div className="flex justify-end space-x-2">
                            <Link
                                href={route('bookings.index', booking.id)}
                                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                            >
                                ยกเลิก
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
                            >
                                บันทึก
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
