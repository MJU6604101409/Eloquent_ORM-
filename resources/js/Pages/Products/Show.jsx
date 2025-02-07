import React from 'react';
import { Head, Link } from '@inertiajs/react';

export default function Show({ product }) {
    return (
        <>
            <Head title={`${product.name} - รายละเอียดสินค้า`} />
            
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            {/* Breadcrumb */}
                            <div className="mb-6">
                                <Link 
                                    href={route('products.index')} 
                                    className="text-indigo-600 hover:text-indigo-800"
                                >
                                    ← กลับไปหน้ารายการสินค้า
                                </Link>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Product Image */}
                                <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                                    <img 
                                        src={`https://picsum.photos/seed/${product.id}/800/800`}
                                        alt={product.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* Product Details */}
                                <div className="space-y-6">
                                    <h1 className="text-3xl font-bold text-gray-900">
                                        {product.name}
                                    </h1>

                                    <div className="flex items-center justify-between">
                                        <span className="text-2xl font-bold text-indigo-600">
                                            ฿{product.price.toLocaleString()}
                                        </span>
                                        <span className={`px-3 py-1 text-sm rounded-full ${
                                            product.stock > 10 
                                                ? 'bg-green-100 text-green-800' 
                                                : product.stock > 0 
                                                    ? 'bg-yellow-100 text-yellow-800'
                                                    : 'bg-red-100 text-red-800'
                                        }`}>
                                            {product.stock > 0 ? `สินค้าคงเหลือ: ${product.stock} ชิ้น` : 'สินค้าหมด'}
                                        </span>
                                    </div>

                                    <div className="border-t border-b border-gray-200 py-4">
                                        <h2 className="text-lg font-semibold mb-2">รายละเอียดสินค้า</h2>
                                        <p className="text-gray-600 whitespace-pre-line">
                                            {product.description}
                                        </p>
                                    </div>

                                    {/* Product Specifications */}
                                    <div className="border-b border-gray-200 py-4">
                                        <h2 className="text-lg font-semibold mb-4">ข้อมูลสินค้า</h2>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <span className="text-gray-500">รหัสสินค้า:</span>
                                                <span className="ml-2 text-gray-900">#{product.id}</span>
                                            </div>
                                            <div>
                                                <span className="text-gray-500">สถานะ:</span>
                                                <span className="ml-2 text-gray-900">
                                                    {product.stock > 0 ? 'พร้อมจำหน่าย' : 'สินค้าหมด'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
} 
 
 