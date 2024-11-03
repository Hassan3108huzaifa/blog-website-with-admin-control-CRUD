// models/Post.js
import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  author: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const PostSchema = new mongoose.Schema({
  slug: { type: String, unique: true, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  excerpt: String,
  coverImage: String,
  createdAt: { type: Date, default: Date.now },
  comments: [CommentSchema],
  author: String,
});

// Check if the model already exists to avoid recompilation
const Post = mongoose.models.Post || mongoose.model('Post', PostSchema);

export default Post;