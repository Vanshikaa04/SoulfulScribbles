import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { motion } from 'framer-motion';
import api from '../services/api';

const RelatedProducts = ({ currentProductId, category }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (category) {
      fetchRelatedProducts();
    }
  }, [category, currentProductId]);

  const fetchRelatedProducts = async () => {
    try {
      const { data } = await api.get('/products');
      const related = data.filter(
        p => p.category === category && p._id !== currentProductId
      );
      setProducts(related.slice(0, 8)); // limit to 8
    } catch (err) {
      console.error('Failed to load related products', err);
    } finally {
      setLoading(false);
    }
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  if (loading) return <div className="text-center py-8">Loading related products...</div>;
  if (products.length === 0) return null;

  return (
    <div>
      <h2 className="text-2xl font-bold text-darkBrown mb-6">You May Also Like</h2>
      <Slider {...settings}>
        {products.map(product => (
          <div key={product._id} className="px-2">
            <Link to={`/product/${product._id}`}>
              <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden">
                <div className="aspect-square bg-gray-100">
                  <img
                    src={product.images?.[0] || 'https://via.placeholder.com/300?text=No+Image'}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3">
                  <h3 className="text-darkBrown font-semibold text-sm line-clamp-1">
                    {product.name}
                  </h3>
                  {product.price && (
                    <p className="text-accentPink text-xs font-bold mt-1">₹{product.price}</p>
                  )}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default RelatedProducts;