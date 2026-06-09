import { useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa";

const CAT_COLOR = {
  'Web Dev': '#7C1F3A',
  'Design': '#9C3A10',
  'Digital Marketing':'#5C2A80',
  'SEO': '#183A7C',
  'Video': '#8C1A3A',
  'Social Media': '#0A5C4A',
  'Data Analysis': '#7C4A08',
  'Machine Learning': '#0C4A50',
  'Other': '#403050',
};

const API = import.meta.env.VITE_API_URL;

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [category, setCategory] = useState("All");
  const [showDrawer, setShowDrawer] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    fetch(`${API}/api/projects`)
      .then(res => res.json())
      .then(data => setProjects(data));
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filtered = projects.filter(p =>
    category === "All" || p.category === category
  );

  const sidebarStyle = {
    width: "250px",
    padding: "20px",
    background: "#fff",
    border: "1px solid var(--gift-border)",
    borderRadius: "16px",
    height: "fit-content"
  };

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
    <div style={{
      minHeight: "100vh",
      background: "var(--gift-bg)",
      padding: "100px 20px 60px"
    }}>

      {/* Mobile Header */}
      {isMobile && (
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px"
        }}>
          <h2 style={{ color: "var(--burgundy)" }}>Projects</h2>
          <FaFilter onClick={() => setShowDrawer(true)} style={{ cursor: "pointer" }} />
        </div>
      )}

      <div style={{ display: "flex", gap: "20px" }}>

        {/* Sidebar (Desktop) */}
        {!isMobile && (
          <div style={sidebarStyle}>
            <h3 style={{ color: "var(--burgundy)" }}>Services</h3>

            {["All", ...Object.keys(CAT_COLOR)].map(cat => (
              <div
                key={cat}
                style={categoryItem(cat)}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </div>
            ))}
          </div>
        )}

        {/* Drawer (Mobile) */}
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
              <h3 style={{ marginBottom: "10px" }}>Filters</h3>

              {["All", ...Object.keys(CAT_COLOR)].map(cat => (
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
                onClick={() => setShowDrawer(false)}
                style={{
                  marginTop: "15px",
                  fontSize: "14px",
                  color: "#666"
                }}
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Grid */}
        <div style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: isMobile
            ? "repeat(1, 1fr)"
            : "repeat(auto-fill, minmax(260px, 1fr))",
          gap: "20px"
        }}>
          {filtered.map(p => (
            <div
              key={p._id}
              style={{
                background: "#fff",
                padding: "16px",
                borderRadius: "16px",
                border: "1px solid var(--gift-border)"
              }}
            >
              <h4 style={{ marginBottom: "5px" }}>{p.title}</h4>

              <p style={{
                fontSize: "13px",
                color: CAT_COLOR[p.category],
                fontWeight: "500"
              }}>
                {p.category}
              </p>

              {p.media?.[0]?.type === "image" && (
                <img
                  src={p.media[0].url}
                  alt=""
                  style={{
                    width: "100%",
                    marginTop: "10px",
                    borderRadius: "10px"
                  }}
                />
              )}

              <p style={{
                fontSize: "13px",
                color: "var(--gift-muted)",
                marginTop: "10px"
              }}>
                {p.description}
              </p>

              {p.link && (
                <a
                  href={p.link}
                  target="_blank"
                  style={{
                    display: "inline-block",
                    marginTop: "10px",
                    color: "var(--burgundy)",
                    fontSize: "13px"
                  }}
                >
                  View Project →
                </a>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}