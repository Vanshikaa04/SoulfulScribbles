import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { FaTrash, FaPlus } from 'react-icons/fa';

const ALL_TAGS = [
  'for-him', 'for-her', 'money', 'anniversary', 'birthday',
  'bride/groom', 'brochure', 'keychain', 'flowers', 'chocolates',
  'surprises', 'dosti', 'return-gifts', 'pictures',
];

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [tagInput, setTagInput] = useState('');

  // Form fields
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    tags: [],
    category: '',
    featured: false,
  });

  // Existing images from the product (Cloudinary URLs)
  const [existingImages, setExistingImages] = useState([]);
  // New image files selected but not yet uploaded
  const [newImageFiles, setNewImageFiles] = useState([]);
  // Preview URLs for new images (for display)
  const [previewUrls, setPreviewUrls] = useState([]);

  useEffect(() => {
    if (id) fetchProduct();
    return () => {
      // Cleanup preview URLs to avoid memory leaks
      previewUrls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [id]);

  const fetchProduct = async () => {
    try {
      const { data } = await api.get(`/products/${id}`);
      setForm({
        name: data.name,
        description: data.description || '',
        price: data.price || '',
        tags: data.tags || [],
        category: data.category || '',
        featured: data.featured || false,
      });
      setExistingImages(data.images || []);
    } catch (err) {
      toast.error('Failed to load product');
      navigate('/admin');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const toggleTag = (tag) => {
    setForm(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  // Handle image selection (store files, create previews)
  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    // Create preview URLs
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setPreviewUrls(prev => [...prev, ...newPreviews]);
    setNewImageFiles(prev => [...prev, ...files]);
  };

  // Remove an existing image (Cloudinary URL) – delete from server
  const removeExistingImage = async (imageUrl) => {
    try {
      await api.delete(`/products/${id}/images`, { data: { imageUrl } });
      setExistingImages(prev => prev.filter(url => url !== imageUrl));
      toast.success('Image removed');
    } catch (err) {
      toast.error('Failed to remove image');
    }
  };

  // Remove a new image (not yet uploaded) – just from local state
  const removeNewImage = (index) => {
    // Revoke the object URL to free memory
    URL.revokeObjectURL(previewUrls[index]);
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
    setNewImageFiles(prev => prev.filter((_, i) => i !== index));
  };

  // Submit handler – saves product, then uploads new images
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let productId = id;

      if (!id) {
        // 1. Create product without images
        const { data } = await api.post('/products', { ...form, images: [] });
        productId = data._id;
        toast.success('Product created, uploading images...');
      } else {
        // 2. Update existing product (without changing images)
        await api.put(`/products/${id}`, form);
        toast.success('Product updated, uploading new images...');
      }

      // 3. Upload new images (if any) and add them to product
      if (newImageFiles.length > 0) {
        setUploading(true);
        const uploadedUrls = [];

        for (const file of newImageFiles) {
          const uploadFormData = new FormData();
          uploadFormData.append('file', file);
          const { data: uploadData } = await api.post('/upload', uploadFormData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          });
          uploadedUrls.push(uploadData.url);
        }

        // Add all new image URLs to the product
        await api.post(`/products/${productId}/images`, { imageUrls: uploadedUrls });
        toast.success(`${uploadedUrls.length} image(s) added`);
      }

      toast.success(id ? 'Product updated' : 'Product created');
      navigate('/admin');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error saving product');
    } finally {
      setLoading(false);
      setUploading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold text-darkBrown mb-6">
        {id ? 'Edit Product' : 'New Product'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl shadow">
        {/* Name, Description, Price, Category, Tags, Featured – same as before */}
        <div>
          <label className="block text-darkBrown font-medium mb-1">Product Name </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2"
            
          />
        </div>

        <div>
          <label className="block text-darkBrown font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="3"
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>

        <div>
          <label className="block text-darkBrown font-medium mb-1">Price (₹)</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>

        <div>
          <label className="block text-darkBrown font-medium mb-1">Category *</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2"
            required
          >
            <option value="">Select category</option>
            <option value="bouquets">Bouquets</option>
            <option value="hampers">Hampers</option>
            <option value="magazines">Magazines</option>
            <option value="packing">Packing</option>
            <option value="keychains">Keychains</option>
          </select>
        </div>

        {/* Tags Grid */}
        <div>
          <label className="block text-darkBrown font-medium mb-2">Tags</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {ALL_TAGS.map(tag => (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  form.tags.includes(tag)
                    ? 'bg-blue-200 text-blue-800 border border-blue-300'
                    : 'bg-gray-100 text-darkBrown/70 hover:bg-gray-200'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="featured"
            id="featured"
            checked={form.featured}
            onChange={handleChange}
            className="w-4 h-4 text-accentPink"
          />
          <label htmlFor="featured" className="text-darkBrown">Featured Product</label>
        </div>

        {/* Image Management */}
        <div>
          <label className="block text-darkBrown font-medium mb-1">Images</label>

          {/* Existing images (from server) */}
          {existingImages.length > 0 && (
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Existing images:</p>
              <div className="flex flex-wrap gap-2">
                {existingImages.map((url, idx) => (
                  <div key={idx} className="relative group">
                    <img src={url} alt={`existing-${idx}`} className="w-16 h-16 object-cover rounded border" />
                    <button
                      type="button"
                      onClick={() => removeExistingImage(url)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                    >
                      <FaTrash size={10} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* New images (local preview) */}
          {previewUrls.length > 0 && (
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">New images (will be uploaded after save):</p>
              <div className="flex flex-wrap gap-2">
                {previewUrls.map((url, idx) => (
                  <div key={idx} className="relative group">
                    <img src={url} alt={`preview-${idx}`} className="w-16 h-16 object-cover rounded border" />
                    <button
                      type="button"
                      onClick={() => removeNewImage(idx)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                    >
                      <FaTrash size={10} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageSelect}
            disabled={uploading}
            className="mt-2"
          />
          <p className="text-xs text-gray-500 mt-1">
            Select images (they will be uploaded after you save the product).
          </p>
        </div>

        {/* Submit */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-darkBrown text-softWhite px-6 py-2 rounded-lg hover:bg-accentPink transition disabled:opacity-50"
          >
            {loading ? 'Saving...' : (id ? 'Update Product' : 'Create Product')}
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin')}
            className="bg-gray-300 text-darkBrown px-6 py-2 rounded-lg hover:bg-gray-400 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;