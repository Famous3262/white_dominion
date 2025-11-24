'use client';

import { Navbar } from '@/components/ui/navbar';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { Order } from '@/types';

export default function OrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchOrders() {
            // Mock user ID for now
            const userId = 'mock-user-id';

            const { data } = await supabase
                .from('orders')
                .select('*')
                .eq('user_id', userId)
                .order('created_at', { ascending: false });

            if (data) {
                setOrders(data as unknown as Order[]);
            }
            setLoading(false);
        }

        fetchOrders();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <main className="max-w-5xl mx-auto py-12 px-4">
                <h1 className="text-3xl font-serif text-primary mb-8">Production Status</h1>

                {loading ? (
                    <div>Loading orders...</div>
                ) : orders.length === 0 ? (
                    <div className="bg-white p-12 rounded-lg border border-gray-100 text-center">
                        <p className="text-gray-500">No active orders found.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {orders.map((order) => (
                            <div key={order.id} className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
                                <div>
                                    <p className="text-sm text-gray-400 font-mono">ORDER #{order.id.slice(0, 8)}</p>
                                    <p className="font-medium text-primary mt-1">Design ID: {order.design_id}</p>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="text-right">
                                        <p className="text-sm font-medium text-gray-900 capitalize">{order.status}</p>
                                        {order.tracking_number && (
                                            <p className="text-xs text-gray-500">Tracking: {order.tracking_number}</p>
                                        )}
                                    </div>

                                    <div className={`w-3 h-3 rounded-full ${order.status === 'delivered' ? 'bg-green-500' :
                                        order.status === 'shipped' ? 'bg-blue-500' :
                                            order.status === 'production' ? 'bg-yellow-500' :
                                                'bg-gray-300'
                                        }`} />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
