import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../services/api';

export default function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    api.get(`/posts/${id}`).then(({ data }) => setPost(data));
  }, [id]);

  if (!post) {
    return <p className="text-center text-stone-400">Loading story...</p>;
  }

  return (
    <article className="mx-auto max-w-4xl space-y-8">
      <img src={post.coverImage} alt={post.title} className="h-[420px] w-full rounded-3xl object-cover" />
      <div className="space-y-4">
        <p className="text-xs uppercase tracking-[0.2em] text-amber-300/80">{new Date(post.publishedAt).toLocaleDateString()}</p>
        <h1 className="font-serifDisplay text-5xl text-amber-100">{post.title}</h1>
        <p className="text-lg italic text-stone-300">{post.excerpt}</p>
      </div>
      <section className="prose-copy whitespace-pre-wrap text-lg">{post.content}</section>
    </article>
  );
}
