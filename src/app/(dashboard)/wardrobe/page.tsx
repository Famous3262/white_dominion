'use client';

import { Navbar } from '@/components/ui/navbar';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { Design } from '@/types';

export default function WardrobePage() {
    const [designs, setDesigns] = useState<Design[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchDesigns() {
            // Mock user ID for now - in real app use auth context
            const userId = 'mock-user-id';

            const { data } = await supabase
                .from('designs')
                .select('*')
                .eq('user_id', userId)
                .order('created_at', { ascending: false });

            if (data) {
                // Cast to Design type, handling potential mismatches if schema evolved
                setDesigns(data as unknown as Design[]);
            }
            setLoading(false);
        }

        fetchDesigns();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h1 className="text-3xl font-serif text-primary">Your Wardrobe</h1>
                        <p className="text-gray-500 mt-1">Manage your digital dominion and production orders.</p>
                    </div>
                    <Link
                        href="/generate"
                        className="px-6 py-2 bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors"
                    >
                        + New Design
                    </Link>
                </div>

                {loading ? (
                    <div className="text-center py-20">Loading your collection...</div>
                ) : designs.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                        <h3 className="text-lg font-medium text-gray-900">Your wardrobe is empty</h3>
                        <p className="text-gray-500 mt-1 mb-6">Start by creating your first AI-generated design.</p>
                        <Link
                            href="/generate"
                            className="px-6 py-3 bg-secondary text-white font-medium hover:bg-secondary/90 transition-colors"
                        >
                            Visit the Atelier
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {designs.map((design) => (
                            <div key={design.id} className="group bg-white rounded-lg overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all">
                                <div className="aspect-[3/4] bg-gray-200 relative overflow-hidden">
                                    <Image
                                        src={design.image_urls?.[0] || 'https://placehold.co/600x800'}
                                        alt={design.name}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded">
                                        {design.visibility}
                                    </div>
                                </div>
                                <div className="p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-serif text-lg text-primary truncate pr-2">{design.name}</h3>
                                        <span className="text-xs font-mono text-gray-400">{design.design_code}</span>
                                    </div>
                                    <p className="text-sm text-gray-500 line-clamp-2 mb-4">{design.description}</p>
                                    <div className="flex gap-2">
                                        <button className="flex-1 py-2 text-sm border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
                                            View Specs
                                        </button>
                                        <button className="flex-1 py-2 text-sm bg-primary text-white hover:bg-primary/90 transition-colors">
                                            Order
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
