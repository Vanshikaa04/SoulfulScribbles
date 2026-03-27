import express from 'express';
import multer from 'multer';
import cloudinary from '../config/cloudinary.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Upload image/video to Cloudinary
router.post('/', authMiddleware, upload.single('file'), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'soulful-scribble',
      resource_type: 'auto'
    });
    res.json({ url: result.secure_url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;