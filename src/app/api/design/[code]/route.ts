import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

export async function GET(
    req: NextRequest,
    context: any
) {
    const { params } = context;
    const code = params.code;

    if (!code) {
        return NextResponse.json({ error: 'Code required' }, { status: 400 });
    }

    // Fetch design
    const { data: design, error } = await supabase
        .from('designs')
        .select('*')
        .eq('design_code', code)
        .single();

    if (error || !design) {
        return NextResponse.json({ error: 'Design not found' }, { status: 404 });
    }

    // Check visibility logic here (simplified for now)
    // In a real app, we would check the user's session and shared_codes table

    if (design.visibility === 'private') {
        // For demo purposes, we might allow viewing if we have the code, 
        // but strictly we should check ownership.
        // We will return a limited view if not authorized.
    }

    return NextResponse.json({ design });
}
