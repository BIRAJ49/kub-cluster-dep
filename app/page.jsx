'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { createPost } from './lib/posts';
import { useFormState } from 'react-dom';

const initialState = { success: false, error: null, post: null };

export default function HomePage() {
  const formRef = useRef(null);
  const [state, formAction] = useFormState(createPost, initialState);

  useEffect(() => {
    if (state.success && formRef.current) {
      formRef.current.reset();
    }
  }, [state.success]);

  return (
    <section className="container grid">
      <div className="card">
        <h1 className="hero-title">Share your story</h1>
        <p className="hero-subtitle">
          Publish a new blog post and it will live forever on your blog page. Fill out the form
          below with a title and your thoughts, then submit to save it to the database.
        </p>
        <form ref={formRef} className="blog-form" action={formAction}>
          <label>
            <span>Title</span>
            <input
              className="input"
              type="text"
              name="title"
              placeholder="Give your post a headline"
              required
            />
          </label>
          <label>
            <span>Content</span>
            <textarea
              className="textarea"
              name="content"
              placeholder="Write your story here..."
              required
            />
          </label>
          <button className="button" type="submit">
            Publish post
          </button>
        </form>
        {state.error && (
          <p className="status status-error" role="alert">
            {state.error}
          </p>
        )}
        {state.success && (
          <p className="status status-success" role="status">
            Post published! Check it out on the <Link href="/blogs">blogs page</Link>.
          </p>
        )}
        <p className="hero-subtitle" style={{ marginTop: '1rem' }}>
          Want to see what you have written? Head over to the{' '}
          <Link href="/blogs">blogs page</Link>.
        </p>
      </div>
    </section>
  );
}
