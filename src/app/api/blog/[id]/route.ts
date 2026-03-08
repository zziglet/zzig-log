import { NextRequest, NextResponse } from 'next/server';
import { getBlogPost } from '@/services/blog.service';

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json({ error: 'Missing Post ID' }, { status: 400 });
  }

  try {
    const post = await getBlogPost(id);

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error('Blog Detail API Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown Error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
