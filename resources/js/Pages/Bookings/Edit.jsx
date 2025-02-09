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

            <div className="container mx-auto p-4">
                <div className="mb-4">
                    <Link
                        href={route('bookings.show', booking.id)}
                        className="text-blue-600 hover:text-blue-800"
                    >
                        &larr; กลับไปหน้ารายละเอียด
                    </Link>
                </div>

                <h1 className="text-2xl font-bold mb-4">แก้ไขข้อมูลการจอง #{booking.id}</h1>

                <form onSubmit={handleSubmit} className="max-w-lg bg-white p-6 rounded-lg shadow">
                    {/* ข้อมูลลูกค้า */}
                    <div className="mb-4">
                        <h2 className="text-lg font-semibold mb-3">ข้อมูลลูกค้า</h2>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                ชื่อลูกค้า
                            </label>
                            <input
                                type="text"
                                value={data.customer_name}
                                onChange={e => setData('customer_name', e.target.value)}
                                className="w-full border rounded px-3 py-2"
                            />
                            {errors.customer_name && (
                                <div className="text-red-500 text-sm mt-1">{errors.customer_name}</div>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                เบอร์โทรศัพท์
                            </label>
                            <input
                                type="tel"
                                value={data.customer_phone}
                                onChange={e => setData('customer_phone', e.target.value)}
                                className="w-full border rounded px-3 py-2"
                            />
                            {errors.customer_phone && (
                                <div className="text-red-500 text-sm mt-1">{errors.customer_phone}</div>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                อีเมล
                            </label>
                            <input
                                type="email"
                                value={data.customer_email}
                                onChange={e => setData('customer_email', e.target.value)}
                                className="w-full border rounded px-3 py-2"
                            />
                            {errors.customer_email && (
                                <div className="text-red-500 text-sm mt-1">{errors.customer_email}</div>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                ที่อยู่
                            </label>
                            <textarea
                                value={data.customer_address}
                                onChange={e => setData('customer_address', e.target.value)}
                                className="w-full border rounded px-3 py-2"
                                rows="3"
                            />
                            {errors.customer_address && (
                                <div className="text-red-500 text-sm mt-1">{errors.customer_address}</div>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                เลขบัตรประชาชน
                            </label>
                            <input
                                type="text"
                                value={data.customer_id_card_number}
                                onChange={e => setData('customer_id_card_number', e.target.value)}
                                className="w-full border rounded px-3 py-2"
                            />
                            {errors.customer_id_card_number && (
                                <div className="text-red-500 text-sm mt-1">{errors.customer_id_card_number}</div>
                            )}
                        </div>
                    </div>

                    {/* ข้อมูลการจอง */}
                    <div className="mb-4">
                        <h2 className="text-lg font-semibold mb-3">ข้อมูลการจอง</h2>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                ห้องพัก
                            </label>
                            <select
                                value={data.room_id}
                                onChange={e => setData('room_id', e.target.value)}
                                className="w-full border rounded px-3 py-2"
                            >
                                {rooms.map(room => (
                                    <option key={room.id} value={room.id}>
                                        {room.number} - {room.type} (฿{room.price.toLocaleString()}/คืน)
                                    </option>
                                ))}
                            </select>
                            {errors.room_id && (
                                <div className="text-red-500 text-sm mt-1">{errors.room_id}</div>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                วันที่เช็คอิน
                            </label>
                            <input
                                type="date"
                                value={data.check_in_date}
                                onChange={e => setData('check_in_date', e.target.value)}
                                className="w-full border rounded px-3 py-2"
                            />
                            {errors.check_in_date && (
                                <div className="text-red-500 text-sm mt-1">{errors.check_in_date}</div>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                วันที่เช็คเอาท์
                            </label>
                            <input
                                type="date"
                                value={data.check_out_date}
                                onChange={e => setData('check_out_date', e.target.value)}
                                className="w-full border rounded px-3 py-2"
                                min={data.check_in_date}
                            />
                            {errors.check_out_date && (
                                <div className="text-red-500 text-sm mt-1">{errors.check_out_date}</div>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end space-x-2">
                        <Link
                            href={route('bookings.show', booking.id)}
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
        </>
    );
}
