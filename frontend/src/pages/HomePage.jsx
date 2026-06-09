import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import img1 from "../assests/founder.jpeg";
import Occasioncarouosel from "../components/OccasionCarousel";

const occasionImages = [
  { label: "Birthdays", img: "/images/occasions/birthday.jpeg", emoji: "🎂" },
  {
    label: "Anniversary",
    img: "/images/occasions/anniversary.jpeg",
    emoji: "💍",
  },
  { label: "Weddings", img: "/images/occasions/wedding.jpeg", emoji: "👰" },
  { label: "For Her", img: "/images/occasions/forher.jpeg", emoji: "👩" },
  { label: "For Him", img: "/images/occasions/forhim.jpeg", emoji: "👨" },
  { label: "Surprises", img: "/images/occasions/surprise.jpeg", emoji: "🎉" },
  { label: "Flowers", img: "/images/occasions/flowers.jpeg", emoji: "🌸" },
  { label: "Dosti", img: "/images/occasions/dosti.jpeg", emoji: "🤝" },
];

const techServices = [
  { icon: "🌐", label: "Website Building", color: "#C4758A" },
  { icon: "✏️", label: "Logo Designing", color: "#D4956A" },
  { icon: "📣", label: "Digital Marketing", color: "#A67CC5" },
  { icon: "🔍", label: "SEO Optimization", color: "#6B8FD4" },
  { icon: "🎬", label: "Video Editing", color: "#D46B8F" },
  // { icon: "📱", label: "Social Media Marketing", color: "#6BC4B0" },
  { icon: "📊", label: "Data Analysis", color: "#E8A56A" },
  { icon: "🤖", label: "Machine Learning", color: "#7CC4A6" },
];

const fa = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
});
const fv = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
});
    const WAIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
);

export default function HomePage() {
  return (
    <div style={{ background: "#FFF8FA", overflowX: "hidden" }}>
      <HeroSection />
      <MarqueeSection />
      <HubCardsSection />
      <FounderSection />
      <Occasioncarouosel/>
      {/* <OccasionsSection /> */}
      <TechServicesSection />
      <CTABanner />
    </div>
  );
}

