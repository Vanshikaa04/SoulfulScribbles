import { motion } from 'framer-motion';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';

const UnderConstruction = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-softWhite px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md text-center bg-white rounded-2xl shadow-xl p-8"
      >
        <div className="text-accentPink text-6xl mb-4">🛠️</div>
        <h1 className="text-3xl font-bold text-darkBrown mb-2">
          Under Construction!
        </h1>
        <p className="text-darkBrown/70 mb-6">
          We're giving Soulful Scribble a fresh new look. Please check back soon!
        </p>
        <div className="flex justify-center gap-6">
          <a
            href="https://www.instagram.com/soulful.scribble_"
            target="_blank"
            rel="noopener noreferrer"
            className="text-darkBrown hover:text-accentPink transition-colors duration-300"
          >
            <FaInstagram size={32} />
          </a>
          <a
            href="https://wa.me/917202052004"
            target="_blank"
            rel="noopener noreferrer"
            className="text-darkBrown hover:text-accentPink transition-colors duration-300"
          >
            <FaWhatsapp size={32} />
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default UnderConstruction;