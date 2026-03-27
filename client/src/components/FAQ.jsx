import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = 
 [
  { 
    q: "What is your return policy?", 
    a: "We don’t accept returns. However, we do offer rental options on selected hampers." 
  },
  { 
    q: "How long does delivery take?", 
    a: "Delivery within the city is available on the same day. For outstation orders, it usually takes 7–10 business days." 
  },
  { 
    q: "Can I customize my hamper?", 
    a: "Absolutely, every piece is customizable — from bouquets to magazines, everything can be tailored to your needs." 
  },
  { 
    q: "How do you charge for custom magazines?", 
    a: "Custom magazines are priced based on the number of pages you choose to personalize." 
  }

];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="faq" className="py-20 bg-softWhite">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-darkBrown">FAQs</h2>
          <p className="text-lg text-darkBrown/80 mt-2">
         We’re here to help you with every detail.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-pastelPink rounded-xl shadow-md">
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full text-left px-6 py-4 flex justify-between items-center"
              >
                <span className="font-semibold text-darkBrown">{faq.q}</span>
                <span className="text-2xl">{openIndex === idx ? "−" : "+"}</span>
              </button>
              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-4 text-darkBrown/80">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      <p  className="text-lg text-darkBrown/80 mt-5 text-center">Still have questions? Reach out to us on WhatsApp.</p>

      </div>
    </section>
  );
};

export default FAQ;