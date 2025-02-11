import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import { Link } from '@inertiajs/react';

export default function Create({ rooms }) {
    const { data, setData, post, processing, errors } = useForm({
        customer_name: '',
        customer_phone: '',
        customer_email: '',
        customer_address: '',
        customer_id_card_number: '',
        room_id: '',
        check_in_date: '',
        check_out_date: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('bookings.store'));
    };

    const isDateAvailable = (checkIn, checkOut) => {
        const room = rooms.find(r => r.id == data.room_id);
        if (!room) return true; // ถ้ายังไม่ได้เลือกห้อง ให้ผ่าน

        return room.bookings.every(booking => {
            const bookedIn = new Date(booking.check_in);
            const bookedOut = new Date(booking.check_out);
            const selectedIn = new Date(checkIn);
            const selectedOut = new Date(checkOut);

            return selectedOut <= bookedIn || selectedIn >= bookedOut; // ✅ เลือกวันได้ถ้าไม่ทับกับช่วงที่ถูกจอง
        });
    };


    return (
        <>
            <Head title="สร้างการจองใหม่" />

            <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">


                <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-lg">



                    {/* หัวข้อ */}
                    <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
                        🏨 สร้างการจองใหม่
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* ช่องกรอกข้อมูล */}
                        {[
                            { label: 'ชื่อลูกค้า', type: 'text', key: 'customer_name' },
                            { label: 'เบอร์โทรศัพท์', type: 'tel', key: 'customer_phone' },
                            { label: 'อีเมล', type: 'email', key: 'customer_email' },
                            { label: 'ที่อยู่', type: 'textarea', key: 'customer_address' },
                            { label: 'เลขบัตรประชาชน', type: 'text', key: 'customer_id_card_number', maxLength: 13, pattern: "\\d{13}" }
                        ].map(({ label, type, key, maxLength, pattern }) => (
                            <div key={key} className="mb-4">
                                <label className="block text-gray-700 font-semibold mb-1">{label}</label>
                                {type === 'textarea' ? (
                                    <textarea
                                        value={data[key]}
                                        onChange={e => setData(key, e.target.value)}
                                        className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
                                        placeholder={`ระบุ${label}`}
                                        rows="3"
                                        required
                                    />
                                ) : (
                                    <div>
                                        <input
                                            type={type}
                                            value={data[key]}
                                            onChange={e => setData(key, e.target.value)}
                                            maxLength={maxLength}
                                            pattern={pattern}
                                            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
                                            placeholder={`ระบุ${label}`}
                                            required
                                        />
                                        {key === 'customer_id_card_number' && (
                                            <p className="text-sm text-gray-500 mt-1">กรุณากรอกตัวเลข 13 หลัก</p>
                                        )}
                                    </div>
                                )}
                                {errors[key] && <p className="text-red-500 text-sm mt-1">{errors[key]}</p>}
                            </div>
                        ))}


                        {/* เลือกห้องพัก */}
                        <div>
                            <label className="block text-gray-700 font-semibold">ห้องพัก</label>
                            <select
                                value={data.room_id}
                                onChange={e => setData('room_id', e.target.value)}
                                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
                            >
                                <option value="">เลือกห้อง</option>
                                {rooms.map(room => (
                                    <option key={room.id} value={room.id}>
                                        {room.number} - {room.type} (฿{room.price.toLocaleString()}/คืน)
                                    </option>
                                ))}
                            </select>
                            {errors.room_id && <p className="text-red-500 text-sm">{errors.room_id}</p>}

                            {/* แสดงวันที่ที่ห้องถูกจองไปแล้ว */}
                            {data.room_id && (
                                <div className="mt-2 p-3 bg-gray-100 rounded-lg text-sm text-gray-600">
                                    <p className="font-semibold">ช่วงวันที่ห้องนี้ถูกจองแล้ว:</p>
                                    <ul className="list-disc pl-5">
                                        {rooms.find(room => room.id == data.room_id)?.bookings.map((booking, index) => (
                                            <li key={index}>
                                                {new Date(booking.check_in).toLocaleDateString()} - {new Date(booking.check_out).toLocaleDateString()}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>



                        {/* วันที่เช็คอิน */}
                        <div>
                            <label className="block text-gray-700 font-semibold">วันที่เช็คอิน</label>
                            <input
                                type="date"
                                value={data.check_in_date}
                                onChange={e => {
                                    if (isDateAvailable(e.target.value, data.check_out_date)) {
                                        setData('check_in_date', e.target.value);
                                    } else {
                                        alert("ห้องนี้ถูกจองในช่วงวันที่คุณเลือกแล้ว กรุณาเลือกวันอื่น");
                                    }
                                }}
                                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
                                min={new Date().toISOString().split('T')[0]}
                            />
                            {errors.check_in_date && <p className="text-red-500 text-sm">{errors.check_in_date}</p>}
                        </div>

                        {/* วันที่เช็คเอาท์ */}
                        <div>
                            <label className="block text-gray-700 font-semibold">วันที่เช็คเอาท์</label>
                            <input
                                type="date"
                                value={data.check_out_date}
                                onChange={e => {
                                    if (isDateAvailable(data.check_in_date, e.target.value)) {
                                        setData('check_out_date', e.target.value);
                                    } else {
                                        alert("ห้องนี้ถูกจองในช่วงวันที่คุณเลือกแล้ว กรุณาเลือกวันอื่น");
                                    }
                                }}
                                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
                                min={data.check_in_date}
                            />
                            {errors.check_out_date && <p className="text-red-500 text-sm">{errors.check_out_date}</p>}
                        </div>


                        {/* ปุ่มบันทึกและกลับ */}
                        <div className="flex gap-4">
                            <Link
                                href={route('bookings.index')}
                                className="w-1/2 bg-gray-500 text-white py-3 rounded-lg font-semibold text-lg hover:bg-gray-600 transition duration-200 text-center shadow-md"
                            >
                                ⬅ กลับไปหน้าการจอง
                            </Link>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-1/2 bg-blue-500 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-600 transition duration-200 shadow-md"
                            >
                                {processing ? "กำลังบันทึก..." : "บันทึกการจอง"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
