import { motion } from 'framer-motion';

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-softWhite">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-4xl font-bold text-darkBrown mb-6">About Us</h2>
          <p className="text-lg text-darkBrown/80 leading-relaxed">
            At Soulful Scribble, we are dedicated to curating a remarkable selection of floral arrangements,
            gift baskets, and personalized magazines. Every gift tells a story, and we help you tell yours.
            Whether you're celebrating a milestone or simply brightening someone's day, our creations are
            crafted with love and attention to detail.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;