/* ════════════════════════════════════════
   HERO
   Desktop: left text | right column (cards stacked)
   Mobile:  left text first, then cards in a ROW (flex-wrap)
════════════════════════════════════════ */
function HeroSection() {
  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        background:
          "linear-gradient(160deg,#FFF8FA 0%,#FFF0F4 45%,#F7E8EC 100%)",
        paddingTop: "72px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* decorative blobs */}
      <div
        style={{
          position: "absolute",
          top: "-120px",
          right: "-120px",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(196,117,138,0.14) 0%,transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-80px",
          left: "-80px",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(107,26,42,0.08) 0%,transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <span
        style={{
          position: "absolute",
          top: "15%",
          left: "2%",
          fontFamily: "Cormorant Garamond",
          fontSize: "clamp(80px,14vw,180px)",
          color: "rgba(107,26,42,0.04)",
          fontStyle: "italic",
          lineHeight: 1,
          userSelect: "none",
          pointerEvents: "none",
        }}
      >
        S
      </span>

      <div
        className="container"
        style={{ width: "100%", padding: "40px 24px" }}
      >
        {/*
            LAYOUT:
            – Desktop (≥769px): CSS grid  1fr auto  side-by-side
            – Mobile  (<768px): single column; left text first,
                                then hub cards in a flex ROW with wrap
        */}
        <div className="hero-outer">
          {/* ── LEFT: branding + description ── */}
          <div>
            <motion.div {...fa(0)}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "6px 18px",
                  background: "rgba(107,26,42,0.07)",
                  border: "1px solid rgba(107,26,42,0.15)",
                  borderRadius: "40px",
                  marginBottom: "24px",
                }}
              >
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "#6B1A2A",
                    display: "inline-block",
                  }}
                />
                <span
                  style={{
                    fontSize: "11px",
                    letterSpacing: "3px",
                    textTransform: "uppercase",
                    color: "#6B1A2A",
                    fontWeight: 500,
                  }}
                >
                  Two Hubs · One Brand
                </span>
              </div>
            </motion.div>

            <motion.h1
              {...fa(0.08)}
              style={{
                fontFamily: "Cormorant Garamond",
                fontSize: "clamp(46px,9vw,92px)",
                fontWeight: 300,
                color: "#2A0A12",
                lineHeight: 1.0,
                marginBottom: "20px",
              }}
            >
              Soulful
              <br />
              <em style={{ fontStyle: "italic", color: "#6B1A2A" }}>
                Scribble
              </em>
            </motion.h1>

            <motion.div
              {...fa(0.16)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                marginBottom: "20px",
              }}
            >
              <div
                style={{
                  flex: 1,
                  maxWidth: "60px",
                  height: "1px",
                  background: "linear-gradient(to right,transparent,#C4758A)",
                }}
              />
              <span
                style={{
                  fontSize: "11px",
                  color: "#8B6070",
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                }}
              >
                Two Worlds · One Vision
              </span>
            </motion.div>

            {/* "What is Soulful Scribble?" box */}
            <motion.div
              {...fa(0.22)}
              style={{
                marginBottom: "24px",
                padding: "16px 20px",
                borderRadius: "16px",
                background: "rgba(107,26,42,0.04)",
                border: "1px solid rgba(107,26,42,0.09)",
              }}
            >
              <p
                style={{
                  fontFamily: "Cormorant Garamond",
                  fontSize: "18px",
                  color: "#6B1A2A",
                  fontWeight: 600,
                  marginBottom: "8px",
                }}
              >
                What is Soulful Scribble?
              </p>
              <p
                style={{
                  fontSize: "14px",
                  color: "#8B6070",
                  lineHeight: 1.8,
                  fontWeight: 300,
                  marginBottom: "10px",
                }}
              >
                Soulful Scribble brings together{" "}
                <strong style={{ color: "#6B1A2A" }}>
                  two distinct worlds
                </strong>{" "}
                under one brand:
              </p>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "10px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "15px",
                      flexShrink: 0,
                      marginTop: "1px",
                    }}
                  >
                    🎁
                  </span>
                  <p
                    style={{
                      fontSize: "13px",
                      color: "#8B6070",
                      lineHeight: 1.75,
                      fontWeight: 300,
                    }}
                  >
                    <strong style={{ color: "#2A0A12" }}>Gifting Hub</strong> —
                    Handcrafted, customised gifts for every celebration. Custom
                    magazines, bouquets, hampers &amp; more.
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "10px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "15px",
                      flexShrink: 0,
                      marginTop: "1px",
                    }}
                  >
                    💻
                  </span>
                  <p
                    style={{
                      fontSize: "13px",
                      color: "#8B6070",
                      lineHeight: 1.75,
                      fontWeight: 300,
                    }}
                  >
                    <strong style={{ color: "#2A0A12" }}>Techno Hub</strong> —
                    Solo freelance tech: websites, data analysis, ML, digital
                    marketing, design &amp; more.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.p
              {...fa(0.28)}
              style={{
                fontSize: "clamp(14px,2vw,16px)",
                color: "#8B6070",
                lineHeight: 1.85,
                fontWeight: 300,
                maxWidth: "500px",
                marginBottom: "8px",
              }}
            >
              Crafted by one soul —{" "}
              <strong style={{ color: "#2A0A12" }}>Vanshika Wadhwani</strong> —
              with love, precision, and intention.
            </motion.p>
          </div>

          {/* ── RIGHT: Hub CTA cards ──
              On desktop: flex-col (stacked)
              On mobile:  flex-row flex-wrap (side by side)
          */}
          <motion.div {...fa(0.34)} className="hero-ctas">
            {/* Gifting Hub card */}
            <motion.div
              whileHover={{ scale: 1.03, y: -4 }}
              transition={{ duration: 0.22 }}
              className="hub-card"
            >
              <Link
                to="/gifting"
                style={{
                  display: "block",
                  padding: "clamp(18px,3vw,26px) clamp(16px,3vw,26px)",
                  borderRadius: "22px",
                  background:
                    "linear-gradient(135deg,#6B1A2A 0%,#8B2535 50%,#C4758A 100%)",
                  textDecoration: "none",
                  position: "relative",
                  overflow: "hidden",
                  boxShadow: "0 10px 32px rgba(107,26,42,0.35)",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "-28px",
                    right: "-28px",
                    width: "90px",
                    height: "90px",
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.06)",
                    pointerEvents: "none",
                  }}
                />
                <div style={{ position: "relative", zIndex: 1 }}>
                  <span
                    style={{
                      fontSize: "28px",
                      display: "block",
                      marginBottom: "10px",
                    }}
                  >
                    🎁
                  </span>
                  <p
                    style={{
                      fontFamily: "Cormorant Garamond",
                      fontSize: "clamp(18px,2.5vw,22px)",
                      fontWeight: 600,
                      color: "#fff",
                      marginBottom: "4px",
                      lineHeight: 1.2,
                    }}
                  >
                    Gifting Hub
                  </p>
                  <p
                    style={{
                      fontSize: "11px",
                      color: "rgba(255,255,255,0.72)",
                      marginBottom: "14px",
                      lineHeight: 1.55,
                      fontStyle: "italic",
                      fontFamily: "Cormorant Garamond",
                    }}
                  >
                    Soulfully Designed to Speak your Heart!
                  </p>
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "6px 16px",
                      background: "rgba(255,255,255,0.15)",
                      borderRadius: "40px",
                      border: "1px solid rgba(255,255,255,0.25)",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "12px",
                        color: "#fff",
                        fontWeight: 600,
                      }}
                    >
                      Stalk Gifting Hub →
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Techno Hub card */}
            <motion.div
              whileHover={{ scale: 1.03, y: -4 }}
              transition={{ duration: 0.22 }}
              className="hub-card"
            >
              <Link
                to="/techno"
                style={{
                  display: "block",
                  padding: "clamp(18px,3vw,26px) clamp(16px,3vw,26px)",
                  borderRadius: "22px",
                  background:
                    "linear-gradient(135deg,#1A0A0E 0%,#2A1218 60%,#3D1020 100%)",
                  textDecoration: "none",
                  position: "relative",
                  overflow: "hidden",
                  border: "1px solid rgba(196,117,138,0.25)",
                  boxShadow: "0 10px 32px rgba(0,0,0,0.28)",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "-28px",
                    right: "-28px",
                    width: "90px",
                    height: "90px",
                    borderRadius: "50%",
                    background: "rgba(196,117,138,0.08)",
                    pointerEvents: "none",
                  }}
                />
                <div style={{ position: "relative", zIndex: 1 }}>
                  <span
                    style={{
                      fontSize: "28px",
                      display: "block",
                      marginBottom: "10px",
                    }}
                  >
                    💻
                  </span>
                  <p
                    style={{
                      fontFamily: "Cormorant Garamond",
                      fontSize: "clamp(18px,2.5vw,22px)",
                      fontWeight: 600,
                      color: "#FAF0F2",
                      marginBottom: "4px",
                      lineHeight: 1.2,
                    }}
                  >
                    Techno Hub
                  </p>
                  <p
                    style={{
                      fontSize: "11px",
                      color: "rgba(196,117,138,0.78)",
                      marginBottom: "14px",
                      lineHeight: 1.55,
                      fontStyle: "italic",
                      fontFamily: "Cormorant Garamond",
                    }}
                  >
                    Building Tomorrow's Digital Presence
                  </p>
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "6px 16px",
                      background: "rgba(196,117,138,0.12)",
                      borderRadius: "40px",
                      border: "1px solid rgba(196,117,138,0.3)",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "12px",
                        color: "#C4758A",
                        fontWeight: 600,
                      }}
                    >
                      Stalk Techno Hub →
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* WhatsApp button — full width on both layouts */}
            <motion.a
              href="https://wa.me/917202052004"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              className="wa-btn"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                padding: "13px",
                borderRadius: "16px",
                background: "#25D366",
                color: "#fff",
                fontWeight: 600,
                fontSize: "14px",
                boxShadow: "0 6px 20px rgba(37,211,102,0.3)",
                textDecoration: "none",
              }}
            >
                                 <WAIcon />
 WhatsApp Us Directly
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* ── Responsive styles ── */}
      <style>{`
        /* Desktop: side by side */
        .hero-outer {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: clamp(28px,5vw,80px);
          align-items: center;
        }
        .hero-ctas {
          display: flex;
          flex-direction: column;
          gap: 14px;
          width: clamp(220px,28vw,300px);
        }
        .hub-card { width: 100%; }
        .wa-btn   { width: 100%; }

        /* Mobile: single column, cards become a row */
        @media (max-width: 768px) {
          .hero-outer {
            grid-template-columns: 1fr;
            gap: 28px;
          }
          .hero-ctas {
            flex-direction: row;   /* ← KEY: row on phone */
            flex-wrap: wrap;
            width: 100%;
            gap: 12px;
          }
          .hub-card {
            flex: 1;
            min-width: 140px;
          }
          .wa-btn {
            width: 100%;
            flex-basis: 100%;
          }
        }
      `}</style>
    </section>
  );
}

