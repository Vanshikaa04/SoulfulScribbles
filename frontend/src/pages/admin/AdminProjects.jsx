import React, { useState, useEffect, useRef } from 'react';
import { useOutletContext } from 'react-router-dom';
import { A, inp } from './theme.js';

const PROJ_CATS = ['Web Dev','Design','Digital Marketing','SEO','Video','Social Media','Data Analysis','Machine Learning','Other'];
const CAT_ICONS = { 'Web Dev':'🌐','Design':'✏️','Digital Marketing':'📣','SEO':'🔍','Video':'🎬','Social Media':'📱','Data Analysis':'📊','Machine Learning':'🤖','Other':'📁' };
const EMPTY = { title:'', description:'', category:'', org:'', image:'', link:'', tech:'', featured:false, order:0 };

const LBL = { display:'block', fontSize:'11px', color:'rgba(92,19,34,0.55)', letterSpacing:'2px', textTransform:'uppercase', marginBottom:'6px' };

function Toast({ msg }) {
  if (!msg.text) return null;
  const map = { ok:A.success, err:A.error, info:A.info };
  const c = map[msg.type] || A.info;
  return <div style={{ padding:'10px 16px', borderRadius:'10px', marginBottom:'18px', background:c.bg, border:`1.5px solid ${c.bd}`, color:c.tx, fontSize:'13px', fontWeight:500 }}>{msg.text}</div>;
}

