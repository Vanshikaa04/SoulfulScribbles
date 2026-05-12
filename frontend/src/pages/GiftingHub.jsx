import React, { useState, useEffect, useRef } from 'react';
import LatestCollection from './../components/LatestCollection';
import FAQ from './../components/FAQ';
import VideoCarousel from './../components/VideoCarousel';
import OccasionCarousel from './../components/Occasioncarousel';

const CATEGORIES = ['All', 'Magazine', 'Bouquets', 'Hampers', 'Keychains', 'Trousseau Packing', 'Crochet'];
const WA = '919876543210';
    const WAIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
);
const CAT_META = {
  'Magazine':          { emoji: '📖', desc: 'Custom memory books with your photos & words' },
  'Bouquets':          { emoji: '💐', desc: 'Fresh & silk floral arrangements' },
  'Hampers':           { emoji: '🎀', desc: 'Curated gift sets for every occasion' },
  'Keychains':         { emoji: '🗝️', desc: 'Personalised handcrafted charms' },
  'Trousseau Packing': { emoji: '👰', desc: 'Elegant bridal packaging' },
  'Crochet':           { emoji: '🧶', desc: 'Handmade woollen creations' },
};

function waLink(product) {
  const msg = encodeURIComponent(`Hi Vanshika! 😊\n\nI'm interested in:\n*${product.name}*\n${product.price ? `Price: ₹${product.price}` : ''}\n\nCould you share more details? 🌸`);
  return `https://wa.me/${WA}?text=${msg}`;
}

function useInView() {
  const [v, setV] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, v];
}

