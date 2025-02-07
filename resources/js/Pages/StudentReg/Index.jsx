import { Head } from '@inertiajs/react';

export default function Index({ registrations, total_students, total_registrations }) {
    // คำนวณจำนวนนักศึกษาตามช่วงเกรด
    const gradeRanges = {
        'A (3.5-4.0)': 0,
        'B (2.5-3.49)': 0,
        'C (1.5-2.49)': 0,
        'D (1.0-1.49)': 0,
        'F (0-0.99)': 0
    };

    registrations.data.forEach(reg => {
        const grade = Number(reg.grade);
        if (grade >= 3.5) gradeRanges['A (3.5-4.0)']++;
        else if (grade >= 2.5) gradeRanges['B (2.5-3.49)']++;
        else if (grade >= 1.5) gradeRanges['C (1.5-2.49)']++;
        else if (grade >= 1.0) gradeRanges['D (1.0-1.49)']++;
        else gradeRanges['F (0-0.99)']++;
    });

    const total = Object.values(gradeRanges).reduce((a, b) => a + b, 0);

    return (
        <div className="min-h-screen bg-gray-100">
            <Head title="ระบบลงทะเบียน" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* แสดงสรุปข้อมูล */}
                    <div className="mb-6 grid grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded-lg shadow">
                            <h3 className="text-lg font-semibold">จำนวนนักศึกษาทั้งหมด</h3>
                            <p className="text-3xl font-bold">{total_students} คน</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow">
                            <h3 className="text-lg font-semibold">จำนวนการลงทะเบียนทั้งหมด</h3>
                            <p className="text-3xl font-bold">{total_registrations} รายการ</p>
                        </div>
                    </div>

                    {/* Stats Section */}
                    <div className="mb-8 bg-white p-6 rounded-lg shadow-sm">
                        <h2 className="text-xl font-semibold mb-4">สถิติเกรด</h2>
                        <div className="space-y-4">
                            {Object.entries(gradeRanges).map(([grade, count]) => (
                                <div key={grade} className="relative">
                                    <div className="flex items-center">
                                        <span className="w-24 text-sm">{grade}</span>
                                        <div className="flex-1 h-6 bg-gray-200 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full rounded-full ${
                                                    grade.startsWith('A') ? 'bg-green-500' :
                                                    grade.startsWith('B') ? 'bg-blue-500' :
                                                    grade.startsWith('C') ? 'bg-yellow-500' :
                                                    grade.startsWith('D') ? 'bg-orange-500' :
                                                    'bg-red-500'
                                                }`}
                                                style={{ width: `${(count / total) * 100}%` }}
                                            />
                                        </div>
                                        <span className="ml-4 w-16 text-sm">{count} คน</span>
                                        <span className="ml-2 w-16 text-sm text-gray-500">
                                            ({((count / total) * 100).toFixed(1)}%)
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Data Cards */}
                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold">ข้อมูลการลงทะเบียน</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {registrations.data.map(registration => (
                            <div key={registration.id} className="bg-white overflow-hidden shadow-sm rounded-lg">
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-lg font-semibold">
                                                {registration.student.first_name} {registration.student.last_name}
                                            </h3>
                                            <p className="text-gray-600">
                                                รหัสนักศึกษา: {registration.student.student_id}
                                            </p>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-sm ${
                                            Number(registration.grade) >= 3.0 ? 'bg-green-100 text-green-800' :
                                            Number(registration.grade) >= 2.0 ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-red-100 text-red-800'
                                        }`}>
                                            เกรด: {Number(registration.grade).toFixed(2)}
                                        </span>
                                    </div>

                                    <div className="border-t pt-4">
                                        <h4 className="font-medium">ข้อมูลวิชา</h4>
                                        <p className="text-gray-600">
                                            {registration.course.course_code} - {registration.course.course_name}
                                        </p>
                                        <p className="text-gray-500 text-sm">
                                            อาจารย์ผู้สอน: {registration.course.teacher.first_name} {registration.course.teacher.last_name}
                                        </p>
                                    </div>

                                    <div className="mt-4 text-sm text-gray-500">
                                        <p>ภาคการศึกษา: {registration.semester}/{registration.academic_year}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="mt-6">
                        {/* TODO: Add pagination component */}
                    </div>
                </div>
            </div>
        </div>
    );
}
