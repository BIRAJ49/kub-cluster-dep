export const metadata = {
  title: 'About Us · Simple Blog'
};

export default function AboutPage() {
  return (
    <section className="container grid">
      <div className="card">
        <h1 className="hero-title">About Simple Blog</h1>
        <p className="hero-subtitle">
          Simple Blog is a minimal publishing experience built with Next.js. It gives you a clean
          interface to write, store, and revisit your stories.
        </p>
        <div style={{ marginTop: '1.5rem', display: 'grid', gap: '1rem' }}>
          <p>
            Posts are stored securely in Postgres using the connection string you provide in the
            <code>DATABASE_URL</code> environment variable. From the home page you can share a new
            idea in seconds, and it instantly appears in your archive.
          </p>
          <p>
            Want to extend it? Add new fields, swap the styling, or connect user authentication.
            You are in control of the roadmap.
          </p>
        </div>
      </div>
    </section>
  );
}