/* ════ MARQUEE ════ */
function MarqueeSection() {
  const items = [
    "🎁 Custom Magazines",
    "✦",
    "💐 Bouquets",
    "✦",
    "🌐 Web Design",
    "✦",
    "🎀 Hampers",
    "✦",
    "📱 Digital Marketing",
    "✦",
    "📊 Data Analysis",
    "✦",
    "🤖 Machine Learning",
    "✦",
    "🔍 SEO",
    "✦",
    "👰 Trousseau",
    "✦",
    "🎬 Video Editing",
  ];
  return (
    <div
      style={{ background: "#2A0A12", padding: "13px 0", overflow: "hidden" }}
    >
      <div
        style={{
          display: "flex",
          animation: "marquee 30s linear infinite",
          width: "max-content",
        }}
      >
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            style={{
              whiteSpace: "nowrap",
              padding: "0 22px",
              fontSize: "11px",
              letterSpacing: "2.5px",
              textTransform: "uppercase",
              color: i % 2 === 0 ? "#E8A0B0" : "#C4758A",
              fontFamily: "DM Sans",
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ════ HUB CARDS ════ */
function HubCardsSection() {
  return (
    <section
      style={{ padding: "clamp(60px,8vw,110px) 0", background: "#FFF8FA" }}
    >
      <div className="container">
        <motion.div
          {...fv(0)}
          style={{ textAlign: "center", marginBottom: "60px" }}
        >
          <p
            style={{
              fontSize: "11px",
              letterSpacing: "4px",
              textTransform: "uppercase",
              color: "#C4758A",
              marginBottom: "10px",
            }}
          >
            What We Offer
          </p>
          <h2
            style={{
              fontFamily: "Cormorant Garamond",
              fontSize: "clamp(30px,6vw,56px)",
              fontWeight: 400,
              color: "#2A0A12",
            }}
          >
            Two Hubs,
            <em style={{ fontStyle: "italic", color: "#6B1A2A" }}>
              {" "}
              One Brand
            </em>
          </h2>
        </motion.div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,340px),1fr))",
            gap: "26px",
          }}
        >
          <HubCard
            delay={0}
            emoji="🎁"
            tag="Gifting Hub"
            tagColor="#C4758A"
            title="Soulfully Designed to Speak your Heart!"
            desc="We craft memories that last forever. Custom magazines, handcrafted bouquets, curated hampers, bridal trousseau — every piece made with love for birthdays, anniversaries, and every moment worth celebrating."
            features={[
              "Custom Magazines",
              "Bouquets & Florals",
              "Gift Hampers",
              "Crochet Goodies",
              "Trousseau Packing",
              "Personalised Keychains",
            ]}
            cta="Stalk Gifting Hub"
            ctaLink="/gifting"
            gradient="linear-gradient(160deg,#FFFFFF 0%,#FFF0F4 100%)"
            borderColor="rgba(196,117,138,0.18)"
            ctaBg="linear-gradient(135deg,#6B1A2A,#C4758A)"
          />
          <HubCard
            delay={0.1}
            emoji="💻"
            tag="Techno Hub"
            tagColor="#5C1322"
            title="Soulfully Designed to Blend Creativity with Intelligence"
            desc="Solo freelance tech services by Vanshika Wadhwani - Websites, data analysis, ML projects, marketing and more"
            features={[
              "Website Building",
              "Logo Designing",
              "Digital Marketing",
              "Data Analysis",
              "Machine Learning",
              "SEO & Social Media",
            ]}
            cta="Stalk Techno Hub"
            ctaLink="/techno"
            gradient="linear-gradient(160deg,#FFFFFF 0%,#FDF5F7 60%,#FFF0F4 100%)"
            borderColor="rgba(92,19,34,0.13)"
            ctaBg="linear-gradient(135deg,#5C1322,#C4758A)"
          />
        </div>
      </div>
    </section>
  );
}

