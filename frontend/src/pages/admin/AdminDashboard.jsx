import React, { useContext, useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../App.jsx';
import { A } from './theme.js';

export default function AdminDashboard() {
  const { admin, setAdmin } = useContext(AuthContext);
  const navigate            = useNavigate();
  const [open, setOpen]     = useState(false);
  // const [lastRefresh, setLastRefresh] = useState(new Date());
 const backendurl = import.meta.env.VITE_backendurl ;


  // Auto-refresh every 60 seconds — bumps lastRefresh so child pages can react
  // useEffect(() => {
  //   const id = setInterval(() => setLastRefresh(new Date()), 60_000);
  //   return () => clearInterval(id);
  // }, []);

  const logout = async () => {
    await fetch(`${backendurl}/api/auth/logout`, { method: 'POST', credentials: 'include' });
    setAdmin(null);
    navigate('/admin/login');
  };

  const navItems = [
    { path: '/admin/products', icon: '🎁', label: 'Products', sub: 'Gifting Hub' },
    { path: '/admin/projects', icon: '💻', label: 'Projects', sub: 'Techno Hub'  },
  ];

  // Quick links open IN THE SAME TAB via React Router Link
  const quickLinks = [
    ['/', '🌐', 'View Website'],
    ['/gifting', '🎁', 'Gifting Hub'],
    ['/techno', '⚡', 'Techno Hub'],
  ];

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div style={{ padding: '20px 18px', borderBottom: `1px solid ${A.border}`, display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{ width: '38px', height: '38px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: `0 3px 12px rgba(92,19,34,0.22)` }}>
          <img src="/logo.png" alt="SS" style={{ width: '28px', height: '28px', objectFit: 'contain' }}
            onError={e => { e.target.style.display='none'; e.target.nextSibling.style.display='block'; }} />
          <span style={{ display:'none', fontFamily:'Cormorant Garamond', fontSize:'20px', color:'#FFF', fontStyle:'italic', fontWeight:700 }}>S</span>
        </div>
        <div>
          <p style={{ fontFamily: 'Cormorant Garamond', fontSize: '17px', color: A.textMain, fontWeight: 700, lineHeight: 1.2 }}>Soulful Scribble</p>
          <p style={{ fontSize: '10px', color: A.rose, letterSpacing: '2px', textTransform: 'uppercase', marginTop: '2px' }}>Admin Panel</p>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ padding: '16px 12px', flex: 1 }}>
        <p style={{ fontSize: '10px', color: A.textLight, letterSpacing: '3px', textTransform: 'uppercase', padding: '0 6px', marginBottom: '8px' }}>Manage</p>
        {navItems.map(item => (
          <NavLink key={item.path} to={item.path} onClick={() => setOpen(false)}
            style={({ isActive }) => ({
              display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px',
              borderRadius: '11px', marginBottom: '3px', textDecoration: 'none',
              background: isActive ? A.blush : 'transparent',
              border: isActive ? `1.5px solid ${A.borderStrong}` : '1.5px solid transparent',
              color: isActive ? A.burgundy : A.textMuted,
              fontWeight: isActive ? 700 : 400,
              transition: 'all 0.18s',
            })}>
            <span style={{ fontSize: '16px' }}>{item.icon}</span>
            <div>
              <p style={{ fontSize: '13px', lineHeight: 1.2 }}>{item.label}</p>
              <p style={{ fontSize: '10px', opacity: 0.55, marginTop: '1px' }}>{item.sub}</p>
            </div>
          </NavLink>
        ))}

        {/* Quick Links — same tab via React Router Link */}
        <div style={{ margin: '14px 0 8px', borderTop: `1px solid ${A.border}`, paddingTop: '14px' }}>
          <p style={{ fontSize: '10px', color: A.textLight, letterSpacing: '3px', textTransform: 'uppercase', padding: '0 6px', marginBottom: '8px' }}>Quick Links</p>
          {quickLinks.map(([to, icon, label]) => (
            <Link key={to} to={to} onClick={() => setOpen(false)}
              style={{ display: 'flex', alignItems: 'center', gap: '9px', padding: '9px 12px', borderRadius: '10px', color: A.textMuted, fontSize: '13px', textDecoration: 'none', transition: 'all 0.18s', marginBottom: '2px', fontWeight: 400 }}
              onMouseEnter={e => { e.currentTarget.style.background = A.hoverBg; e.currentTarget.style.color = A.burgundy; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = A.textMuted; }}>
              <span>{icon}</span> {label}
            </Link>
          ))}
        </div>

        {/* Auto-refresh indicator */}
        {/* <div style={{ padding: '8px 12px', borderRadius: '10px', background: A.petal, border: `1px solid ${A.border}`, marginTop: '8px' }}>
          <p style={{ fontSize: '10px', color: A.textLight, letterSpacing: '1px' }}>
            🔄 Auto-refresh every 60s
          </p>
          <p style={{ fontSize: '10px', color: A.textMuted, marginTop: '2px' }}>
            Last: {lastRefresh.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div> */}
      </nav>

      {/* User */}
      <div style={{ padding: '12px', borderTop: `1px solid ${A.border}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '11px', background: A.petal, border: `1px solid ${A.border}`, marginBottom: '8px' }}>
          <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: `linear-gradient(135deg,${A.burgundy},${A.rose})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', flexShrink: 0 }}>👤</div>
          <div style={{ overflow: 'hidden' }}>
            <p style={{ fontSize: '13px', fontWeight: 700, color: A.textMain, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{admin?.email?.split('@')[0] || 'Admin'}</p>
            <p style={{ fontSize: '10px', color: A.rose, marginTop: '1px' }}>Vanshika Wadhwani</p>
          </div>
        </div>
        <button onClick={logout}
          style={{ width: '100%', padding: '9px', borderRadius: '10px', background: '#FEF2F2', border: '1.5px solid #FCA5A5', color: '#991B1B', fontSize: '13px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.18s', fontFamily: 'DM Sans' }}
          onMouseEnter={e => e.currentTarget.style.background = '#FEE2E2'}
          onMouseLeave={e => e.currentTarget.style.background = '#FEF2F2'}>
          Sign Out
        </button>
      </div>
    </>
  );

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: A.pageBg }}>
      {/* Desktop sidebar */}
      <aside style={{ width: '232px', background: A.sidebarBg, borderRight: `1px solid ${A.border}`, display: 'flex', flexDirection: 'column', position: 'fixed', height: '100vh', zIndex: 100, boxShadow: '2px 0 16px rgba(92,19,34,0.05)' }} className="sidebar-desk">
        <SidebarContent />
      </aside>

      {/* Mobile overlay */}
      {open && (
        <div onClick={() => setOpen(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(42,10,18,0.3)', zIndex: 198, backdropFilter: 'blur(3px)' }} />
      )}

      {/* Mobile drawer */}
      <aside style={{ position: 'fixed', top: 0, left: 0, bottom: 0, width: '232px', zIndex: 199, background: A.sidebarBg, borderRight: `1px solid ${A.border}`, display: 'flex', flexDirection: 'column', transform: open ? 'translateX(0)' : 'translateX(-100%)', transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1)', boxShadow: '4px 0 24px rgba(92,19,34,0.1)' }} className="sidebar-mobile">
        <SidebarContent />
      </aside>

      {/* Main */}
      <main style={{ flex: 1, marginLeft: '232px', minHeight: '100vh', background: A.pageBg }} className="admin-main">
        {/* Mobile top bar */}
        <div style={{ display: 'none', alignItems: 'center', gap: '12px', padding: '12px 16px', background: A.sidebarBg, borderBottom: `1px solid ${A.border}`, position: 'sticky', top: 0, zIndex: 50, boxShadow: '0 2px 8px rgba(92,19,34,0.05)' }} className="admin-topbar">
          <button onClick={() => setOpen(true)}
            style={{ width: '34px', height: '34px', borderRadius: '9px', background: A.blush, border: `1.5px solid ${A.border}`, color: A.burgundy, fontSize: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            ☰
          </button>
          <p style={{ fontFamily: 'Cormorant Garamond', fontSize: '17px', color: A.textMain, fontWeight: 700 }}>Soulful Scribble Admin</p>
        </div>

        {/* Pass lastRefresh as key so children re-mount on refresh */}
        {/* <div style={{ padding: 'clamp(16px,2.5vw,28px)' }} key={Math.floor(lastRefresh / 60000)}>
          <Outlet context={{ lastRefresh }} />
        </div> */}
      </main>

      <style>{`
        @media (max-width: 768px) {
          .sidebar-desk { display: none !important; }
          .admin-main   { margin-left: 0 !important; }
          .admin-topbar { display: flex !important; }
        }
      `}</style>
    </div>
  );
}