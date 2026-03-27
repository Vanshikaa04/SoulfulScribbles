import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';

const ProductCard = ({ product }) => {
  const whatsappNumber = "1234567890"; // Replace with your actual WhatsApp number
  const message = encodeURIComponent(`Hi, I'm interested in ${product.name}`);
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${message}`;

  // Fallback image based on product name if no image exists
  const getPlaceholder = (name) => {
    const query = encodeURIComponent(name);
    return `https://source.unsplash.com/featured/300x200?${query},gift`;
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={product.images?.[0] || getPlaceholder(product.name)}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold text-darkBrown mb-1 line-clamp-1">
          {product.name}
        </h3>
        <p className="text-darkBrown/70 text-sm mb-3 line-clamp-2">
          {product.description || 'A beautiful gift for every occasion.'}
        </p>
        <div className="flex justify-between items-center">
          {product.price && (
            <span className="text-accentPink font-semibold">₹{product.price}</span>
          )}
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-darkBrown text-softWhite px-4 py-2 rounded-full text-sm hover:bg-accentPink hover:text-darkBrown transition-all duration-300"
          >
            <FaWhatsapp size={16} />
            WhatsApp
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;