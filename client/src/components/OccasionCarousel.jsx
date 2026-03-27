import { useState } from 'react';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import birthday from "../assets/images/birthday.jpeg";
import anniversary from "../assets/images/anniversary.jpeg";
import dosti from "../assets/images/dosti.jpeg";
import returngift from "../assets/images/returngift.jpeg";
import wedding from "../assets/images/wedding.jpeg";
import forhim from "../assets/images/forhim.jpeg";
import forher from "../assets/images/forher.jpeg";
import pictures from "../assets/images/pictures.jpeg";
import surprise from "../assets/images/surprise.jpeg";
import flowers from "../assets/images/flowers.jpeg";
import chocolates from "../assets/images/chocolate.jpeg";
import brochure from "../assets/images/brochure.jpeg";
import keychain from "../assets/images/keychain.jpeg";
import money from "../assets/images/money.jpeg";

const occasions = [
  { name: 'Birthdays', image: birthday },
  { name: 'Anniversary', image: anniversary },
  { name: 'Dosti', image: dosti },
  { name: 'Return Gift', image: returngift },
  { name: 'Bride / Groom', image: wedding },
  { name: 'For Him', image: forhim },
  { name: 'For Her', image: forher },
  { name: 'Pictures', image: pictures },
  { name: 'Brochure', image: brochure },
  { name: 'Keychain', image: keychain },
  { name: 'Flowers', image: flowers },
  { name: 'Surprises', image: surprise },
  { name: 'Chocolates', image: chocolates },
  { name: 'Money Bouquet', image: money },
];

const OccasionCarousel = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const navigate = useNavigate();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,        // default for large screens
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 3 } },  // extra large
      { breakpoint: 1024, settings: { slidesToShow: 2 } },  // tablet: 2
      { breakpoint: 640, settings: { slidesToShow: 2 } },   // mobile: 2 (or 1 if too tight)
    ],
  };

  const handleCardClick = (occasion) => {
    navigate(`/products?occasion=${occasion.toLowerCase().replace(/ /g, '_')}`);
  };

  return (
    <section className="py-16 bg-softWhite overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-darkBrown text-center mb-12">
          Pick Your Vibe
        </h2>
        <Slider {...settings}>
          {occasions.map((occ, idx) => (
            <div key={occ.name} className="px-2">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="relative rounded-full overflow-hidden shadow-lg cursor-pointer mx-auto"
                style={{ width: '100%', maxWidth: '280px', aspectRatio: '1 / 1' }}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => handleCardClick(occ.name)}
              >
                <img
                  src={occ.image}
                  alt={occ.name}
                  className="w-full h-full object-cover"
                />
                {/* Always‑visible overlay with title */}
                <div
                  className="absolute inset-0 flex items-center justify-center transition-all duration-300"
                  style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.26)',
                    ...(hoveredIndex === idx && { backgroundColor: 'rgba(0,0,0,0.7)' }),
                  }}
                >
                  <span
  className={`bg-darkBrown/80 text-softWhite px-2 sm:px-3 md:px-4 py-1 sm:py-2 rounded-full font-semibold text-sm sm:text-base md:text-lg transition-transform duration-300 ${
    hoveredIndex === idx ? 'scale-105' : ''
  }`}
>
  {occ.name}
</span>
                </div>
              </motion.div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default OccasionCarousel;