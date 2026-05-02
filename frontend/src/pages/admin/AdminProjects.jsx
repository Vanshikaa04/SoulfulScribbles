import React, { useState, useEffect, useRef } from 'react';
import { A, inp } from './theme.js';

const PROJ_CATS = [
  'Web Dev', 'Design', 'Digital Marketing', 'SEO',
  'Video', 'Social Media', 'Data Analysis', 'Machine Learning', 'Other',
];
const CAT_ICONS = {
  'Web Dev':'🌐', 'Design':'✏️', 'Digital Marketing':'📣', 'SEO':'🔍',
  'Video':'🎬', 'Social Media':'📱', 'Data Analysis':'📊', 'Machine Learning':'🤖', 'Other':'📁',
};
const EMPTY = { title:'', description:'', category:'', org:'', image:'', link:'', tech:'', featured:false, order:0 };

function Label({ children }) {
  return <label style={{ display:'block', fontSize:'11px', color:A.textMuted, letterSpacing:'2px', textTransform:'uppercase', marginBottom:'6px' }}>{children}</label>;
}
function Field({ label, children, note }) {
  return (
    <div style={{ marginBottom:'18px' }}>
      {label && <Label>{label}</Label>}
      {children}
      {note && <p style={{ fontSize:'11px', color:A.textLight, marginTop:'5px' }}>{note}</p>}
    </div>
  );
}
function Toast({ msg }) {
  if (!msg.text) return null;
  const c = msg.type==='err'
    ? { bg:A.error.bg,  bd:A.error.bd,  tx:A.error.tx,  icon:'⚠️' }
    : msg.type==='info'
    ? { bg:A.info.bg,   bd:A.info.bd,   tx:A.info.tx,   icon:'ℹ️' }
    : { bg:A.success.bg,bd:A.success.bd,tx:A.success.tx,icon:'✅' };
  return (
    <div style={{ padding:'11px 16px', borderRadius:'10px', marginBottom:'20px', background:c.bg, border:`1px solid ${c.bd}`, color:c.tx, fontSize:'13px', display:'flex', alignItems:'center', gap:'8px' }}>
      {c.icon} {msg.text}
    </div>
  );
}

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm]         = useState(EMPTY);
  const [editId, setEditId]     = useState(null);
  const [saving, setSaving]     = useState(false);
  const [catF, setCatF]         = useState('All');
  const [search, setSearch]     = useState('');
  const [deleteId, setDeleteId] = useState(null);
  const [msg, setMsg]           = useState({ text:'', type:'' });
  const [imgPreview, setImgPreview] = useState('');
  const [imgFile, setImgFile]       = useState(null);
  const [uploading, setUploading]   = useState(false);
  const fileRef = useRef();

  const toast = (text, type='ok') => { setMsg({ text, type }); setTimeout(()=>setMsg({ text:'', type:'' }), 3500); };

  /* ── fetch from backend ── */
  const fetchProjects = () => {
    setLoading(true);
    fetch('/api/projects', { credentials:'include' })
      .then(r => r.json())
      .then(d => { setProjects(Array.isArray(d) ? d : []); setLoading(false); })
      .catch(() => setLoading(false));
  };
  useEffect(fetchProjects, []);

  const openCreate = () => { setForm(EMPTY); setEditId(null); setImgPreview(''); setImgFile(null); setShowForm(true); };
  const openEdit   = p  => {
    setForm({ title:p.title||'', description:p.description||'', category:p.category||'', org:p.org||'', image:p.image||'', link:p.link||'', tech:(p.tech||[]).join(', '), featured:p.featured||false, order:p.order||0 });
    setEditId(p._id); setImgPreview(p.image||''); setImgFile(null); setShowForm(true);
  };

  /* image file select → preview */
  const handleFileSelect = e => {
    const file = e.target.files[0];
    if (!file) return;
    setImgFile(file);
    setImgPreview(URL.createObjectURL(file));
    e.target.value = '';
  };

  /* upload image to /api/upload, return URL */
  const uploadImage = async (file) => {
    const fd = new FormData();
    fd.append('file', file);
    const r = await fetch('/api/upload', { method:'POST', credentials:'include', body:fd });
    const d = await r.json();
    if (!d.url) throw new Error('Upload failed');
    return d.url;
  };

  /* save */
  const save = async () => {
    if (!form.title.trim())  return toast('Project title is required','err');
    if (!form.category)      return toast('Please select a category','err');
    setSaving(true);
    try {
      let imageUrl = form.image;

      /* upload new image file first */
      if (imgFile) {
        setUploading(true);
        imageUrl = await uploadImage(imgFile);
        setUploading(false);
      }

      const body = {
        ...form,
        image: imageUrl,
        tech: form.tech.split(',').map(t=>t.trim()).filter(Boolean),
        order: Number(form.order) || 0,
      };

      const url    = editId ? `/api/projects/${editId}` : '/api/projects';
      const method = editId ? 'PUT' : 'POST';
      const res    = await fetch(url, { method, credentials:'include', headers:{'Content-Type':'application/json'}, body:JSON.stringify(body) });
      if (!res.ok) throw new Error((await res.json()).message || 'Save failed');

      fetchProjects(); setShowForm(false);
      toast(editId ? 'Project updated!' : 'Project created!');
    } catch(err) { toast(err.message,'err'); setUploading(false); }
    finally { setSaving(false); }
  };

  const toggleFeatured = async id => {
    await fetch(`/api/projects/${id}/featured`, { method:'PATCH', credentials:'include' });
    fetchProjects();
  };

  const confirmDelete = async () => {
    try {
      const res = await fetch(`/api/projects/${deleteId}`, { method:'DELETE', credentials:'include' });
      if (!res.ok) throw new Error('Delete failed');
      fetchProjects(); setDeleteId(null); toast('Project deleted!');
    } catch { toast('Delete failed','err'); }
  };

  const filtered = projects.filter(p =>
    (catF==='All' || p.category===catF) &&
    (!search || p.title?.toLowerCase().includes(search.toLowerCase()))
  );

  /* ── stats ── */
  const stats = [
    { label:'Total',    value:projects.length,                         color:A.burgundy },
    { label:'Featured', value:projects.filter(p=>p.featured).length,  color:A.rose },
    ...['Data Analysis','Machine Learning','Web Dev','Design'].map(c=>({ label:c, value:projects.filter(p=>p.category===c).length, color:A.textMuted })),
  ];

  return (
    <div>
      {/* ── Header ── */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'26px', flexWrap:'wrap', gap:'12px' }}>
        <div>
          <p style={{ fontSize:'11px', letterSpacing:'3px', textTransform:'uppercase', color:A.rose, marginBottom:'4px' }}>Techno Hub</p>
          <h1 style={{ fontFamily:'Cormorant Garamond', fontSize:'clamp(22px,3vw,28px)', color:A.textMain, fontWeight:500 }}>Manage Projects</h1>
        </div>
        <button onClick={openCreate}
          style={{ padding:'10px 22px', borderRadius:'12px', background:`linear-gradient(135deg,${A.burgundy},${A.rose})`, color:'#fff', fontWeight:600, fontSize:'14px', cursor:'pointer', boxShadow:`0 4px 14px rgba(107,26,42,0.22)`, border:'none' }}>
          + Add Project
        </button>
      </div>

      <Toast msg={msg} />

      {/* ── Stats ── */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(120px,1fr))', gap:'10px', marginBottom:'22px' }}>
        {stats.map(s=>(
          <div key={s.label} style={{ padding:'14px 16px', borderRadius:'14px', background:A.cardBg, border:`1px solid ${A.border}`, boxShadow:'0 2px 8px rgba(107,26,42,0.04)' }}>
            <p style={{ fontFamily:'Cormorant Garamond', fontSize:'clamp(20px,3vw,26px)', fontWeight:700, color:s.color, lineHeight:1 }}>{s.value}</p>
            <p style={{ fontSize:'11px', color:A.textMuted, marginTop:'4px' }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* ── Category filters ── */}
      <div style={{ display:'flex', gap:'7px', marginBottom:'18px', flexWrap:'wrap', alignItems:'center' }}>
        {['All',...PROJ_CATS].map(c=>(
          <button key={c} onClick={()=>setCatF(c)}
            style={{ padding:'6px 13px', borderRadius:'40px', fontSize:'12px', cursor:'pointer', fontFamily:'DM Sans', transition:'all 0.2s', background:catF===c?`linear-gradient(135deg,${A.burgundy},${A.rose})`:A.blush, color:catF===c?'#fff':A.textMuted, border:catF===c?'none':`1px solid ${A.border}`, fontWeight:catF===c?600:400, display:'flex', alignItems:'center', gap:'4px' }}>
            {CAT_ICONS[c] && <span>{CAT_ICONS[c]}</span>} {c}
          </button>
        ))}
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search…"
          style={{ ...inp(), maxWidth:'180px', padding:'7px 13px', marginLeft:'auto' }}
          onFocus={e=>{ e.target.style.borderColor=A.rose; e.target.style.boxShadow=`0 0 0 3px rgba(196,117,138,0.1)`; }}
          onBlur={e=>{ e.target.style.borderColor=A.border; e.target.style.boxShadow='none'; }}
        />
      </div>

      {/* ── Project cards grid ── */}
      {loading ? (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:'16px' }}>
          {[1,2,3,4,5,6].map(i=>(
            <div key={i} style={{ borderRadius:'16px', overflow:'hidden', background:A.cardBg, border:`1px solid ${A.border}` }}>
              <div style={{ height:'150px', background:`linear-gradient(90deg,${A.blush},${A.petal},${A.blush})`, backgroundSize:'200% 100%', animation:'shimmer 1.5s infinite' }} />
              <div style={{ padding:'16px' }}>
                <div style={{ height:'16px', background:A.blush, borderRadius:'4px', marginBottom:'8px' }} />
                <div style={{ height:'12px', width:'60%', background:A.petal, borderRadius:'4px' }} />
              </div>
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign:'center', padding:'60px 0', color:A.textMuted }}>
          <span style={{ fontSize:'48px', display:'block', marginBottom:'12px' }}>💻</span>
          <p style={{ fontFamily:'Cormorant Garamond', fontSize:'22px', color:A.textMain, fontStyle:'italic', marginBottom:'8px' }}>No projects yet</p>
          <p style={{ fontSize:'14px' }}>Add your first project to showcase your work!</p>
        </div>
      ) : (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(min(100%,300px),1fr))', gap:'16px' }}>
          {filtered.map(p => (
            <div key={p._id}
              style={{ background:A.cardBg, borderRadius:'18px', border:`1px solid ${A.border}`, overflow:'hidden', boxShadow:'0 2px 10px rgba(107,26,42,0.05)', transition:'all 0.3s' }}
              onMouseEnter={e=>{ e.currentTarget.style.boxShadow='0 10px 28px rgba(107,26,42,0.1)'; e.currentTarget.style.transform='translateY(-3px)'; }}
              onMouseLeave={e=>{ e.currentTarget.style.boxShadow='0 2px 10px rgba(107,26,42,0.05)'; e.currentTarget.style.transform='translateY(0)'; }}>

              {/* Thumbnail */}
              <div style={{ height:'140px', background:`linear-gradient(135deg,${A.blush},${A.petal})`, position:'relative', overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'40px' }}>
                {p.image
                  ? <img src={p.image} alt={p.title} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                  : <span style={{ opacity:0.35 }}>{CAT_ICONS[p.category]||'💻'}</span>}
                {/* Category badge */}
                <span style={{ position:'absolute', top:'10px', right:'10px', padding:'3px 10px', borderRadius:'20px', background:'rgba(255,255,255,0.9)', color:A.burgundy, fontSize:'11px', fontWeight:600 }}>
                  {CAT_ICONS[p.category]} {p.category}
                </span>
                {/* Org badge */}
                {p.org && (
                  <span style={{ position:'absolute', bottom:'10px', left:'10px', padding:'3px 10px', borderRadius:'20px', background:'rgba(107,26,42,0.75)', color:'#fff', fontSize:'10px' }}>
                    🏢 {p.org}
                  </span>
                )}
                {p.featured && (
                  <span style={{ position:'absolute', top:'10px', left:'10px', padding:'3px 10px', borderRadius:'20px', background:`linear-gradient(135deg,${A.burgundy},${A.rose})`, color:'#fff', fontSize:'10px', fontWeight:600 }}>⭐ Featured</span>
                )}
              </div>

              <div style={{ padding:'16px 18px' }}>
                <h3 style={{ fontFamily:'Cormorant Garamond', fontSize:'18px', color:A.textMain, fontWeight:600, marginBottom:'6px', lineHeight:1.3 }}>{p.title}</h3>
                <p style={{ fontSize:'12px', color:A.textMuted, lineHeight:1.6, marginBottom:'12px', display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' }}>{p.description}</p>

                {/* Tech tags */}
                {p.tech?.length > 0 && (
                  <div style={{ display:'flex', flexWrap:'wrap', gap:'5px', marginBottom:'14px' }}>
                    {p.tech.slice(0,4).map(t=>(
                      <span key={t} style={{ padding:'2px 9px', borderRadius:'20px', fontSize:'11px', background:A.blush, color:A.burgundy }}>{t}</span>
                    ))}
                    {p.tech.length > 4 && <span style={{ fontSize:'11px', color:A.textMuted }}>+{p.tech.length-4}</span>}
                  </div>
                )}

                <div style={{ display:'flex', gap:'8px', alignItems:'center' }}>
                  <button onClick={()=>openEdit(p)}
                    style={{ flex:1, padding:'7px', borderRadius:'8px', background:A.blush, border:`1px solid ${A.border}`, color:A.burgundy, fontSize:'12px', cursor:'pointer', fontWeight:500 }}>
                    Edit
                  </button>
                  <button onClick={()=>toggleFeatured(p._id)}
                    style={{ padding:'7px 12px', borderRadius:'8px', background:p.featured?`rgba(107,26,42,0.08)`:'transparent', border:`1px solid ${A.border}`, color:p.featured?A.burgundy:A.textMuted, fontSize:'11px', cursor:'pointer', transition:'all 0.2s' }}>
                    {p.featured ? '⭐' : '☆'}
                  </button>
                  {p.link && (
                    <a href={p.link} target="_blank" rel="noopener noreferrer"
                      style={{ padding:'7px 10px', borderRadius:'8px', background:'transparent', border:`1px solid ${A.border}`, color:A.textMuted, fontSize:'11px', transition:'all 0.2s', display:'flex', alignItems:'center' }}
                      onMouseEnter={e=>e.currentTarget.style.color=A.burgundy}
                      onMouseLeave={e=>e.currentTarget.style.color=A.textMuted}>
                      🔗
                    </a>
                  )}
                  <button onClick={()=>setDeleteId(p._id)}
                    style={{ padding:'7px 10px', borderRadius:'8px', background:'rgba(239,68,68,0.07)', border:'1px solid rgba(239,68,68,0.18)', color:'#991B1B', fontSize:'12px', cursor:'pointer' }}>
                    ×
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ══════════════════════════════════════════
          PROJECT FORM MODAL
      ══════════════════════════════════════════ */}
      {showForm && (
        <div style={{ position:'fixed', inset:0, background:'rgba(42,10,18,0.35)', backdropFilter:'blur(10px)', zIndex:200, display:'flex', alignItems:'flex-start', justifyContent:'center', padding:'16px', overflowY:'auto' }}>
          <div style={{ background:A.modalBg, borderRadius:'24px', border:`1px solid ${A.border}`, padding:'clamp(22px,4vw,38px)', width:'100%', maxWidth:'600px', marginTop:'24px', marginBottom:'24px', boxShadow:'0 32px 80px rgba(107,26,42,0.14)' }}>

            {/* Modal header */}
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'28px' }}>
              <div>
                <p style={{ fontSize:'11px', letterSpacing:'3px', textTransform:'uppercase', color:A.rose, marginBottom:'3px' }}>Techno Hub</p>
                <h2 style={{ fontFamily:'Cormorant Garamond', fontSize:'24px', color:A.textMain, fontWeight:500 }}>{editId ? 'Edit Project' : 'Add New Project'}</h2>
              </div>
              <button onClick={()=>setShowForm(false)}
                style={{ width:'34px', height:'34px', borderRadius:'50%', background:A.blush, border:`1px solid ${A.border}`, color:A.burgundy, fontSize:'16px', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
                ✕
              </button>
            </div>

            {/* Title + Category */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'14px' }}>
              <Field label="Project Title *">
                <input value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))}
                  placeholder="e.g. E-Commerce Platform" style={inp()}
                  onFocus={e=>{ e.target.style.borderColor=A.rose; e.target.style.boxShadow=`0 0 0 3px rgba(196,117,138,0.1)`; }}
                  onBlur={e=>{ e.target.style.borderColor=A.border; e.target.style.boxShadow='none'; }}
                />
              </Field>
              <Field label="Category *">
                <select value={form.category} onChange={e=>setForm(f=>({...f,category:e.target.value}))}
                  style={{ ...inp(), background:A.inputBg }}>
                  <option value="">Select…</option>
                  {PROJ_CATS.map(c=><option key={c} value={c}>{CAT_ICONS[c]} {c}</option>)}
                </select>
              </Field>
            </div>

            {/* Description */}
            <Field label="Description">
              <textarea value={form.description} onChange={e=>setForm(f=>({...f,description:e.target.value}))}
                rows={3} placeholder="What was built, what problem it solved…"
                style={{ ...inp(), resize:'vertical' }}
                onFocus={e=>{ e.target.style.borderColor=A.rose; e.target.style.boxShadow=`0 0 0 3px rgba(196,117,138,0.1)`; }}
                onBlur={e=>{ e.target.style.borderColor=A.border; e.target.style.boxShadow='none'; }}
              />
            </Field>

            {/* Org + Link */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'14px' }}>
              <Field label="Organisation">
                <input value={form.org} onChange={e=>setForm(f=>({...f,org:e.target.value}))}
                  placeholder="e.g. Code Master Technology" style={inp()}
                  onFocus={e=>{ e.target.style.borderColor=A.rose; e.target.style.boxShadow=`0 0 0 3px rgba(196,117,138,0.1)`; }}
                  onBlur={e=>{ e.target.style.borderColor=A.border; e.target.style.boxShadow='none'; }}
                />
              </Field>
              <Field label="Live / GitHub Link">
                <input value={form.link} onChange={e=>setForm(f=>({...f,link:e.target.value}))}
                  placeholder="https://…" style={inp()}
                  onFocus={e=>{ e.target.style.borderColor=A.rose; e.target.style.boxShadow=`0 0 0 3px rgba(196,117,138,0.1)`; }}
                  onBlur={e=>{ e.target.style.borderColor=A.border; e.target.style.boxShadow='none'; }}
                />
              </Field>
            </div>

            {/* Tech stack */}
            <Field label="Tech Stack (comma separated)" note="e.g. React, Node.js, MongoDB, Python">
              <input value={form.tech} onChange={e=>setForm(f=>({...f,tech:e.target.value}))}
                placeholder="React, Node.js, MongoDB…" style={inp()}
                onFocus={e=>{ e.target.style.borderColor=A.rose; e.target.style.boxShadow=`0 0 0 3px rgba(196,117,138,0.1)`; }}
                onBlur={e=>{ e.target.style.borderColor=A.border; e.target.style.boxShadow='none'; }}
              />
            </Field>

            {/* Image */}
            <Field label="Project Image" note="Upload a screenshot or banner. Stored on Cloudinary.">
              <div style={{ display:'flex', gap:'12px', alignItems:'flex-start', flexWrap:'wrap' }}>
                {/* Preview */}
                {imgPreview && (
                  <div style={{ width:'80px', height:'60px', borderRadius:'10px', overflow:'hidden', border:`1px solid ${A.border}`, flexShrink:0 }}>
                    <img src={imgPreview} alt="preview" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                  </div>
                )}
                <div style={{ flex:1, minWidth:'180px' }}>
                  <input ref={fileRef} type="file" accept="image/*" onChange={handleFileSelect} style={{ display:'none' }} />
                  <button type="button" onClick={()=>fileRef.current?.click()}
                    style={{ width:'100%', padding:'12px', borderRadius:'10px', border:`2px dashed rgba(196,117,138,0.3)`, background:A.blush, color:A.rose, fontSize:'13px', cursor:'pointer', fontFamily:'DM Sans', fontWeight:500, transition:'all 0.2s' }}
                    onMouseEnter={e=>e.currentTarget.style.borderColor=A.rose}
                    onMouseLeave={e=>e.currentTarget.style.borderColor='rgba(196,117,138,0.3)'}>
                    📁 {imgFile ? imgFile.name : 'Choose Image'}
                  </button>
                  <p style={{ fontSize:'11px', color:A.textLight, marginTop:'5px' }}>Or paste a URL:</p>
                  <input value={form.image} onChange={e=>{ setForm(f=>({...f,image:e.target.value})); setImgPreview(e.target.value); }}
                    placeholder="https://res.cloudinary.com/…" style={{ ...inp(), marginTop:'5px', fontSize:'12px', padding:'9px 12px' }}
                    onFocus={e=>{ e.target.style.borderColor=A.rose; }}
                    onBlur={e=>{ e.target.style.borderColor=A.border; }}
                  />
                </div>
              </div>
            </Field>

            {/* Order + Featured row */}
            <div style={{ display:'grid', gridTemplateColumns:'120px 1fr', gap:'14px', marginBottom:'26px', alignItems:'center' }}>
              <Field label="Display Order">
                <input type="number" value={form.order} onChange={e=>setForm(f=>({...f,order:e.target.value}))}
                  placeholder="0" style={inp()}
                  onFocus={e=>{ e.target.style.borderColor=A.rose; }}
                  onBlur={e=>{ e.target.style.borderColor=A.border; }}
                />
              </Field>
              <div onClick={()=>setForm(f=>({...f,featured:!f.featured}))}
                style={{ display:'flex', alignItems:'center', gap:'12px', padding:'13px 15px', borderRadius:'12px', background:form.featured?A.blush:'transparent', border:`1px solid ${form.featured?A.borderStrong:A.border}`, cursor:'pointer', transition:'all 0.2s', marginTop:'20px' }}>
                <div style={{ width:'20px', height:'20px', borderRadius:'5px', background:form.featured?`linear-gradient(135deg,${A.burgundy},${A.rose})`:'transparent', border:`2px solid ${form.featured?A.rose:A.border}`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, transition:'all 0.2s' }}>
                  {form.featured && <span style={{ color:'#fff', fontSize:'11px', fontWeight:700 }}>✓</span>}
                </div>
                <p style={{ fontSize:'14px', color:A.textMain, fontWeight:form.featured?600:400 }}>⭐ Mark as Featured</p>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display:'flex', gap:'10px' }}>
              <button onClick={save} disabled={saving||uploading}
                style={{ flex:1, padding:'13px', borderRadius:'13px', background:(saving||uploading)?'rgba(107,26,42,0.35)':`linear-gradient(135deg,${A.burgundy},${A.rose})`, color:'#fff', fontWeight:700, fontSize:'15px', cursor:(saving||uploading)?'not-allowed':'pointer', opacity:(saving||uploading)?0.7:1, boxShadow:`0 5px 18px rgba(107,26,42,0.22)`, border:'none', transition:'all 0.2s' }}>
                {uploading ? 'Uploading image…' : saving ? 'Saving…' : editId ? 'Update Project' : 'Create Project'}
              </button>
              <button onClick={()=>setShowForm(false)}
                style={{ padding:'13px 20px', borderRadius:'13px', background:A.blush, border:`1px solid ${A.border}`, color:A.textMain, cursor:'pointer', fontSize:'15px', fontWeight:500 }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Delete confirm ── */}
      {deleteId && (
        <div style={{ position:'fixed', inset:0, background:'rgba(42,10,18,0.35)', backdropFilter:'blur(10px)', zIndex:200, display:'flex', alignItems:'center', justifyContent:'center', padding:'16px' }}>
          <div style={{ background:A.modalBg, borderRadius:'22px', border:'1px solid rgba(239,68,68,0.2)', padding:'36px', maxWidth:'360px', width:'100%', textAlign:'center', boxShadow:'0 24px 60px rgba(107,26,42,0.12)' }}>
            <span style={{ fontSize:'44px' }}>🗑️</span>
            <h3 style={{ fontFamily:'Cormorant Garamond', fontSize:'22px', color:A.textMain, margin:'14px 0 7px', fontWeight:500 }}>Delete Project?</h3>
            <p style={{ color:A.textMuted, fontSize:'14px', marginBottom:'24px', lineHeight:1.6 }}>
              This will permanently remove the project and its image from Cloudinary. Cannot be undone.
            </p>
            <div style={{ display:'flex', gap:'10px' }}>
              <button onClick={confirmDelete} style={{ flex:1, padding:'12px', borderRadius:'10px', background:'#EF4444', color:'#fff', fontWeight:700, cursor:'pointer', fontSize:'14px', border:'none' }}>Yes, Delete</button>
              <button onClick={()=>setDeleteId(null)} style={{ flex:1, padding:'12px', borderRadius:'10px', background:A.blush, border:`1px solid ${A.border}`, color:A.textMain, cursor:'pointer', fontSize:'14px' }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}