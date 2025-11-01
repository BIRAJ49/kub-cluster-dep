'use server';

import { revalidatePath } from 'next/cache';
import { pool, ensureReady } from './db';

export async function getPosts() {
  try {
    await ensureReady();
    if (!pool) {
      throw new Error('Database connection not configured.');
    }

    const { rows } = await pool.query(
      `SELECT id, title, content, created_at FROM blog_posts ORDER BY created_at DESC`
    );

    return { posts: rows, error: null };
  } catch (error) {
    console.error('[getPosts] failed to load posts:', error);
    return {
      posts: [],
      error: 'Unable to load posts right now. Please try again soon.'
    };
  }
}

export async function createPost(prevState, formData) {
  const title = formData.get('title')?.toString().trim();
  const content = formData.get('content')?.toString().trim();

  if (!title || !content) {
    return { success: false, error: 'Please provide both a title and content.', post: null };
  }

  try {
    await ensureReady();
    if (!pool) {
      throw new Error('Database connection not configured.');
    }

    const { rows } = await pool.query(
      `INSERT INTO blog_posts (title, content) VALUES ($1, $2) RETURNING id, title, content, created_at`,
      [title, content]
    );

    const post = rows[0];

    revalidatePath('/');
    revalidatePath('/blogs');

    return { success: true, error: null, post };
  } catch (error) {
    console.error('[createPost] failed to insert blog post:', error);
    return {
      success: false,
      error: 'Something went wrong while saving your post. Please try again.',
      post: null
    };
  }
}
