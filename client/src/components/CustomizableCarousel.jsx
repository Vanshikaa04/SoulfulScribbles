import Slider from 'react-slick';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import surprisebox from '../assets/images/surprisebox.jpeg';
import roses from '../assets/images/roses.jpeg';
import photoframe from '../assets/images/photoframe.jpeg';
import cakestand from '../assets/images/cakestandd.jpeg';
import love from "../assets/images/love.jpeg";
import champer from "../assets/images/champer.jpeg";

const customizableProducts = [
  { id: 2, name: 'Custom Hamper', image: champer, description: 'Choose your favorite items and packaging.' },
  { id: 3, name: 'Basket of Love', image: love, description: 'Add a heartfelt note.' },
  { id: 4, name: 'Cake Stands', image: cakestand, description: 'Engrave names or dates.' },
  { id: 5, name: 'Surprise Box', image: surprisebox, description: 'Curate a box of surprises.' },
  { id: 6, name: 'Photo Frames', image: photoframe, description: 'Preserve memories with style.' },
  { id: 7, name: 'Roses', image: roses, description: 'Add a heartfelt note.' },
];

const CustomizableCarousel = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const navigate = useNavigate();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    pauseOnHover: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  const handleCardClick = (product) => {
    navigate(`/customised-product?id=${product.id}&name=${encodeURIComponent(product.name)}`);
  };

  return (
    <section className="py-16 bg-softWhite">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-bold text-darkBrown text-center mb-12"
        >
          Customizable Gifts
        </motion.h2>
        <Slider {...settings}>
          {customizableProducts.map((product, idx) => (
            <div key={product.id} className="px-2">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-pastelPink rounded-xl overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 h-full flex flex-col max-w-xs mx-auto"
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => handleCardClick(product)}
              >
                {/* Image container – fixed aspect ratio (4:5) */}
                <div className="w-full aspect-[4/5] overflow-hidden bg-pastelPink/30">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                {/* Content – compact */}
                <div className="p-3 flex flex-col flex-grow">
                  <h3 className="text-lg font-semibold text-darkBrown mb-1 line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-darkBrown/70 text-xs mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="mt-auto flex justify-center">
                    <span
                      className={`inline-block bg-darkBrown text-softWhite px-3 py-1 rounded-full text-xs hover:bg-accentPink hover:text-darkBrown transition-all duration-300 ${
                        hoveredIndex === idx ? 'scale-105' : ''
                      }`}
                    >
                      Customize Now
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default CustomizableCarousel;