'use client'

import { useState } from 'react'
import Link from 'next/link'
import { getPosts, Post } from '@/lib/posts'

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Post[]>([])

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    const allPosts = await getPosts()
    const filteredPosts = allPosts.filter(post =>
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.content.toLowerCase().includes(query.toLowerCase())
    )
    setResults(filteredPosts)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Search</h1>
      <form onSubmit={handleSearch} className="mb-8">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-2 border rounded-md text-gray-800"
          placeholder="Search for blog posts..."
        />
        <button type="submit" className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md">
          Search
        </button>
      </form>
      <div className="space-y-4">
        {results.map((result) => (
          <div key={result._id} className="bg-white shadow-md rounded-lg p-4">
            <Link href={`/blog/${result.slug}`} className="text-xl font-semibold hover:underline text-gray-800">
              {result.title}
            </Link>
            <p className="text-gray-600 mt-2">{result.excerpt}</p>
          </div>
        ))}
      </div>
    </div>
  )
}