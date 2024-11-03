// app/posts/[postId]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Post from '@/models/Post';

export async function PUT(
  request: NextRequest,
  { params }: { params: { postId: string } }
) {
  try {
    await dbConnect();
    const { title, content, excerpt, coverImage, slug } = await request.json();
    const updatedPost = await Post.findByIdAndUpdate(
      params.postId,
      { title, content, excerpt, coverImage, slug },
      { new: true }
    );
    if (!updatedPost) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error('Failed to update post:', error);
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
  }
}