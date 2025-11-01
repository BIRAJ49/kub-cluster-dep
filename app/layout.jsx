import './globals.css';
import Nav from './components/Nav';

export const metadata = {
  title: 'Simple Blog',
  description: 'A minimal Next.js blog with Postgres storage.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="page">
          <Nav />
          <main className="main">{children}</main>
          <footer className="footer">
            <p>&copy; {new Date().getFullYear()} Simple Blog. Crafted with Next.js.</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
