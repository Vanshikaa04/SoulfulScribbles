import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import toast from 'react-hot-toast';

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    images: [],
    videos: [],
    category: '',
    featured: false,
  });
  const [categories, setCategories] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchCategories();
    if (id) fetchProduct();
  }, [id]);

  const fetchCategories = async () => {
    const { data } = await api.get('/categories');
    setCategories(data);
  };

  const fetchProduct = async () => {
    const { data } = await api.get(`/products/${id}`);
    setForm({
      name: data.name,
      description: data.description || '',
      price: data.price || '',
      images: data.images || [],
      videos: data.videos || [],
      category: data.category._id,
      featured: data.featured || false,
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageUpload = async (e) => {
    const files = e.target.files;
    if (!files.length) return;
    setUploading(true);
    for (let file of files) {
      const formData = new FormData();
      formData.append('file', file);
      try {
        const { data } = await api.post('/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        setForm(prev => ({ ...prev, images: [...prev.images, data.url] }));
      } catch (err) {
        toast.error('Upload failed');
      }
    }
    setUploading(false);
  };

  const handleVideoUpload = async (e) => {
    const files = e.target.files;
    if (!files.length) return;
    setUploading(true);
    for (let file of files) {
      const formData = new FormData();
      formData.append('file', file);
      try {
        const { data } = await api.post('/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        setForm(prev => ({ ...prev, videos: [...prev.videos, data.url] }));
      } catch (err) {
        toast.error('Upload failed');
      }
    }
    setUploading(false);
  };

  const removeImage = (url) => {
    setForm(prev => ({ ...prev, images: prev.images.filter(img => img !== url) }));
  };

  const removeVideo = (url) => {
    setForm(prev => ({ ...prev, videos: prev.videos.filter(v => v !== url) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await api.put(`/products/${id}`, form);
        toast.success('Product updated');
      } else {
        await api.post('/products', form);
        toast.success('Product created');
      }
      navigate('/admin');
    } catch (err) {
      toast.error('Error saving product');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">{id ? 'Edit Product' : 'New Product'}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Name</label>
          <input type="text" name="name" value={form.name} onChange={handleChange} className="w-full border rounded-lg p-2" required />
        </div>
        <div>
          <label className="block mb-1">Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} rows="3" className="w-full border rounded-lg p-2" />
        </div>
        <div>
          <label className="block mb-1">Price (optional)</label>
          <input type="number" name="price" value={form.price} onChange={handleChange} className="w-full border rounded-lg p-2" />
        </div>
        <div>
          <label className="block mb-1">Category</label>
          <select name="category" value={form.category} onChange={handleChange} className="w-full border rounded-lg p-2" required>
            <option value="">Select category</option>
            {categories.map(cat => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
          </select>
        </div>
        <div>
          <label className="block mb-1">Images</label>
          <input type="file" multiple accept="image/*" onChange={handleImageUpload} disabled={uploading} />
          <div className="flex flex-wrap gap-2 mt-2">
            {form.images.map((url, idx) => (
              <div key={idx} className="relative">
                <img src={url} alt="product" className="w-20 h-20 object-cover rounded" />
                <button type="button" onClick={() => removeImage(url)} className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 text-xs">×</button>
              </div>
            ))}
          </div>
        </div>
        <div>
          <label className="block mb-1">Videos</label>
          <input type="file" multiple accept="video/*" onChange={handleVideoUpload} disabled={uploading} />
          <div className="flex flex-wrap gap-2 mt-2">
            {form.videos.map((url, idx) => (
              <div key={idx} className="relative">
                <video src={url} className="w-20 h-20 object-cover rounded" />
                <button type="button" onClick={() => removeVideo(url)} className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 text-xs">×</button>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center">
          <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} id="featured" className="mr-2" />
          <label htmlFor="featured">Featured product</label>
        </div>
        <button type="submit" className="bg-deepTeal text-cream px-6 py-2 rounded-lg hover:bg-dustyRose transition">
          {id ? 'Update' : 'Create'} Product
        </button>
      </form>
    </div>
  );
};

export default ProductForm;