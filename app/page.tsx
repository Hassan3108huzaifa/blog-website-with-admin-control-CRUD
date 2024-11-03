'use client'

import Link from 'next/link'
import { getPosts, Post } from '@/lib/posts'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Clock, Calendar, Brain, Zap, Globe } from 'lucide-react'
import Image from 'next/image'
import SkeletonCard from '@/components/CardSkeleton'

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true)
      try {
        const fetchedPosts = await getPosts()
        setPosts(fetchedPosts)
      } catch (error) {
        console.error('Failed to fetch posts:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold mb-8 text-center text-gray-900"
        >
          Welcome to Blogafay
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl text-center text-gray-700 mb-16 max-w-3xl mx-auto"
        >
          Explore the cutting-edge world of Artificial Intelligence through our expertly curated articles and insights.
        </motion.p>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-20">
            {Array.from({ length: 3 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-20"
          >
            {posts.slice(0, 3).map((post, index) => (
              <motion.div
                key={post._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
                className="bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl"
              >
                <div className="relative">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-56 object-cover"
                    width={500}
                    height={200}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                    <h2 className="text-xl font-semibold text-white">{post.title}</h2>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-600 mb-4">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                    <Clock className="w-4 h-4 ml-4 mr-2" />
                    <span>{Math.ceil(post.content.length / 200)} min read</span>
                  </div>
                  <p className="text-gray-700 mb-4 line-clamp-3">{post.excerpt}</p>
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center text-gray-900 font-semibold hover:text-gray-700 transition-colors duration-200"
                  >
                    Read more
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mb-20"
        >
          <Link 
            href="/blog" 
            className="inline-block bg-gray-900 text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors duration-200"
          >
            View All Posts
          </Link>
        </motion.div>

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Why AI Matters</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Brain className="w-16 h-16 mx-auto mb-4 text-gray-700" />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Cognitive Revolution</h3>
              <p className="text-gray-600">AI is reshaping how we think about intelligence and cognition, pushing the boundaries of what&apos;s possible.</p>
            </div>
            <div className="text-center">
              <Zap className="w-16 h-16 mx-auto mb-4 text-gray-700" />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Efficiency Boost</h3>
              <p className="text-gray-600">From automation to predictive analytics, AI is dramatically increasing efficiency across industries.</p>
            </div>
            <div className="text-center">
              <Globe className="w-16 h-16 mx-auto mb-4 text-gray-700" />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Global Impact</h3>
              <p className="text-gray-600">AI has the potential to solve some of the world&apos;s most pressing challenges, from climate change to healthcare.</p>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="bg-gray-100 p-12 rounded-lg"
        >
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">Stay Informed</h2>
          <p className="text-center text-gray-700 mb-8">Subscribe to our newsletter and never miss an update on the latest in AI.</p>
          <form className="max-w-md mx-auto">
            <div className="flex flex-col md:flex-row">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-grow mb-4 text-gray-800 md:mb-0 md:mr-2 px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
              <button 
                type="submit" 
                className="bg-gray-900 text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-colors duration-200"
              >
                Subscribe
              </button>
            </div>
          </form>
        </motion.section>
      </div>
    </div>
  )
}
