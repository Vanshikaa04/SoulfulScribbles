import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import api from '../services/api';
import RelatedProducts from '../components/RelatedProducts';
import CategoryCarousel from '../components/CategoryCarouel';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const whatsappNumber = "7202052004";

  useEffect(() => {
    fetchProduct();
    window.scrollTo(0, 0);
  }, [id]);

  const fetchProduct = async () => {
    try {
      const { data } = await api.get(`/products/${id}`);
      setProduct(data);
    } catch (err) {
      toast.error('Product not found');
    } finally {
      setLoading(false);
    }
  };

const getWhatsappLink = () => {
  const productUrl = `${window.location.origin}/product/${product._id}`;
  const message = encodeURIComponent(
    `*${product.name}*\n\n` +
    `Price: ₹${product.price || 'N/A'}\n\n` +
    `Description: ${product.description || 'No description available.'}\n\n` +
    `View full product details: ${productUrl}`
  );
  return `https://wa.me/${whatsappNumber}?text=${message}`;
};

  const imageCarouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: true,
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accentPink"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-white">
        <p className="text-darkBrown">Product not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Product Main Section */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Image Carousel */}
          <div className="md:w-1/2">
            <div className="sticky top-24">
              {product.images && product.images.length > 0 ? (
                <Slider {...imageCarouselSettings}>
                  {product.images.map((img, idx) => (
                    <div key={idx}>
                      <img
                        src={img}
                        alt={`${product.name} ${idx + 1}`}
                        className="w-full aspect-square object-cover rounded-xl"
                      />
                    </div>
                  ))}
                </Slider>
              ) : (
                <div className="w-full aspect-square bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">
                  No image available
                </div>
              )}
            </div>
          </div>

          {/* Product Details */}
          <div className="md:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl font-bold text-darkBrown mb-2">
                {product.name}
              </h1>
              <p className="text-darkBrown/70 text-sm mb-4">
                Category: <span className="capitalize">{product.category || 'General'}</span>
              </p>
              {product.price && (
                <p className="text-2xl font-bold text-accentPink mb-4">
                  ₹{product.price}
                </p>
              )}
              <div className="prose prose-sm max-w-none text-darkBrown/80 mb-6">
                <p>{product.description || 'No description available.'}</p>
              </div>
              {product.tags && product.tags.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-darkBrown mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map(tag => (
                      <span key={tag} className="bg-pastelPink text-darkBrown/80 text-xs px-2 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              <a
                href={getWhatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-darkBrown text-white px-6 py-2 rounded-full hover:bg-accentPink hover:text-darkBrown transition"
              >
                Enquire on WhatsApp
              </a>
            </motion.div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <RelatedProducts currentProductId={product._id} category={product.category} />
        </div>
         <div className="mt-16">
          <CategoryCarousel />
        </div>
      </div>
    </div>
  );
};

export default ProductPage;