export default function AdminProjects() {
 const backendurl = import.meta.env.VITE_backendurl ;
  const ctx = useOutletContext() || {};
  const [projects, setProjects] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm]         = useState(EMPTY);
  const [editId, setEditId]     = useState(null);
  const [saving, setSaving]     = useState(false);
  const [uploading, setUploading] = useState(false);
  const [catF, setCatF]         = useState('All');
  const [orgF, setOrgF]         = useState('All');
  const [search, setSearch]     = useState('');
  const [deleteId, setDeleteId] = useState(null);
  const [msg, setMsg]           = useState({ text:'', type:'' });
  const [imgPreview, setImgPreview] = useState('');
  const [imgFile, setImgFile]       = useState(null);
  const fileRef = useRef();

  const toast = (text, type='ok') => { setMsg({ text, type }); setTimeout(()=>setMsg({ text:'', type:'' }), 3500); };

  const fetchProjects = () => {
    setLoading(true);
    fetch('/api/projects', { credentials:'include' })
      .then(r => r.json())
      .then(d => { setProjects(Array.isArray(d)?d:[]); setLoading(false); })
      .catch(() => setLoading(false));
  };
  useEffect(fetchProjects, [ctx.lastRefresh]);

  const openCreate = () => { setForm(EMPTY); setEditId(null); setImgPreview(''); setImgFile(null); setShowForm(true); };
  const openEdit = p => {
    setForm({ title:p.title||'', description:p.description||'', category:p.category||'', org:p.org||'', image:p.image||'', link:p.link||'', tech:(p.tech||[]).join(', '), featured:p.featured||false, order:p.order||0 });
    setEditId(p._id); setImgPreview(p.image||''); setImgFile(null); setShowForm(true);
  };

  const handleFile = e => {
    const file = e.target.files[0]; if (!file) return;
    setImgFile(file); setImgPreview(URL.createObjectURL(file)); e.target.value='';
  };

  const save = async () => {
    if (!form.title.trim()) return toast('Project title is required','err');
    if (!form.category)     return toast('Please select a category','err');
    setSaving(true);
    try {
      let imageUrl = form.image;
      if (imgFile) {
        setUploading(true);
        const fd = new FormData(); fd.append('file', imgFile);
        const r = await fetch('/api/upload', { method:'POST', credentials:'include', body:fd });
        const d = await r.json(); if (!d.url) throw new Error('Upload failed');
        imageUrl = d.url; setUploading(false);
      }
      const body = { ...form, image:imageUrl, tech:form.tech.split(',').map(t=>t.trim()).filter(Boolean), order:Number(form.order)||0 };
      const url  = editId ? `${backendurl}/api/projects/${editId}` : '/api/projects';
      const res  = await fetch(url, { method:editId?'PUT':'POST', credentials:'include', headers:{'Content-Type':'application/json'}, body:JSON.stringify(body) });
      if (!res.ok) throw new Error((await res.json()).message||'Save failed');
      fetchProjects(); setShowForm(false); toast(editId?'Project updated!':'Project created!');
    } catch(err) { toast(err.message,'err'); setUploading(false); } finally { setSaving(false); }
  };

  const toggleFeatured = async id => {
    await fetch(`${backendurl}/api/projects/${id}/featured`, { method:'PATCH', credentials:'include' });
    fetchProjects();
  };

  const confirmDelete = async () => {
    try {
      await fetch(`${backendurl}/api/projects/${deleteId}`, { method:'DELETE', credentials:'include' });
      fetchProjects(); setDeleteId(null); toast('Deleted!');
    } catch { toast('Delete failed','err'); }
  };

  // Filter logic
  const all = projects.filter(p =>
    (catF==='All'||p.category===catF) &&
    (orgF==='All'||(orgF==='cmt'?p.org?.toLowerCase().includes('code master'):!p.org?.toLowerCase().includes('code master'))) &&
    (!search||p.title?.toLowerCase().includes(search.toLowerCase()))
  );

  // Split into CMT vs Freelance for the display sections
  const cmtProjects       = all.filter(p => p.org?.toLowerCase().includes('code master'));
  const freelanceProjects = all.filter(p => !p.org?.toLowerCase().includes('code master'));

  const stats = [
    { label:'Total',          value:projects.length,                           color:A.burgundy },
    { label:'Code Master',    value:projects.filter(p=>p.org?.toLowerCase().includes('code master')).length, color:A.rose },
    { label:'Freelance',      value:projects.filter(p=>!p.org?.toLowerCase().includes('code master')).length, color:A.textMuted },
    { label:'Data Analysis',  value:projects.filter(p=>p.category==='Data Analysis').length,  color:A.textMuted },
    { label:'ML',             value:projects.filter(p=>p.category==='Machine Learning').length, color:A.textMuted },
    { label:'Featured',       value:projects.filter(p=>p.featured).length,      color:A.textMuted },
  ];

  const renderGrid = (list, emptyMsg) => {
    if (list.length === 0) return (
      <p style={{ color:A.textLight, fontSize:'14px', fontStyle:'italic', padding:'20px 0' }}>{emptyMsg}</p>
    );
    return (
      <div className="proj-grid">
        {list.map(p => <ProjectCard key={p._id} p={p} onEdit={openEdit} onDelete={setDeleteId} onFeatured={toggleFeatured} />)}
      </div>
    );
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'22px', flexWrap:'wrap', gap:'10px' }}>
        <div>
          <p style={{ fontSize:'11px', letterSpacing:'3px', textTransform:'uppercase', color:A.rose, marginBottom:'3px' }}>Techno Hub</p>
          <h1 style={{ fontFamily:'Cormorant Garamond', fontSize:'clamp(20px,3vw,26px)', color:A.textMain, fontWeight:700 }}>Manage Projects</h1>
        </div>
        <button onClick={openCreate} style={{ padding:'9px 20px', borderRadius:'11px', background:`linear-gradient(135deg,${A.burgundy},${A.rose})`, color:'#fff', fontWeight:700, fontSize:'13px', cursor:'pointer', border:'none', boxShadow:`0 3px 12px rgba(92,19,34,0.22)` }}>
          + Add Project
        </button>
      </div>

      <Toast msg={msg} />

      {/* Stats */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(110px,1fr))', gap:'10px', marginBottom:'20px' }}>
        {stats.map(s=>(
          <div key={s.label} style={{ padding:'12px 14px', borderRadius:'12px', background:A.cardBg, border:`1.5px solid ${A.border}`, boxShadow:'0 1px 6px rgba(92,19,34,0.05)' }}>
            <p style={{ fontFamily:'Cormorant Garamond', fontSize:'clamp(18px,3vw,24px)', fontWeight:700, color:s.color, lineHeight:1 }}>{s.value}</p>
            <p style={{ fontSize:'10px', color:A.textLight, marginTop:'3px' }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display:'flex', gap:'7px', marginBottom:'16px', flexWrap:'wrap', alignItems:'center' }}>
        {/* Org filter */}
        {[['All','All'],['cmt','Code Master'],['freelance','Freelance']].map(([v,l])=>(
          <button key={v} onClick={()=>setOrgF(v)} style={{ padding:'6px 12px', borderRadius:'40px', fontSize:'12px', cursor:'pointer', fontFamily:'DM Sans', background:orgF===v?`linear-gradient(135deg,${A.burgundy},${A.rose})`:A.blush, color:orgF===v?'#fff':A.textMuted, border:orgF===v?'none':`1.5px solid ${A.border}`, fontWeight:orgF===v?700:400 }}>{l}</button>
        ))}
        <div style={{ width:'1px', height:'20px', background:A.border, margin:'0 4px' }} />
        {['All',...PROJ_CATS].map(c=>(
          <button key={c} onClick={()=>setCatF(c)} style={{ padding:'6px 12px', borderRadius:'40px', fontSize:'12px', cursor:'pointer', fontFamily:'DM Sans', background:catF===c?`linear-gradient(135deg,${A.burgundy},${A.rose})`:A.blush, color:catF===c?'#fff':A.textMuted, border:catF===c?'none':`1.5px solid ${A.border}`, fontWeight:catF===c?700:400, display:'flex', alignItems:'center', gap:'4px' }}>
            {CAT_ICONS[c]&&c!=='All'&&<span style={{ fontSize:'11px' }}>{CAT_ICONS[c]}</span>}{c}
          </button>
        ))}
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search…"
          style={{ ...inp(), maxWidth:'160px', padding:'7px 12px', marginLeft:'auto' }}
          onFocus={e=>{ e.target.style.borderColor=A.rose; e.target.style.boxShadow=`0 0 0 3px rgba(176,80,112,0.1)`; }}
          onBlur={e=>{ e.target.style.borderColor=A.border; e.target.style.boxShadow='none'; }}
        />
      </div>

      {loading ? (
        <div className="proj-grid">
          {[1,2,3,4,5,6,7,8].map(i=>(
            <div key={i} style={{ borderRadius:'14px', overflow:'hidden', background:A.cardBg, border:`1.5px solid ${A.border}` }}>
              <div style={{ height:'120px', background:`linear-gradient(90deg,${A.blush},${A.petal},${A.blush})`, backgroundSize:'200% 100%', animation:'shimmer 1.5s infinite' }} />
              <div style={{ padding:'12px' }}>
                <div style={{ height:'14px', background:A.blush, borderRadius:'3px', marginBottom:'7px' }} />
                <div style={{ height:'10px', width:'60%', background:A.petal, borderRadius:'3px' }} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          {/* ── Section 1: Code Master Technology ── */}
          <div style={{ marginBottom:'36px' }}>
            <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'16px' }}>
              <div style={{ width:'32px', height:'32px', borderRadius:'8px', background:`linear-gradient(135deg,${A.burgundy},${A.rose})`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'16px' }}>🏢</div>
              <div>
                <h2 style={{ fontFamily:'Cormorant Garamond', fontSize:'clamp(17px,2.5vw,22px)', color:A.textMain, fontWeight:700 }}>Code Master Technology</h2>
                <p style={{ fontSize:'11px', color:A.textMuted, marginTop:'1px' }}>Projects during my tenure as Full Stack Developer & Tech Educator</p>
              </div>
              <span style={{ marginLeft:'auto', padding:'3px 10px', borderRadius:'20px', background:A.blush, color:A.burgundy, fontSize:'12px', fontWeight:700 }}>{cmtProjects.length}</span>
            </div>
            {renderGrid(cmtProjects, 'No Code Master Technology projects yet.')}
          </div>

          {/* ── Section 2: Freelance ── */}
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'16px' }}>
              <div style={{ width:'32px', height:'32px', borderRadius:'8px', background:`linear-gradient(135deg,#6B8FD4,#A67CC5)`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'16px' }}>💼</div>
              <div>
                <h2 style={{ fontFamily:'Cormorant Garamond', fontSize:'clamp(17px,2.5vw,22px)', color:A.textMain, fontWeight:700 }}>Freelance Work</h2>
                <p style={{ fontSize:'11px', color:A.textMuted, marginTop:'1px' }}>Independent projects and client work</p>
              </div>
              <span style={{ marginLeft:'auto', padding:'3px 10px', borderRadius:'20px', background:A.blush, color:A.burgundy, fontSize:'12px', fontWeight:700 }}>{freelanceProjects.length}</span>
            </div>
            {renderGrid(freelanceProjects, 'No freelance projects yet.')}
          </div>
        </>
      )}

      {/* ══ FORM MODAL ══ */}
      {showForm && (
        <div style={{ position:'fixed', inset:0, background:'rgba(42,10,18,0.3)', backdropFilter:'blur(8px)', zIndex:200, display:'flex', alignItems:'flex-start', justifyContent:'center', padding:'16px', overflowY:'auto' }}>
          <div style={{ background:A.modalBg, borderRadius:'22px', border:`1.5px solid ${A.border}`, padding:'clamp(20px,3.5vw,36px)', width:'100%', maxWidth:'600px', marginTop:'20px', marginBottom:'20px', boxShadow:'0 24px 60px rgba(92,19,34,0.14)' }}>

            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'24px' }}>
              <div>
                <p style={{ fontSize:'11px', letterSpacing:'3px', textTransform:'uppercase', color:A.rose, marginBottom:'3px' }}>Techno Hub</p>
                <h2 style={{ fontFamily:'Cormorant Garamond', fontSize:'22px', color:A.textMain, fontWeight:700 }}>{editId?'Edit Project':'Add New Project'}</h2>
              </div>
              <button onClick={()=>setShowForm(false)} style={{ width:'32px', height:'32px', borderRadius:'50%', background:A.blush, border:`1.5px solid ${A.border}`, color:A.burgundy, fontSize:'15px', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700 }}>✕</button>
            </div>

            {/* Title + Category */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px', marginBottom:'14px' }}>
              <div>
                <label style={LBL}>Title *</label>
                <input value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))} placeholder="e.g. E-Commerce Platform" style={inp()}
                  onFocus={e=>{ e.target.style.borderColor=A.rose; e.target.style.boxShadow=`0 0 0 3px rgba(176,80,112,0.1)`; }}
                  onBlur={e=>{ e.target.style.borderColor=A.border; e.target.style.boxShadow='none'; }} />
              </div>
              <div>
                <label style={LBL}>Category *</label>
                <select value={form.category} onChange={e=>setForm(f=>({...f,category:e.target.value}))} style={{ ...inp(), background:A.inputBg }}
                  onFocus={e=>e.target.style.borderColor=A.rose} onBlur={e=>e.target.style.borderColor=A.border}>
                  <option value="">Select…</option>
                  {PROJ_CATS.map(c=><option key={c} value={c}>{CAT_ICONS[c]} {c}</option>)}
                </select>
              </div>
            </div>

            <div style={{ marginBottom:'14px' }}>
              <label style={LBL}>Description</label>
              <textarea value={form.description} onChange={e=>setForm(f=>({...f,description:e.target.value}))} rows={3} placeholder="What was built, what problem it solved…" style={{ ...inp(), resize:'vertical' }}
                onFocus={e=>{ e.target.style.borderColor=A.rose; e.target.style.boxShadow=`0 0 0 3px rgba(176,80,112,0.1)`; }}
                onBlur={e=>{ e.target.style.borderColor=A.border; e.target.style.boxShadow='none'; }} />
            </div>

            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px', marginBottom:'14px' }}>
              <div>
                <label style={LBL}>Organisation</label>
                <input value={form.org} onChange={e=>setForm(f=>({...f,org:e.target.value}))} placeholder="e.g. Code Master Technology" style={inp()}
                  onFocus={e=>{ e.target.style.borderColor=A.rose; e.target.style.boxShadow=`0 0 0 3px rgba(176,80,112,0.1)`; }}
                  onBlur={e=>{ e.target.style.borderColor=A.border; e.target.style.boxShadow='none'; }} />
              </div>
              <div>
                <label style={LBL}>Live / GitHub Link</label>
                <input value={form.link} onChange={e=>setForm(f=>({...f,link:e.target.value}))} placeholder="https://…" style={inp()}
                  onFocus={e=>{ e.target.style.borderColor=A.rose; e.target.style.boxShadow=`0 0 0 3px rgba(176,80,112,0.1)`; }}
                  onBlur={e=>{ e.target.style.borderColor=A.border; e.target.style.boxShadow='none'; }} />
              </div>
            </div>

            <div style={{ marginBottom:'14px' }}>
              <label style={LBL}>Tech Stack (comma separated)</label>
              <input value={form.tech} onChange={e=>setForm(f=>({...f,tech:e.target.value}))} placeholder="React, Node.js, Python, MongoDB…" style={inp()}
                onFocus={e=>{ e.target.style.borderColor=A.rose; e.target.style.boxShadow=`0 0 0 3px rgba(176,80,112,0.1)`; }}
                onBlur={e=>{ e.target.style.borderColor=A.border; e.target.style.boxShadow='none'; }} />
            </div>

            {/* Image */}
            <div style={{ marginBottom:'14px' }}>
              <label style={LBL}>Project Image</label>
              <div style={{ display:'flex', gap:'12px', alignItems:'flex-start', flexWrap:'wrap' }}>
                {imgPreview && <div style={{ width:'72px', height:'54px', borderRadius:'9px', overflow:'hidden', border:`1.5px solid ${A.border}`, flexShrink:0 }}><img src={imgPreview} alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }} /></div>}
                <div style={{ flex:1, minWidth:'160px' }}>
                  <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} style={{ display:'none' }} />
                  <button type="button" onClick={()=>fileRef.current?.click()} style={{ width:'100%', padding:'10px', borderRadius:'10px', border:`2px dashed rgba(176,80,112,0.28)`, background:A.petal, color:A.rose, fontSize:'12px', cursor:'pointer', fontFamily:'DM Sans', fontWeight:600 }}>
                    📁 {imgFile?imgFile.name:'Choose Image'}
                  </button>
                  <input value={form.image} onChange={e=>{ setForm(f=>({...f,image:e.target.value})); setImgPreview(e.target.value); }} placeholder="Or paste Cloudinary URL…"
                    style={{ ...inp(), marginTop:'6px', fontSize:'12px', padding:'8px 11px' }}
                    onFocus={e=>e.target.style.borderColor=A.rose} onBlur={e=>e.target.style.borderColor=A.border} />
                </div>
              </div>
            </div>

            {/* Order + Featured */}
            <div style={{ display:'grid', gridTemplateColumns:'100px 1fr', gap:'12px', marginBottom:'24px', alignItems:'center' }}>
              <div>
                <label style={LBL}>Order</label>
                <input type="number" value={form.order} onChange={e=>setForm(f=>({...f,order:e.target.value}))} style={inp()}
                  onFocus={e=>e.target.style.borderColor=A.rose} onBlur={e=>e.target.style.borderColor=A.border} />
              </div>
              <div onClick={()=>setForm(f=>({...f,featured:!f.featured}))} style={{ display:'flex', alignItems:'center', gap:'10px', padding:'11px 13px', borderRadius:'11px', background:form.featured?A.blush:'transparent', border:`1.5px solid ${form.featured?A.borderStrong:A.border}`, cursor:'pointer', marginTop:'18px' }}>
                <div style={{ width:'18px', height:'18px', borderRadius:'5px', background:form.featured?`linear-gradient(135deg,${A.burgundy},${A.rose})`:'transparent', border:`2px solid ${form.featured?A.rose:A.border}`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  {form.featured && <span style={{ color:'#fff', fontSize:'10px', fontWeight:700 }}>✓</span>}
                </div>
                <p style={{ fontSize:'13px', color:A.textMain, fontWeight:form.featured?700:400 }}>⭐ Mark as Featured</p>
              </div>
            </div>

            <div style={{ display:'flex', gap:'10px' }}>
              <button onClick={save} disabled={saving||uploading} style={{ flex:1, padding:'13px', borderRadius:'12px', background:(saving||uploading)?'rgba(92,19,34,0.4)':`linear-gradient(135deg,${A.burgundy},${A.rose})`, color:'#fff', fontWeight:700, fontSize:'14px', cursor:(saving||uploading)?'not-allowed':'pointer', opacity:(saving||uploading)?0.7:1, border:'none' }}>
                {uploading?'Uploading…':saving?'Saving…':editId?'Update Project':'Create Project'}
              </button>
              <button onClick={()=>setShowForm(false)} style={{ padding:'13px 18px', borderRadius:'12px', background:A.blush, border:`1.5px solid ${A.border}`, color:A.textMain, cursor:'pointer', fontSize:'14px', fontWeight:600 }}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {deleteId && (
        <div style={{ position:'fixed', inset:0, background:'rgba(42,10,18,0.3)', backdropFilter:'blur(8px)', zIndex:200, display:'flex', alignItems:'center', justifyContent:'center', padding:'16px' }}>
          <div style={{ background:A.modalBg, borderRadius:'20px', border:'1.5px solid #FCA5A5', padding:'30px', maxWidth:'320px', width:'100%', textAlign:'center', boxShadow:'0 20px 50px rgba(92,19,34,0.12)' }}>
            <span style={{ fontSize:'38px' }}>🗑️</span>
            <h3 style={{ fontFamily:'Cormorant Garamond', fontSize:'20px', color:A.textMain, margin:'12px 0 6px', fontWeight:700 }}>Delete Project?</h3>
            <p style={{ color:A.textMuted, fontSize:'13px', marginBottom:'20px', lineHeight:1.6 }}>Permanently removes the project and its Cloudinary image.</p>
            <div style={{ display:'flex', gap:'10px' }}>
              <button onClick={confirmDelete} style={{ flex:1, padding:'10px', borderRadius:'10px', background:'#EF4444', color:'#fff', fontWeight:700, cursor:'pointer', fontSize:'13px', border:'none' }}>Delete</button>
              <button onClick={()=>setDeleteId(null)} style={{ flex:1, padding:'10px', borderRadius:'10px', background:A.blush, border:`1.5px solid ${A.border}`, color:A.textMain, cursor:'pointer', fontSize:'13px', fontWeight:600 }}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .proj-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
        }
        @media (max-width: 1200px) { .proj-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 900px)  { .proj-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 500px)  { .proj-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; } }
      `}</style>
    </div>
  );
}

function ProjectCard({ p, onEdit, onDelete, onFeatured }) {
  const accentColor = { 'Web Dev':'#C4758A','Design':'#D4956A','Digital Marketing':'#A67CC5','SEO':'#6B8FD4','Video':'#D46B8F','Social Media':'#6BC4B0','Data Analysis':'#E8A56A','Machine Learning':'#7CC4A6','Other':'#9BA8C0' }[p.category] || '#C4758A';
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{ borderRadius:'14px', overflow:'hidden', background:A.cardBg, border:`1.5px solid ${hov?A.borderStrong:A.border}`, transition:'all 0.22s', transform:hov?'translateY(-3px)':'translateY(0)', boxShadow:hov?'0 10px 28px rgba(92,19,34,0.1)':'0 1px 6px rgba(92,19,34,0.05)' }}>
      {/* Thumbnail */}
      <div style={{ height:'110px', background:`linear-gradient(135deg,${A.blush},${A.petal})`, position:'relative', overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'32px' }}>
        {p.image ? <img src={p.image} alt={p.title} style={{ width:'100%', height:'100%', objectFit:'cover' }} /> : <span style={{ opacity:0.35 }}>{CAT_ICONS[p.category]||'💻'}</span>}
        {/* Category badge */}
        <div style={{ position:'absolute', top:'8px', right:'8px', padding:'2px 8px', borderRadius:'20px', background:'rgba(255,255,255,0.92)', color:A.burgundy, fontSize:'10px', fontWeight:700 }}>
          {CAT_ICONS[p.category]} {p.category}
        </div>
        {p.featured && <div style={{ position:'absolute', top:'8px', left:'8px', padding:'2px 8px', borderRadius:'20px', background:`linear-gradient(135deg,${A.burgundy},${A.rose})`, color:'#fff', fontSize:'10px', fontWeight:700 }}>⭐</div>}
      </div>

      <div style={{ padding:'10px 12px' }}>
        <p style={{ fontFamily:'Cormorant Garamond', fontSize:'15px', color:A.textMain, fontWeight:700, marginBottom:'4px', lineHeight:1.3, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{p.title}</p>
        {p.org && <p style={{ fontSize:'10px', color:A.textLight, marginBottom:'6px', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>🏢 {p.org}</p>}
        {p.tech?.length > 0 && (
          <div style={{ display:'flex', flexWrap:'wrap', gap:'3px', marginBottom:'8px' }}>
            {p.tech.slice(0,3).map(t=><span key={t} style={{ padding:'1px 7px', borderRadius:'20px', fontSize:'10px', background:A.blush, color:A.burgundy }}>{t}</span>)}
            {p.tech.length>3 && <span style={{ fontSize:'10px', color:A.textLight }}>+{p.tech.length-3}</span>}
          </div>
        )}
        <div style={{ display:'flex', gap:'6px', alignItems:'center' }}>
          <button onClick={()=>onEdit(p)} style={{ flex:1, padding:'5px 0', borderRadius:'7px', background:A.blush, border:`1.5px solid ${A.border}`, color:A.burgundy, fontSize:'11px', cursor:'pointer', fontWeight:700 }}>Edit</button>
          <button onClick={()=>onFeatured(p._id)} style={{ padding:'5px 7px', borderRadius:'7px', background:'transparent', border:`1.5px solid ${A.border}`, color:p.featured?A.burgundy:A.textLight, fontSize:'12px', cursor:'pointer' }}>{p.featured?'⭐':'☆'}</button>
          {p.link && <a href={p.link} target="_blank" rel="noopener noreferrer" style={{ padding:'5px 7px', borderRadius:'7px', background:'transparent', border:`1.5px solid ${A.border}`, color:A.textMuted, fontSize:'11px' }}>🔗</a>}
          <button onClick={()=>onDelete(p._id)} style={{ padding:'5px 7px', borderRadius:'7px', background:'#FEF2F2', border:'1.5px solid #FCA5A5', color:'#991B1B', fontSize:'11px', cursor:'pointer', fontWeight:700 }}>×</button>
        </div>
      </div>
    </div>
  );
}