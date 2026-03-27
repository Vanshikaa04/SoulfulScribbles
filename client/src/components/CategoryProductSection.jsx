import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { motion } from 'framer-motion';

const CategoryProductSection = ({ category, products }) => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } }
    ]
  };

  // Helper to get placeholder image based on category name
  const getPlaceholder = (catName) => {
    const query = encodeURIComponent(catName.toLowerCase());
    return `https://source.unsplash.com/featured/300x200?${query},gift`;
  };

  return (
    <section className="py-16 bg-softWhite">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex justify-between items-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-darkBrown">
            {category.name}
          </h2>
          <Link
            to={`/products?category=${category._id}`}
            className="text-accentPink hover:text-darkBrown transition font-semibold"
          >
            View More →
          </Link>
        </motion.div>

        <Slider {...settings}>
          {products.map((product) => (
            <div key={product._id} className="px-2">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                <img
                  src={product.images[0] || getPlaceholder(category.name)}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-darkBrown">{product.name}</h3>
                  <p className="text-darkBrown/70 text-sm mt-1 line-clamp-2">
                    {product.description || 'A beautiful gift for any occasion.'}
                  </p>
                  <div className="mt-4 flex justify-between items-center">
                    <a
                      href={`https://wa.me/1234567890?text=Hi, I'm interested in ${encodeURIComponent(product.name)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-darkBrown text-softWhite px-4 py-2 rounded-full hover:bg-accentPink hover:text-darkBrown transition text-sm flex items-center gap-2"
                    >
                      WhatsApp
                    </a>
                    {product.price && (
                      <span className="text-darkBrown font-semibold">₹{product.price}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default CategoryProductSection;