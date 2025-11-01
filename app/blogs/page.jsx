import { getPosts } from '../lib/posts';

function formatDate(value) {
  return new Date(value).toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

export const metadata = {
  title: 'Blog Posts · Simple Blog'
};

export default async function BlogsPage() {
  const { posts, error } = await getPosts();

  return (
    <section className="container grid">
      <div className="card">
        <h1 className="hero-title">Recent posts</h1>
        <p className="hero-subtitle">
          Every entry you publish from the home page lands here. Explore your archive below.
        </p>
      </div>
      <div className="post-list">
        {error && <p className="status status-error">{error}</p>}
        {!error && posts.length === 0 && (
          <p className="muted">No posts yet. Be the first to write one!</p>
        )}
        {posts.map((post) => (
          <article key={post.id} className="post-item">
            <h3>{post.title}</h3>
            <div className="post-meta">{formatDate(post.created_at)}</div>
            <p>{post.content}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
