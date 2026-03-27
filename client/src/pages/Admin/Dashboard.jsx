import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeTab, setActiveTab] = useState('products');

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    const { data } = await api.get('/products');
    setProducts(data);
  };

  const fetchCategories = async () => {
    const { data } = await api.get('/categories');
    setCategories(data);
  };

  const handleDeleteProduct = async (id) => {
    if (confirm('Are you sure?')) {
      await api.delete(`/products/${id}`);
      toast.success('Product deleted');
      fetchProducts();
    }
  };

  const handleDeleteCategory = async (id) => {
    if (confirm('Are you sure?')) {
      await api.delete(`/categories/${id}`);
      toast.success('Category deleted');
      fetchCategories();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-deepTeal mb-8">Admin Dashboard</h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-8 border-b">
        <button
          onClick={() => setActiveTab('products')}
          className={`pb-2 px-4 ${activeTab === 'products' ? 'border-b-2 border-dustyRose text-dustyRose' : 'text-gray-500'}`}
        >
          Products
        </button>
        <button
          onClick={() => setActiveTab('categories')}
          className={`pb-2 px-4 ${activeTab === 'categories' ? 'border-b-2 border-dustyRose text-dustyRose' : 'text-gray-500'}`}
        >
          Categories
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`pb-2 px-4 ${activeTab === 'settings' ? 'border-b-2 border-dustyRose text-dustyRose' : 'text-gray-500'}`}
        >
          Settings
        </button>
      </div>

      {/* Products Tab */}
      {activeTab === 'products' && (
        <div>
          <Link to="/admin/products/new" className="bg-deepTeal text-cream px-4 py-2 rounded-lg hover:bg-dustyRose transition mb-4 inline-block">
            Add New Product
          </Link>
          <div className="grid gap-4">
            {products.map(product => (
              <motion.div key={product._id} className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
                <div>
                  <h3 className="font-bold">{product.name}</h3>
                  <p className="text-sm text-gray-600">{product.category?.name}</p>
                </div>
                <div className="space-x-2">
                  <Link to={`/admin/products/edit/${product._id}`} className="text-warmGold hover:underline">Edit</Link>
                  <button onClick={() => handleDeleteProduct(product._id)} className="text-red-500 hover:underline">Delete</button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Categories Tab */}
      {activeTab === 'categories' && (
        <div>
          <Link to="/admin/categories/new" className="bg-deepTeal text-cream px-4 py-2 rounded-lg hover:bg-dustyRose transition mb-4 inline-block">
            Add New Category
          </Link>
          <div className="grid gap-4">
            {categories.map(category => (
              <motion.div key={category._id} className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
                <div>
                  <h3 className="font-bold">{category.name}</h3>
                  <p className="text-sm text-gray-600">{category.description}</p>
                </div>
                <div className="space-x-2">
                  <Link to={`/admin/categories/edit/${category._id}`} className="text-warmGold hover:underline">Edit</Link>
                  <button onClick={() => handleDeleteCategory(category._id)} className="text-red-500 hover:underline">Delete</button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <SettingsForm />
      )}
    </div>
  );
};

// SettingsForm component inline for brevity
const SettingsForm = () => {
  const [goal, setGoal] = useState('');

  useEffect(() => {
    const fetchSetting = async () => {
      try {
        const { data } = await api.get('/settings/ourGoal');
        setGoal(data.value);
      } catch (err) {
        // setting might not exist
      }
    };
    fetchSetting();
  }, []);

  const handleSave = async () => {
    await api.put('/settings/ourGoal', { value: goal });
    toast.success('Saved');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Edit "Our Goal"</h2>
      <textarea
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        rows="4"
        className="w-full border rounded-lg p-2"
      />
      <button onClick={handleSave} className="mt-4 bg-deepTeal text-cream px-6 py-2 rounded-lg hover:bg-dustyRose">
        Save
      </button>
    </div>
  );
};

export default Dashboard;