function HubCard({
  delay,
  emoji,
  tag,
  tagColor,
  title,
  desc,
  features,
  cta,
  ctaLink,
  gradient,
  borderColor,
  ctaBg,
}) {
  return (
    <motion.div {...fv(delay)}>
      <motion.div
        whileHover={{ y: -6, boxShadow: "0 28px 60px rgba(92,19,34,0.1)" }}
        style={{
          background: gradient,
          borderRadius: "28px",
          padding: "clamp(28px,5vw,50px) clamp(22px,4vw,42px)",
          border: `1.5px solid ${borderColor}`,
          boxShadow: "0 4px 16px rgba(92,19,34,0.05)",
          transition: "all 0.4s ease",
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "20px",
          }}
        >
          <motion.span
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            style={{ fontSize: "34px" }}
          >
            {emoji}
          </motion.span>
          <span
            style={{
              padding: "4px 14px",
              borderRadius: "40px",
              background: `${tagColor}12`,
              border: `1.5px solid ${tagColor}30`,
              fontSize: "11px",
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: tagColor,
              fontWeight: 600,
            }}
          >
            {tag}
          </span>
        </div>
        <h3
          style={{
            fontFamily: "Cormorant Garamond",
            fontSize: "clamp(20px,3.5vw,28px)",
            fontWeight: 400,
            color: "#2A0A12",
            marginBottom: "14px",
            lineHeight: 1.3,
            fontStyle: "italic",
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontSize: "14px",
            color: "#8B4558",
            lineHeight: 1.85,
            marginBottom: "24px",
            fontWeight: 300,
            flex: 1,
          }}
        >
          {desc}
        </p>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "7px",
            marginBottom: "28px",
          }}
        >
          {features.map((f) => (
            <span
              key={f}
              style={{
                padding: "5px 13px",
                borderRadius: "40px",
                fontSize: "12px",
                background: `${tagColor}0D`,
                color: tagColor,
                border: `1px solid ${tagColor}22`,
                fontWeight: 500,
              }}
            >
              {f}
            </span>
          ))}
        </div>
        <motion.div whileHover={{ x: 4 }}>
          <Link
            to={ctaLink}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 26px",
              borderRadius: "50px",
              background: ctaBg,
              color: "#fff",
              fontSize: "14px",
              fontWeight: 700,
              alignSelf: "flex-start",
              boxShadow: "0 6px 20px rgba(92,19,34,0.22)",
            }}
          >
            {cta} →
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/* ════ FOUNDER ════ */
function FounderSection() {
  return (
    <section
      style={{
        padding: "clamp(60px,8vw,110px) 0",
        background: "linear-gradient(160deg,#2A0A12 0%,#3D1020 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "45%",
          height: "100%",
          background:
            "radial-gradient(ellipse at right,rgba(196,117,138,0.07) 0%,transparent 65%)",
          pointerEvents: "none",
        }}
      />
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,290px),1fr))",
            gap: "clamp(36px,6vw,80px)",
            alignItems: "center",
          }}
        >
          <motion.div
            {...fv(0)}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <div style={{ position: "relative" }}>
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  width: "clamp(200px,30vw,270px)",
                  height: "clamp(250px,36vw,330px)",
                  borderRadius: "120px 120px 80px 80px",
                  background:
                    "linear-gradient(160deg,#6B1A2A 0%,#C4758A 60%,#F0D5DC 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "68px",
                  position: "relative",
                  overflow: "hidden",
                  boxShadow: "0 40px 80px rgba(0,0,0,0.4)",
                  margin: "0 auto",
                }}
              >
                <span style={{ position: "relative", zIndex: 1 }}>
                  <img src={img1} alt="" srcset="" />
                </span>
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to bottom,transparent 40%,rgba(42,10,18,0.5))",
                  }}
                />
              </motion.div>
              <div
                style={{
                  position: "absolute",
                  bottom: "-16px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "linear-gradient(135deg,#6B1A2A,#C4758A)",
                  padding: "9px 22px",
                  borderRadius: "40px",
                  whiteSpace: "nowrap",
                  boxShadow: "0 8px 24px rgba(107,26,42,0.4)",
                }}
              >
                <p
                  style={{
                    fontSize: "13px",
                    color: "#fff",
                    fontWeight: 600,
                    fontFamily: "DM Sans",
                  }}
                >
                  Vanshika Wadhwani
                </p>
              </div>
            </div>
          </motion.div>
          <motion.div {...fv(0.15)}>
            <p
              style={{
                fontSize: "11px",
                letterSpacing: "4px",
                textTransform: "uppercase",
                color: "#C4758A",
                marginBottom: "14px",
              }}
            >
              Founder's Word
            </p>
            <blockquote
              style={{
                fontFamily: "Cormorant Garamond",
                fontSize: "clamp(26px,4.5vw,46px)",
                fontWeight: 300,
                fontStyle: "italic",
                color: "#FAF0F2",
                lineHeight: 1.2,
                marginBottom: "24px",
              }}
            >
              "Every scribble has a soul behind it."
            </blockquote>
            <div
              style={{
                width: "50px",
                height: "2px",
                background: "linear-gradient(to right,#6B1A2A,#C4758A)",
                marginBottom: "22px",
              }}
            />
            <p
              style={{
                fontSize: "15px",
                color: "rgba(250,240,242,0.65)",
                lineHeight: 1.95,
                marginBottom: "14px",
                fontWeight: 300,
              }}
            >
              <span style={{ color: "#D4956A" }}> Soulful Scribble</span> may be
              just a name for many, but for me, it is an emotion I can never
              fully put into words. It is something I built with hardworking
              nights, endless ideas, passion, courage, and a heart full of
              dreams. Every step of this journey carries a piece of me!
            </p>
            <p
              style={{
                fontSize: "15px",
                color: "rgba(250,240,242,0.65)",
                lineHeight: 1.95,
                marginBottom: "24px",
                fontWeight: 300,
              }}
            >
              What makes Soulful Scribble special is how it reflects my
              passion & strength — through the Gifting Hub & the Techno Hub. I’m
              truly grateful to everyone who believed in and supporting me
              throughout this journey, especially my close ones who made this
              dream feel possible.{" "}
            </p>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <Link
                to="/gifting"
                style={{
                  padding: "11px 22px",
                  borderRadius: "40px",
                  background: "rgba(196,117,138,0.12)",
                  border: "1px solid rgba(196,117,138,0.25)",
                  color: "#E8A0B0",
                  fontSize: "14px",
                  fontWeight: 500,
                }}
              >
                🎁 Gifting Hub
              </Link>
              <Link
                to="/techno"
                style={{
                  padding: "11px 22px",
                  borderRadius: "40px",
                  background: "rgba(212,149,106,0.12)",
                  border: "1px solid rgba(212,149,106,0.25)",
                  color: "#D4956A",
                  fontSize: "14px",
                  fontWeight: 500,
                }}
              >
                💻 Techno Hub
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ════ OCCASIONS with real images ════ */
function OccasionsSection() {
  return (
    <section
      style={{ padding: "clamp(60px,8vw,100px) 0", background: "#FFF0F4" }}
    >
      <div className="container">
        <motion.div
          {...fv(0)}
          style={{ textAlign: "center", marginBottom: "48px" }}
        >
          <p
            style={{
              fontSize: "11px",
              letterSpacing: "4px",
              textTransform: "uppercase",
              color: "#C4758A",
              marginBottom: "10px",
            }}
          >
            Every Occasion
          </p>
          <h2
            style={{
              fontFamily: "Cormorant Garamond",
              fontSize: "clamp(26px,5vw,48px)",
              fontWeight: 400,
              color: "#2A0A12",
            }}
          >
            <em style={{ fontStyle: "italic" }}>Gifts that speak</em> when words
            fall short
          </h2>
        </motion.div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill,minmax(min(100%,130px),1fr))",
            gap: "14px",
          }}
        >
          {occasionImages.map((occ, i) => (
            <motion.div key={occ.label} {...fv(i * 0.04)}>
              <motion.div
                whileHover={{
                  y: -5,
                  boxShadow: "0 14px 32px rgba(107,26,42,0.12)",
                  borderColor: "rgba(107,26,42,0.28)",
                }}
              >
                <Link
                  to="/gifting"
                  style={{
                    display: "block",
                    borderRadius: "18px",
                    overflow: "hidden",
                    border: "1px solid rgba(196,117,138,0.14)",
                    background: "#fff",
                    boxShadow: "0 2px 8px rgba(107,26,42,0.04)",
                    transition: "all 0.3s",
                  }}
                >
                  <div
                    style={{
                      aspectRatio: "1/1",
                      overflow: "hidden",
                      position: "relative",
                      background: "linear-gradient(135deg,#FFF5F7,#F7E8EC)",
                    }}
                  >
                    <img
                      src={occ.img}
                      alt={occ.label}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform 0.4s",
                      }}
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "flex";
                      }}
                    />
                    <div
                      style={{
                        display: "none",
                        position: "absolute",
                        inset: 0,
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "38px",
                        opacity: 0.3,
                      }}
                    >
                      {occ.emoji}
                    </div>
                  </div>
                  <p
                    style={{
                      textAlign: "center",
                      padding: "8px 6px",
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "#2A0A12",
                      fontFamily: "Cormorant Garamond",
                      lineHeight: 1.3,
                    }}
                  >
                    {occ.label}
                  </p>
                </Link>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════ TECH SERVICES — white bg, burgundy text ════ */
