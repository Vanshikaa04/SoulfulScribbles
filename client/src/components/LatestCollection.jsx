import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../services/api';

const LatestCollection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLatestProducts();
  }, []);

  const fetchLatestProducts = async () => {
    try {
      const { data } = await api.get('/products');
      // Sort by createdAt descending and take first 4
      const sorted = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      const latest = sorted.slice(0, 4);
      setProducts(latest);
    } catch (err) {
      console.error('Failed to load latest products', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-accentPink mx-auto"></div>
        </div>
      </section>
    );
  }

  if (products.length === 0) return null;

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl font-bold text-darkBrown text-center mb-8"
        >
          What's New in Soulful Scribble
        </motion.h2>

        {/* Grid: 2 columns on mobile, 4 columns on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {products.map((product, idx) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col"
            >
              <div className="aspect-square bg-gray-100">
                <img
                  src={product.images?.[0] || 'https://via.placeholder.com/300?text=No+Image'}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3 flex flex-col flex-grow">
                <h3 className="text-darkBrown font-semibold text-sm line-clamp-1 mb-1">
                  {product.name}
                </h3>
                {product.price && (
                  <p className="text-accentPink font-bold text-sm mb-3">₹{product.price}</p>
                )}
                <div className="mt-auto">
                  <Link
                    to={`/product/${product._id}`}
                    className="block text-center bg-darkBrown text-white text-xs py-1.5 rounded-full hover:bg-accentPink hover:text-darkBrown transition-all duration-300 w-full"
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestCollection;