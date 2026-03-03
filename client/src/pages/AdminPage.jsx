import { useEffect, useMemo, useState } from 'react';
import { api, getPostShareUrl, setAuthToken } from '../services/api';

const initialForm = {
  title: '',
  excerpt: '',
  content: '',
  tags: '',
  coverImage: null
};

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(localStorage.getItem('adminToken')));
  const [login, setLogin] = useState({ email: '', password: '' });
  const [form, setForm] = useState(initialForm);
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState('');

  const isFormValid = useMemo(
    () => form.title && form.excerpt && form.content && form.coverImage,
    [form]
  );

  const fetchPosts = async () => {
    const { data } = await api.get('/posts');
    setPosts(data);
  };

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }

    fetchPosts().catch(() => {
      setStatus('Could not load posts.');
    });
  }, [isLoggedIn]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setStatus('Authenticating...');

    try {
      const { data } = await api.post('/auth/login', login);
      setAuthToken(data.token);
      setIsLoggedIn(true);
      setStatus('You are in. Start publishing.');
    } catch (error) {
      setStatus(error.response?.data?.message || 'Login failed.');
    }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    setStatus('Publishing your story...');

    try {
      const payload = new FormData();
      payload.append('title', form.title);
      payload.append('excerpt', form.excerpt);
      payload.append('content', form.content);
      payload.append('tags', form.tags);
      payload.append('coverImage', form.coverImage);

      await api.post('/posts', payload, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setForm(initialForm);
      await fetchPosts();
      setStatus('Published successfully ✨');
    } catch (error) {
      setStatus(error.response?.data?.message || 'Could not publish post.');
    }
  };

  const handleDeletePost = async (postId) => {
    setStatus('Deleting post...');

    try {
      await api.delete(`/posts/${postId}`);
      setPosts((currentPosts) => currentPosts.filter((post) => post._id !== postId));
      setStatus('Post deleted successfully.');
    } catch (error) {
      setStatus(error.response?.data?.message || 'Could not delete post.');
    }
  };

  const handleSharePost = async (postId) => {
    const shareUrl = getPostShareUrl(postId);

    try {
      if (navigator.share) {
        await navigator.share({
          title: 'ArtofRJ post',
          url: shareUrl
        });
      } else {
        await navigator.clipboard.writeText(shareUrl);
      }

      setStatus('Post share link ready.');
    } catch (_error) {
      setStatus('Could not share post link.');
    }
  };

  const handleLogout = () => {
    setAuthToken(null);
    setIsLoggedIn(false);
    setStatus('Logged out successfully.');
    setForm(initialForm);
    setPosts([]);
  };

  if (!isLoggedIn) {
    return (
      <section className="mx-auto max-w-md rounded-3xl border border-amber-900/30 bg-stone-900/60 p-8">
        <h1 className="font-serifDisplay text-4xl text-amber-100">Writer Desk</h1>
        <p className="mt-2 text-sm text-stone-400">Only the author can publish new stories.</p>
        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <input className="w-full rounded-xl border border-stone-700 bg-stone-800 p-3" placeholder="Admin email" type="email" value={login.email} onChange={(e) => setLogin({ ...login, email: e.target.value })} />
          <input className="w-full rounded-xl border border-stone-700 bg-stone-800 p-3" placeholder="Password" type="password" value={login.password} onChange={(e) => setLogin({ ...login, password: e.target.value })} />
          <button className="w-full rounded-xl bg-amber-700 px-4 py-3 font-semibold hover:bg-amber-600">Enter studio</button>
        </form>
        {status && <p className="mt-4 text-sm text-amber-200">{status}</p>}
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-3xl rounded-3xl border border-amber-900/30 bg-stone-900/60 p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-serifDisplay text-4xl text-amber-100">Compose a New Blog</h1>
          <p className="mt-2 text-sm text-stone-400">Publish your words and visuals. Readers can only view what you share.</p>
        </div>
        <button onClick={handleLogout} type="button" className="rounded-xl border border-amber-700 px-4 py-2 text-sm font-semibold text-amber-200 hover:bg-amber-900/30">
          Logout
        </button>
      </div>

      <form onSubmit={handleCreatePost} className="mt-8 space-y-4">
        <input className="w-full rounded-xl border border-stone-700 bg-stone-800 p-3" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <textarea className="w-full rounded-xl border border-stone-700 bg-stone-800 p-3" rows="3" placeholder="Excerpt" value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} />
        <textarea className="w-full rounded-xl border border-stone-700 bg-stone-800 p-3" rows="12" placeholder="Write your full blog content..." value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} />
        <input className="w-full rounded-xl border border-stone-700 bg-stone-800 p-3" placeholder="Tags (comma separated)" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} />
        <input className="w-full rounded-xl border border-stone-700 bg-stone-800 p-3 file:mr-4 file:rounded-lg file:border-0 file:bg-amber-700 file:px-3 file:py-2 file:text-white" type="file" accept="image/*" onChange={(e) => setForm({ ...form, coverImage: e.target.files?.[0] || null })} />
        <button disabled={!isFormValid} className="rounded-xl bg-amber-700 px-6 py-3 font-semibold disabled:cursor-not-allowed disabled:bg-stone-700 hover:bg-amber-600">Publish Post</button>
      </form>

      <div className="mt-10">
        <h2 className="font-serifDisplay text-3xl text-amber-100">Manage Posts</h2>
        <div className="mt-4 space-y-3">
          {posts.map((post) => (
            <article key={post._id} className="rounded-xl border border-stone-700 bg-stone-900/70 p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-lg font-semibold text-amber-100">{post.title}</h3>
                <div className="flex items-center gap-2">
                  <button type="button" onClick={() => handleSharePost(post._id)} className="rounded-lg border border-amber-700 px-3 py-1.5 text-sm text-amber-200 hover:bg-amber-900/30">
                    Share
                  </button>
                  <button type="button" onClick={() => handleDeletePost(post._id)} className="rounded-lg border border-rose-700 px-3 py-1.5 text-sm text-rose-200 hover:bg-rose-900/30">
                    Delete
                  </button>
                </div>
              </div>
            </article>
          ))}
          {!posts.length && <p className="text-sm text-stone-400">No posts available yet.</p>}
        </div>
      </div>

      {status && <p className="mt-4 text-sm text-amber-200">{status}</p>}
    </section>
  );
}
