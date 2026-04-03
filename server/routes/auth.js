import express from 'express';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// Admin login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    res.json({ message: 'Logged in successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin logout
router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out' });
});

// Check auth status
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const admin = await Admin.findById(req.adminId).select('-password');
    res.json(admin);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});
router.post('/test', (req, res) => {
  res.json({ message: 'POST works' });
});
export default router;