import { motion } from 'framer-motion';

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
          Under Construction
        </h1>
        <p className="text-darkBrown/70 mb-6">
          We're giving Soulful Scribble a fresh new look. Please check back soon!
        </p>
        <div className="flex justify-center gap-4">
          <a href="https://www.instagram.com/soulful.scribble_" target="_blank" rel="noopener" className="text-darkBrown hover:text-accentPink">Instagram</a>
          <a href="mailto:hello@soulfulscribble.com" className="text-darkBrown hover:text-accentPink">Email</a>
          <a href="https://wa.me/1234567890" target="_blank" rel="noopener" className="text-darkBrown hover:text-accentPink">WhatsApp</a>
        </div>
      </motion.div>
    </div>
  );
};

export default UnderConstruction;