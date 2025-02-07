import { router } from '@inertiajs/react';
import { useState } from 'react';
import FlashMessage from '@/Components/FlashMessage'; // นำเข้า FlashMessage
import { usePage } from '@inertiajs/react';

export default function Index({ employees, query }) {
    const [search, setSearch] = useState(query || '');
    const { flash, setFlash } = usePage().props;

    // สร้าง clearFlash function
    const clearFlash = () => {
        setFlash({}); // เคลียร์ flash message
    };

    // Function to handle employee search
    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/employee', { search });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-12 px-4 sm:px-6 lg:px-8">
            {/* ส่ง clearFlash ไปให้ FlashMessage */}
            <FlashMessage flash={flash} clearFlash={clearFlash} />

            <div className="max-w-7xl mx-auto">
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">Employee List</h1>
                    <p className="text-gray-600 text-lg">Manage and view employee details efficiently.</p>
                </div>
                <form onSubmit={handleSearch} className="mb-8">
                    <div className="flex gap-4">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search employees by name..."
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex-grow transition duration-200 ease-in-out"
                        />
                        <button
                            type="submit"
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-150 ease-in-out transform hover:scale-105"
                        >
                            Search
                        </button>
                    </div>
                </form>

                {/* ตาราง */}
                <div className="overflow-x-auto rounded-lg shadow-sm">
                    <table className="w-full border-collapse bg-white">
                        <thead>
                            <tr className="bg-gray-700"> 
                                <th className="p-4 text-left text-white font-semibold">ID</th> 
                                <th className="p-4 text-left text-white font-semibold">First Name</th>
                                <th className="p-4 text-left text-white font-semibold">Last Name</th>
                                <th className="p-4 text-left text-white font-semibold">Birth Date</th>
                                <th className="p-4 text-left text-white font-semibold">Gender</th>
                                <th className="p-4 text-left text-white font-semibold">Hire Date</th>
                                <th className="p-4 text-left text-white font-semibold">Profile Picture</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.data.map((employee) => (
                                <tr key={employee.emp_no} className="border-b border-gray-200 hover:bg-green-50 transition duration-150 ease-in-out">
                                    <td className="p-4 text-gray-700">{employee.emp_no}</td>
                                    <td className="p-4 text-gray-700">{employee.first_name}</td>
                                    <td className="p-4 text-gray-700">{employee.last_name}</td>
                                    <td className="p-4 text-gray-700">{employee.birth_date}</td>
                                    <td className="p-4 text-gray-700">{employee.gender}</td>
                                    <td className="p-4 text-gray-700">{employee.hire_date}</td>
                                    <td className="p-4 text-center">
                                        {employee.profile_picture ? (
                                            <img
                                                src={`${employee.profile_picture}`}
                                                alt="Profile Picture"
                                                className="w-16 h-16 mx-auto rounded-full object-cover shadow-md hover:shadow-lg transition duration-200 ease-in-out"
                                            />
                                        ) : (
                                            <div className="w-16 h-16 bg-gray-100 flex items-center justify-center rounded-full mx-auto shadow-md hover:shadow-lg transition duration-200 ease-in-out">
                                                <span className="text-sm text-gray-500">No Image</span>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Buttons */}
                {employees && (
                    <div className="mt-8 flex justify-between items-center">
                        <div className="flex gap-2">
                            {employees.first_page_url && (
                                <button
                                    onClick={() => router.get(employees.first_page_url)}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-150 ease-in-out transform hover:scale-105"
                                >
                                    First
                                </button>
                            )}
                            {employees.prev_page_url && (
                                <button
                                    onClick={() => router.get(employees.prev_page_url)}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-150 ease-in-out transform hover:scale-105"
                                >
                                    Previous
                                </button>
                            )}
                        </div>
                        <div className="flex gap-2">
                            {employees.next_page_url && (
                                <button
                                    onClick={() => router.get(employees.next_page_url)}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-150 ease-in-out transform hover:scale-105"
                                >
                                    Next
                                </button>
                            )}
                            {employees.last_page_url && (
                                <button
                                    onClick={() => router.get(employees.last_page_url)}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-150 ease-in-out transform hover:scale-105"
                                >
                                    Last
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}