export default function GiftingHub() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cat, setCat] = useState('All');
  const [search, setSearch] = useState('');
  const backendurl = import.meta.env.VITE_backendurl ;


  useEffect(() => {
    fetch(`${backendurl}/api/products`)
      .then(r => r.json())
      .then(d => { setProducts(Array.isArray(d) ? d : []); setLoading(false); })
      .catch(() => { setProducts([]); setLoading(false); });
  }, []);

  const featured = products.filter(p => p.featured);
  const filtered = products.filter(p =>
    (cat === 'All' || p.category.toLowerCase() === cat.toLowerCase()) &&
    (!search || p.name?.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div style={{ background: '#FFF8FA', minHeight: '100vh' }}>

      {/* Hero */}
      <section style={{
        minHeight: 'clamp(480px,70vh,640px)', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'linear-gradient(160deg, #FFFFFF 0%, #FFF5F7 40%, #F7E8EC 100%)',
        paddingTop: '72px', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(196,117,138,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
        {['🌸','🌺','💐','🌷','✨'].map((e, i) => (
          <span key={i} style={{ position: 'absolute', fontSize: `${18 + i * 4}px`, opacity: 0.15, top: `${10 + i * 18}%`, left: i % 2 === 0 ? `${3 + i * 4}%` : 'auto', right: i % 2 !== 0 ? `${3 + i * 4}%` : 'auto', animation: `float ${3 + i * 0.6}s ease-in-out infinite`, pointerEvents: 'none' }}>{e}</span>
        ))}

        <div style={{ textAlign: 'center', padding: '0 20px', position: 'relative', zIndex: 1, maxWidth: '700px', width: '100%' }}>
          <div style={{ display: 'inline-flex', gap: '8px', padding: '5px 18px', borderRadius: '40px', background: 'rgba(107,26,42,0.06)', border: '1px solid rgba(107,26,42,0.12)', marginBottom: '24px' }}>
            <span style={{ fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: '#6B1A2A', fontWeight: 500 }}>Gifting Hub</span>
          </div>
          <h1 style={{ fontFamily: 'Cormorant Garamond', fontSize: 'clamp(36px,7vw,72px)', fontWeight: 300, color: '#2A0A12', lineHeight: 1.1, marginBottom: '20px' }}>
            Soulfully Designed<br />
            <em style={{ fontStyle: 'italic', color: '#6B1A2A' }}>to Speak your Heart!</em>
          </h1>
          <p style={{ fontSize: '16px', color: '#8B6070', lineHeight: 1.8, marginBottom: '36px', maxWidth: '520px', margin: '0 auto 36px', fontWeight: 300 }}>
            Custom gifts made with love — for birthdays, anniversaries, weddings, and every moment worth celebrating.
          </p>
          {/* Category quick pills */}
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {CATEGORIES.slice(1).map(c => (
              <button key={c} onClick={() => { setCat(c); document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' }); }} style={{
                padding: '7px 18px', borderRadius: '40px', fontSize: '12px', fontWeight: 500,
                background: 'rgba(107,26,42,0.07)', border: '1px solid rgba(107,26,42,0.14)',
                color: '#6B1A2A', transition: 'all 0.25s', cursor: 'pointer',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = '#6B1A2A'; e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(107,26,42,0.07)'; e.currentTarget.style.color = '#6B1A2A'; }}
              >{CAT_META[c]?.emoji} {c}</button>
            ))}
          </div>
        </div>
      </section>

{/* Latest Collection */}
        <LatestCollection/>


      {/* Featured */}
      {featured.length > 0 && (
        <section style={{ padding: 'clamp(48px,6vw,80px) 0', background: '#FFFFFF' }}>
          <div className="container">
            <SectionHead tag="Curated Picks" title="✨ Featured Products" />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))', gap: '24px' }}>
              {featured.map(p => <ProductCard key={p._id} product={p} featured />)}
            </div>
          </div>
        </section>
      )}


      {/* Products */}
      <section id="products-section" style={{ padding: 'clamp(48px,6vw,80px) 0' }}>
        <div className="container">
          <SectionHead tag="Our Collection" title="All Products" />

          {/* Filters */}
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '36px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', flex: 1 }}>
              {CATEGORIES.map(c => (
                <button key={c} onClick={() => setCat(c)} style={{
                  padding: '8px 18px', borderRadius: '40px', fontSize: '13px', cursor: 'pointer', transition: 'all 0.25s',
                  background: cat === c ? 'linear-gradient(135deg,#6B1A2A,#C4758A)' : '#fff',
                  color: cat === c ? '#fff' : '#8B6070',
                  border: cat === c ? 'none' : '1px solid rgba(107,26,42,0.15)',
                  fontWeight: cat === c ? 600 : 400,
                  boxShadow: cat === c ? '0 4px 14px rgba(107,26,42,0.2)' : '0 1px 4px rgba(0,0,0,0.04)',
                }}>{c}</button>
              ))}
            </div>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..."
              style={{ padding: '10px 18px', borderRadius: '40px', border: '1px solid rgba(107,26,42,0.15)', background: '#fff', fontSize: '14px', color: '#2A0A12', outline: 'none', width: '100%', maxWidth: '220px', boxSizing: 'border-box', fontFamily: 'DM Sans' }}
            />
          </div>

          {loading ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))', gap: '24px' }}>
              {[1,2,3,4,5,6].map(i => <SkeletonCard key={i} />)}
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 'clamp(60px,10vw,100px) 0' }}>
              <span style={{ fontSize: '56px' }}>🎁</span>
              <p style={{ fontFamily: 'Cormorant Garamond', fontSize: '28px', color: '#2A0A12', marginTop: '16px', fontStyle: 'italic' }}>Nothing here yet</p>
              <p style={{ color: '#8B6070', marginTop: '8px', fontSize: '14px' }}>Try a different category or check back soon!</p>
              <button onClick={() => { setCat('All'); setSearch(''); }} style={{ marginTop: '20px', padding: '10px 24px', borderRadius: '40px', background: '#6B1A2A', color: '#fff', fontSize: '14px', cursor: 'pointer' }}>Clear Filters</button>
            </div>
          ) : (
            <>
              <p style={{ marginBottom: '28px', color: '#8B6070', fontSize: '13px' }}>Showing <strong style={{ color: '#2A0A12' }}>{filtered.length}</strong> {cat !== 'All' ? `in ${cat}` : 'products'}</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))', gap: '24px' }}>
                {filtered.map(p => <ProductCard key={p._id} product={p} />)}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Categories grid */}
      <section style={{ padding: 'clamp(48px,6vw,80px) 0', background: '#FFF0F4' }}>
        <div className="container">
          <SectionHead tag="Browse By" title="Shop by Category" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 180px), 1fr))', gap: '16px' }}>
            {Object.entries(CAT_META).map(([name, meta]) => (
              <button key={name} onClick={() => { setCat(name); document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' }); }} style={{
                padding: 'clamp(20px,3vw,30px) 16px', borderRadius: '20px', background: '#fff', border: '1px solid rgba(196,117,138,0.14)',
                boxShadow: '0 2px 10px rgba(107,26,42,0.04)', cursor: 'pointer', transition: 'all 0.3s', textAlign: 'center', fontFamily: 'DM Sans',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 16px 36px rgba(107,26,42,0.1)'; e.currentTarget.style.borderColor = 'rgba(107,26,42,0.25)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 10px rgba(107,26,42,0.04)'; e.currentTarget.style.borderColor = 'rgba(196,117,138,0.14)'; }}
              >
                <div style={{ fontSize: '32px', marginBottom: '10px' }}>{meta.emoji}</div>
                <p style={{ fontWeight: 600, color: '#2A0A12', fontSize: '14px', marginBottom: '5px' }}>{name}</p>
                <p style={{ fontSize: '12px', color: '#8B6070', lineHeight: 1.4 }}>{meta.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </section>
      

          {/* Occasion */}
          <OccasionCarousel/>

      {/* WhatsApp CTA */}
      <section style={{ padding: 'clamp(56px,7vw,90px) 0', background: 'linear-gradient(135deg, #6B1A2A 0%, #C4758A 100%)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 80% 50%, rgba(255,255,255,0.07) 0%, transparent 50%)', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <p style={{ fontSize: '11px', letterSpacing: '4px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: '16px' }}>Custom Orders</p>
          <h2 style={{ fontFamily: 'Cormorant Garamond', fontSize: 'clamp(28px,5vw,48px)', fontWeight: 400, color: '#fff', marginBottom: '16px', fontStyle: 'italic' }}>
            Don't see what you're looking for?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '16px', marginBottom: '36px', maxWidth: '460px', margin: '0 auto 36px', lineHeight: 1.8 }}>
            Every gift can be customised. Just reach out — we'd love to create something special just for you!
          </p>
          <a href={`https://wa.me/${WA}?text=${encodeURIComponent("Hi Vanshika! I'd like to order a custom gift 🎁")}`} target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '15px 36px', background: '#25D366', borderRadius: '50px', color: '#fff', fontWeight: 600, fontSize: '15px', boxShadow: '0 8px 28px rgba(0,0,0,0.2)', transition: 'all 0.3s' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 14px 36px rgba(0,0,0,0.25)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(0,0,0,0.2)'; }}
          >
            <span style={{ fontSize: '20px' }}>                   <WAIcon />
</span> Chat on WhatsApp
          </a>
        </div>
      </section>

      {/* Video Section */}
      <VideoCarousel/>


            {/* FAQs */}
          <FAQ/>
    </div>
  );
}

function SectionHead({ tag, title }) {
  const [ref, v] = useInView();
  return (
    <div ref={ref} style={{ marginBottom: '40px', opacity: v ? 1 : 0, transform: v ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.6s' }}>
      <p style={{ fontSize: '11px', letterSpacing: '4px', textTransform: 'uppercase', color: '#C4758A', marginBottom: '8px' }}>{tag}</p>
      <h2 style={{ fontFamily: 'Cormorant Garamond', fontSize: 'clamp(26px,4vw,44px)', fontWeight: 400, color: '#2A0A12' }}>{title}</h2>
    </div>
  );
}

function ProductCard({ product, featured }) {
  const [hovered, setHovered] = useState(false);
  const link = waLink(product);
  return (
    <div
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        background: '#fff', borderRadius: '22px', overflow: 'hidden',
        border: featured ? '1px solid rgba(107,26,42,0.22)' : '1px solid rgba(196,117,138,0.14)',
        boxShadow: hovered ? '0 22px 56px rgba(107,26,42,0.14)' : '0 2px 12px rgba(107,26,42,0.05)',
        transition: 'all 0.4s ease', transform: hovered ? 'translateY(-7px)' : 'translateY(0)', position: 'relative',
      }}
    >
      {/* Image */}
      <div style={{ height: '220px', background: 'linear-gradient(135deg,#FFF5F7,#F7E8EC)', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {product.images?.[0] ? (
          <img src={product.images[0]} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s', transform: hovered ? 'scale(1.07)' : 'scale(1)' }} />
        ) : (
          <span style={{ fontSize: '56px', opacity: 0.25 }}>🎁</span>
        )}
        {featured && (
          <div style={{ position: 'absolute', top: '12px', left: '12px', background: 'linear-gradient(135deg,#6B1A2A,#C4758A)', padding: '4px 12px', borderRadius: '20px', color: '#fff', fontSize: '11px', fontWeight: 600, letterSpacing: '1px' }}>✨ Featured</div>
        )}
        {product.category && (
          <div style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)', padding: '4px 12px', borderRadius: '20px', color: '#6B1A2A', fontSize: '11px', fontWeight: 500 }}>{CAT_META[product.category]?.emoji} {product.category}</div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: '20px 22px 24px' }}>
        <h3 style={{ fontFamily: 'Cormorant Garamond', fontSize: '20px', fontWeight: 600, color: '#2A0A12', marginBottom: '8px', lineHeight: 1.3 }}>{product.name}</h3>
        <p style={{ fontSize: '13px', color: '#8B6070', lineHeight: 1.7, marginBottom: '14px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{product.description}</p>

        {product.tags?.length > 0 && (
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
            {product.tags.slice(0,3).map(t => (
              <span key={t} style={{ padding: '3px 10px', background: 'rgba(196,117,138,0.09)', borderRadius: '20px', fontSize: '11px', color: '#C4758A' }}>{t}</span>
            ))}
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'Cormorant Garamond', fontSize: '24px', fontWeight: 700, color: '#6B1A2A' }}>
            {product.price ? `₹${product.price.toLocaleString('en-IN')}` : 'Price on request'}
          </span>
          <a href={link} target="_blank" rel="noopener noreferrer" style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '10px 18px',
            background: '#25D366', borderRadius: '50px', color: '#fff', fontSize: '13px', fontWeight: 600,
            boxShadow: '0 4px 14px rgba(37,211,102,0.28)', transition: 'all 0.25s',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = '#1EBF5A'; e.currentTarget.style.transform = 'scale(1.04)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#25D366'; e.currentTarget.style.transform = 'scale(1)'; }}>
            <span style={{ fontSize: '15px' }}>                   <WAIcon />
</span> WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div style={{ borderRadius: '22px', overflow: 'hidden', background: '#fff', border: '1px solid rgba(196,117,138,0.1)' }}>
      <div style={{ height: '220px', background: 'linear-gradient(90deg, #FFF5F7 0%, #FAF0F2 50%, #FFF5F7 100%)', backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite' }} />
      <div style={{ padding: '20px 22px' }}>
        <div style={{ height: '20px', background: '#F7E8EC', borderRadius: '6px', marginBottom: '10px' }} />
        <div style={{ height: '14px', background: '#FAF0F2', borderRadius: '6px', marginBottom: '7px' }} />
        <div style={{ height: '14px', width: '65%', background: '#FAF0F2', borderRadius: '6px' }} />
      </div>
    </div>
  );
}