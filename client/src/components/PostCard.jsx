import { Link } from 'react-router-dom';

export default function PostCard({ post }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-stone-800/80 bg-stone-900/50 transition hover:-translate-y-1 hover:border-amber-800/70">
      <img src={post.coverImage} alt={post.title} className="h-64 w-full object-cover" />
      <div className="space-y-4 p-6">
        <p className="text-xs uppercase tracking-[0.2em] text-amber-300/80">{new Date(post.publishedAt).toLocaleDateString()}</p>
        <h2 className="font-serifDisplay text-3xl text-amber-100">{post.title}</h2>
        <p className="text-stone-300">{post.excerpt}</p>
        <Link to={`/post/${post._id}`} className="text-sm text-amber-300 hover:text-amber-200">Read the full story →</Link>
      </div>
    </article>
  );
}
