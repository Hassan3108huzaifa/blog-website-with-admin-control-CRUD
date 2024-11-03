'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { getPosts, createPost, Post } from '@/lib/posts'

export default function AdminPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const { register, handleSubmit, reset } = useForm<Omit<Post, 'id' | 'createdAt' | 'comments'>>()

  useEffect(() => {
    const fetchPosts = async () => {
      const fetchedPosts = await getPosts()
      setPosts(fetchedPosts)
    }
    fetchPosts()
  }, [])

  const onSubmit = async (data: Omit<Post, 'id' | 'createdAt' | 'comments'>) => {
    try {
      const formattedData = {
        ...data,
        coverImage: data.coverImage.trim(),
        slug: data.slug.replace(/\s+/g, '-')
      };
      const newPost = await createPost(formattedData)
      setPosts([...posts, newPost])
      reset()
    } catch (error) {
      console.error('Failed to create post:', error)
    }
  }

  const handleDeletePost = async (id: string) => {
    // Show confirmation dialog
    const confirmed = window.confirm("Are you sure you want to delete this post?");
    
    if (confirmed) {
      try {
        const response = await fetch(`/api/posts`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id }), // Send the ID of the post to delete
        });

        if (response.ok) {
          // Remove the deleted post from the state
          setPosts(posts.filter(post => post._id !== id));
        } else {
          console.error('Failed to delete post');
        }
      } catch (error) {
        console.error('Failed to delete post:', error);
      }
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mb-8 space-y-4">
        <input
          {...register('title', { required: true })}
          className="w-full p-2 border rounded-md text-gray-800"
          placeholder="Post title"
        />
        <input
          {...register('slug', { required: true })}
          className="w-full p-2 border rounded-md text-gray-800"
          placeholder="Post slug"
        />
        <textarea
          {...register('content', { required: true })}
          className="w-full p-2 border rounded-md text-gray-800"
          placeholder="Post content"
          rows={6}
        ></textarea>
        <input
          {...register('excerpt', { required: true })}
          className="w-full p-2 border rounded-md text-gray-800"
          placeholder="Post excerpt"
        />
        <input
          {...register('coverImage', { required: true })}
          className="w-full p-2 border rounded-md text-gray-800"
          placeholder="Cover image URL"
        />
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">
          Create Post
        </button>
      </form>
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post._id} className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">{post.title}</h2>
              <p className="text-gray-600 break-words">{post.excerpt}</p>
            </div>
            <div>
              <Link href={`/h-qf829bfa13/edit/${post._id}`} className="text-blue-600 hover:underline mr-4">
                Edit
              </Link>
              <button
                onClick={() => handleDeletePost(post._id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}