import express from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  addProductImage,
  removeProductImage,
  toggleFeatured,
} from '../controllers/productController.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getProducts);
router.get('/:id', getProductById);

// Admin only routes
router.post('/', authMiddleware, createProduct);
router.put('/:id', authMiddleware, updateProduct);
router.delete('/:id', authMiddleware, deleteProduct);
router.delete('/:id/images', authMiddleware, removeProductImage);
router.post('/:id/images', authMiddleware, addProductImage);
router.delete('/:id/images', authMiddleware, removeProductImage);
router.patch('/:id/featured', authMiddleware, toggleFeatured);

export default router;