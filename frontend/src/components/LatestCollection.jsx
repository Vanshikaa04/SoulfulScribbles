import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const WA = '919876543210';
     const WAIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
);              
function buildWaLink(product) {
  const msg = encodeURIComponent(`Hi Vanshika! 😊\nI'm interested in:\n*${product.name}*\n${product.price ? `Price: ₹${product.price}` : ''}\n\nCould you share more details? 🌸`);
  return `https://wa.me/${WA}?text=${msg}`;
}

export default function LatestCollection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
 const backendurl = import.meta.env.VITE_backendurl ;


  useEffect(() => {
    fetch(`${backendurl}/api/products`)
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
                    <span style={{ fontSize: '14px' }}>                   <WAIcon />
</span>WhatsApp 
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