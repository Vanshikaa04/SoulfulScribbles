import { motion } from 'framer-motion';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';

const UnderConstruction = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(180deg, var(--gift-bg), var(--gift-bg-2))",
        padding: "20px"
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        style={{
          background: "var(--gift-card)",
          padding: "48px 36px",
          borderRadius: "var(--radius-xl)",
          maxWidth: "420px",
          width: "100%",
          textAlign: "center",
          border: "1px solid var(--gift-border)",
          boxShadow: "0 20px 60px rgba(107,26,42,0.08)"
        }}
      >
        {/* Icon */}
        <div className="float" style={{ fontSize: "48px", marginBottom: "18px" }}>
          🛠️
        </div>

        {/* Heading */}
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "34px",
            color: "var(--burgundy)",
            marginBottom: "10px"
          }}
        >
          Under Construction
        </h1>

        {/* Divider */}
        <div
          style={{
            width: "50px",
            height: "2px",
            background: "var(--gift-accent-soft)",
            margin: "12px auto 18px",
            borderRadius: "2px"
          }}
        />

        {/* Text */}
        <p
          style={{
            color: "var(--gift-muted)",
            fontSize: "15px",
            lineHeight: "1.7",
            marginBottom: "28px"
          }}
        >
          We’re crafting something beautiful for{" "}
          <span style={{ color: "var(--burgundy)", fontWeight: 500 }}>
            Soulful Scribble
          </span>
          .  
          <br />
          Stay tuned ✨
        </p>

        {/* Social Icons */}
        <div style={{ display: "flex", justifyContent: "center", gap: "22px" }}>
          <a
            href="https://www.instagram.com/soulful.scribble_"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--burgundy)", transition: "var(--transition)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--gift-accent-soft)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--burgundy)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <FaInstagram size={26} />
          </a>

          <a
            href="https://wa.me/917202052004"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--burgundy)", transition: "var(--transition)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--gift-accent-soft)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--burgundy)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <FaWhatsapp size={26} />
          </a>
        </div>

        {/* Footer */}
        <p
          style={{
            marginTop: "28px",
            fontSize: "12px",
            color: "var(--gift-muted)"
          }}
        >
          © 2025 Soulful Scribble
        </p>
      </motion.div>
    </div>
  );
};

export default UnderConstruction;