function TechServicesSection() {
  return (
    <section
      style={{ padding: "clamp(60px,8vw,100px) 0", background: "#FFFFFF" }}
    >
      <div className="container">
        <motion.div
          {...fv(0)}
          style={{ textAlign: "center", marginBottom: "48px" }}
        >
          <p
            style={{
              fontSize: "11px",
              letterSpacing: "4px",
              textTransform: "uppercase",
              color: "#B05070",
              marginBottom: "10px",
            }}
          >
            Techno Hub
          </p>
          <h2
            style={{
              fontFamily: "Cormorant Garamond",
              fontSize: "clamp(26px,5vw,48px)",
              fontWeight: 400,
              color: "#2A0A12",
            }}
          >
            <em style={{ fontStyle: "italic", color: "#5C1322" }}>
              Digital services
            </em>{" "}
            that move the needle
          </h2>
          <p style={{ fontSize: "14px", color: "#8B4558", marginTop: "10px" }}>
            Every service delivered personally — no outsourcing, no middlemen.
          </p>
        </motion.div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill,minmax(min(100%,150px),1fr))",
            gap: "14px",
          }}
        >
          {techServices.map((svc, i) => (
            <motion.div key={svc.label} {...fv(i * 0.04)}>
              <motion.div
                whileHover={{
                  y: -5,
                  boxShadow: `0 12px 28px rgba(92,19,34,0.1)`,
                  borderColor: `rgba(92,19,34,0.22)`,
                }}
              >
                <Link
                  to="/techno"
                  style={{
                    display: "block",
                    padding: "clamp(18px,3vw,26px) 14px",
                    borderRadius: "18px",
                    background: "#FDF5F7",
                    border: "1.5px solid rgba(92,19,34,0.09)",
                    textAlign: "center",
                    transition: "all 0.3s",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: `radial-gradient(ellipse at 50% 0%,${svc.color}14 0%,transparent 65%)`,
                      pointerEvents: "none",
                    }}
                  />
                  <div style={{ fontSize: "30px", marginBottom: "10px" }}>
                    {svc.icon}
                  </div>
                  <p
                    style={{
                      fontSize: "12px",
                      fontWeight: 700,
                      color: "#2A0A12",
                      lineHeight: 1.4,
                    }}
                  >
                    {svc.label}
                  </p>
                </Link>
              </motion.div>
            </motion.div>
          ))}
        </div>
        <motion.div
          {...fv(0.3)}
          style={{ textAlign: "center", marginTop: "36px" }}
        >
          <Link
            to="/techno"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 26px",
              borderRadius: "50px",
              background: "linear-gradient(135deg,#5C1322,#C4758A)",
              color: "#fff",
              fontSize: "14px",
              fontWeight: 600,
              boxShadow: "0 6px 20px rgba(92,19,34,0.22)",
            }}
          >
            See All Services & Projects →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ════ CTA BANNER ════ */
