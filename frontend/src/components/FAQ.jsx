import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WA = '917202052004';

const faqs = [
  {
    q: 'What is your return policy?',
    a: "We don't accept returns. However, we do offer rental options on selected hampers — reach out to us for more details.",
  },
  {
    q: 'How long does delivery take?',
    a: 'Delivery within the city is available on the same day. For outstation orders, it usually takes 7–10 business days.',
  },
  {
    q: 'Can I customize my hamper?',
    a: 'Absolutely! Every piece is customizable — from bouquets to magazines, everything can be tailored perfectly to your needs and preferences.',
  },
  {
    q: 'How are custom magazines priced?',
    a: 'Custom magazines are priced based on the number of pages you choose to personalize. The more pages, the richer the memory book!',
  },
  {
    q: 'Do you ship across India?',
    a: 'Yes! We ship pan-India. Local (same-city) orders get same-day delivery; outstation orders take 7–10 business days via courier.',
  },
  {
    q: 'How do I place an order?',
    a: "Simply click the WhatsApp button on any product, or message us directly. We'll guide you through customization, confirm your order, and handle the rest!",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="faq" style={{ padding: 'clamp(60px,7vw,90px) 0', background: '#FFF0F4' }}>
      <div className="container" style={{ maxWidth: '780px', margin: '0 auto' }}>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          style={{ textAlign: 'center', marginBottom: '52px' }}
        >
          <p style={{ fontSize: '11px', letterSpacing: '4px', textTransform: 'uppercase', color: '#C4758A', marginBottom: '10px' }}>Got Questions?</p>
          <h2 style={{ fontFamily: 'Cormorant Garamond', fontSize: 'clamp(28px,5vw,48px)', fontWeight: 400, color: '#2A0A12', marginBottom: '12px' }}>
            Frequently Asked <em style={{ fontStyle: 'italic', color: '#6B1A2A' }}>Questions</em>
          </h2>
          <p style={{ fontSize: '15px', color: '#8B6070', lineHeight: 1.7 }}>We're here to help you with every detail.</p>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {faqs.map((faq, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.06 }}
            >
              <div style={{
                borderRadius: '16px', overflow: 'hidden',
                background: openIndex === idx ? '#FFFFFF' : '#FFFFFF',
                border: openIndex === idx ? '1px solid rgba(107,26,42,0.2)' : '1px solid rgba(196,117,138,0.15)',
                boxShadow: openIndex === idx ? '0 8px 28px rgba(107,26,42,0.1)' : '0 2px 8px rgba(107,26,42,0.04)',
                transition: 'all 0.3s ease',
              }}>
                <button
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  style={{
                    width: '100%', textAlign: 'left', padding: 'clamp(16px,2.5vw,22px) clamp(18px,3vw,28px)',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px',
                    background: 'transparent', cursor: 'pointer', fontFamily: 'DM Sans',
                  }}
                >
                  <span style={{ fontFamily: 'Cormorant Garamond', fontSize: 'clamp(16px,2.2vw,20px)', fontWeight: 600, color: '#2A0A12', lineHeight: 1.3 }}>{faq.q}</span>
                  <motion.div
                    animate={{ rotate: openIndex === idx ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                    style={{ flexShrink: 0, width: '28px', height: '28px', borderRadius: '50%', background: openIndex === idx ? '#6B1A2A' : 'rgba(107,26,42,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: openIndex === idx ? 'none' : '1px solid rgba(107,26,42,0.15)' }}
                  >
                    <span style={{ fontSize: '18px', color: openIndex === idx ? '#fff' : '#6B1A2A', lineHeight: 1, marginTop: '-1px', fontWeight: 300 }}>+</span>
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {openIndex === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div style={{ padding: '0 clamp(18px,3vw,28px) clamp(16px,2.5vw,22px)', borderTop: '1px solid rgba(196,117,138,0.12)' }}>
                        <p style={{ fontSize: '15px', color: '#8B6070', lineHeight: 1.85, paddingTop: '14px', fontWeight: 300 }}>{faq.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          style={{ textAlign: 'center', marginTop: '40px', fontSize: '15px', color: '#8B6070' }}
        >
          Still have questions?{' '}
          <a
            href={`https://wa.me/${WA}?text=${encodeURIComponent("Hi Vanshika! I have a question about your products 🌸")}`}
            target="_blank" rel="noopener noreferrer"
            style={{ color: '#6B1A2A', fontWeight: 600, borderBottom: '1px solid rgba(107,26,42,0.3)', paddingBottom: '1px', transition: 'all 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.borderColor = '#6B1A2A'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(107,26,42,0.3)'}
          >
            Reach out on WhatsApp →
          </a>
        </motion.p>
      </div>
    </section>
  );
}