import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ParallaxBreak = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <div ref={ref} className="relative overflow-hidden h-[60vh] flex items-center justify-center">
      <motion.div
       
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://source.unsplash.com/featured/?gift,flowers')",
          backgroundPosition: "center",
          backgroundSize: "cover"
        }}
      />
      <div className="relative z-10 bg-darkBrown/60 text-white p-8 rounded-xl text-center backdrop-blur-sm">
        <h2 className="text-3xl md:text-5xl font-bold">Gifts That Speak Volumes</h2>
        <p className="text-lg mt-4">Handcrafted with love, delivered with care</p>
      </div>
    </div>
  );
};

export default ParallaxBreak;