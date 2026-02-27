import Post from '../models/Post.js';
import { uploadImage } from '../utils/uploadImage.js';

export const getPosts = async (_req, res) => {
  const posts = await Post.find().sort({ publishedAt: -1 });
  return res.json(posts);
};

export const getPostById = async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(404).json({ message: 'Post not found.' });
  }

  return res.json(post);
};

export const createPost = async (req, res) => {
  const { title, excerpt, content, tags } = req.body;

  if (!title || !excerpt || !content) {
    return res.status(400).json({ message: 'Title, excerpt and content are required.' });
  }

  const coverImage = await uploadImage(req.file, req.app.locals.useCloudinary);

  const parsedTags = typeof tags === 'string'
    ? tags.split(',').map((tag) => tag.trim()).filter(Boolean)
    : [];

  const created = await Post.create({
    title,
    excerpt,
    content,
    coverImage,
    tags: parsedTags
  });

  return res.status(201).json(created);
};
