import fs from 'node:fs/promises';
import path from 'node:path';
import cloudinary from '../config/cloudinary.js';

export const uploadImage = async (file, useCloudinary) => {
  if (!file) {
    throw new Error('Image file is required.');
  }

  if (useCloudinary) {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: 'artofrj-posts'
    });
    await fs.unlink(file.path);
    return result.secure_url;
  }

  return `/uploads/${path.basename(file.path)}`;
};
