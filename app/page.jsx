import Link from 'next/link';
import { getPosts } from './lib/posts';

function formatDate(value) {
  return new Date(value).toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

export default async function HomePage() {
  const { posts, error } = await getPosts();

  return (
    <section className="container grid">
      <div className="card" style={{ display: 'grid', gap: '1rem' }}>
        <h1 className="hero-title">Your latest stories</h1>
        <p className="hero-subtitle">
          Catch up on everything you have published. Entries appear instantly after you save them,
          so this feed is always up to date.
        </p>
        <div>
          <Link className="button" href="/write">
            Write a new post
          </Link>
        </div>
      </div>

      <div className="card" style={{ display: 'grid', gap: '1.5rem' }}>
        <header>
          <h2 style={{ margin: 0, fontSize: '1.5rem', color: '#1f2a44' }}>Recent posts</h2>
          <p className="hero-subtitle" style={{ marginTop: '0.35rem' }}>
            Browse the archive below. Need to edit or expand? Publish a fresh take from the write
            page.
          </p>
        </header>

        <div className="post-list">
          {error && <p className="status status-error">{error}</p>}
          {!error && posts.length === 0 && (
            <p className="muted">No posts yet. Head to the write page to share your first story.</p>
          )}
          {posts.map((post) => (
            <article key={post.id} className="post-item">
              <h3>{post.title}</h3>
              <div className="post-meta">{formatDate(post.created_at)}</div>
              <p>{post.content}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
