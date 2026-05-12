import React, { useState, useEffect, useRef } from 'react';
import { useOutletContext } from 'react-router-dom';
import { A, inp } from './theme.js';
import { apiFetch } from '../../utils/api.js'; 

const PROJ_CATS = ['Web Dev','Design','Digital Marketing','SEO','Video','Social Media','Data Analysis','Machine Learning','Other'];
const CAT_ICONS = { 'Web Dev':'🌐','Design':'✏️','Digital Marketing':'📣','SEO':'🔍','Video':'🎬','Social Media':'📱','Data Analysis':'📊','Machine Learning':'🤖','Other':'📁' };

// ✅ Updated EMPTY state to include media array instead of a single image string
const EMPTY = { title:'', description:'', category:'', org:'', media:[], link:'', tech:'', featured:false, order:0 };

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
    apiFetch(`/api/projects`)
      .then(r => r.json())
      .then(d => { setProjects(Array.isArray(d)?d:[]); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(fetchProjects, [ctx.lastRefresh]);

  const openCreate = () => { setForm(EMPTY); setEditId(null); setImgPreview(''); setImgFile(null); setShowForm(true); };

  const openEdit = p => {
    // ✅ Maps media[0].url to preview for editing
    setForm({ 
        title:p.title||'', 
        description:p.description||'', 
        category:p.category||'', 
        org:p.org||'', 
        media:p.media||[], 
        link:p.link||'', 
        tech:(p.tech||[]).join(', '), 
        featured:p.featured||false, 
        order:p.order||0 
    });
    setEditId(p._id); 
    setImgPreview(p.media?.[0]?.url || ''); 
    setImgFile(null); 
    setShowForm(true);
  };

  const handleFile = e => {
    const file = e.target.files[0]; if (!file) return;
    setImgFile(file); 
    setImgPreview(URL.createObjectURL(file)); 
    e.target.value='';
  };

  const save = async () => {
    if (!form.title.trim()) return toast('Project title is required','err');
    if (!form.category)     return toast('Please select a category','err');
    setSaving(true);
    try {
      let currentMedia = [...form.media];

      if (imgFile) {
        setUploading(true);
        const fd = new FormData(); 
        fd.append('file', imgFile);

        const r = await apiFetch(`/api/upload`, { method:'POST', body:fd });
        const d = await r.json(); 
        if (!d.url) throw new Error('Upload failed');

        // ✅ Determine if uploaded file is video or image
        const isVideo = imgFile.type.startsWith('video/');
        
        // For this UI, we replace or add to the first slot
        const newMediaItem = {
            url: d.url,
            public_id: d.public_id || '',
            type: isVideo ? 'video' : 'image'
        };

        currentMedia = [newMediaItem]; // Using as single primary media for now
        setUploading(false);
      }

      const body = { 
        ...form, 
        media: currentMedia, 
        tech: form.tech.split(',').map(t=>t.trim()).filter(Boolean), 
        order: Number(form.order)||0 
      };

      const res = await apiFetch(
        editId ? `/api/projects/${editId}` : `/api/projects`,
        {
          method: editId ? 'PUT' : 'POST',
          body: JSON.stringify(body)
        }
      );

      if (!res.ok) throw new Error((await res.json()).message||'Save failed');

      fetchProjects(); setShowForm(false); toast(editId?'Project updated!':'Project created!');
    } catch(err) { toast(err.message,'err'); setUploading(false); } finally { setSaving(false); }
  };

  const toggleFeatured = async id => {
    await apiFetch(`/api/projects/${id}/featured`, { method:'PATCH' });
    fetchProjects();
  };

  const confirmDelete = async () => {
    try {
      await apiFetch(`/api/projects/${deleteId}`, { method:'DELETE' });
      fetchProjects(); setDeleteId(null); toast('Deleted!');
    } catch { toast('Delete failed','err'); }
  };

  const all = projects.filter(p =>
    (catF==='All'||p.category===catF) &&
    (orgF==='All'||(orgF==='cmt'?p.org?.toLowerCase().includes('code master'):!p.org?.toLowerCase().includes('code master'))) &&
    (!search||p.title?.toLowerCase().includes(search.toLowerCase()))
  );

  const cmtProjects       = all.filter(p => p.org?.toLowerCase().includes('code master'));
  const freelanceProjects = all.filter(p => !p.org?.toLowerCase().includes('code master'));

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
        {[
            { label:'Total', value:projects.length, color:A.burgundy },
            { label:'Code Master', value:projects.filter(p=>p.org?.toLowerCase().includes('code master')).length, color:A.rose },
            { label:'Freelance', value:projects.filter(p=>!p.org?.toLowerCase().includes('code master')).length, color:A.textMuted },
            { label:'Featured', value:projects.filter(p=>p.featured).length, color:A.textMuted },
        ].map(s=>(
          <div key={s.label} style={{ padding:'12px 14px', borderRadius:'12px', background:A.cardBg, border:`1.5px solid ${A.border}`, boxShadow:'0 1px 6px rgba(92,19,34,0.05)' }}>
            <p style={{ fontFamily:'Cormorant Garamond', fontSize:'clamp(18px,3vw,24px)', fontWeight:700, color:s.color, lineHeight:1 }}>{s.value}</p>
            <p style={{ fontSize:'10px', color:A.textLight, marginTop:'3px' }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display:'flex', gap:'7px', marginBottom:'16px', flexWrap:'wrap', alignItems:'center' }}>
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
          {[1,2,3,4].map(i=>(
            <div key={i} style={{ height:'180px', borderRadius:'14px', background:A.cardBg, border:`1.5px solid ${A.border}`, opacity:0.5 }} />
          ))}
        </div>
      ) : (
        <>
          <div style={{ marginBottom:'36px' }}>
            <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'16px' }}>
              <div style={{ width:'32px', height:'32px', borderRadius:'8px', background:`linear-gradient(135deg,${A.burgundy},${A.rose})`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'16px' }}>🏢</div>
              <h2 style={{ fontFamily:'Cormorant Garamond', fontSize:'clamp(17px,2.5vw,22px)', color:A.textMain, fontWeight:700 }}>Code Master Technology</h2>
            </div>
            {renderGrid(cmtProjects, 'No projects yet.')}
          </div>

          <div>
            <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'16px' }}>
              <div style={{ width:'32px', height:'32px', borderRadius:'8px', background:`linear-gradient(135deg,#6B8FD4,#A67CC5)`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'16px' }}>💼</div>
              <h2 style={{ fontFamily:'Cormorant Garamond', fontSize:'clamp(17px,2.5vw,22px)', color:A.textMain, fontWeight:700 }}>Freelance Work</h2>
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
              <h2 style={{ fontFamily:'Cormorant Garamond', fontSize:'22px', color:A.textMain, fontWeight:700 }}>{editId?'Edit Project':'Add New Project'}</h2>
              <button onClick={()=>setShowForm(false)} style={{ width:'32px', height:'32px', borderRadius:'50%', background:A.blush, border:`1.5px solid ${A.border}`, color:A.burgundy, fontSize:'15px', cursor:'pointer' }}>✕</button>
            </div>

            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px', marginBottom:'14px' }}>
              <div>
                <label style={LBL}>Title *</label>
                <input value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))} style={inp()} />
              </div>
              <div>
                <label style={LBL}>Category *</label>
                <select value={form.category} onChange={e=>setForm(f=>({...f,category:e.target.value}))} style={{ ...inp(), background:A.inputBg }}>
                  <option value="">Select…</option>
                  {PROJ_CATS.map(c=><option key={c} value={c}>{CAT_ICONS[c]} {c}</option>)}
                </select>
              </div>
            </div>

            <div style={{ marginBottom:'14px' }}>
              <label style={LBL}>Description</label>
              <textarea value={form.description} onChange={e=>setForm(f=>({...f,description:e.target.value}))} rows={3} style={{ ...inp(), resize:'vertical' }} />
            </div>

            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px', marginBottom:'14px' }}>
              <div>
                <label style={LBL}>Organisation</label>
                <input value={form.org} onChange={e=>setForm(f=>({...f,org:e.target.value}))} style={inp()} />
              </div>
              <div>
                <label style={LBL}>Link</label>
                <input value={form.link} onChange={e=>setForm(f=>({...f,link:e.target.value}))} style={inp()} />
              </div>
            </div>

            <div style={{ marginBottom:'14px' }}>
              <label style={LBL}>Tech Stack</label>
              <input value={form.tech} onChange={e=>setForm(f=>({...f,tech:e.target.value}))} placeholder="React, Node.js..." style={inp()} />
            </div>

            {/* ✅ Media Upload (Images/Videos) */}
            <div style={{ marginBottom:'14px' }}>
              <label style={LBL}>Project Media (Image/Video)</label>
              <div style={{ display:'flex', gap:'12px', alignItems:'flex-start' }}>
                {imgPreview && (
                    <div style={{ width:'80px', height:'60px', borderRadius:'8px', overflow:'hidden', border:`1px solid ${A.border}`, background:A.blush }}>
                        {imgFile?.type.startsWith('video/') || form.media?.[0]?.type === 'video' ? (
                            <video src={imgPreview} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                        ) : (
                            <img src={imgPreview} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                        )}
                    </div>
                )}
                <div style={{ flex:1 }}>
                  <input ref={fileRef} type="file" accept="image/*,video/*" onChange={handleFile} style={{ display:'none' }} />
                  <button type="button" onClick={()=>fileRef.current?.click()} style={{ width:'100%', padding:'10px', borderRadius:'10px', border:`2px dashed ${A.rose}`, background:A.petal, color:A.rose, fontSize:'12px', fontWeight:600 }}>
                    📁 {imgFile ? imgFile.name : 'Upload File'}
                  </button>
                </div>
              </div>
            </div>

            <div style={{ display:'flex', gap:'10px', marginTop:'20px' }}>
              <button onClick={save} disabled={saving||uploading} style={{ flex:1, padding:'13px', borderRadius:'12px', background:(saving||uploading)?'#ccc':`linear-gradient(135deg,${A.burgundy},${A.rose})`, color:'#fff', fontWeight:700, border:'none' }}>
                {uploading?'Uploading…':saving?'Saving…':editId?'Update':'Create'}
              </button>
              <button onClick={()=>setShowForm(false)} style={{ padding:'13px 18px', borderRadius:'12px', background:A.blush, border:`1.5px solid ${A.border}`, color:A.textMain }}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {deleteId && (
        <div style={{ position:'fixed', inset:0, background:'rgba(42,10,18,0.3)', backdropFilter:'blur(8px)', zIndex:200, display:'flex', alignItems:'center', justifyContent:'center' }}>
          <div style={{ background:A.modalBg, borderRadius:'20px', padding:'30px', maxWidth:'320px', width:'100%', textAlign:'center' }}>
            <h3 style={{ fontFamily:'Cormorant Garamond', fontSize:'20px', color:A.textMain, fontWeight:700 }}>Delete Project?</h3>
            <div style={{ display:'flex', gap:'10px', marginTop:'20px' }}>
              <button onClick={confirmDelete} style={{ flex:1, padding:'10px', borderRadius:'10px', background:'#EF4444', color:'#fff', border:'none' }}>Delete</button>
              <button onClick={()=>setDeleteId(null)} style={{ flex:1, padding:'10px', borderRadius:'10px', background:A.blush, border:`1.5px solid ${A.border}` }}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .proj-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 14px; }
      `}</style>
    </div>
  );
}

function ProjectCard({ p, onEdit, onDelete, onFeatured }) {
  const mainMedia = p.media?.[0];

  return (
    <div style={{ borderRadius:'14px', overflow:'hidden', background:A.cardBg, border:`1.5px solid ${A.border}`, boxShadow:'0 1px 6px rgba(0,0,0,0.05)' }}>
      <div style={{ height:'120px', background:A.blush, position:'relative', display:'flex', alignItems:'center', justifyContent:'center' }}>
        {/* ✅ Logic to handle Video or Image in Card */}
        {mainMedia ? (
          mainMedia.type === 'video' ? (
            <video 
                src={mainMedia.url} 
                style={{ width:'100%', height:'100%', objectFit:'cover' }} 
                muted loop onMouseEnter={e => e.target.play()} onMouseLeave={e => e.target.pause()} 
            />
          ) : (
            <img src={mainMedia.url} alt={p.title} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
          )
        ) : (
          <span style={{ opacity:0.3 }}>{CAT_ICONS[p.category] || '💻'}</span>
        )}
        
        <div style={{ position:'absolute', top:'8px', right:'8px', padding:'2px 8px', borderRadius:'20px', background:'rgba(255,255,255,0.9)', fontSize:'10px', fontWeight:700 }}>
          {CAT_ICONS[p.category]} {p.category}
        </div>
      </div>

      <div style={{ padding:'12px' }}>
        <p style={{ fontFamily:'Cormorant Garamond', fontSize:'15px', color:A.textMain, fontWeight:700, marginBottom:'4px' }}>{p.title}</p>
        <div style={{ display:'flex', gap:'6px' }}>
          <button onClick={()=>onEdit(p)} style={{ flex:1, padding:'5px', borderRadius:'7px', background:A.blush, border:`1px solid ${A.border}`, fontSize:'11px', fontWeight:700 }}>Edit</button>
          <button onClick={()=>onFeatured(p._id)} style={{ padding:'5px 8px', borderRadius:'7px', background:'white', border:`1px solid ${A.border}` }}>{p.featured?'⭐':'☆'}</button>
          <button onClick={()=>onDelete(p._id)} style={{ padding:'5px 8px', borderRadius:'7px', background:'#FEF2F2', border:'1px solid #FCA5A5', color:'#991B1B' }}>×</button>
        </div>
      </div>
    </div>
  );
}