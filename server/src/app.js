import express from 'express';
import cors from 'cors';
import path from 'node:path';
import authRoutes from './routes/authRoutes.js';
import postRoutes from './routes/postRoutes.js';

const app = express();

app.use(cors({ origin: process.env.CLIENT_ORIGIN?.split(',') || '*' }));
app.use(express.json());
app.use('/uploads', express.static(path.resolve('uploads')));

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);
  const message = err.message || 'Unexpected server error';
  res.status(500).json({ message });
});

export default app;
