import { NextRequest, NextResponse } from 'next/server';
import { createCompanion } from '@/lib/actions/companion.actions';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const companion = await createCompanion(body);
    return NextResponse.json({ id: companion.id });
  } catch (error: unknown) {
    console.error('Error creating companion', error);
    // Safely extract error message if available
    const errorMessage =
      error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
} 