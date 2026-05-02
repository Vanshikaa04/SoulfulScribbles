import { useRef } from 'react';
import { motion } from 'framer-motion';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Videos should be placed at: public/videos/<filename>.mp4
const videos = [
  { id: 1, url: '/videos/cmt.mp4',         title: 'Custom Magazine' },
  { id: 2, url: '/videos/hamper.mp4',       title: 'Luxury Hamper' },
  { id: 3, url: '/videos/rose.mp4',         title: 'Birthday Surprise' },
  { id: 4, url: '/videos/bouquetvideo.mp4', title: 'Anniversary Gift' },
];

const INSTAGRAM_LINK = 'https://www.instagram.com/soulful.scribble_?igsh=MXBmaGlwcXRudnc3aA==';

function VideoSlide({ video }) {
  const videoRef = useRef(null);

  const handleClick = () => {
    window.open(INSTAGRAM_LINK, '_blank', 'noopener,noreferrer');
  };

  return (
    <div style={{ padding: '0 10px' }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        onClick={handleClick}
        style={{
          aspectRatio: '9/16',
          maxWidth: '240px',
          margin: '0 auto',
          borderRadius: '20px',
          overflow: 'hidden',
          cursor: 'pointer',
          position: 'relative',
          boxShadow: '0 8px 28px rgba(107,26,42,0.18)',
          background: '#2A0A12',
        }}
        whileHover={{ scale: 1.02, boxShadow: '0 18px 48px rgba(107,26,42,0.28)' }}
      >
        <video
          ref={videoRef}
          src={video.url}
          muted loop playsInline autoPlay
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        {/* Gradient overlay + title */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, padding: '32px 16px 18px',
          background: 'linear-gradient(to top, rgba(42,10,18,0.85) 0%, transparent 100%)',
        }}>
          <p style={{ fontFamily: 'Cormorant Garamond', fontSize: '17px', color: '#FFF8FA', fontWeight: 600, textAlign: 'center' }}>{video.title}</p>
        </div>
        {/* IG icon hint */}
        <div style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(42,10,18,0.6)', backdropFilter: 'blur(8px)', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
          </svg>
        </div>
      </motion.div>
    </div>
  );
}

export default function VideoCarousel() {
  const settings = {
    dots: false, infinite: true, speed: 500,
    slidesToShow: 4, slidesToScroll: 1,
    autoplay: true, autoplaySpeed: 5000, pauseOnHover: true, arrows: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768,  settings: { slidesToShow: 2 } },
      { breakpoint: 640,  settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section style={{ padding: 'clamp(60px,7vw,90px) 0', background: '#ffffff', overflow: 'hidden' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          style={{ textAlign: 'center', marginBottom: '52px' }}
        >
          {/* <p style={{ fontSize: '11px', letterSpacing: '4px', textTransform: 'uppercase', color: '#C4758A', marginBottom: '10px' }}>Behind the Scenes</p> */}
          <h2 style={{ fontFamily: 'Cormorant Garamond', fontSize: 'clamp(28px,5vw,48px)', fontWeight: 400, color:'#2A0A12', }}>
            Watch Our <em style={{ fontStyle: 'italic', color: '#e45c7a' }}>Creations</em>
          </h2>
          <p style={{ fontSize: '14px', color: 'rgba(250,240,242,0.45)', marginTop: '10px' }}>Click any video to see more on Instagram</p>
        </motion.div>

        <Slider {...settings}>
          {videos.map(v => <VideoSlide key={v.id} video={v} />)}
        </Slider>

        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 28px', borderRadius: '50px', background: 'linear-gradient(135deg,#833AB4,#FD1D1D,#FCAF45)', color: '#fff', fontWeight: 600, fontSize: '14px', transition: 'all 0.3s', boxShadow: '0 6px 20px rgba(0,0,0,0.3)' }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
            Follow on Instagram
          </a>
        </div>
      </div>
    </section>
  );
}