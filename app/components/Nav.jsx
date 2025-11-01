'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: 'Home' },
  { href: '/blogs', label: 'Blogs' },
  { href: '/about', label: 'About Us' }
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <header className="nav">
      <div className="container nav-inner">
        <Link href="/" className="brand">
          <span role="img" aria-label="book" className="brand-icon">
            📚
          </span>
          <span>Simple Blog</span>
        </Link>
        <nav className="nav-links">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={active ? 'nav-link active' : 'nav-link'}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
