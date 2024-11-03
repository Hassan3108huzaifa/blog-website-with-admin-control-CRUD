'use client'
import Link from 'next/link'
import { getPosts } from '@/lib/posts'
import { CalendarDays, Clock, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import SkeletonCard from '@/components/CardSkeleton' // Import the SkeletonCard component
import { useEffect, useState } from 'react'

export const dynamic = 'force-dynamic'

// Define the Post type based on your data structure
interface Post {
  _id: string;
  title: string;
  coverImage: string;
  createdAt: string;
  content: string;
  excerpt: string;
  slug: string;
}

export default function BlogsPage() {
  const [posts, setPosts] = useState<Post[]>([]); // Initialize posts with the Post type
  const [loading, setLoading] = useState<boolean>(true); // Initialize loading state

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true); // Set loading to true when fetching starts
      try {
        const fetchedPosts = await getPosts(); // Fetch posts
        setPosts(fetchedPosts); // Set fetched posts
      } catch (error) {
        console.error('Error in BlogsPage:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    }
    fetchPosts();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">Our Latest Blogs</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? ( // Show skeletons if loading is true
            Array.from({ length: 3 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          ) : (
            posts.map((post) => (
              <div key={post._id} className="bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl">
                <Image 
                  src={post.coverImage} 
                  alt={post.title} 
                  className="w-full h-48 object-cover" 
                  width={500}
                  height={200}
                />
                <div className="p-6">
                  <h2 className="text-2xl font-semibold mb-2 text-gray-800">{post.title}</h2>
                  <div className="flex items-center text-sm text-gray-600 mb-4">
                    <CalendarDays className="w-4 h-4 mr-2" />
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                    <Clock className="w-4 h-4 ml-4 mr-2" />
                    <span>{Math.ceil(post.content.length / 200)} min read</span>
                  </div>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <Link 
                    href={`/blog/${post.slug}`} 
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
                  >
                    Read more
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}