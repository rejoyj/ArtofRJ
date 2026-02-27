import { Link } from 'react-router-dom';
import { Feather } from 'lucide-react';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-vignette">
      <header className="border-b border-amber-900/30 backdrop-blur-sm">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link to="/" className="font-serifDisplay text-3xl text-amber-100 tracking-wide">ArtofRJ</Link>
          <Link to="/admin" className="inline-flex items-center gap-2 rounded-full border border-amber-800/80 px-4 py-2 text-sm text-amber-200 hover:bg-amber-900/30">
            <Feather size={15} /> Writer Desk
          </Link>
        </nav>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
    </div>
  );
}
