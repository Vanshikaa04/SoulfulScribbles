import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const WHATSAPP = '917202052004'; // Replace with actual number
const EMAIL = 'soulfulscribble.in@gmail.com';
const PHONE = '+91 7202052004';

export default function Footer() {
  const location = useLocation();
  const isTechno = location.pathname === '/techno';

  const bg = isTechno ? '#120608' : '#2A0A12';
  const accent = isTechno ? '#C4758A' : '#C4758A';
  const textMain = '#FAF0F2';
  const textMuted = 'rgba(250,240,242,0.45)';
  const border = 'rgba(196,117,138,0.15)';

  return (
    <footer style={{ background: bg, borderTop: `1px solid ${border}`, paddingTop: '72px', paddingBottom: '32px' }}>
      <div className="container">
        {/* 4-column grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '48px', paddingBottom: '56px', borderBottom: `1px solid ${border}` }}>

          {/* Col 1 — Brand */}
      <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <div style={{ width: '100px', height: '100px',padding :"5px", flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',backgroundColor:"white" , borderRadius:"50%" }}>
                <img src="/logo.png" alt="Soulful Scribble" style={{ width: '100px', height: '100px', objectFit: 'contain' }}
                  onError={e => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }} />
                {/* <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'linear-gradient(135deg,#6B1A2A,#C4758A)', alignItems: 'center', justifyContent: 'center', display: 'none' }}>
                  <span style={{ fontFamily: 'Cormorant Garamond', fontSize: '22px', color: '#FFF8FA', fontStyle: 'italic', fontWeight: 700 }}>S</span>
                </div> */}
              </div>
              <div>
                <p style={{ fontFamily: 'Cormorant Garamond', fontSize: '20px', color: textMain, fontWeight: 600, lineHeight: 1 }}>Soulful Scribble</p>
                <p style={{ fontSize: '10px', color: textMuted, letterSpacing: '2px', textTransform: 'uppercase', marginTop: '3px' }}>Est. 2025</p>
              </div>
            </div>
            <p style={{ fontSize: '13px', color: textMuted, lineHeight: 1.8, marginBottom: '24px', maxWidth: '240px' }}>
              Where heartfelt gifting meets cutting-edge technology. Two worlds, one soul.
            </p>

            {/* Contact */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <a href={`mailto:${EMAIL}`} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: textMuted, fontSize: '13px', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = accent}
                onMouseLeave={e => e.currentTarget.style.color = textMuted}>
                <EmailIcon /> {EMAIL}
              </a>
              <a href={`tel:${PHONE.replace(/\s/g,'')}`} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: textMuted, fontSize: '13px', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = accent}
                onMouseLeave={e => e.currentTarget.style.color = textMuted}>
                <PhoneIcon /> {PHONE}
              </a>
              <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '40px', background: 'rgba(37,211,102,0.1)', border: '1px solid rgba(37,211,102,0.25)', color: '#4ADE80', fontSize: '13px', fontWeight: 500, transition: 'all 0.2s', marginTop: '4px', width: 'fit-content' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(37,211,102,0.18)'; e.currentTarget.style.borderColor = 'rgba(37,211,102,0.4)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(37,211,102,0.1)'; e.currentTarget.style.borderColor = 'rgba(37,211,102,0.25)'; }}>
                <WAIcon /> WhatsApp Us
              </a>
            </div>
          </div>

          {/* Col 2 — Gifting Hub */}
          <div>
            <p style={{ fontFamily: 'Cormorant Garamond', fontSize: '18px', color: '#E8A0B0', fontWeight: 600, marginBottom: '8px' }}>🎁 Gifting Hub</p>
            <p style={{ fontSize: '11px', color: textMuted, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '20px' }}>Soulfully Designed to speak your Heart</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
              {['Custom Magazines', 'Bouquets', 'Gift Hampers', 'Keychains', 'Trousseau Packing', 'Crochet'].map(item => (
                <Link key={item} to="/gifting" style={{ fontSize: '13px', color: textMuted, transition: 'color 0.2s', display: 'flex', alignItems: 'center', gap: '6px' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#E8A0B0'}
                  onMouseLeave={e => e.currentTarget.style.color = textMuted}>
                  <span style={{ color: '#C4758A', fontSize: '10px' }}>✦</span> {item}
                </Link>
              ))}
            </div>
            {/* Gifting Social */}
            <p style={{ fontSize: '11px', color: textMuted, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '14px' }}>Follow Us</p>
            <div style={{ display: 'flex', gap: '10px' }}>
              {[
                { href: 'https://www.instagram.com/soulful.scribble_?igsh=MXBmaGlwcXRudnc3aA==', icon: <IGIcon />, label: 'Instagram' },
                { href: 'https://www.facebook.com/share/14a5AUDsZwX/', icon: <FBIcon />, label: 'Facebook' },
                { href: 'https://in.pinterest.com/soulfulscribble/', icon: <PINIcon />, label: 'Pinterest' },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" title={s.label}
                  style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'rgba(196,117,138,0.1)', border: '1px solid rgba(196,117,138,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: accent, transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(196,117,138,0.22)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(196,117,138,0.1)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Col 3 — Techno Hub */}
          <div>
            <p style={{ fontFamily: 'Cormorant Garamond', fontSize: '18px', color: '#D4956A', fontWeight: 600, marginBottom: '8px' }}>⚡ Techno Hub</p>
            <p style={{ fontSize: '11px', color: textMuted, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '20px' }}>Soulfully Designed To Blend Creativity with Intelligence</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
              {['Website Building','Data Analysis','Machine Learning', 'Logo Designing', 'Digital Marketing', 'SEO Optimization', 'Video Editing', 'Social Media Marketing'].map(item => (
                <Link key={item} to="/techno" style={{ fontSize: '13px', color: textMuted, transition: 'color 0.2s', display: 'flex', alignItems: 'center', gap: '6px' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#D4956A'}
                  onMouseLeave={e => e.currentTarget.style.color = textMuted}>
                  <span style={{ color: '#D4956A', fontSize: '10px' }}>✦</span> {item}
                </Link>
              ))}
            </div>
            {/* Techno Social */}
            <p style={{ fontSize: '11px', color: textMuted, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '14px' }}>Connect</p>
            <div style={{ display: 'flex', gap: '10px' }}>
              {[
                { href: 'https://instagram.com/vanshika.techno', icon: <IGIcon />, label: 'Instagram' },
                { href: 'https://www.linkedin.com/in/vanshika-wadhwani-8a515224b?utm_source=share_via&utm_content=profile&utm_medium=member_android', icon: <LIIcon />, label: 'LinkedIn' },
                { href: 'https://github.com/Vanshikaa04', icon: <GHIcon />, label: 'GitHub' },

              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" title={s.label}
                  style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'rgba(212,149,106,0.1)', border: '1px solid rgba(212,149,106,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D4956A', transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(212,149,106,0.22)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(212,149,106,0.1)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Col 4 — Founder */}
          <div>
            <p style={{ fontFamily: 'Cormorant Garamond', fontSize: '18px', color: textMain, fontWeight: 600, marginBottom: '8px' }}>The Creator</p>
            <p style={{ fontSize: '11px', color: textMuted, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '20px' }}>Behind the Scribble</p>
            <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', marginBottom: '20px' }}>
              <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: 'linear-gradient(135deg,#6B1A2A,#C4758A)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', flexShrink: 0 }}>👩‍💻</div>
              <div>
                <p style={{ fontFamily: 'Cormorant Garamond', fontSize: '20px', color: textMain, fontWeight: 600 }}>Vanshika Wadhwani</p>
                <p style={{ fontSize: '12px', color: accent, marginTop: '3px' }}>Founder · Creative Head</p>
                {/* <p style={{ fontSize: '12px', color: textMuted, marginTop: '2px' }}>Full Stack Developer & Tech Educator</p> */}
              </div>
            </div>
            {/* <p style={{ fontSize: '13px', color: textMuted, lineHeight: 1.8, marginBottom: '16px' }}>
              Ex Full Stack Developer & Tech Educator at <span style={{ color: '#D4956A' }}>Code Master Technology</span>. Now crafting digital experiences independently through Techno Hub.
            </p> */}
            <div style={{ padding: '14px 16px', borderRadius: '12px', background: 'rgba(196,117,138,0.06)', border: '1px solid rgba(196,117,138,0.12)' }}>
              <p style={{ fontFamily: 'Cormorant Garamond', fontSize: '16px', fontStyle: 'italic', color: accent }}>
                "Every pixel, every gift — made with intention."
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ paddingTop: '28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <p style={{ fontSize: '12px', color: textMuted }}>
         © 2026 Soulful Scribble · Designed & Developed by Vanshika Wadhwani
          </p>
          <div style={{ display: 'flex', gap: '24px' }}>
            {[['/', 'Home'], ['/gifting', 'Gifting'], ['/techno', 'Techno'], ['/admin', 'Admin']].map(([to, label]) => (
              <Link key={to} to={to} style={{ fontSize: '12px', color: textMuted, transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = accent}
                onMouseLeave={e => e.currentTarget.style.color = textMuted}>{label}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---- SVG Icons ---- */
const EmailIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);
const PhoneIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.05 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 17z"/>
  </svg>
);
const WAIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
);
const IGIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
  </svg>
);
const FBIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);
const PINIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12.017 24c6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001 12.017.001z"/>
  </svg>
);
const LIIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);


const GHIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.373 0 12c0 5.302 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.547-1.387-1.335-1.756-1.335-1.756-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.235 1.84 1.235 1.07 1.835 2.807 1.305 3.492.998.108-.775.418-1.305.762-1.605-2.665-.303-5.467-1.332-5.467-5.93 0-1.31.468-2.38 1.235-3.22-.123-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.23a11.49 11.49 0 0 1 3.003-.404c1.018.005 2.042.138 3.003.404 2.29-1.552 3.296-1.23 3.296-1.23.653 1.652.241 2.873.118 3.176.77.84 1.233 1.91 1.233 3.22 0 4.61-2.807 5.625-5.48 5.92.43.372.823 1.103.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .322.216.694.825.576C20.565 21.796 24 17.298 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
);