import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const WA = '919876543210';

function buildWaLink(product) {
  const msg = encodeURIComponent(`Hi Vanshika! 😊\nI'm interested in:\n*${product.name}*\n${product.price ? `Price: ₹${product.price}` : ''}\n\nCould you share more details? 🌸`);
  return `https://wa.me/${WA}?text=${msg}`;
}

export default function LatestCollection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) {
          const sorted = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setProducts(sorted.slice(0, 4));
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section style={{ padding: 'clamp(60px,7vw,90px) 0', background: '#FFFFFF' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%,240px),1fr))', gap: '20px' }}>
            {[1,2,3,4].map(i => (
              <div key={i} style={{ borderRadius: '20px', overflow: 'hidden', background: '#FFF8FA', border: '1px solid rgba(196,117,138,0.1)' }}>
                <div style={{ aspectRatio: '1/1', background: 'linear-gradient(90deg,#FFF5F7,#FAF0F2,#FFF5F7)', backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite' }} />
                <div style={{ padding: '16px' }}>
                  <div style={{ height: '16px', background: '#F7E8EC', borderRadius: '4px', marginBottom: '8px' }} />
                  <div style={{ height: '12px', width: '60%', background: '#FAF0F2', borderRadius: '4px' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) return null;

  return (
    <section style={{ padding: 'clamp(60px,7vw,90px) 0', background: '#FFFFFF' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '44px', flexWrap: 'wrap', gap: '16px' }}
        >
          <div>
            <p style={{ fontSize: '11px', letterSpacing: '4px', textTransform: 'uppercase', color: '#C4758A', marginBottom: '8px' }}>Fresh Arrivals</p>
            <h2 style={{ fontFamily: 'Cormorant Garamond', fontSize: 'clamp(26px,4.5vw,44px)', fontWeight: 400, color: '#2A0A12' }}>
              What's New in <em style={{ fontStyle: 'italic', color: '#6B1A2A' }}>Soulful Scribble</em>
            </h2>
          </div>
          <a href="/gifting" style={{ fontSize: '14px', color: '#6B1A2A', borderBottom: '1px solid rgba(107,26,42,0.3)', paddingBottom: '2px', transition: 'all 0.2s', whiteSpace: 'nowrap' }}
            onMouseEnter={e => e.currentTarget.style.borderColor = '#6B1A2A'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(107,26,42,0.3)'}>
            View All →
          </a>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%,240px),1fr))', gap: '20px' }}>
          {products.map((product, idx) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              style={{
                background: '#FFFFFF', borderRadius: '20px', overflow: 'hidden',
                border: '1px solid rgba(196,117,138,0.14)',
                boxShadow: '0 2px 12px rgba(107,26,42,0.05)',
                transition: 'all 0.35s', display: 'flex', flexDirection: 'column',
              }}
              whileHover={{ y: -6, boxShadow: '0 18px 44px rgba(107,26,42,0.14)', borderColor: 'rgba(107,26,42,0.2)' }}
            >
              {/* Square image */}
              <div style={{ aspectRatio: '1/1', background: 'linear-gradient(135deg,#FFF5F7,#F7E8EC)', overflow: 'hidden', position: 'relative' }}>
                <img
                  src={product.images?.[0] || ''}
                  alt={product.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }}
                  onError={e => { e.target.style.display = 'none'; }}
                  onMouseEnter={e => e.target.style.transform = 'scale(1.06)'}
                  onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                />
                {!product.images?.[0] && (
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px', opacity: 0.2 }}>🎁</div>
                )}
                {product.featured && (
                  <div style={{ position: 'absolute', top: '10px', left: '10px', background: 'linear-gradient(135deg,#6B1A2A,#C4758A)', padding: '3px 10px', borderRadius: '20px', color: '#fff', fontSize: '10px', fontWeight: 600 }}>✨ New</div>
                )}
              </div>

              <div style={{ padding: '14px 16px 18px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontFamily: 'Cormorant Garamond', fontSize: '17px', fontWeight: 600, color: '#2A0A12', marginBottom: '4px', lineHeight: 1.3, display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {product.name}
                </h3>
                {product.price && (
                  <p style={{ fontFamily: 'Cormorant Garamond', fontSize: '18px', fontWeight: 700, color: '#6B1A2A', marginBottom: '12px' }}>₹{product.price.toLocaleString('en-IN')}</p>
                )}
                <div style={{ marginTop: 'auto' }}>
                  <a href={buildWaLink(product)} target="_blank" rel="noopener noreferrer"
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '9px 14px', background: '#25D366', borderRadius: '40px', color: '#fff', fontSize: '13px', fontWeight: 600, transition: 'all 0.25s', boxShadow: '0 3px 10px rgba(37,211,102,0.25)' }}
                    onMouseEnter={e => e.currentTarget.style.background = '#1EBF5A'}
                    onMouseLeave={e => e.currentTarget.style.background = '#25D366'}>
                    <span style={{ fontSize: '14px' }}>💬</span> WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}