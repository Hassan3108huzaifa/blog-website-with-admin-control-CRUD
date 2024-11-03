'use client'

import { useState, useEffect, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { addComment, getPostBySlug } from '@/lib/posts'
import { User, Send } from 'lucide-react'

type Comment = {
  _id: string
  content: string
  author: string
  createdAt: string
}

type CommentFormData = {
  content: string
  author: string
}

export default function Comments({ postId, slug }: { postId: string, slug: string }) {
  const [comments, setComments] = useState<Comment[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const { register, handleSubmit, reset, formState: { errors } } = useForm<CommentFormData>()

  const fetchComments = useCallback(async () => {
    try {
      const post = await getPostBySlug(slug)
      if (post && post.comments) {
        setComments(post.comments)
      }
    } catch (error) {
      console.error('Failed to fetch comments:', error)
    }
  }, [slug])

  useEffect(() => {
    fetchComments()
  }, [fetchComments])

  const onSubmit = useCallback(async (data: CommentFormData) => {
    setIsSubmitting(true)
    setSubmitError(null)
    try {
      const newComment = await addComment(postId, data)
      setComments(prevComments => [...prevComments, newComment])
      reset()
      await fetchComments() // Refresh comments after adding a new one
    } catch (error) {
      console.error('Failed to add comment:', error)
      setSubmitError(error instanceof Error ? error.message : 'Failed to add comment. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }, [postId, reset, fetchComments])

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            {...register('author', { required: 'Name is required' })}
            className="text-gray-800 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            placeholder="Your name"
          />
          {errors.author && <p className="mt-1 text-red-600">{errors.author.message}</p>}
        </div>
        <div>
          <textarea
            {...register('content', { required: 'Comment is required' })}
            className="text-gray-800 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            placeholder="Write your comment..."
            rows={4}
          />
          {errors.content && <p className="mt-1 text-red-600">{errors.content.message}</p>}
        </div>
        {submitError && <p className="text-red-600">{submitError}</p>}
        <button 
          type="submit" 
          className="flex items-center justify-center w-full md:w-auto px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors duration-200"
          disabled={isSubmitting}
        >
          <Send className="w-4 h-4 mr-2" />
          {isSubmitting ? 'Submitting...' : 'Submit Comment'}
        </button>
      </form>
      
      <div className="space-y-6">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment._id} className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <User className="w-6 h-6 text-gray-600 mr-2" />
                <span className="font-semibold text-gray-900">{comment.author}</span>
                <span className="text-sm text-gray-600 ml-auto">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-gray-800">{comment.content}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No comments yet. Be the first to comment!</p>
        )}
      </div>
    </div>
  )
}
