import Slider from 'react-slick';
import { motion } from 'framer-motion';

// Video list – all will autoplay
const videos = [
  { id: 1, url: '/videos/cmt.mp4', title: 'Custom Magazine' },
  { id: 2, url: '/videos/hamper.mp4', title: 'Luxury Hamper' },
  { id: 3, url: '/videos/rose.mp4', title: 'Birthday Surprise' },
  { id: 4, url: '/videos/bouquetvideo.mp4', title: 'Anniversary Gift' },
];

const VideoCarousel = () => {
  const instagramLink = "https://www.instagram.com/soulful.scribble_?igsh=MXBmaGlwcXRudnc3aA==";

  const handleVideoClick = () => {
    window.open(instagramLink, '_blank', 'noopener,noreferrer');
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,        // Show 4 videos at once on large screens
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },  // 3 on tablet landscape
      { breakpoint: 768, settings: { slidesToShow: 2 } },   // 2 on tablet portrait
      { breakpoint: 640, settings: { slidesToShow: 1 } },   // 1 on mobile
    ],
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
          Watch Our Creations
        </motion.h2>

        <Slider {...settings}>
          {videos.map((video) => (
            <div key={video.id} className="px-2">
              <div
                onClick={handleVideoClick}
                className="cursor-pointer rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
                style={{ aspectRatio: '9 / 16', maxWidth: '280px', margin: '0 auto' }}
              >
                <video
                  src={video.url}
                  muted
                  loop
                  playsInline
                  autoPlay          // All videos autoplay, muted, loop
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default VideoCarousel;