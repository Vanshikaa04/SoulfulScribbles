import Product from '../models/Product.js';
import cloudinary from '../config/cloudinary.js';

// @desc    Get all products
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get single product by ID
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Create a new product
// @route   POST /api/products
// @access  Private (Admin)
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, images, tags, category, featured } = req.body;
    const newProduct = new Product({
      name,
      description,
      price,
      images: images || [],
      tags: tags || [],
      category,          // <-- added
      featured: featured || false,
    });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @desc    Update a product (all fields)
// @route   PUT /api/products/:id
// @access  Private (Admin)
export const updateProduct = async (req, res) => {
  try {
    const { name, description, price, images, tags, category, featured } = req.body;
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    product.name = name !== undefined ? name : product.name;
    product.description = description !== undefined ? description : product.description;
    product.price = price !== undefined ? price : product.price;
    product.images = images !== undefined ? images : product.images;
    product.tags = tags !== undefined ? tags : product.tags;
    product.category = category !== undefined ? category : product.category;  // <-- added
    product.featured = featured !== undefined ? featured : product.featured;

    await product.save();
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private (Admin)
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    // Delete all images from Cloudinary
    for (const imageUrl of product.images) {
      try {
        const publicId = imageUrl.split('/').slice(-2).join('/').split('.')[0];
        await cloudinary.uploader.destroy(`soulful-scribble/${publicId}`);
      } catch (err) {
        console.error(`Failed to delete image ${imageUrl}:`, err.message);
      }
    }

    await product.deleteOne();
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Add an image to product (by Cloudinary URL)
// @route   POST /api/products/:id/images
// @access  Private (Admin)
export const addProductImage = async (req, res) => {
  try {
    const { imageUrls } = req.body; // array of URLs
    if (!imageUrls || !Array.isArray(imageUrls)) {
      return res.status(400).json({ message: 'imageUrls array required' });
    }

    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    product.images.push(...imageUrls);
    await product.save();
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @desc    Remove an image from product and Cloudinary
// @route   DELETE /api/products/:id/images
// @access  Private (Admin)
export const removeProductImage = async (req, res) => {
  try {
    const { imageUrl } = req.body;
    if (!imageUrl) return res.status(400).json({ message: 'imageUrl is required' });

    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    // Check if image exists in product
    if (!product.images.includes(imageUrl)) {
      return res.status(400).json({ message: 'Image not found in product' });
    }

    // Remove from Cloudinary
    try {
      const publicId = imageUrl.split('/').slice(-2).join('/').split('.')[0];
      await cloudinary.uploader.destroy(`soulful-scribble/${publicId}`);
    } catch (err) {
      console.error('Cloudinary deletion failed:', err.message);
      // Continue even if Cloudinary fails – we still remove from DB
    }

    // Remove from product array
    product.images = product.images.filter(url => url !== imageUrl);
    await product.save();
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Toggle featured status
// @route   PATCH /api/products/:id/featured
// @access  Private (Admin)
export const toggleFeatured = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    product.featured = !product.featured;
    await product.save();
    res.json({ featured: product.featured });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};