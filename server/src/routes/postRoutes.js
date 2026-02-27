import { Router } from 'express';
import multer from 'multer';
import { createPost, getPostById, getPosts } from '../controllers/postController.js';
import { protectAdmin } from '../middleware/auth.js';

const router = Router();

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (_req, file, cb) => {
    const suffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${suffix}-${file.originalname.replace(/\s+/g, '-')}`);
  }
});

const upload = multer({
  storage,
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image uploads are allowed.'));
    }
  }
});

router.get('/', getPosts);
router.get('/:id', getPostById);
router.post('/', protectAdmin, upload.single('coverImage'), createPost);

export default router;
