import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../services/api';
import ProductCard from '../components/ProductCard';
import { motion } from 'framer-motion';

const Products = () => {
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get('category');

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(categoryId || 'all');

  useEffect(() => {
    const fetchData = async () => {
      const [prodRes, catRes] = await Promise.all([
        api.get('/products'),
        api.get('/categories')
      ]);
      setProducts(prodRes.data);
      setCategories(catRes.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (categoryId && categories.length > 0) {
      // verify category exists
      const exists = categories.some(c => c._id === categoryId);
      if (exists) setSelectedCategory(categoryId);
    }
  }, [categoryId, categories]);

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category._id === selectedCategory);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-darkBrown mb-8">Our Products</h1>

      <div className="flex flex-wrap gap-4 mb-8">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-full transition ${
            selectedCategory === 'all'
              ? 'bg-darkBrown text-softWhite'
              : 'bg-pastelPink text-darkBrown hover:bg-accentPink'
          }`}
        >
          All
        </button>
        {categories.map(cat => (
          <button
            key={cat._id}
            onClick={() => setSelectedCategory(cat._id)}
            className={`px-4 py-2 rounded-full transition ${
              selectedCategory === cat._id
                ? 'bg-darkBrown text-softWhite'
                : 'bg-pastelPink text-darkBrown hover:bg-accentPink'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(product => (
          <motion.div key={product._id} layout>
            <ProductCard product={product} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Products;