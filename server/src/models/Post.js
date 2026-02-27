import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    excerpt: { type: String, required: true, trim: true, maxlength: 240 },
    content: { type: String, required: true },
    coverImage: { type: String, required: true },
    tags: [{ type: String, trim: true }],
    publishedAt: { type: Date, default: Date.now }
  },
  {
    timestamps: true
  }
);

postSchema.index({ title: 'text', content: 'text', tags: 'text' });

export default mongoose.model('Post', postSchema);
