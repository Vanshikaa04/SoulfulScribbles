import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';

const ProductCard = ({ product }) => {
  const whatsappNumber = "7202052004"; // Replace with your actual number
  const message = encodeURIComponent(`Hi, I'm interested in ${product.name}`);
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${message}`;

  // Fallback image if none provided
  const imageUrl = product.images?.[0] || 'https://via.placeholder.com/300?text=No+Image';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col h-full"
    >
      <div className="relative aspect-square overflow-hidden bg-pastelPink">
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        {product.featured && (
          <span className="absolute top-2 left-2 bg-accentPink text-darkBrown text-xs font-semibold px-2 py-1 rounded-full">
            Featured
          </span>
        )}
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-darkBrown mb-1 line-clamp-1">
          {product.name}
        </h3>
        <p className="text-darkBrown/70 text-sm mb-2 line-clamp-2">
          {product.description || 'A beautiful gift for every occasion.'}
        </p>

        {/* Tags */}
        {product.tags && product.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {product.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="bg-pastelPink text-darkBrown/80 text-xs px-2 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex justify-between items-center mt-auto pt-2">
          {product.price && (
            <span className="text-accentPink font-bold text-lg">₹{product.price}</span>
          )}
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-darkBrown text-softWhite px-3 py-1.5 rounded-full text-sm hover:bg-accentPink hover:text-darkBrown transition-all duration-300"
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