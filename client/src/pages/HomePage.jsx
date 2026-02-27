import { useEffect, useState } from 'react';
import { api } from '../services/api';
import PostCard from '../components/PostCard';

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await api.get('/posts');
        setPosts(data);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <section className="space-y-10">
      <div className="space-y-5 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-amber-300/80">Writer's Journal</p>
        <h1 className="font-serifDisplay text-5xl text-amber-50 md:text-7xl">Stories from an Artistic Soul</h1>
        <p className="mx-auto max-w-3xl text-stone-300">A quiet place where words are painted like brushstrokes—essays, poems, memoir fragments, and long-form reflections.</p>
      </div>
      {loading ? (
        <p className="text-center text-stone-400">Loading stories...</p>
      ) : posts.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-stone-700 p-10 text-center text-stone-400">No posts yet. The first piece is on its way.</p>
      ) : (
        <div className="grid gap-8 md:grid-cols-2">
          {posts.map((post) => <PostCard key={post._id} post={post} />)}
        </div>
      )}
    </section>
  );
}
