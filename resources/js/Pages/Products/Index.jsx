import React from 'react';
import { Head, Link } from '@inertiajs/react';

export default function Index({ products }) {
    return (
        <>
            <Head title="รายการสินค้า" />
            
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                            <div className="text-gray-500 text-sm">สินค้าทั้งหมด</div>
                            <div className="text-2xl font-bold">{products.length} รายการ</div>
                        </div>
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                            <div className="text-gray-500 text-sm">สินค้าใกล้หมด</div>
                            <div className="text-2xl font-bold text-yellow-600">
                                {products.filter(p => p.stock < 10).length} รายการ
                            </div>
                        </div>
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                            <div className="text-gray-500 text-sm">สินค้าหมด</div>
                            <div className="text-2xl font-bold text-red-600">
                                {products.filter(p => p.stock === 0).length} รายการ
                            </div>
                        </div>
                    </div>

                    {/* Products Grid */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <h2 className="text-lg font-semibold mb-6">รายการสินค้า</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {products.map((product) => (
                                    <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                                        <div className="h-48 bg-gray-200">
                                            <img 
                                                src={`https://picsum.photos/seed/${product.id}/300/200`}
                                                alt={product.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="p-4">
                                            <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                                            <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                                                {product.description}
                                            </p>
                                            <div className="flex justify-between items-center">
                                                <span className="text-lg font-bold text-indigo-600">
                                                    ฿{product.price.toLocaleString()}
                                                </span>
                                                <span className={`px-2 py-1 text-xs rounded-full ${
                                                    product.stock > 10 
                                                        ? 'bg-green-100 text-green-800' 
                                                        : product.stock > 0 
                                                            ? 'bg-yellow-100 text-yellow-800'
                                                            : 'bg-red-100 text-red-800'
                                                }`}>
                                                    {product.stock > 0 ? `คงเหลือ ${product.stock}` : 'สินค้าหมด'}
                                                </span>
                                            </div>
                                            <Link
                                                href={route('products.show', product.id)}
                                                className="mt-4 block w-full text-center bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors"
                                            >
                                                ดูรายละเอียด
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
