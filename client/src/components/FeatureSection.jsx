import Slider from 'react-slick';
import { motion } from 'framer-motion';
import curatedImg from '../assets/curated.png';
import customImg from '../assets/custom.png';
import premiumImg from '../assets/premium.png';

const images = [
  { id: 1, src: curatedImg, alt: 'Curated Gifts' },
  { id: 2, src: customImg, alt: 'Customizable' },
  { id: 3, src: premiumImg, alt: 'Premium Quality' },
];

const FeatureSection = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    pauseOnHover: true,
    arrows: true,
    centerMode: true,
    centerPadding: '40px',
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
          Why Choose Soulful Scribble?
        </motion.h2>

        {/* Desktop: grid (3 columns) */}
        <div className="hidden md:grid md:grid-cols-3 gap-5">
          {images.map((img, idx) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className=" transition-shadow duration-300"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-80 h-auto object-contain"
              />
            </motion.div>
          ))}
        </div>

        {/* Mobile: carousel (visible only on small screens) */}
        <div className="md:hidden">
          <Slider {...settings}>
            {images.map((img) => (
              <div key={img.id} className="px-2">
                {/* <div className="bg-white rounded-2xl shadow-lg overflow-hidden mx-auto max-w-sm"> */}
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-auto object-cover"
                  />
                {/* </div> */}
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;