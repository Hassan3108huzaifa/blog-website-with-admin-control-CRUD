// app/posts/[postId]/comments/route.ts
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Post from '@/models/Post';

export async function POST(
  request: NextRequest,
  context: { params: { postId: string } }
) {
  try {
    await dbConnect();
    const { postId } = context.params;
    const { content, author } = await request.json();

    const post = await Post.findById(postId);
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    const newComment = {
      content,
      author,
      createdAt: new Date()
    };

    post.comments.push(newComment);
    await post.save();

    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    console.error('Failed to add comment:', error);
    return NextResponse.json({ error: 'Failed to add comment' }, { status: 500 });
  }
}