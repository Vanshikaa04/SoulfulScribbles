import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String},
  description: String,
  price: Number,
  images: [String],            // Cloudinary URLs
  tags: [String],              // e.g., ["for-him", "for-her", "bouquet"]
  category: { type: String, required: true }, // category name (not ObjectId)
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Product', productSchema);