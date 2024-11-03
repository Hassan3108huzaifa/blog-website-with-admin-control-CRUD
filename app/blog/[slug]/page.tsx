import { getPostBySlug } from '@/lib/posts'
import { CalendarDays, Clock, User } from 'lucide-react'
import Image from 'next/image'
import Comments from '@/components/Comments'

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const { slug } = await Promise.resolve(params);  // Await `params` here
  
  const post = await getPostBySlug(slug);
  
  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-2xl font-semibold text-gray-700">Post not found</div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <article className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">{post.title}</h1>
          <div className="flex items-center text-sm text-gray-600 mb-8">
            <User className="w-4 h-4 mr-2" />
            <span className="mr-4">By {post.author || 'Anonymous'}</span>
            <CalendarDays className="w-4 h-4 mr-2" />
            <span className="mr-4">{new Date(post.createdAt).toLocaleDateString()}</span>
            <Clock className="w-4 h-4 mr-2" />
            <span>{Math.ceil(post.content.length / 200)} min read</span>
          </div>
          <Image
            src={post.coverImage}
            alt={post.title}
            className="w-full h-96 object-cover rounded-lg mb-8 shadow-lg"
            width={500}
            height={400}
          />
          <div className="prose prose-lg max-w-none text-gray-800 whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>
        
        <div className="max-w-3xl mx-auto mt-16">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">Comments</h2>
          <Comments postId={post._id} slug={slug} /> {/* Fixed the props here */}
        </div>
      </div>
    </div>
  );
}
