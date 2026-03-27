import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const CategorySection = ({ categories, products }) => {
  return (
    <section id="products" className="py-20 bg-pastelPink">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-darkBrown">Our Products</h2>
          <p className="text-lg text-darkBrown/80 mt-2">Thoughtfully curated just for you</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, idx) => (
            <motion.div
              key={category._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-softWhite rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col h-full"
            >
              <img
                src={category.image || `https://source.unsplash.com/featured/?${category.name},gift`}
                alt={category.name}
                className="w-full h-56 object-cover"
              />
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold text-darkBrown mb-2">{category.name}</h3>
                <p className="text-darkBrown/70 text-sm mb-4 flex-grow">{category.description || "Beautiful gifts for every occasion."}</p>
                <Link
                  to={`/products?category=${category._id}`}
                  className="inline-block bg-darkBrown text-softWhite px-5 py-2 rounded-full hover:bg-accentPink hover:text-darkBrown transition text-center"
                >
                  Shop {category.name}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;