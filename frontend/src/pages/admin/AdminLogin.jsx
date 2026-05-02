import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../App.jsx';
import { A } from './theme.js';

export default function AdminLogin() {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');
  const [showPw, setShowPw]     = useState(false);
  const { setAdmin }            = useContext(AuthContext);
  const navigate                = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const res  = await fetch('/api/auth/login', { method:'POST', credentials:'include', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ email, password }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');
      const me   = await fetch('/api/auth/me', { credentials:'include' });
      setAdmin(await me.json());
      navigate('/admin');
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };

  const fieldStyle = { display:'flex', flexDirection:'column', gap:'6px', marginBottom:'18px' };
  const labelStyle = { fontSize:'11px', color:A.textMuted, letterSpacing:'2px', textTransform:'uppercase' };
  const inputStyle = { width:'100%', padding:'12px 14px', borderRadius:'10px', background:A.inputBg, border:`1px solid ${A.border}`, color:A.textMain, fontSize:'14px', outline:'none', fontFamily:'DM Sans', boxSizing:'border-box', transition:'border-color 0.22s, box-shadow 0.22s' };

  return (
    <div style={{ minHeight:'100vh', background:'linear-gradient(145deg,#FFF8FA 0%,#F7E8EC 40%,#FFF0F4 100%)', display:'flex', alignItems:'center', justifyContent:'center', padding:'20px', position:'relative', overflow:'hidden' }}>
      {/* Decorative blobs */}
      <div style={{ position:'absolute', top:'-120px', right:'-120px', width:'480px', height:'480px', borderRadius:'50%', background:'radial-gradient(circle,rgba(196,117,138,0.14) 0%,transparent 70%)', pointerEvents:'none' }} />
      <div style={{ position:'absolute', bottom:'-80px', left:'-80px', width:'360px', height:'360px', borderRadius:'50%', background:'radial-gradient(circle,rgba(107,26,42,0.07) 0%,transparent 70%)', pointerEvents:'none' }} />
      <span style={{ position:'absolute', top:'8%', left:'4%', fontFamily:'Cormorant Garamond', fontSize:'140px', color:'rgba(107,26,42,0.04)', fontStyle:'italic', userSelect:'none', pointerEvents:'none', lineHeight:1 }}>S</span>

      <div style={{ position:'relative', zIndex:1, width:'100%', maxWidth:'420px' }}>
        <div style={{ background:'rgba(255,255,255,0.88)', border:`1px solid ${A.border}`, borderRadius:'28px', padding:'clamp(28px,5vw,48px) clamp(22px,4vw,40px)', backdropFilter:'blur(20px)', boxShadow:'0 24px 80px rgba(107,26,42,0.12)' }}>

          {/* Logo */}
          <div style={{ textAlign:'center', marginBottom:'36px' }}>
            <div style={{ display:'flex', justifyContent:'center', marginBottom:'14px' }}>
              <div style={{ width:'64px', height:'64px', borderRadius:'50%', background:`linear-gradient(135deg,${A.burgundy},${A.rose})`, display:'flex', alignItems:'center', justifyContent:'center', boxShadow:`0 8px 24px rgba(107,26,42,0.3)` }}>
                <img src="/logo.png" alt="SS" style={{ width:'46px', height:'46px', objectFit:'contain' }}
                  onError={e => { e.target.style.display='none'; e.target.nextSibling.style.display='block'; }} />
                <span style={{ display:'none', fontFamily:'Cormorant Garamond', fontSize:'30px', color:'#FFF8FA', fontStyle:'italic', fontWeight:700 }}>S</span>
              </div>
            </div>
            <h1 style={{ fontFamily:'Cormorant Garamond', fontSize:'26px', color:A.textMain, fontWeight:500, marginBottom:'4px' }}>Soulful Scribble</h1>
            <p style={{ fontSize:'11px', color:A.rose, letterSpacing:'3px', textTransform:'uppercase' }}>Admin Portal</p>
            <div style={{ width:'36px', height:'2px', background:`linear-gradient(to right,${A.burgundy},${A.rose})`, margin:'12px auto 0' }} />
          </div>

          <form onSubmit={handleLogin}>
            <div style={fieldStyle}>
              <label style={labelStyle}>Email Address</label>
              <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required
                placeholder="admin@soulfulscribble.in" style={inputStyle}
                onFocus={e=>{ e.target.style.borderColor=A.rose; e.target.style.boxShadow=`0 0 0 3px rgba(196,117,138,0.12)`; }}
                onBlur={e=>{ e.target.style.borderColor=A.border; e.target.style.boxShadow='none'; }}
              />
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>Password</label>
              <div style={{ position:'relative' }}>
                <input type={showPw?'text':'password'} value={password} onChange={e=>setPassword(e.target.value)} required
                  placeholder="••••••••" style={{ ...inputStyle, paddingRight:'44px' }}
                  onFocus={e=>{ e.target.style.borderColor=A.rose; e.target.style.boxShadow=`0 0 0 3px rgba(196,117,138,0.12)`; }}
                  onBlur={e=>{ e.target.style.borderColor=A.border; e.target.style.boxShadow='none'; }}
                />
                <button type="button" onClick={()=>setShowPw(v=>!v)}
                  style={{ position:'absolute', right:'12px', top:'50%', transform:'translateY(-50%)', background:'none', border:'none', color:A.textMuted, cursor:'pointer', fontSize:'16px', padding:'4px', lineHeight:1 }}>
                  {showPw ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            {error && (
              <div style={{ marginBottom:'16px', padding:'11px 14px', borderRadius:'10px', background:A.error.bg, border:`1px solid ${A.error.bd}`, color:A.error.tx, fontSize:'13px', display:'flex', alignItems:'center', gap:'8px' }}>
                ⚠️ {error}
              </div>
            )}

            <button type="submit" disabled={loading}
              style={{ width:'100%', padding:'14px', borderRadius:'12px', background:loading?'rgba(107,26,42,0.4)':`linear-gradient(135deg,${A.burgundy},${A.rose})`, color:'#fff', fontWeight:700, fontSize:'15px', fontFamily:'DM Sans', cursor:loading?'not-allowed':'pointer', boxShadow:`0 6px 20px rgba(107,26,42,0.25)`, border:'none', transition:'all 0.25s', letterSpacing:'0.3px' }}>
              {loading ? 'Signing in…' : 'Sign In →'}
            </button>
          </form>

          <p style={{ textAlign:'center', marginTop:'22px', fontSize:'12px', color:A.textLight }}>
            Protected admin area · Soulful Scribble © 2024
          </p>
        </div>
      </div>
    </div>
  );
}