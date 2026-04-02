import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../services/api';
import ProductCard from '../components/ProductCard';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [availableTags, setAvailableTags] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await api.get('/products');
      setProducts(data);
      // Extract unique tags from all products
      const tagsSet = new Set();
      data.forEach(product => {
        product.tags?.forEach(tag => tagsSet.add(tag));
      });
      setAvailableTags(Array.from(tagsSet).sort());
      setFilteredProducts(data);
    } catch (err) {
      console.error('Failed to fetch products', err);
    } finally {
      setLoading(false);
    }
  };

  // Filter products whenever search term or selected tags change
  useEffect(() => {
    let filtered = [...products];

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.description?.toLowerCase().includes(term) ||
          p.category?.toLowerCase().includes(term)
      );
    }

    if (selectedTags.length > 0) {
      filtered = filtered.filter((p) =>
        p.tags?.some((tag) => selectedTags.includes(tag))
      );
    }

    setFilteredProducts(filtered);
  }, [searchTerm, selectedTags, products]);

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedTags([]);
  };

  return (
    <div className="min-h-screen bg-softWhite py-12">
      <div className="container mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-darkBrown text-center mb-8"
        >
          Our Products
        </motion.h1>

        {/* Search & Filter Bar */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Search by name, description or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 border border-pastelPink rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accentPink"
            />
            <button
              onClick={clearFilters}
              className="bg-pastelPink text-darkBrown px-4 py-2 rounded-full hover:bg-accentPink transition"
            >
              Clear Filters
            </button>
          </div>

          {/* Tag filters */}
          {availableTags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="text-darkBrown/70 text-sm mr-2">Filter by tag:</span>
              {availableTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1 rounded-full text-sm transition ${
                    selectedTags.includes(tag)
                      ? 'bg-darkBrown text-softWhite'
                      : 'bg-pastelPink text-darkBrown hover:bg-accentPink'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accentPink"></div>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-darkBrown/70 text-lg">No products found.</p>
            <button
              onClick={clearFilters}
              className="mt-4 bg-darkBrown text-softWhite px-4 py-2 rounded-full hover:bg-accentPink transition"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;