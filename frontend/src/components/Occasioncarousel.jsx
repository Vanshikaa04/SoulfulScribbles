import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';


const occasions = [
  { name: 'Birthdays',     image: '/images/birthday.jpeg',    tag: 'birthday' },
  { name: 'Anniversary',   image: '/images/anniversary.jpeg', tag: 'anniversary' },
  { name: 'Dosti',         image: '/images/dosti.jpeg',        tag: 'dosti' },
  { name: 'Return Gift',   image: '/images/returngift.jpeg',   tag: 'returngift' },
  { name: 'Bride / Groom', image: '/images/wedding.jpeg',      tag: 'wedding' },
  { name: 'For Him',       image: '/images/forhim.jpeg',       tag: 'forhim' },
  { name: 'For Her',       image: '/images/forher.jpeg',       tag: 'forher' },
  { name: 'Pictures',      image: '/images/pictures.jpeg',     tag: 'pictures' },
  { name: 'Brochure',      image: '/images/brochure.jpeg',     tag: 'brochure' },
  { name: 'Keychain',      image: '/images/keychain.jpeg',     tag: 'keychain' },
  { name: 'Flowers',       image: '/images/flowers.jpeg',      tag: 'flowers' },
  { name: 'Surprises',     image: '/images/surprise.jpeg',     tag: 'surprise' },
  { name: 'Chocolates',    image: '/images/chocolate.jpeg',    tag: 'chocolate' },
  { name: 'Money Bouquet', image: '/images/money.jpeg',        tag: 'money' },
];

const FALLBACK_GRADIENTS = [
  'linear-gradient(135deg,#F7E8EC,#E8A0B0)',
  'linear-gradient(135deg,#F0D5DC,#C4758A40)',
  'linear-gradient(135deg,#FFF0F4,#E8A0B080)',
];

export default function OccasionCarousel() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const navigate = useNavigate();

  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2200,
    pauseOnHover: true,
    arrows: false,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 4 } },
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 640,  settings: { slidesToShow: 2 } },
      { breakpoint: 400,  settings: { slidesToShow: 2 } },
    ],
  };

  const handleClick = (occ) => {
    navigate(`/gifting`);
  };

  return (
    <section style={{ padding: 'clamp(60px,7vw,90px) 0', background: '#FFF8FA', overflow: 'hidden' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          style={{ textAlign: 'center', marginBottom: '52px' }}
        >
          <p style={{ fontSize: '11px', letterSpacing: '4px', textTransform: 'uppercase', color: '#C4758A', marginBottom: '10px' }}>Shop by Occasion</p>
          <h2 style={{ fontFamily: 'Cormorant Garamond', fontSize: 'clamp(28px,5vw,48px)', fontWeight: 400, color: '#2A0A12' }}>
            Pick Your <em style={{ fontStyle: 'italic', color: '#6B1A2A' }}>Vibe</em>
          </h2>
        </motion.div>
      </div>

      {/* Full-width slider */}
      <div style={{ padding: '0 clamp(12px,3vw,32px)' }}>
        <Slider {...settings}>
          {occasions.map((occ, idx) => (
            <div key={occ.name} style={{ padding: '0 8px' }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: Math.min(idx * 0.04, 0.4) }}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => handleClick(occ)}
                style={{
                  position: 'relative', borderRadius: '50%', overflow: 'hidden',
                  cursor: 'pointer', margin: '0 auto',
                  width: '100%', maxWidth: '200px',
                  aspectRatio: '1/1',
                  boxShadow: hoveredIndex === idx
                    ? '0 16px 40px rgba(107,26,42,0.22)'
                    : '0 4px 16px rgba(107,26,42,0.1)',
                  transition: 'box-shadow 0.3s, transform 0.3s',
                  transform: hoveredIndex === idx ? 'scale(1.05)' : 'scale(1)',
                  background: FALLBACK_GRADIENTS[idx % FALLBACK_GRADIENTS.length],
                }}
              >
                <img
                  src={occ.image}
                  alt={occ.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  onError={e => { e.target.style.opacity = '0'; }}
                />
                {/* Overlay */}
                <div style={{
                  position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: hoveredIndex === idx ? 'rgba(42,10,18,0.62)' : 'rgba(42,10,18,0.28)',
                  transition: 'background 0.3s',
                }}>
                  <span style={{
                    background: 'rgba(107,26,42,0.82)', color: '#FFF8FA',
                    padding: 'clamp(4px,1vw,8px) clamp(10px,2.5vw,18px)',
                    borderRadius: '40px',
                    fontFamily: 'Cormorant Garamond',
                    fontSize: 'clamp(12px,1.8vw,17px)',
                    fontWeight: 600,
                    transform: hoveredIndex === idx ? 'scale(1.08)' : 'scale(1)',
                    transition: 'transform 0.3s',
                    whiteSpace: 'nowrap',
                    letterSpacing: '0.5px',
                  }}>
                    {occ.name}
                  </span>
                </div>
              </motion.div>
            </div>
          ))}
        </Slider>
      </div>

      <style>{`
        .slick-track { display: flex; align-items: center; }
        .slick-slide > div { height: 100%; }
      `}</style>
    </section>
  );
}