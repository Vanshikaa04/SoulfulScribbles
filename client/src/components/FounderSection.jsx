import { motion } from 'framer-motion';
import founderImage from "../assets/S.png"; // replace with actual image

const FounderSection = () => {
  return (
    <section className="py-20 bg-pastelPink">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-softWhite rounded-3xl shadow-xl overflow-hidden max-w-5xl mx-auto"
        >
          <div className="flex flex-col md:flex-row">
            {/* Left side – circular image */}
            <div className="md:w-1/3 flex justify-center items-center p-8 md:p-12">
              <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden shadow-lg">
                <img
                  src={founderImage}
                  alt="Vanshika Wadhwani"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right side – text content */}
            <div className="md:w-2/3 p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-bold text-darkBrown mb-2">
               Soul Behind Scribble
              </h2>
              <p className="text-xl md:text-2xl text-accentPink font-medium mb-6">
                Vanshika Wadhwani
              </p>
              <div className="space-y-4 text-darkBrown/80 leading-relaxed text-sm md:text-base">
                <p>
                  Soulful Scribble was never just a business idea — it is a feeling.
                </p>
                <p>
                  It started with a simple thought: <span className="font-bold">why should gifts be ordinary when emotions are so extraordinary?</span> I always believed that the most beautiful things in life are the ones that carry meaning — a handwritten note, a shared memory, a moment captured forever.
                </p>
                <p>
                  That’s exactly what Soulful Scribble is about.
                </p>
                <p>
                  Every magazine, every hamper, every little detail you see here is created with love, intention, and a deep understanding that your moments matter. Whether it’s love, friendship, or celebration — we’re here to turn your emotions into something you can hold onto.
                </p>
                <p>
                  This is not just a store.<br />
                  It’s a space where your stories come alive.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FounderSection;