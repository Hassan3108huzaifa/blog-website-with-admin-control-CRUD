// scripts/seed-data.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import Post from '../../models/Post.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env.local
dotenv.config({ path: join(__dirname, '..', '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

// Sample post interface (not needed in JS, but kept for reference)
const samplePosts = [
  {
    slug: 'mera-pehla-blog-post',
    title: 'Mera Pehla Blog Post',
    content: 'Ye mera pehla blog post hai. Main bahut excited hoon!',
    excerpt: 'Exciting pehla blog post',
    coverImage: '/placeholder.svg?height=400&width=800',
    author: 'Aap Ka Naam',
  },
  {
    slug: 'dusra-dilchasp-post',
    title: 'Ek Aur Dilchasp Post',
    content: 'Is post mein main kuch aur interesting baatein share karunga.',
    excerpt: 'Aur bhi dilchasp baatein',
    coverImage: '/placeholder.svg?height=400&width=800',
    author: 'Aap Ka Naam',
  },
];

async function seedDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    await Post.deleteMany({});
    console.log('Cleared existing posts');

    const createdPosts = await Post.create(samplePosts);
    console.log(`Created ${createdPosts.length} sample posts`);

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

seedDatabase();