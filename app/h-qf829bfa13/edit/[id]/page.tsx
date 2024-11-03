'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { getPosts, updatePost, Post } from '@/lib/posts'
import { useParams } from 'next/navigation'

export default function EditPost() {
  const router = useRouter()
  const params = useParams()
  const { register, handleSubmit, reset } = useForm<Post>()
  const [post, setPost] = useState<Post | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true)
      try {
        const posts = await getPosts()
        const foundPost = posts.find((p: Post) => p._id === params.id)
        if (foundPost) {
          setPost(foundPost)
          reset(foundPost)
        } else {
          setError('Post not found')
        }
      } catch (error) {
        setError('Failed to fetch post')
        console.error('Failed to fetch post:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchPost()
  }, [params.id, reset])

  const onSubmit = async (data: Post) => {
    if (!post) return
    try {
      const updatedPost = await updatePost(post._id, data)
      if (updatedPost) {
        router.push('/h-qf829bfa13') // Redirect to the desired route after updating
      } else {
        setError('Update failed, no response from server')
      }
    } catch (error) {
      setError('Failed to update post')
      console.error('Failed to update post:', error)
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  if (!post) {
    return <div>Post not found</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Edit Post</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register('title', { required: true })}
          defaultValue={post.title}
          className="w-full p-2 border rounded-md text-gray-800"
          placeholder="Post title"
        />
        <input
          {...register('slug', { required: true })}
          defaultValue={post.slug}
          className="w-full p-2 border rounded-md text-gray-800"
          placeholder="Post slug"
        />
        <textarea
          {...register('content', { required: true })}
          defaultValue={post.content}
          className="w-full p-2 border rounded-md text-gray-800"
          placeholder="Post content"
          rows={6}
        ></textarea>
        <input
          {...register('excerpt', { required: true })}
          defaultValue={post.excerpt}
          className="w-full p-2 border rounded-md text-gray-800"
          placeholder="Post excerpt"
        />
        <input
          {...register('coverImage', { required: true })}
          defaultValue={post.coverImage}
          className="w-full p-2 border rounded-md text-gray-800"
          placeholder="Cover image URL"
        />
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">
          Update Post
        </button>
      </form>
    </div>
  )
}