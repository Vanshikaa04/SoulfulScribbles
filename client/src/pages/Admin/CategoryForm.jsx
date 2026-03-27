import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import toast from 'react-hot-toast';

const CategoryForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    description: '',
    image: '',
  });

  useEffect(() => {
    if (id) fetchCategory();
  }, [id]);

  const fetchCategory = async () => {
    const { data } = await api.get(`/categories/${id}`);
    setForm({
      name: data.name,
      description: data.description || '',
      image: data.image || '',
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    try {
      const { data } = await api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setForm(prev => ({ ...prev, image: data.url }));
    } catch (err) {
      toast.error('Upload failed');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await api.put(`/categories/${id}`, form);
        toast.success('Category updated');
      } else {
        await api.post('/categories', form);
        toast.success('Category created');
      }
      navigate('/admin');
    } catch (err) {
      toast.error('Error saving category');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <h1 className="text-3xl font-bold mb-6">{id ? 'Edit Category' : 'New Category'}</h1>
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
          <label className="block mb-1">Category Image (optional)</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          {form.image && <img src={form.image} alt="category" className="mt-2 w-32 h-32 object-cover rounded" />}
        </div>
        <button type="submit" className="bg-deepTeal text-cream px-6 py-2 rounded-lg hover:bg-dustyRose transition">
          {id ? 'Update' : 'Create'} Category
        </button>
      </form>
    </div>
  );
};

export default CategoryForm;