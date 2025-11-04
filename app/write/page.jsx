'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { useFormState } from 'react-dom';
import { createPost } from '../lib/posts';

const initialState = { success: false, error: null, post: null };

export default function WritePage() {
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
        <h1 className="hero-title">Write a new post</h1>
        <p className="hero-subtitle">
          Capture a headline and your story below. When you publish, it appears instantly on the
          home page feed.
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
            Post published! Head back to the <Link href="/">home page</Link> to read it.
          </p>
        )}

        <p className="hero-subtitle" style={{ marginTop: '1rem' }}>
          Prefer to review instead? Visit the <Link href="/">home page</Link> to see every story.
        </p>
      </div>
    </section>
  );
}
