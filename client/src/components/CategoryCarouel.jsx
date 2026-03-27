import Slider from 'react-slick';
import { useState } from 'react';
import magazine from "../assets/images/magazine.jpeg";
import hamper from "../assets/images/hamper.jpeg";
import bouquet from "../assets/images/bouquet3.jpeg";
import packing from "../assets/images/wedding.jpeg";
import keychain from "../assets/images/keychain.jpeg";

const categories = [
  { name: 'Bouquets', image: bouquet },
  { name: 'Magazines', image: magazine },
  { name: 'Hampers', image: hamper },
  { name: 'Trousseau Packing', image: packing },
  { name: 'Keychains', image: keychain },
];

const CategoryCarousel = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className="py-16 bg-softWhite">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-darkBrown text-center mb-12">
          Dive Into Soulful Picks
        </h2>
        <Slider {...settings}>
          {categories.map((cat, idx) => (
            <div key={idx} className="px-2">
              <div
                className="relative rounded-xl overflow-hidden shadow-lg cursor-pointer max-w-sm mx-auto"
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-auto object-cover"
                  style={{ maxHeight: '400px' }}
                />
                {/* Always-visible overlay with title */}
                <div
                  className="absolute inset-0 flex items-center justify-center transition-all duration-300"
                  style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.23)',
                    ...(hoveredIndex === idx && { backgroundColor: 'rgba(0, 0, 0, 0.74)' }),
                  }}
                >
                  <span
                    className={`bg-darkBrown/80 text-softWhite px-4 py-2 rounded-full font-semibold text-lg transition-transform duration-300 ${
                      hoveredIndex === idx ? 'scale-105' : ''
                    }`}
                  >
                    {cat.name}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default CategoryCarousel;