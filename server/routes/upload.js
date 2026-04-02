import express from 'express';
import multer from 'multer';
import cloudinary from '../config/cloudinary.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// Configure multer for memory storage (or disk – we'll use memory for Cloudinary)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Upload image to Cloudinary (admin only)
router.post('/', authMiddleware, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Convert buffer to base64
    const base64 = req.file.buffer.toString('base64');
    const dataURI = `data:${req.file.mimetype};base64,${base64}`;

    const result = await cloudinary.uploader.upload(dataURI, {
      folder: 'soulful-scribble/products',
    });

    res.json({ url: result.secure_url });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ error: 'Upload failed', details: err.message });
  }
});

export default router;