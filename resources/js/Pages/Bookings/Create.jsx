import React from 'react';
import { Head, useForm } from '@inertiajs/react';

export default function Create({ rooms }) {
    const { data, setData, post, processing, errors } = useForm({
        customer_name: '', //ชื่อลูกค้า
        customer_phone: '', //เบอร์โทรลูกค้า
        customer_email: '', //อีเมลลูกค้า
        customer_address: '', //ที่อยู่ลูกค้า
        customer_id_card_number: '', //เลขบัตรประชาชน
        room_id: '', //รหัสห้อง
        check_in_date: '', //วันที่เช็คอิน
        check_out_date: '' //วันที่เช็คเอาท์

    });

    const handleSubmit = (e) => { //ฟังก์ชันส่งข้อมูลไปยัง API
        e.preventDefault(); //ป้องกันการส่งข้อมูลไปยัง API
        post(route('bookings.store')); //ส่งข้อมูลไปยัง API
    };



    return (
        <>
            <Head title="สร้างการจองใหม่" />

            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">สร้างการจองใหม่</h1>

                <form onSubmit={handleSubmit} className="max-w-lg bg-white p-6 rounded-lg shadow">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            ชื่อลูกค้า
                        </label>
                        <input
                            type="text"
                            value={data.customer_name}
                            onChange={e => setData('customer_name', e.target.value)}
                            className="w-full border rounded px-3 py-2"
                            placeholder="ระบุชื่อลูกค้า"
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
                            placeholder="ระบุเบอร์โทรศัพท์"
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
                            placeholder="ระบุอีเมล"
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
                            placeholder="ระบุที่อยู่"
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
                            placeholder="ระบุเลขบัตรประชาชน"
                        />
                        {errors.customer_id_card_number && (
                            <div className="text-red-500 text-sm mt-1">{errors.customer_id_card_number}</div>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            ห้องพัก
                        </label>
                        <select
                            value={data.room_id}
                            onChange={e => setData('room_id', e.target.value)}
                            className="w-full border rounded px-3 py-2"
                        >
                            <option value="">เลือกห้อง</option>
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
                            min={new Date().toISOString().split('T')[0]}
                        />
                        {errors.check_in_date && (
                            <div className="text-red-500 text-sm mt-1">{errors.check_in_date}</div>
                        )}
                    </div>

                    <div className="mb-6">
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

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
                        >
                            บันทึกการจอง
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
