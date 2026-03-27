import express from 'express';
import Setting from '../models/Setting.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// Get all settings (public)
router.get('/', async (req, res) => {
  try {
    const settings = await Setting.find();
    const settingsObj = {};
    settings.forEach(s => { settingsObj[s.key] = s.value; });
    res.json(settingsObj);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific setting by key (public)
router.get('/:key', async (req, res) => {
  try {
    const setting = await Setting.findOne({ key: req.params.key });
    if (!setting) return res.status(404).json({ message: 'Setting not found' });
    res.json(setting);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update or create setting (admin only)
router.put('/:key', authMiddleware, async (req, res) => {
  try {
    const { value } = req.body;
    const setting = await Setting.findOneAndUpdate(
      { key: req.params.key },
      { value },
      { new: true, upsert: true }
    );
    res.json(setting);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete setting (admin only)
router.delete('/:key', authMiddleware, async (req, res) => {
  try {
    await Setting.findOneAndDelete({ key: req.params.key });
    res.json({ message: 'Setting deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;