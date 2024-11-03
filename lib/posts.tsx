  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/posts';

  export interface Post {
    _id: string;
    slug: string;
    title: string;
    content: string;
    excerpt: string;
    coverImage: string;
    createdAt: string;
    comments: Comment[];
    author?: string; 
  }

  export interface Comment {
    _id: string;
    content: string;
    author: string;
    createdAt: string;
  }

  export async function getPosts(): Promise<Post[]> {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`Failed to fetch posts: ${response.status} ${response.statusText}`);
      }
      return response.json();
    } catch (error) {
      console.error('Error fetching posts:', error);
      return [];
    }
  }

  export async function getPostBySlug(slug: string): Promise<Post | undefined> { try { const posts = await getPosts(); return posts.find(post => post.slug === slug); } catch (error) { console.error('Error fetching post by slug:', error); return undefined; } }
  
  export async function createPost(postData: Omit<Post, '_id' | 'createdAt' | 'comments'>): Promise<Post> {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });
      if (!response.ok) {
        throw new Error('Failed to create post');
      }
      return response.json();
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  }

  export async function updatePost(id: string, postData: Partial<Post>): Promise<Post> {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });
      if (!response.ok) {
        throw new Error('Failed to update post');
      }
      return response.json();
    } catch (error) {
      console.error('Error updating post:', error);
      throw error;
    }
  }

  export async function addComment(postId: string, commentData: Omit<Comment, '_id' | 'createdAt'>): Promise<Comment> {
    try {
      const response = await fetch(`${API_URL}/${postId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentData),
      });
      if (!response.ok) {
        throw new Error(`Failed to add comment: ${response.status} ${response.statusText}`);
      }
      return response.json();
    } catch (error) {
      console.error('Error adding comment:', error);
      throw error;
    }
  }

  export async function deletePost(id: string): Promise<void> {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete post');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      throw error;
    }
  }