import React, { useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import FlashMessage from '@/Components/FlashMessage';

export default function Create({ departments }) {
    const gender = ['Male', 'Female']; // กำหนดตัวเลือกเพศ
    const [imagePreview, setImagePreview] = useState(null); // เก็บค่า preview ของรูปภาพที่อัปโหลด
    const { flash } = usePage().props; // ใช้ flash message จาก Inertia.js

    // ใช้ useForm เพื่อจัดการข้อมูลฟอร์ม
    const { data, setData, post, processing, errors } = useForm({
        first_name: '',
        last_name: '',
        birth_date: '',
        hire_date: '',
        dept_no: '',
        gender: '',
        profile_picture: null,
    });

    // ฟังก์ชันจัดการเมื่ออัปโหลดรูปภาพ
    const handleImageChange = (e) => {
        const file = e.target.files[0]; // ดึงไฟล์ที่ผู้ใช้อัปโหลด
        if (file) {
            if (file.size > 2 * 1024 * 1024) { // ตรวจสอบขนาดไฟล์ (ห้ามเกิน 2MB)
                alert('File size should not exceed 2MB');
                return;
            }

            setData('profile_picture', file); // อัปเดตข้อมูลรูปภาพในฟอร์ม
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result); // แสดงตัวอย่างรูปภาพที่อัปโหลด
            };
            reader.readAsDataURL(file);
        } else {
            setData('profile_picture', null);
            setImagePreview(null);
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault(); 

        const currentDate = new Date();
        const birthDate = new Date(data.birth_date);
        const hireDate = new Date(data.hire_date);

        if (birthDate >= currentDate) {
            alert('Birth date must be in the past');
            return;
        }

    
        if (hireDate > currentDate) {
            alert('Hire date cannot be in the future');
            return;
        }


        const formData = new FormData();
        Object.keys(data).forEach((key) => {
            if (data[key] !== null) {
                formData.append(key, data[key]);
            }
        });

        post('/employee', {
            data: formData,
            forceFormData: true,
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
            <FlashMessage /> {/* แสดง Flash Message */}
            <div className="w-full max-w-md">
                <div className="bg-white shadow-2xl rounded-xl overflow-hidden">
                    <div className="px-6 py-4 bg-green-600 text-white">
                        <h1 className="text-2xl font-bold">Create New Employee</h1>
                    </div>


                    <form onSubmit={handleSubmit} className="p-6 space-y-4">
                        <div className="flex justify-center mb-6">
                            <div className="relative">
                                {imagePreview ? (
                                    <img
                                        src={imagePreview}
                                        alt="Profile Preview"
                                        className="w-32 h-32 rounded-full object-cover border-4 border-green-500"
                                    />
                                ) : (
                                    <div className="w-32 h-32 rounded-full bg-green-100 flex items-center justify-center text-green-500">
                                        No Image
                                    </div>
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                />
                                <div className="absolute bottom-0 right-0 bg-green-500 text-white rounded-full p-2 cursor-pointer">
                                    📷
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                <input
                                    type="text"
                                    value={data.first_name}
                                    onChange={(e) => setData('first_name', e.target.value)}
                                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
                                />
                                {errors.first_name && <p className="text-red-500 text-xs mt-1">{errors.first_name}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                <input
                                    type="text"
                                    value={data.last_name}
                                    onChange={(e) => setData('last_name', e.target.value)}
                                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
                                />
                                {errors.last_name && <p className="text-red-500 text-xs mt-1">{errors.last_name}</p>}
                            </div>
                        </div>


                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Birth Date</label>
                            <input
                                type="date"
                                value={data.birth_date}
                                max={new Date().toISOString().split('T')[0]} 
                                onChange={(e) => setData('birth_date', e.target.value)}
                                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Hire Date</label>
                            <input
                                type="date"
                                value={data.hire_date}
                                max={new Date().toISOString().split('T')[0]} 
                                onChange={(e) => setData('hire_date', e.target.value)}
                                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                            />
                        </div>


                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                            <select
                                value={data.dept_no}
                                onChange={(e) => setData('dept_no', e.target.value)}
                                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select Department</option>
                                {departments.map((dept) => (
                                    <option key={dept.dept_no} value={dept.dept_no}>
                                        {dept.dept_name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                            <select
                                value={data.gender}
                                onChange={(e) => setData('gender', e.target.value)}
                                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select Gender</option>
                                {gender.map((g) => (
                                    <option key={g} value={g}>{g}</option>
                                ))}
                            </select>
                        </div>

                        <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white rounded-md">
                            {processing ? 'Creating...' : 'Create Employee'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
