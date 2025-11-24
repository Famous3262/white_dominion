'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
    const [stats] = useState({
        totalOrders: 12,
        pendingProduction: 4,
        totalDesigns: 45
    });

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-primary text-white p-6 hidden md:block">
                <h2 className="text-2xl font-serif font-bold mb-8">WD Admin</h2>
                <nav className="space-y-4">
                    <Link href="/admin" className="block py-2 px-4 bg-white/10 rounded">Dashboard</Link>
                    <Link href="/admin/orders" className="block py-2 px-4 hover:bg-white/5 rounded">Orders</Link>
                    <Link href="/admin/designs" className="block py-2 px-4 hover:bg-white/5 rounded">Designs</Link>
                    <Link href="/admin/users" className="block py-2 px-4 hover:bg-white/5 rounded">Users</Link>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8">
                <header className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-800">Atelier Overview</h1>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-500">Admin User</span>
                    </div>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h3 className="text-gray-500 text-sm font-medium">Pending Production</h3>
                        <p className="text-3xl font-bold text-primary mt-2">{stats.pendingProduction}</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h3 className="text-gray-500 text-sm font-medium">Total Orders</h3>
                        <p className="text-3xl font-bold text-primary mt-2">{stats.totalOrders}</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h3 className="text-gray-500 text-sm font-medium">Total Designs</h3>
                        <p className="text-3xl font-bold text-primary mt-2">{stats.totalDesigns}</p>
                    </div>
                </div>

                {/* Recent Activity Table */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100">
                        <h3 className="font-medium text-gray-800">Recent Orders</h3>
                    </div>
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 text-gray-500">
                            <tr>
                                <th className="px-6 py-3 font-medium">Order ID</th>
                                <th className="px-6 py-3 font-medium">Customer</th>
                                <th className="px-6 py-3 font-medium">Status</th>
                                <th className="px-6 py-3 font-medium">Date</th>
                                <th className="px-6 py-3 font-medium">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            <tr>
                                <td className="px-6 py-4 font-mono">#WD-9283</td>
                                <td className="px-6 py-4">Alice M.</td>
                                <td className="px-6 py-4"><span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Production</span></td>
                                <td className="px-6 py-4">Oct 24, 2025</td>
                                <td className="px-6 py-4 text-blue-600 hover:underline cursor-pointer">View</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 font-mono">#WD-9284</td>
                                <td className="px-6 py-4">John D.</td>
                                <td className="px-6 py-4"><span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">Pending</span></td>
                                <td className="px-6 py-4">Oct 24, 2025</td>
                                <td className="px-6 py-4 text-blue-600 hover:underline cursor-pointer">View</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}
