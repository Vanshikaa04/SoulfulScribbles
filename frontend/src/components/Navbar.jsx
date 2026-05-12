import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
      const WAIcon = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
    </svg>
  );
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isGifting = location.pathname === '/gifting';
  const isTechno = location.pathname === '/techno';
  const menuRef = useRef(null);

  useEffect(() => { setMenuOpen(false); }, [location.pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    const handler = (e) => { if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const navBg = isTechno
    ? (scrolled ? 'rgba(18,6,8,0.97)' : 'transparent')
    : (scrolled ? 'rgba(255,248,250,0.97)' : 'transparent');
  const logoText = isTechno ?  (scrolled ?'#FAF0F2' : '#2A0A12') : '#2A0A12';
  const logoSub  = isTechno ? (scrolled ? 'rgba(250,240,242,0.4)' : 'rgba(42,10,18,0.4)') : 'rgba(41, 41, 41, 0.4)';
  const burgerColor = isTechno ? '#C4758A' : '#6B1A2A';
  // const bgcolor = isTechno ? '#1A0A0E' : '#FFF8FA';

  return (
    <>
      <nav ref={menuRef} style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, height: '72px',
        background: navBg, backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? `1px solid ${isTechno ? 'rgba(196,117,138,0.18)' : 'rgba(107,26,42,0.1)'}` : '1px solid transparent',
        boxShadow: scrolled ? '0 4px 28px rgba(0,0,0,0.07)' : 'none',
        transition: 'all 0.35s ease',
      }}>
        <div className="container" style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
            <img
              src="/logo.png"
              alt="Soulful Scribble"
              style={{ width: '38px', height: '38px', objectFit: 'contain', filter: isTechno ? 'brightness(1.1)' : 'none', backgroundColor:"white", borderRadius:"50%", padding:"4px" }}
              onError={e => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'linear-gradient(135deg,#6B1A2A,#C4758A)', alignItems: 'center', justifyContent: 'center', display: 'none', boxShadow: '0 2px 12px rgba(107,26,42,0.3)', flexShrink: 0 }}>
              <span style={{ fontFamily: 'Cormorant Garamond', fontSize: '19px', color: '#FFF8FA', fontStyle: 'italic', fontWeight: 700 }}>S</span>
            </div>
            <div style={{ lineHeight: 1 }}>
              <p style={{ fontFamily: 'Cormorant Garamond', fontSize: '19px', fontWeight: 600, color: logoText }}>Soulful Scribble</p>
              <p style={{ fontSize: '9px', color: logoSub, letterSpacing: '2.5px', textTransform: 'uppercase', marginTop: '2px' }}>
                {isGifting ? 'Gifting Hub' : isTechno ? 'Techno Hub' : 'Two worlds · One soul'}
              </p>
            </div>
          </Link>

          {/* Desktop links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }} className="desktop-nav">
            <DLink to="/" label="Home" active={location.pathname === '/'} dark={isTechno} />
            <div style={{
              display: 'flex', borderRadius: '50px', padding: '4px', gap: '2px', margin: '0 6px',
              background: isTechno ?(scrolled? 'rgba(255,255,255,0.05)' : 'rgba(17, 0, 4, 0.05)'):(scrolled? 'rgba(0, 0, 0, 0.6)' : 'rgba(0, 0, 0, 0.3)'),
              border: isTechno ? '1px solid rgba(196,117,138,0.18)' : '1px solid rgba(107,26,42,0.12)',
            }}>
              <Link to="/gifting" style={{
                padding: '7px 16px', borderRadius: '40px', fontSize: '13px', fontWeight: 500, transition: 'all 0.25s', whiteSpace: 'nowrap',
                background: isGifting ? '#6B1A2A' : 'transparent',
                color: isGifting ? '#fff' : (isTechno ? 'rgba(250,240,242,0.5)' : 'rgba(42,10,18,0.6)'),
              }}>🎁 Gifting</Link>
              <Link to="/techno" style={{
                padding: '7px 16px', borderRadius: '40px', fontSize: '13px', fontWeight: 500, transition: 'all 0.25s', whiteSpace: 'nowrap',
                background: isTechno ? 'linear-gradient(135deg,#6B1A2A,#C4758A)' : 'transparent',
                color: isTechno ? '#fff' : 'rgba(42,10,18,0.6)',
              }}>⚡ Techno</Link>
            </div>
            <DLink to="/admin" label="Admin" active={location.pathname.startsWith('/admin')} dark={isTechno} />
          </div>

          {/* Hamburger */}
          <button onClick={() => setMenuOpen(o => !o)} aria-label="Toggle menu" className="hamburger-btn"
            style={{ width: '42px', height: '42px', borderRadius: '10px', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '5px', display: 'none', background: isTechno ? 'rgba(196,117,138,0.1)' : 'rgba(107,26,42,0.07)', border: `1px solid ${isTechno ? 'rgba(196,117,138,0.2)' : 'rgba(107,26,42,0.13)'}`, transition: 'all 0.2s', flexShrink: 0 }}>
            <span style={{ width: '18px', height: '2px', background: burgerColor, borderRadius: '2px', transition: 'all 0.3s', transform: menuOpen ? 'rotate(45deg) translateY(7px)' : 'rotate(0)', display: 'block' }} />
            <span style={{ width: '18px', height: '2px', background: burgerColor, borderRadius: '2px', transition: 'all 0.3s', opacity: menuOpen ? 0 : 1, display: 'block' }} />
            <span style={{ width: '18px', height: '2px', background: burgerColor, borderRadius: '2px', transition: 'all 0.3s', transform: menuOpen ? 'rotate(-45deg) translateY(-7px)' : 'rotate(0)', display: 'block' }} />
          </button>
        </div>
      </nav>

      {/* Overlay */}
      <div onClick={() => setMenuOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 998, backdropFilter: 'blur(4px)', opacity: menuOpen ? 1 : 0, pointerEvents: menuOpen ? 'all' : 'none', transition: 'opacity 0.3s' }} />

      {/* Mobile Drawer */}
      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0, width: '285px', zIndex: 999,
        background: isTechno ? '#1A0A0E' : '#FFF8FA',
        transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)',
        boxShadow: '-12px 0 48px rgba(0,0,0,0.2)', display: 'flex', flexDirection: 'column', paddingTop: '80px',
        borderLeft: `1px solid ${isTechno ? 'rgba(196,117,138,0.12)' : 'rgba(107,26,42,0.09)'}`, overflowY: 'auto',
      }} className="mobile-drawer">
        <div style={{ padding: '0 20px 24px', flex: 1 }}>
          <Label text="Navigate" dark={isTechno} />
          <MLink to="/" label="🏠 Home" dark={isTechno} active={location.pathname === '/'} />
          <Divider dark={isTechno} />
          <Label text="Our Hubs" dark={isTechno} />
          <MLink to="/gifting" label="🎁 Gifting Hub" dark={isTechno} active={isGifting} accent="#C4758A" />
          <MLink to="/techno" label="⚡ Techno Hub" dark={isTechno} active={isTechno} accent="#D4956A" />
          <Divider dark={isTechno} />
          <Label text="More" dark={isTechno} />
          <MLink to="/admin" label="⚙️ Admin Panel" dark={isTechno} active={location.pathname.startsWith('/admin')} />
        </div>
        <div style={{ padding: '20px', borderTop: `1px solid ${isTechno ? 'rgba(196,117,138,0.1)' : 'rgba(107,26,42,0.08)'}` }}>
          <p style={{ fontSize: '11px', color: isTechno ? 'rgba(250,240,242,0.3)' : 'rgba(42,10,18,0.35)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '12px' }}>Quick Contact</p>
          <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer"
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 16px', borderRadius: '12px', background: 'rgba(37,211,102,0.1)', border: '1px solid rgba(37,211,102,0.2)', color: '#4ADE80', fontSize: '14px', fontWeight: 500 }}>
                               <WAIcon />
 Chat on WhatsApp
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}

function DLink({ to, label, active, dark }) {
  const c = dark ? (active ? '#F7E8EC' : 'rgba(250,240,242,0.5)') : (active ? '#6B1A2A' : 'rgba(42,10,18,0.58)');
  return (
    <Link to={to} style={{ padding: '8px 14px', fontSize: '13px', fontWeight: 500, color: c, borderRadius: '8px', transition: 'all 0.2s', background: active ? (dark ? 'rgba(196,117,138,0.1)' : 'rgba(107,26,42,0.06)') : 'transparent' }}
      onMouseEnter={e => { e.currentTarget.style.color = dark ? '#F7E8EC' : '#6B1A2A'; e.currentTarget.style.background = dark ? 'rgba(196,117,138,0.1)' : 'rgba(107,26,42,0.06)'; }}
      onMouseLeave={e => { e.currentTarget.style.color = c; e.currentTarget.style.background = active ? (dark ? 'rgba(196,117,138,0.1)' : 'rgba(107,26,42,0.06)') : 'transparent'; }}
    >{label}</Link>
  );
}
function MLink({ to, label, dark, active, accent }) {
  const color = dark ? (active ? (accent || '#C4758A') : 'rgba(250,240,242,0.65)') : (active ? (accent || '#6B1A2A') : 'rgba(42,10,18,0.65)');
  return (
    <Link to={to} style={{ display: 'block', padding: '13px 14px', borderRadius: '12px', fontSize: '15px', fontWeight: active ? 600 : 400, color, transition: 'all 0.2s', background: active ? (dark ? 'rgba(196,117,138,0.09)' : 'rgba(107,26,42,0.05)') : 'transparent', border: `1px solid ${active ? (dark ? 'rgba(196,117,138,0.2)' : 'rgba(107,26,42,0.12)') : 'transparent'}`, marginBottom: '2px' }}>
      {label}
    </Link>
  );
}
function Label({ text, dark }) {
  return <p style={{ fontSize: '10px', color: dark ? 'rgba(250,240,242,0.28)' : 'rgba(42,10,18,0.32)', letterSpacing: '3px', textTransform: 'uppercase', margin: '12px 0 8px 14px' }}>{text}</p>;
}
function Divider({ dark }) {
  return <div style={{ height: '1px', background: dark ? 'rgba(196,117,138,0.08)' : 'rgba(107,26,42,0.07)', margin: '10px 0' }} />;
}