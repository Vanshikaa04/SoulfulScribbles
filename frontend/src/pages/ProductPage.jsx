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

  // ✅ GROUP BY CATEGORY (same as projects)
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
            marginBottom: "20px"
          }}>
            <h2 style={{ fontFamily: 'Cormorant Garamond' }}>Products</h2>
            <FaFilter onClick={() => setShowDrawer(true)} />
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
              <h3 style={{ marginBottom: "10px" }}>Categories</h3>

              {["All", ...Object.keys(CAT_META)].map(cat => (
                <div
                  key={cat}
                  style={categoryItem(cat)}
                  onClick={() => setCategory(cat)}
                >
                  {CAT_META[cat]} {cat}
                </div>
              ))}

              {/* Clear filter */}
              <button
                onClick={() => setCategory("All")}
                style={{
                  marginTop: "12px",
                  fontSize: "12px",
                  color: "var(--burgundy)"
                }}
              >
                Clear Filter
              </button>

              {/* Price filter */}
              <h3 style={{ marginTop: "20px" }}>Max Price</h3>
              <input
                type="range"
                min="0"
                max="5000"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
              <p>₹ {price}</p>
            </div>
          )}

          {/* Drawer */}
          {isMobile && showDrawer && (
            <div style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.3)",
              zIndex: 100
            }}>
              <div style={{
                width: "260px",
                background: "#fff",
                height: "100%",
                padding: "20px"
              }}>
                {["All", ...Object.keys(CAT_META)].map(cat => (
                  <div
                    key={cat}
                    style={categoryItem(cat)}
                    onClick={() => {
                      setCategory(cat);
                      setShowDrawer(false);
                    }}
                  >
                    {cat}
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
                    color: "var(--burgundy)"
                  }}
                >
                  Clear Filter
                </button>
              </div>
            </div>
          )}

          {/* MAIN */}
          <div style={{
            flex: 1,
            maxHeight: "calc(100vh - 120px)",
            overflowY: "auto",
            paddingRight: "4px"
          }}>

            {grouped.map(group => (
              <div key={group.category} style={{ marginBottom: "50px" }}>

                {/* Section Title */}
                <h2 style={{
                  fontFamily: "Cormorant Garamond",
                  fontSize: "28px",
                  marginBottom: "20px",
                  color: "#6B1A2A"
                }}>
                  {group.category}
                </h2>

                {/* Grid */}
                <div style={{
                  display: "grid",
                  gridTemplateColumns: isMobile
                    ? "repeat(2, 1fr)"
                    : "repeat(auto-fill, minmax(220px,1fr))",
                  gap: "18px"
                }}>
                  {group.items.map((product, idx) => (
                    <motion.div
                      key={product._id}
                      initial={{ opacity: 0, y: 28 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      style={{
                        background: '#fff',
                        borderRadius: '20px',
                        overflow: 'hidden',
                        border: '1px solid rgba(196,117,138,0.14)',
                        boxShadow: '0 2px 12px rgba(107,26,42,0.05)'
                      }}
                      whileHover={{
                        y: -6,
                        boxShadow: '0 18px 44px rgba(107,26,42,0.14)'
                      }}
                    >

                      {/* Image + Featured */}
                      <div style={{ position: "relative" }}>
                        {product.featured && (
                          <div style={{
                            position: "absolute",
                            top: "8px",
                            right: "8px",
                            background: "#6B1A2A",
                            color: "#fff",
                            fontSize: "10px",
                            padding: "3px 8px",
                            borderRadius: "20px"
                          }}>
                            Featured
                          </div>
                        )}

                        <img
                          src={product.images?.[0]}
                          style={{
                            width: "100%",
                            height: "150px",
                            objectFit: "cover"
                          }}
                        />
                      </div>

                      {/* Content */}
                      <div style={{ padding: "12px" }}>
                        <h3 style={{ fontFamily: 'Cormorant Garamond' }}>
                          {product.name}
                        </h3>

                        <p style={{
                          color: '#6B1A2A',
                          fontWeight: 600
                        }}>
                          ₹{product.price}
                        </p>

                        {/* WhatsApp */}
                        <a
                          href={buildWaLink(product)}
                          target="_blank"
                          style={{
                            display: 'block',
                            textAlign: 'center',
                            marginTop: '10px',
                            padding: '8px',
                            background: '#25D366',
                            borderRadius: '40px',
                            color: '#fff'
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