function CTABanner() {
  return (
    <section
      style={{
        padding: "clamp(60px,8vw,100px) 0",
        background: "linear-gradient(135deg,#6B1A2A 0%,#C4758A 100%)",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "-60px",
          right: "-60px",
          width: "270px",
          height: "270px",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.05)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-40px",
          left: "-40px",
          width: "190px",
          height: "190px",
          borderRadius: "50%",
          background: "rgba(0,0,0,0.08)",
          pointerEvents: "none",
        }}
      />
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <motion.div {...fv(0)}>
          <p
            style={{
              fontSize: "11px",
              letterSpacing: "4px",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.6)",
              marginBottom: "14px",
            }}
          >
            Get in Touch
          </p>
          <h2
            style={{
              fontFamily: "Cormorant Garamond",
              fontSize: "clamp(28px,5vw,50px)",
              fontWeight: 400,
              color: "#fff",
              marginBottom: "14px",
              fontStyle: "italic",
            }}
          >
            Have something in mind?
          </h2>
          <p
            style={{
              fontSize: "16px",
              color: "rgba(255,255,255,0.75)",
              marginBottom: "36px",
              maxWidth: "460px",
              margin: "0 auto 36px",
              lineHeight: 1.8,
            }}
          >
            Whether it's a heartfelt gift or a digital project — let's create
            something beautiful together.
          </p>
          <div
            style={{
              display: "flex",
              gap: "12px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <motion.a
              href="https://wa.me/917202052004?text=Hi%21%20I%20have%20an%20enquiry"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2, boxShadow: "0 12px 32px rgba(0,0,0,0.25)" }}
              style={{
                padding: "13px 30px",
                borderRadius: "50px",
                background: "#25D366",
                color: "#fff",
                fontWeight: 600,
                fontSize: "14px",
                boxShadow: "0 6px 18px rgba(0,0,0,0.18)",
                display: "inline-flex",
                alignItems: "center",
                gap: "7px",
              }}
            >
                                 <WAIcon />
 WhatsApp Us
            </motion.a>
            <motion.a
              href="mailto:soulfulscribble@gmail.com"
              whileHover={{ background: "rgba(255,255,255,0.22)" }}
              style={{
                padding: "13px 30px",
                borderRadius: "50px",
                background: "rgba(255,255,255,0.14)",
                color: "#fff",
                fontWeight: 500,
                fontSize: "14px",
                border: "1px solid rgba(255,255,255,0.28)",
                backdropFilter: "blur(8px)",
              }}
            >
              ✉️ Email Us
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
