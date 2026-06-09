import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaFilter } from "react-icons/fa";
import { apiFetch } from "../utils/api.js";

const CAT_COLOR = {
  "Web Dev": "#7C1F3A",
  Design: "#9C3A10",
  Video: "#8C1A3A",
  "Data Analysis": "#7C4A08",
  "Machine Learning": "#0C4A50",
  "Digital Marketing": "#5C2A80",
  SEO: "#183A7C",

  "Social Media": "#0A5C4A",

  Other: "#403050",
};

const WA = "917202052004";

function buildWaLink(project) {
  return `https://wa.me/${WA}?text=Hi! I saw your project "${project.title}" and wanted to know more.`;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [category, setCategory] = useState("All");
  const [showDrawer, setShowDrawer] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    apiFetch("/api/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data));
  }, []);

  useEffect(() => {
    const resize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const grouped = Object.keys(CAT_COLOR)
    .map((cat) => ({
      category: cat,
      items: projects.filter(
        (p) =>
          (category === "All" || p.category === category) && p.category === cat,
      ),
    }))
    .filter((group) => group.items.length > 0);

  const categoryItem = (cat) => ({
    padding: "8px 12px",
    borderRadius: "10px",
    cursor: "pointer",
    marginBottom: "6px",
    background: category === cat ? "var(--blush)" : "transparent",
    color: category === cat ? "var(--burgundy)" : "var(--gift-muted)",
    fontWeight: category === cat ? "500" : "400",
  });

  return (
    <section
      style={{
        padding: "clamp(80px,7vw,100px) 20px",
        background: "#FFF8FA",
      }}
    >
      <div className="container">
        {/* Mobile Header */}
        {isMobile && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}
          >
            <h2 style={{ fontFamily: "Cormorant Garamond" }}>Projects</h2>
            <FaFilter onClick={() => setShowDrawer(true)} />
          </div>
        )}

        <div style={{ display: "flex", gap: "24px" }}>
          {/* Sidebar (Desktop) */}
          {!isMobile && (
            <div
              style={{
                width: "260px",
                background: "#fff",
                padding: "20px",
                borderRadius: "16px",
                border: "1px solid var(--gift-border)",
                position: "sticky",
                top: "120px",
                height: "fit-content",
              }}
            >
              <h3 style={{ marginBottom: "10px" }}>Services</h3>

              {["All", ...Object.keys(CAT_COLOR)].map((cat) => (
                <div
                  key={cat}
                  style={categoryItem(cat)}
                  onClick={() => setCategory(cat)}
                >
                  {cat}
                </div>
              ))}

              <button
                onClick={() => setCategory("All")}
                style={{
                  marginTop: "12px",
                  fontSize: "12px",
                  color: "var(--burgundy)",
                  cursor: "pointer",
                }}
              >
                Clear Filter
              </button>
            </div>
          )}

          {/* Drawer (Mobile) */}
          {isMobile && showDrawer && (
            <div
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.3)",
                zIndex: 100,
              }}
            >
              <div
                style={{
                  width: "260px",
                  background: "#fff",
                  height: "100%",
                  padding: "20px",
                }}
              >
                {["All", ...Object.keys(CAT_COLOR)].map((cat) => (
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
                    color: "var(--burgundy)",
                  }}
                >
                  Clear Filter
                </button>
              </div>
            </div>
          )}

          {/* MAIN CONTENT */}
          <div
            style={{
              flex: 1,
              maxHeight: "calc(100vh - 120px)",
              overflowY: "auto",
              paddingRight: "4px",
            }}
          >
            {grouped.map((group) => (
              <div key={group.category} style={{ marginBottom: "50px" }}>
                {/* Section Title */}
                <h2
                  style={{
                    fontFamily: "Cormorant Garamond",
                    fontSize: "28px",
                    marginBottom: "20px",
                    color: CAT_COLOR[group.category],
                  }}
                >
                  {group.category}
                </h2>

                {/* Grid */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: isMobile
                      ? "repeat(2, 1fr)"
                      : "repeat(auto-fill, minmax(260px,1fr))",
                    gap: "18px",
                  }}
                >
                  {group.items.map((p, idx) => (
                    <motion.div
                      key={p._id}
                      initial={{ opacity: 0, y: 28 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      style={{
                        background: "#fff",
                        borderRadius: "18px",
                        overflow: "hidden",
                        border: "1px solid rgba(196,117,138,0.14)",
                        boxShadow: "0 2px 12px rgba(107,26,42,0.05)",
                      }}
                      whileHover={{
                        y: -5,
                        boxShadow: "0 18px 40px rgba(107,26,42,0.14)",
                      }}
                    >
                      {/* Image */}
                      <div style={{ position: "relative" }}>
                        {p.featured && (
                          <div
                            style={{
                              position: "absolute",
                              top: "8px",
                              right: "8px",
                              background: "#6B1A2A",
                              color: "#fff",
                              fontSize: "10px",
                              padding: "3px 8px",
                              borderRadius: "20px",
                            }}
                          >
                            Featured
                          </div>
                        )}

                        {p.media?.[0]?.type === "image" && (
                          <img
                            src={p.media[0].url}
                            style={{
                              width: "100%",
                              height: "140px",
                              objectFit: "cover",
                            }}
                          />
                        )}
                      </div>

                      {/* Content */}
                      <div style={{ padding: "12px" }}>
                        <h4
                          style={{
                            fontFamily: "Cormorant Garamond",
                            fontSize: "16px",
                          }}
                        >
                          {p.title}
                        </h4>

                        <p
                          style={{
                            fontSize: "12px",
                            color: CAT_COLOR[p.category],
                          }}
                        >
                          {p.category}
                        </p>

                        {/* Description */}
                        <p
                          style={{
                            fontSize: "12px",
                            color: "var(--gift-muted)",
                            marginTop: "6px",
                          }}
                        >
                          {p.description}
                        </p>

                        {/* Tech tags */}
                        <div
                          style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "6px",
                            marginTop: "6px",
                          }}
                        >
                          {p.tech?.map((t, i) => (
                            <span
                              key={i}
                              style={{
                                fontSize: "10px",
                                background: "#F7E8EC",
                                padding: "3px 6px",
                                borderRadius: "6px",
                              }}
                            >
                              {t}
                            </span>
                          ))}
                        </div>

                        {/* View Project */}
                        {p.link && (
                          <a
                            href={p.link}
                            target="_blank"
                            style={{
                              display: "inline-block",
                              marginTop: "8px",
                              fontSize: "12px",
                              color: "var(--burgundy)",
                            }}
                          >
                            View Project →
                          </a>
                        )}

                        {/* WhatsApp */}
                        {/* <a
                          href={buildWaLink(p)}
                          target="_blank"
                          style={{
                            display: "block",
                            textAlign: "center",
                            marginTop: "10px",
                            padding: "6px",
                            background: "#25D366",
                            borderRadius: "40px",
                            color: "#fff",
                            fontSize: "12px"
                          }}
                        >
                          WhatsApp
                        </a> */}
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
