'use client';

import { useState } from 'react';
import { Navbar } from '@/components/ui/navbar';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Design } from '@/types';

export default function GeneratePage() {
    const [step, setStep] = useState<'input' | 'generating' | 'result'>('input');
    const [design, setDesign] = useState<Design | null>(null);

    const [formData, setFormData] = useState({
        height: '',
        weight: '',
        chest: '',
        waist: '',
        style: 'Modern African Luxury',
        preferences: '',
    });

    const handleGenerate = async () => {
        setStep('generating');

        try {
            const res = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    measurements: {
                        height: formData.height,
                        weight: formData.weight,
                        chest: formData.chest,
                        waist: formData.waist,
                    },
                    preferences: formData.preferences.split(',').map(p => p.trim()),
                    style: formData.style,
                    userId: 'mock-user-id', // In real app, get from auth context
                }),
            });

            const data = await res.json();
            if (data.success) {
                setDesign(data.design);
                setStep('result');
            } else {
                alert('Generation failed: ' + data.error);
                setStep('input');
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred');
            setStep('input');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <main className="max-w-4xl mx-auto py-12 px-4">
                <h1 className="text-4xl font-serif text-primary mb-8 text-center">
                    The Atelier
                </h1>

                {step === 'input' && (
                    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Height (cm)</label>
                                <input
                                    type="number"
                                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                    placeholder="180"
                                    value={formData.height}
                                    onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Weight (kg)</label>
                                <input
                                    type="number"
                                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                    placeholder="75"
                                    value={formData.weight}
                                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Chest (cm)</label>
                                <input
                                    type="number"
                                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                    placeholder="100"
                                    value={formData.chest}
                                    onChange={(e) => setFormData({ ...formData, chest: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Waist (cm)</label>
                                <input
                                    type="number"
                                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                    placeholder="85"
                                    value={formData.waist}
                                    onChange={(e) => setFormData({ ...formData, waist: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Style Preference</label>
                            <select
                                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                value={formData.style}
                                onChange={(e) => setFormData({ ...formData, style: e.target.value })}
                            >
                                <option>Modern African Luxury</option>
                                <option>Traditional Ceremonial</option>
                                <option>Afro-Futurist Avant-Garde</option>
                                <option>Casual Urban</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Additional Details (Colors, Fabrics, Occasion)</label>
                            <textarea
                                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all h-32"
                                placeholder="E.g., Gold embroidery, velvet fabric, for a wedding..."
                                value={formData.preferences}
                                onChange={(e) => setFormData({ ...formData, preferences: e.target.value })}
                            />
                        </div>

                        <div className="pt-4 flex justify-end">
                            <Button onClick={handleGenerate} size="lg" className="w-full md:w-auto">
                                Generate Design
                            </Button>
                        </div>
                    </div>
                )}

                {step === 'generating' && (
                    <div className="flex flex-col items-center justify-center py-20 space-y-6">
                        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                        <p className="text-xl font-serif text-gray-600 animate-pulse">
                            Weaving your digital dominion...
                        </p>
                    </div>
                )}

                {step === 'result' && design && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                            <div className="flex flex-col md:flex-row justify-between items-start mb-6 border-b border-gray-100 pb-6">
                                <div>
                                    <h2 className="text-3xl font-serif text-primary mb-2">{design.name}</h2>
                                    <p className="text-sm text-gray-500 font-mono">CODE: <span className="text-secondary font-bold">{design.design_code}</span></p>
                                </div>
                                <div className="mt-4 md:mt-0">
                                    <span className="px-4 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full uppercase tracking-wider">
                                        {design.visibility}
                                    </span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <div className="aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden relative group">
                                        {/* Mock Image Display */}
                                        <Image
                                            src={design.image_urls[0]}
                                            alt={design.name}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-lg font-serif text-primary mb-2">Design Philosophy</h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            {design.description}
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-serif text-primary mb-2">Tailoring Specs</h3>
                                        <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm text-gray-700 space-y-1">
                                            {Object.entries(design.specs || {}).map(([key, val]) => (
                                                <div key={key} className="flex justify-between">
                                                    <span className="capitalize">{key.replace(/_/g, ' ')}:</span>
                                                    <span>{String(val)}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="pt-6 flex flex-col gap-3">
                                        <Button className="w-full">
                                            Save to Wardrobe
                                        </Button>
                                        <Button variant="outline" className="w-full">
                                            Share Access
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="text-center">
                            <button
                                onClick={() => setStep('input')}
                                className="text-gray-500 hover:text-primary transition-colors underline underline-offset-4"
                            >
                                Create Another Design
                            </button>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
