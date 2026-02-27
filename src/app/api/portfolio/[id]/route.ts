import { NextRequest, NextResponse } from 'next/server';
import { getPortfolioPost } from '@/services/portfolio.service';

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json({ error: 'Missing Portfolio ID' }, { status: 400 });
  }

  try {
    const post = await getPortfolioPost(id);

    if (!post) {
      return NextResponse.json({ error: 'Portfolio not found' }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error('Portfolio Detail API Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown Error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
