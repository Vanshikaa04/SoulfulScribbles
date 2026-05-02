import React, { useContext, useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../App.jsx';
import { A } from './theme.js';

export default function AdminDashboard() {
  const { admin, setAdmin } = useContext(AuthContext);
  const navigate            = useNavigate();
  const [open, setOpen]     = useState(false);

  const logout = async () => {
    await fetch('/api/auth/logout', { method:'POST', credentials:'include' });
    setAdmin(null);
    navigate('/admin/login');
  };

  const navItems = [
    { path:'/admin/products', icon:'🎁', label:'Products', sub:'Gifting Hub' },
    { path:'/admin/projects', icon:'💻', label:'Projects', sub:'Techno Hub'  },
  ];

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div style={{ padding:'22px 20px', borderBottom:`1px solid ${A.border}`, display:'flex', alignItems:'center', gap:'10px' }}>
        <div style={{ width:'40px', height:'40px', borderRadius:'50%', background:`linear-gradient(135deg,${A.burgundy},${A.rose})`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, boxShadow:`0 4px 14px rgba(107,26,42,0.25)` }}>
          <img src="/logo.png" alt="SS" style={{ width:'28px', height:'28px', objectFit:'contain' }}
            onError={e=>{ e.target.style.display='none'; e.target.nextSibling.style.display='block'; }} />
          <span style={{ display:'none', fontFamily:'Cormorant Garamond', fontSize:'22px', color:'#FFF8FA', fontStyle:'italic', fontWeight:700 }}>S</span>
        </div>
        <div>
          <p style={{ fontFamily:'Cormorant Garamond', fontSize:'17px', color:A.textMain, fontWeight:600, lineHeight:1.2 }}>Soulful Scribble</p>
          <p style={{ fontSize:'10px', color:A.rose, letterSpacing:'2px', textTransform:'uppercase', marginTop:'2px' }}>Admin Panel</p>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ padding:'18px 12px', flex:1 }}>
        <p style={{ fontSize:'10px', color:A.textLight, letterSpacing:'3px', textTransform:'uppercase', padding:'0 8px', marginBottom:'8px' }}>Manage</p>
        {navItems.map(item => (
          <NavLink key={item.path} to={item.path} onClick={()=>setOpen(false)}
            style={({ isActive }) => ({
              display:'flex', alignItems:'center', gap:'11px', padding:'10px 12px',
              borderRadius:'12px', marginBottom:'3px', textDecoration:'none',
              background: isActive ? A.blush : 'transparent',
              border: isActive ? `1px solid rgba(107,26,42,0.14)` : '1px solid transparent',
              color: isActive ? A.burgundy : A.textMuted,
              fontWeight: isActive ? 600 : 400,
              transition:'all 0.2s',
            })}>
            <span style={{ fontSize:'17px' }}>{item.icon}</span>
            <div>
              <p style={{ fontSize:'13px' }}>{item.label}</p>
              <p style={{ fontSize:'11px', opacity:0.55, marginTop:'1px' }}>{item.sub}</p>
            </div>
          </NavLink>
        ))}

        <div style={{ margin:'16px 0 10px', borderTop:`1px solid ${A.border}`, paddingTop:'16px' }}>
          <p style={{ fontSize:'10px', color:A.textLight, letterSpacing:'3px', textTransform:'uppercase', padding:'0 8px', marginBottom:'8px' }}>Quick Links</p>
          {[['/', '🌐', 'View Website'], ['/gifting', '🎁', 'Gifting Hub'], ['/techno', '⚡', 'Techno Hub']].map(([href, icon, label]) => (
            <a key={href} href={href} target="_blank" rel="noopener noreferrer"
              style={{ display:'flex', alignItems:'center', gap:'9px', padding:'9px 12px', borderRadius:'10px', color:A.textMuted, fontSize:'13px', textDecoration:'none', transition:'all 0.2s', marginBottom:'2px' }}
              onMouseEnter={e=>{ e.currentTarget.style.background=A.blush; e.currentTarget.style.color=A.burgundy; }}
              onMouseLeave={e=>{ e.currentTarget.style.background='transparent'; e.currentTarget.style.color=A.textMuted; }}>
              <span>{icon}</span> {label}
            </a>
          ))}
        </div>
      </nav>

      {/* User */}
      <div style={{ padding:'14px 12px', borderTop:`1px solid ${A.border}` }}>
        <div style={{ display:'flex', alignItems:'center', gap:'10px', padding:'11px 12px', borderRadius:'12px', background:A.blush, border:`1px solid ${A.border}`, marginBottom:'8px' }}>
          <div style={{ width:'32px', height:'32px', borderRadius:'50%', background:`linear-gradient(135deg,${A.burgundy},${A.rose})`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'14px', flexShrink:0 }}>👤</div>
          <div style={{ overflow:'hidden' }}>
            <p style={{ fontSize:'13px', fontWeight:600, color:A.textMain, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{admin?.email?.split('@')[0] || 'Admin'}</p>
            <p style={{ fontSize:'11px', color:A.rose, marginTop:'1px' }}>Administrator</p>
          </div>
        </div>
        <button onClick={logout}
          style={{ width:'100%', padding:'9px', borderRadius:'10px', background:'rgba(239,68,68,0.06)', border:'1px solid rgba(239,68,68,0.15)', color:'#991B1B', fontSize:'13px', cursor:'pointer', transition:'all 0.2s', fontFamily:'DM Sans' }}
          onMouseEnter={e=>e.currentTarget.style.background='rgba(239,68,68,0.12)'}
          onMouseLeave={e=>e.currentTarget.style.background='rgba(239,68,68,0.06)'}>
          Sign Out
        </button>
      </div>
    </>
  );

  return (
    <div style={{ display:'flex', minHeight:'100vh', background:A.pageBg }}>

      {/* Desktop Sidebar */}
      <aside style={{ width:'240px', background:A.sidebarBg, borderRight:`1px solid ${A.border}`, display:'flex', flexDirection:'column', position:'fixed', height:'100vh', zIndex:100, boxShadow:'2px 0 20px rgba(107,26,42,0.06)' }} className="sidebar-desk">
        <SidebarContent />
      </aside>

      {/* Mobile overlay */}
      {open && <div onClick={()=>setOpen(false)} style={{ position:'fixed', inset:0, background:'rgba(42,10,18,0.35)', zIndex:198, backdropFilter:'blur(4px)' }} />}

      {/* Mobile drawer */}
      <aside style={{ position:'fixed', top:0, left:0, bottom:0, width:'240px', zIndex:199, background:A.sidebarBg, borderRight:`1px solid ${A.border}`, display:'flex', flexDirection:'column', transform:open?'translateX(0)':'translateX(-100%)', transition:'transform 0.3s cubic-bezier(0.4,0,0.2,1)', boxShadow:'4px 0 28px rgba(107,26,42,0.12)' }} className="sidebar-mobile">
        <SidebarContent />
      </aside>

      {/* Main */}
      <main style={{ flex:1, marginLeft:'240px', minHeight:'100vh', background:A.pageBg }} className="admin-main">
        {/* Mobile top bar */}
        <div style={{ display:'none', alignItems:'center', gap:'12px', padding:'14px 18px', background:A.sidebarBg, borderBottom:`1px solid ${A.border}`, position:'sticky', top:0, zIndex:50, boxShadow:'0 2px 12px rgba(107,26,42,0.06)' }} className="admin-topbar">
          <button onClick={()=>setOpen(true)}
            style={{ width:'36px', height:'36px', borderRadius:'9px', background:A.blush, border:`1px solid ${A.border}`, color:A.burgundy, fontSize:'17px', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
            ☰
          </button>
          <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
            <img src="/logo.png" alt="" style={{ width:'26px', height:'26px', objectFit:'contain' }} onError={e=>e.target.style.display='none'} />
            <p style={{ fontFamily:'Cormorant Garamond', fontSize:'17px', color:A.textMain, fontWeight:600 }}>Soulful Scribble</p>
          </div>
        </div>
        <div style={{ padding:'clamp(18px,3vw,32px)' }}>
          <Outlet />
        </div>
      </main>

      <style>{`
        @media (max-width: 768px) {
          .sidebar-desk  { display: none !important; }
          .admin-main    { margin-left: 0 !important; }
          .admin-topbar  { display: flex !important; }
        }
      `}</style>
    </div>
  );
}