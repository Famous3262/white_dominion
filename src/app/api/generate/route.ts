import { NextRequest, NextResponse } from 'next/server';
import { generateFashionDesign } from '@/lib/ai/gemini';
import { generateDesignCode } from '@/lib/utils/design-code';
import { supabase } from '@/lib/supabase/client';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { measurements, preferences, style, userId } = body;

        if (!measurements || !style) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // 1. Generate Design with Gemini
        const designData = await generateFashionDesign(measurements, preferences, style);

        if (!designData) {
            return NextResponse.json({ error: 'Failed to generate design' }, { status: 500 });
        }

        // 2. Generate Unique Code
        const designCode = generateDesignCode();

        // 3. Save to Database (Mocking image URL for now)
        // In production, we would call an image generation API here using designData.image_prompt
        const mockImageUrls = [
            `https://placehold.co/600x800?text=${encodeURIComponent(designData.name)}`,
            `https://placehold.co/600x800?text=Detail+View`
        ];

        const { data, error } = await supabase
            .from('designs')
            .insert({
                user_id: userId, // Ensure this is passed or handled via auth context
                design_code: designCode,
                name: designData.name,
                description: designData.description,
                specs: designData.specs,
                image_urls: mockImageUrls,
                visibility: 'private'
            })
            .select()
            .single();

        if (error) {
            console.error('Supabase error:', error);
            return NextResponse.json({ error: 'Database error' }, { status: 500 });
        }

        return NextResponse.json({ success: true, design: data });

    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
