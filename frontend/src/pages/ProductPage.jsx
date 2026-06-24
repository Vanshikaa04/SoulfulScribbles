import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaFilter } from "react-icons/fa";
import { apiFetch } from '../utils/api.js';

const CAT_META = {
  'Magazines': '📖',
  'Bouquets': '💐',
  'Hampers': '🎀',
  'Keychains': '🗝️',
  'Trousseau Packing': '👰',
  'Crochet': '🧶',
};

const WA = '917202052004';

function buildWaLink(product) {
  return `https://wa.me/${WA}?text=Hi! I'm interested in ${product.name}`;
}

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("All");
  const [price, setPrice] = useState(5000);
  const [showDrawer, setShowDrawer] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Read URL query parameter for category landing updates
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const catParam = params.get('category');
    if (catParam && (catParam === 'All' || Object.keys(CAT_META).includes(catParam))) {
      setCategory(catParam);
    }
  }, []);

  useEffect(() => {
    apiFetch(`/api/products`)
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  useEffect(() => {
    const resize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const grouped = Object.keys(CAT_META).map(cat => ({
    category: cat,
    items: products.filter(p =>
      (category === "All" || p.category.toLowerCase() === category.toLowerCase()) &&
      p.category.toLowerCase() === cat.toLowerCase() &&
      p.price <= price
    )
  })).filter(group => group.items.length > 0);

  const categoryItem = (cat) => ({
    padding: "8px 12px",
    borderRadius: "10px",
    cursor: "pointer",
    marginBottom: "6px",
    background: category === cat ? "var(--blush)" : "transparent",
    color: category === cat ? "var(--burgundy)" : "var(--gift-muted)",
    fontWeight: category === cat ? "500" : "400"
  });

  return (
    <section style={{
      padding: 'clamp(80px,7vw,100px) 20px',
      background: '#FFF8FA'
    }}>
      <div className="container">

        {/* Mobile Header */}
        {isMobile && (
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px"
          }}>
            <h2 style={{ fontFamily: 'Cormorant Garamond', color: '#2A0A12', margin: 0 }}>Products</h2>
            <div 
              onClick={() => setShowDrawer(true)} 
              style={{ padding: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            >
              <FaFilter size={18} color="#6B1A2A" />
            </div>
          </div>
        )}

        <div style={{ display: "flex", gap: "24px" }}>

          {/* Sidebar */}
          {!isMobile && (
            <div style={{
              width: "260px",
              background: "#fff",
              padding: "20px",
              borderRadius: "16px",
              border: "1px solid var(--gift-border)",
              position: "sticky",
              top: "120px",
              height: "fit-content"
            }}>
              <h3 style={{ marginBottom: "10px", fontFamily: 'Cormorant Garamond', fontSize: '20px' }}>Categories</h3>

              {["All", ...Object.keys(CAT_META)].map(cat => (
                <div
                  key={cat}
                  style={categoryItem(cat)}
                  onClick={() => setCategory(cat)}
                >
                  {CAT_META[cat]} {cat}
                </div>
              ))}

              <button
                onClick={() => setCategory("All")}
                style={{
                  marginTop: "12px",
                  fontSize: "12px",
                  color: "var(--burgundy)",
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0
                }}
              >
                Clear Filter
              </button>

              <h3 style={{ marginTop: "24px", marginBottom: "10px", fontFamily: 'Cormorant Garamond', fontSize: '20px' }}>Max Price</h3>
              <input
                type="range"
                min="0"
                max="5000"
                value={price}
                style={{ width: '100%', accentColor: '#6B1A2A' }}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
              <p style={{ fontWeight: 500, color: '#6B1A2A', marginTop: '4px' }}>₹ {price}</p>
            </div>
          )}

          {/* Drawer Overlay & Content */}
          {isMobile && showDrawer && (
            <div 
              onClick={() => setShowDrawer(false)}
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.4)",
                zIndex: 1000
              }}
            >
              <div 
                onClick={(e) => e.stopPropagation()}
                style={{
                  width: "280px",
                  background: "#fff",
                  height: "100%",
                  padding: "24px 20px",
                  boxShadow: "4px 0 24px rgba(0,0,0,0.15)"
                }}
              >
                <h3 style={{ marginBottom: "16px", fontFamily: 'Cormorant Garamond', fontSize: '22px' }}>Categories</h3>
                {["All", ...Object.keys(CAT_META)].map(cat => (
                  <div
                    key={cat}
                    style={categoryItem(cat)}
                    onClick={() => {
                      setCategory(cat);
                      setShowDrawer(false);
                    }}
                  >
                    {CAT_META[cat]} {cat}
                  </div>
                ))}

                <button
                  onClick={() => {
                    setCategory("All");
                    setShowDrawer(false);
                  }}
                  style={{
                    marginTop: "16px",
                    fontSize: "13px",
                    color: "var(--burgundy)",
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Clear Filter
                </button>

                <h3 style={{ marginTop: "32px", marginBottom: "10px", fontFamily: 'Cormorant Garamond', fontSize: '22px' }}>Max Price</h3>
                <input
                  type="range"
                  min="0"
                  max="5000"
                  value={price}
                  style={{ width: '100%', accentColor: '#6B1A2A' }}
                  onChange={(e) => setPrice(Number(e.target.value))}
                />
                <p style={{ fontWeight: 500, color: '#6B1A2A' }}>₹ {price}</p>
              </div>
            </div>
          )}

          {/* Main Content Area */}
          <div style={{
            flex: 1,
            maxHeight: "calc(100vh - 120px)",
            overflowY: "auto",
            paddingRight: "4px"
          }}>

            {grouped.map(group => (
              <div key={group.category} style={{ marginBottom: "50px" }}>

                <h2 style={{
                  fontFamily: "Cormorant Garamond",
                  fontSize: "28px",
                  marginBottom: "20px",
                  color: "#6B1A2A"
                }}>
                  {group.category}
                </h2>

                {/* Grid Structure: Optimized minmax configurations to eliminate horizontal squishing */}
                <div style={{
                  display: "grid",
                  gridTemplateColumns: isMobile
                    ? "repeat(2, 1fr)"
                    : "repeat(auto-fill, minmax(200px, 1fr))",
                  gap: "20px"
                }}>
                  {group.items.map((product, idx) => (
                    <motion.div
                      key={product._id}
                      initial={{ opacity: 0, y: 28 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.04 }}
                      style={{
                        background: '#fff',
                        borderRadius: '20px',
                        overflow: 'hidden',
                        border: '1px solid rgba(196,117,138,0.14)',
                        boxShadow: '0 2px 12px rgba(107,26,42,0.05)',
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%'
                      }}
                      whileHover={{
                        y: -6,
                        boxShadow: '0 18px 44px rgba(107,26,42,0.14)'
                      }}
                    >

                      {/* Image Box wrapped in a Portrait aspect-ratio layout */}
                      <div style={{ 
                        position: "relative",
                        width: "100%",
                        paddingTop: "120%", // Changes layout to 5:6 Portrait ratio
                        background: "linear-gradient(135deg,#FFF5F7,#F7E8EC)",
                        overflow: "hidden"
                      }}>
                        {product.featured && (
                          <div style={{
                            position: "absolute",
                            top: "10px",
                            right: "10px",
                            background: "linear-gradient(135deg,#6B1A2A,#C4758A)",
                            color: "#fff",
                            fontSize: "10px",
                            fontWeight: 600,
                            padding: "4px 10px",
                            borderRadius: "20px",
                            zIndex: 2
                          }}>
                            ✨ Featured
                          </div>
                        )}

                        <img
                          src={product.images?.[0] || 'https://via.placeholder.com/300x360?text=Gift'}
                          alt={product.name}
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            objectFit: "cover" // Ensures it crops properly without distortion
                          }}
                        />
                      </div>

                      {/* Descriptive Details */}
                      <div style={{ padding: "14px", display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                        <h3 style={{ 
                          fontFamily: 'Cormorant Garamond', 
                          fontSize: '18px', 
                          fontWeight: 600, 
                          color: '#2A0A12',
                          margin: '0 0 6px 0',
                          lineHeight: 1.3
                        }}>
                          {product.name}
                        </h3>

                        <p style={{
                          color: '#6B1A2A',
                          fontWeight: 700,
                          fontSize: '16px',
                          margin: '0 0 12px 0',
                          marginTop: 'auto' // Pushes price and CTA seamlessly to bottom
                        }}>
                          ₹{product.price.toLocaleString('en-IN')}
                        </p>

                        <a
                          href={buildWaLink(product)}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: 'block',
                            textAlign: 'center',
                            padding: '10px 14px',
                            background: '#25D366',
                            borderRadius: '40px',
                            color: '#fff',
                            fontSize: '13px',
                            fontWeight: 600,
                            textDecoration: 'none',
                            boxShadow: '0 4px 12px rgba(37,211,102,0.2)'
                          }}
                        >
                          WhatsApp
                        </a>
                      </div>

                    </motion.div>
                  ))}
                </div>

              </div>
            ))}

          </div>
        </div>
      </div>
    </section>
  );
}