import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const WA = '917202052004';

/* ── palette shorthand ── */
const PINK_BG   = 'rgba(255,248,250,0.97)';
const PINK_BD   = 'rgba(107,26,42,0.1)';
const BURG      = '#6B1A2A';
const ROSE      = '#C4758A';

const WAIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
);

export default function Navbar() {
  const [scrolled, setScrolled]         = useState(false);
  const [menuOpen, setMenuOpen]         = useState(false);
  const [hubDropdown, setHubDropdown]   = useState(false);
  const location  = useLocation();
  const navigate  = useNavigate();
  const navRef    = useRef(null);
  const dropRef   = useRef(null);

  /* ── route helpers ── */
  const path      = location.pathname;
  const isHome    = path === '/';
  const isGifting = path.startsWith('/gifting') || path.startsWith('/products');
  const isTechno  = path.startsWith('/techno')  || path.startsWith('/projects');
  const isAdmin   = path.startsWith('/admin');

  /* which hub is "active" for styling */
  const inGiftingHub = isGifting;
  const inTechnoHub  = isTechno;

  /* ── scroll listener ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── close on route change ── */
  useEffect(() => { setMenuOpen(false); setHubDropdown(false); }, [path]);

  /* ── close drawer/dropdown on outside click ── */
  useEffect(() => {
    const h = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setMenuOpen(false);
        setHubDropdown(false);
      }
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  /* ── lock body scroll when drawer open ── */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  /* ── nav colours — always light (Techno is now light-theme) ── */
  const navBg     = scrolled ? PINK_BG : 'transparent';
  const logoColor = BURG;
  const logoSub   = 'rgba(42,10,18,0.4)';

  /* ── context-aware nav items ── */
  const giftingNav = [
    { to: '/',           label: 'Home'             },
    { to: '/gifting',    label: 'Gifting Hub'      },
    { to: '/products',   label: 'Products'         },
    { to: '/admin',      label: 'Admin'            },
  ];
  const technoNav = [
    { to: '/',           label: 'Home'             },
    { to: '/techno',     label: 'Techno Hub'       },
    { to: '/projects',   label: 'Projects'         },
    { to: '/admin',      label: 'Admin'            },
  ];
  const defaultNav = [
    { to: '/',           label: 'Home'             },
    { to: '/admin',      label: 'Admin'            },
  ];

  const navItems = inGiftingHub ? giftingNav : inTechnoHub ? technoNav : defaultNav;

  /* currently active hub label for the switcher button */
  const currentHub = inGiftingHub ? '🎁 Gifting Hub' : inTechnoHub ? '⚡ Techno Hub' : '🌐 Hubs';

  return (
    <>
      <nav ref={navRef} style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, height: '72px',
        background: navBg,
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? `1px solid ${PINK_BD}` : '1px solid transparent',
        boxShadow: scrolled ? '0 4px 28px rgba(0,0,0,0.07)' : 'none',
        transition: 'all 0.35s ease',
      }}>
        <div className="container" style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>

          {/* ── Logo ── */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0, textDecoration: 'none' }}>
            <img src="/logo.png" alt="SS"
              style={{ width: '38px', height: '38px', objectFit: 'contain', backgroundColor: '#fff', borderRadius: '50%', padding: '4px', boxShadow: '0 2px 10px rgba(107,26,42,0.15)' }}
              onError={e => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }}
            />
            <div style={{ width:'38px', height:'38px', borderRadius:'50%', background:`linear-gradient(135deg,${BURG},${ROSE})`, alignItems:'center', justifyContent:'center', display:'none', flexShrink:0 }}>
              <span style={{ fontFamily:'Cormorant Garamond', fontSize:'19px', color:'#FFF8FA', fontStyle:'italic', fontWeight:700 }}>S</span>
            </div>
            <div style={{ lineHeight: 1 }}>
              <p style={{ fontFamily: 'Cormorant Garamond', fontSize: '19px', fontWeight: 600, color: logoColor, lineHeight: 1.1 }}>Soulful Scribble</p>
              <p style={{ fontSize: '9px', color: logoSub, letterSpacing: '2.5px', textTransform: 'uppercase', marginTop: '2px' }}>
                {inGiftingHub ? 'Gifting Hub' : inTechnoHub ? 'Techno Hub' : 'Two worlds · One soul'}
              </p>
            </div>
          </Link>

          {/* ── Desktop Navigation ── */}
          <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>

            {/* Context-aware page links */}
            {navItems.map(item => (
              <DLink key={item.to} to={item.to} label={item.label} active={path === item.to} />
            ))}

            {/* ── Hub Switcher Dropdown ── */}
            <div style={{ position: 'relative', marginLeft: '6px' }} ref={dropRef}>
              <button
                onClick={() => setHubDropdown(o => !o)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '7px',
                  padding: '8px 16px', borderRadius: '40px', cursor: 'pointer',
                  fontFamily: 'DM Sans', fontSize: '13px', fontWeight: 600,
                  background: (inGiftingHub || inTechnoHub)
                    ? `linear-gradient(135deg,${BURG},${ROSE})`
                    : 'rgba(107,26,42,0.07)',
                  color: (inGiftingHub || inTechnoHub) ? '#fff' : BURG,
                  border: (inGiftingHub || inTechnoHub) ? 'none' : `1px solid rgba(107,26,42,0.14)`,
                  transition: 'all 0.25s',
                  boxShadow: (inGiftingHub || inTechnoHub) ? '0 4px 14px rgba(107,26,42,0.25)' : 'none',
                }}
              >
                {currentHub}
                {/* Chevron */}
                <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor"
                  style={{ transition: 'transform 0.25s', transform: hubDropdown ? 'rotate(180deg)' : 'rotate(0)' }}>
                  <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              {/* ── Dropdown (opens UPWARD on scroll, stays below otherwise) ── */}
              {hubDropdown && (
                <div style={{
                  position: 'absolute',
                  /* upward: bottom of button + 8px gap */
                  bottom: scrolled ? 'calc(100% + 8px)' : 'auto',
                  top:    scrolled ? 'auto' : 'calc(100% + 8px)',
                  right: 0,
                  minWidth: '220px',
                  background: '#FFFFFF',
                  border: `1.5px solid rgba(107,26,42,0.12)`,
                  borderRadius: '16px',
                  boxShadow: '0 16px 48px rgba(107,26,42,0.16)',
                  overflow: 'hidden',
                  zIndex: 200,
                  animation: 'fadeDropdown 0.2s ease',
                }}>
                  <div style={{ padding: '8px' }}>
                    {/* Gifting Hub group */}
                    <DropSection label="🎁 Gifting Hub" active={inGiftingHub} color={BURG}>
                      <DropItem to="/gifting"  label="About Gifting Hub" icon="🌸" active={path==='/gifting'} />
                      <DropItem to="/products" label="All Products"      icon="🛍️" active={path==='/products'} />
                    </DropSection>

                    <div style={{ height: '1px', background: 'rgba(107,26,42,0.08)', margin: '4px 8px' }} />

                    {/* Techno Hub group */}
                    <DropSection label="⚡ Techno Hub" active={inTechnoHub} color={BURG}>
                      <DropItem to="/techno"   label="About Techno Hub" icon="💻" active={path==='/techno'} />
                      <DropItem to="/projects" label="All Projects"     icon="🗂️" active={path==='/projects'} />
                    </DropSection>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ── Hamburger (mobile) ── */}
          <button
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
            className="hamburger-btn"
            style={{ width:'42px', height:'42px', borderRadius:'10px', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'5px', display:'none', background:'rgba(107,26,42,0.07)', border:`1px solid rgba(107,26,42,0.13)`, transition:'all 0.2s', flexShrink:0 }}>
            <span style={{ width:'18px', height:'2px', background:BURG, borderRadius:'2px', transition:'all 0.3s', transform:menuOpen?'rotate(45deg) translateY(7px)':'rotate(0)', display:'block' }} />
            <span style={{ width:'18px', height:'2px', background:BURG, borderRadius:'2px', transition:'all 0.3s', opacity:menuOpen?0:1, display:'block' }} />
            <span style={{ width:'18px', height:'2px', background:BURG, borderRadius:'2px', transition:'all 0.3s', transform:menuOpen?'rotate(-45deg) translateY(-7px)':'rotate(0)', display:'block' }} />
          </button>
        </div>
      </nav>

      {/* ── Mobile Overlay ── */}
      <div
        onClick={() => setMenuOpen(false)}
        style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.35)', zIndex:998, backdropFilter:'blur(4px)', opacity:menuOpen?1:0, pointerEvents:menuOpen?'all':'none', transition:'opacity 0.3s' }}
      />

      {/* ── Mobile Drawer ── */}
      <div style={{
        position:'fixed', top:0, right:0, bottom:0, width:'290px', zIndex:999,
        background:'#FFF8FA',
        transform:menuOpen?'translateX(0)':'translateX(100%)',
        transition:'transform 0.35s cubic-bezier(0.4,0,0.2,1)',
        boxShadow:'-12px 0 48px rgba(0,0,0,0.15)',
        display:'flex', flexDirection:'column', paddingTop:'80px',
        borderLeft:`1px solid rgba(107,26,42,0.09)`, overflowY:'auto',
      }}>
        <div style={{ padding:'0 20px 24px', flex:1 }}>
          {/* Current Hub label */}
          {(inGiftingHub || inTechnoHub) && (
            <div style={{ padding:'8px 12px', borderRadius:'10px', background:'rgba(107,26,42,0.06)', border:`1px solid rgba(107,26,42,0.1)`, marginBottom:'16px' }}>
              <p style={{ fontSize:'11px', color:BURG, fontWeight:700, letterSpacing:'1px' }}>
                Currently in: {inGiftingHub ? '🎁 Gifting Hub' : '⚡ Techno Hub'}
              </p>
            </div>
          )}

          <MLabel text="Navigate" />
          <MLink to="/" label="🏠 Home" active={isHome} />
          <MDivider />

          <MLabel text="🎁 Gifting Hub" />
          <MLink to="/gifting"  label="About Gifting Hub" active={path==='/gifting'}  />
          <MLink to="/products" label="All Products"      active={path==='/products'} />
          <MDivider />

          <MLabel text="⚡ Techno Hub" />
          <MLink to="/techno"   label="About Techno Hub"  active={path==='/techno'}   />
          <MLink to="/projects" label="All Projects"      active={path==='/projects'} />
          <MDivider />

          <MLabel text="More" />
          <MLink to="/admin"    label="⚙️ Admin Panel"    active={isAdmin}           />
        </div>

        {/* WhatsApp */}
        <div style={{ padding:'18px 20px', borderTop:`1px solid rgba(107,26,42,0.08)` }}>
          <p style={{ fontSize:'11px', color:'rgba(42,10,18,0.35)', letterSpacing:'2px', textTransform:'uppercase', marginBottom:'10px' }}>Quick Contact</p>
          <a href={`https://wa.me/${WA}`} target="_blank" rel="noopener noreferrer"
            style={{ display:'flex', alignItems:'center', gap:'8px', padding:'12px 16px', borderRadius:'12px', background:'rgba(37,211,102,0.1)', border:'1px solid rgba(37,211,102,0.2)', color:'#166534', fontSize:'14px', fontWeight:600, textDecoration:'none' }}>
            <WAIcon /> Chat on WhatsApp
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav   { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
        @keyframes fadeDropdown {
          from { opacity:0; transform: translateY(-6px); }
          to   { opacity:1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}

/* ─── Desktop nav link ─── */
function DLink({ to, label, active }) {
  const [hov, setHov] = useState(false);
  const c = active ? BURG : hov ? BURG : 'rgba(42,10,18,0.58)';
  return (
    <Link to={to} style={{ padding:'8px 13px', fontSize:'13px', fontWeight: active ? 700 : 500, color:c, borderRadius:'8px', transition:'all 0.2s', background: active ? 'rgba(107,26,42,0.07)' : hov ? 'rgba(107,26,42,0.05)' : 'transparent', textDecoration:'none' }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      {label}
    </Link>
  );
}

/* ─── Dropdown section header ─── */
function DropSection({ label, active, color, children }) {
  return (
    <div>
      <p style={{ fontSize:'10px', letterSpacing:'2px', textTransform:'uppercase', color: active ? color : 'rgba(42,10,18,0.35)', padding:'8px 10px 4px', fontWeight:700 }}>{label}</p>
      {children}
    </div>
  );
}

/* ─── Dropdown item ─── */
function DropItem({ to, label, icon, active }) {
  const [hov, setHov] = useState(false);
  return (
    <Link to={to} style={{ display:'flex', alignItems:'center', gap:'10px', padding:'9px 12px', borderRadius:'10px', background: active ? 'rgba(107,26,42,0.07)' : hov ? 'rgba(107,26,42,0.04)' : 'transparent', color: active ? BURG : 'rgba(42,10,18,0.65)', fontSize:'13px', fontWeight: active ? 700 : 400, textDecoration:'none', transition:'all 0.18s' }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <span style={{ fontSize:'16px' }}>{icon}</span>
      <span>{label}</span>
      {active && <span style={{ marginLeft:'auto', fontSize:'16px', color:ROSE }}>←</span>}
    </Link>
  );
}

/* ─── Mobile helpers ─── */
function MLink({ to, label, active }) {
  return (
    <Link to={to} style={{ display:'block', padding:'12px 14px', borderRadius:'12px', fontSize:'14px', fontWeight: active ? 700 : 400, color: active ? BURG : 'rgba(42,10,18,0.65)', transition:'all 0.18s', background: active ? 'rgba(107,26,42,0.07)' : 'transparent', border:`1px solid ${active ? 'rgba(107,26,42,0.14)' : 'transparent'}`, marginBottom:'3px', textDecoration:'none' }}>
      {label}
    </Link>
  );
}
function MLabel({ text }) {
  return <p style={{ fontSize:'10px', color:'rgba(42,10,18,0.32)', letterSpacing:'3px', textTransform:'uppercase', margin:'12px 0 8px 14px' }}>{text}</p>;
}
function MDivider() {
  return <div style={{ height:'1px', background:'rgba(107,26,42,0.07)', margin:'8px 0' }} />;
}