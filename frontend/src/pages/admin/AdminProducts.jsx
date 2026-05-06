import React, { useState, useEffect, useRef } from 'react';
import { useOutletContext } from 'react-router-dom';
import { A, inp } from './theme.js';

const CATEGORIES = ['Magazine','Bouquets','Hampers','Keychains','Trousseau Packing','Crochet'];
const ALL_TAGS   = ['for-him','for-her','money','anniversary','birthday','bride/groom','brochure','keychain','flowers','chocolates','surprises','dosti','return-gifts','pictures'];
const EMPTY      = { name:'', description:'', price:'', category:'', tags:[], featured:false };

function Toast({ msg }) {
  if (!msg.text) return null;
  const map = { ok:A.success, err:A.error, info:A.info };
  const c = map[msg.type] || A.info;
  return <div style={{ padding:'10px 16px', borderRadius:'10px', marginBottom:'18px', background:c.bg, border:`1.5px solid ${c.bd}`, color:c.tx, fontSize:'13px', fontWeight:500 }}>{msg.text}</div>;
}

export default function AdminProducts() {
 const backendurl = import.meta.env.VITE_backendurl ;
  const ctx = useOutletContext() || {};
  const [products, setProducts]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [showForm, setShowForm]   = useState(false);
  const [form, setForm]           = useState(EMPTY);
  const [editId, setEditId]       = useState(null);
  const [saving, setSaving]       = useState(false);
  const [uploading, setUploading] = useState(false);
  const [catF, setCatF]           = useState('All');
  const [search, setSearch]       = useState('');
  const [deleteId, setDeleteId]   = useState(null);
  const [msg, setMsg]             = useState({ text:'', type:'' });
  const [existingImages, setExistingImages] = useState([]);
  const [newFiles, setNewFiles]             = useState([]);
  const [previews, setPreviews]             = useState([]);
  const fileRef = useRef();

  useEffect(() => () => previews.forEach(URL.revokeObjectURL), []);

  const fetchProds = () => {
    setLoading(true);
    fetch(`${backendurl}/api/products`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(r => r.json())
      .then(d => { setProducts(Array.isArray(d)?d:[]); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(fetchProds, [ctx.lastRefresh]);

  const toast = (text, type='ok') => { setMsg({ text, type }); setTimeout(()=>setMsg({ text:'', type:'' }), 3500); };

  const openCreate = () => { setForm(EMPTY); setEditId(null); setExistingImages([]); setNewFiles([]); setPreviews([]); setShowForm(true); };
  const openEdit = p => {
    setForm({ name:p.name||'', description:p.description||'', price:p.price||'', category:p.category||'', tags:p.tags||[], featured:p.featured||false });
    setEditId(p._id); setExistingImages(p.images||[]); setNewFiles([]); setPreviews([]); setShowForm(true);
  };

  const toggleTag = tag => setForm(f => ({ ...f, tags: f.tags.includes(tag) ? f.tags.filter(t=>t!==tag) : [...f.tags, tag] }));

  const handleFiles = e => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setPreviews(p => [...p, ...files.map(f => URL.createObjectURL(f))]);
    setNewFiles(p => [...p, ...files]);
    e.target.value = '';
  };

  const removeExisting = async url => {
    if (editId) {
      try {
        await fetch(`${backendurl}/api/products/${editId}/images`, {
          method:'DELETE',
          headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            'Content-Type':'application/json'
          },
          body:JSON.stringify({ imageUrl:url })
        });
        toast('Image removed');
      } catch { toast('Remove failed','err'); return; }
    }
    setExistingImages(p => p.filter(u => u !== url));
  };

  const removeNew = i => {
    URL.revokeObjectURL(previews[i]);
    setPreviews(p=>p.filter((_,x)=>x!==i));
    setNewFiles(p=>p.filter((_,x)=>x!==i));
  };

  const save = async () => {
    if (!form.name.trim()) return toast('Product name is required','err');
    if (!form.category)    return toast('Please select a category','err');
    setSaving(true);
    try {
      let pid = editId;

      if (!editId) {
        const res = await fetch(`${backendurl}/api/products`, {
          method:'POST',
          headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            'Content-Type':'application/json'
          },
          body:JSON.stringify({ ...form, price:Number(form.price)||0, images:[] })
        });
        const d = await res.json();
        if (!res.ok) throw new Error(d.message||'Create failed');
        pid = d._id;
      } else {
        const res = await fetch(`${backendurl}/api/products/${editId}`, {
          method:'PUT',
          headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            'Content-Type':'application/json'
          },
          body:JSON.stringify({ ...form, price:Number(form.price)||0 })
        });
        if (!res.ok) throw new Error('Update failed');
      }

      if (newFiles.length) {
        setUploading(true);
        const urls = [];

        for (const file of newFiles) {
          const fd = new FormData();
          fd.append('file', file);

          const r = await fetch(`${backendurl}/api/upload`, {
            method:'POST',
            headers:{
              Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            body:fd
          });

          const d = await r.json();
          if (d.url) urls.push(d.url);
        }

        if (urls.length) {
          await fetch(`${backendurl}/api/products/${pid}/images`, {
            method:'POST',
            headers:{
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              'Content-Type':'application/json'
            },
            body:JSON.stringify({ imageUrls:urls })
          });
        }

        setUploading(false);
      }

      fetchProds();
      setShowForm(false);
      toast(editId?'Product updated!':'Product created!');

    } catch(err) {
      toast(err.message,'err');
      setUploading(false);
    } finally {
      setSaving(false);
    }
  };

  const toggleFeatured = async id => {
    await fetch(`${backendurl}/api/products/${id}/featured`, {
      method:'PATCH',
      headers:{
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });
    fetchProds();
  };

  const confirmDelete = async () => {
    try {
      await fetch(`${backendurl}/api/products/${deleteId}`, {
        method:'DELETE',
        headers:{
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      fetchProds();
      setDeleteId(null);
      toast('Deleted!');
    } catch {
      toast('Delete failed','err');
    }
  };

  const filtered = products.filter(p => (catF==='All'||p.category===catF) && (!search||p.name?.toLowerCase().includes(search.toLowerCase())));

  const imgCell = p => (
    <div style={{ width:'40px', height:'40px', borderRadius:'9px', overflow:'hidden', background:A.blush, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'16px', flexShrink:0 }}>
      {p.images?.[0] ? <img src={p.images[0]} alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }} /> : '🎁'}
    </div>
  );

  return (
    <div>
      {/* Header */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'22px', flexWrap:'wrap', gap:'10px' }}>
        <div>
          <p style={{ fontSize:'11px', letterSpacing:'3px', textTransform:'uppercase', color:A.rose, marginBottom:'3px' }}>Gifting Hub</p>
          <h1 style={{ fontFamily:'Cormorant Garamond', fontSize:'clamp(20px,3vw,26px)', color:A.textMain, fontWeight:700 }}>Manage Products</h1>
        </div>
        <button onClick={openCreate} style={{ padding:'9px 20px', borderRadius:'11px', background:`linear-gradient(135deg,${A.burgundy},${A.rose})`, color:'#fff', fontWeight:700, fontSize:'13px', cursor:'pointer', border:'none', boxShadow:`0 3px 12px rgba(92,19,34,0.22)` }}>
          + Add Product
        </button>
      </div>

      <Toast msg={msg} />

      {/* Stats */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(110px,1fr))', gap:'10px', marginBottom:'20px' }}>
        {[{ label:'Total', value:products.length, color:A.burgundy },{ label:'Featured', value:products.filter(p=>p.featured).length, color:A.rose }, ...CATEGORIES.map(c=>({ label:c, value:products.filter(p=>p.category===c).length, color:A.textMuted }))].map(s=>(
          <div key={s.label} style={{ padding:'12px 14px', borderRadius:'12px', background:A.cardBg, border:`1.5px solid ${A.border}`, boxShadow:'0 1px 6px rgba(92,19,34,0.05)' }}>
            <p style={{ fontFamily:'Cormorant Garamond', fontSize:'clamp(18px,3vw,24px)', fontWeight:700, color:s.color, lineHeight:1 }}>{s.value}</p>
            <p style={{ fontSize:'10px', color:A.textLight, marginTop:'3px' }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display:'flex', gap:'7px', marginBottom:'16px', flexWrap:'wrap', alignItems:'center' }}>
        {['All',...CATEGORIES].map(c=>(
          <button key={c} onClick={()=>setCatF(c)} style={{ padding:'6px 12px', borderRadius:'40px', fontSize:'12px', cursor:'pointer', fontFamily:'DM Sans', transition:'all 0.18s', background:catF===c?`linear-gradient(135deg,${A.burgundy},${A.rose})`:A.blush, color:catF===c?'#fff':A.textMuted, border:catF===c?'none':`1.5px solid ${A.border}`, fontWeight:catF===c?700:400 }}>{c}</button>
        ))}
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search…"
          style={{ ...inp(), maxWidth:'170px', padding:'7px 12px', marginLeft:'auto' }}
          onFocus={e=>{ e.target.style.borderColor=A.rose; e.target.style.boxShadow=`0 0 0 3px rgba(176,80,112,0.1)`; }}
          onBlur={e=>{ e.target.style.borderColor=A.border; e.target.style.boxShadow='none'; }}
        />
      </div>

      {/* ── PRODUCTS TABLE
           Desktop (≥769px): full 5-col table
           Mobile (<768px):  3 cols only — image | name | edit+delete
      ── */}
      {loading ? (
        <div style={{ textAlign:'center', padding:'48px', color:A.textLight }}>Loading…</div>
      ) : (
        <div style={{ background:A.cardBg, borderRadius:'16px', border:`1.5px solid ${A.border}`, overflow:'hidden', boxShadow:'0 3px 16px rgba(92,19,34,0.06)' }}>
          <div style={{ overflowX:'auto' }}>
            <table style={{ width:'100%', borderCollapse:'collapse' }}>
              <thead>
                <tr style={{ background:A.petal, borderBottom:`1.5px solid ${A.border}` }}>
                  {/* Always visible */}
                  <th style={TH}>Image</th>
                  <th style={TH}>Product</th>
                  {/* Hide on mobile */}
                  <th style={{ ...TH, ...hideMobile }}>Category</th>
                  <th style={{ ...TH, ...hideMobile }}>Price</th>
                  <th style={{ ...TH, ...hideMobile }}>Featured</th>
                  <th style={TH}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={6} style={{ padding:'40px', textAlign:'center', color:A.textLight, fontFamily:'Cormorant Garamond', fontSize:'18px', fontStyle:'italic' }}>No products found</td></tr>
                ) : filtered.map(p => (
                  <tr key={p._id} style={{ borderBottom:`1px solid rgba(92,19,34,0.07)`, transition:'background 0.15s' }}
                    onMouseEnter={e=>e.currentTarget.style.background=A.petal}
                    onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                    {/* Image */}
                    <td style={{ padding:'10px 12px', width:'52px' }}>{imgCell(p)}</td>
                    {/* Name */}
                    <td style={{ padding:'10px 12px' }}>
                      <p style={{ fontSize:'13px', color:A.textMain, fontWeight:600, lineHeight:1.3 }}>{p.name}</p>
                      {/* Show category/price inline on mobile */}
                      <p style={{ fontSize:'11px', color:A.textMuted, marginTop:'2px' }} className="mobile-sub">{p.category} {p.price ? `· ₹${Number(p.price).toLocaleString('en-IN')}` : ''}</p>
                    </td>
                    {/* Desktop-only cols */}
                    <td style={{ padding:'10px 12px', ...hideMobile }}>
                      <span style={{ padding:'3px 10px', borderRadius:'20px', background:A.blush, color:A.burgundy, fontSize:'11px', fontWeight:600 }}>{p.category}</span>
                    </td>
                    <td style={{ padding:'10px 12px', fontFamily:'Cormorant Garamond', fontSize:'17px', color:A.burgundy, fontWeight:700, whiteSpace:'nowrap', ...hideMobile }}>
                      {p.price ? `₹${Number(p.price).toLocaleString('en-IN')}` : '—'}
                    </td>
                    <td style={{ padding:'10px 12px', ...hideMobile }}>
                      <button onClick={()=>toggleFeatured(p._id)} style={{ padding:'4px 11px', borderRadius:'20px', background:p.featured?A.blush:'transparent', border:`1.5px solid ${p.featured?A.borderStrong:A.border}`, color:p.featured?A.burgundy:A.textMuted, fontSize:'11px', cursor:'pointer', fontWeight:p.featured?700:400 }}>
                        {p.featured?'✨ Yes':'No'}
                      </button>
                    </td>
                    {/* Actions */}
                    <td style={{ padding:'10px 12px' }}>
                      <div style={{ display:'flex', gap:'6px' }}>
                        <button onClick={()=>openEdit(p)} style={{ padding:'6px 12px', borderRadius:'8px', background:A.blush, border:`1.5px solid ${A.border}`, color:A.burgundy, fontSize:'12px', cursor:'pointer', fontWeight:600, whiteSpace:'nowrap' }}>Edit</button>
                        <button onClick={()=>setDeleteId(p._id)} style={{ padding:'6px 10px', borderRadius:'8px', background:'#FEF2F2', border:'1.5px solid #FCA5A5', color:'#991B1B', fontSize:'12px', cursor:'pointer', whiteSpace:'nowrap' }}>Del</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ══ FORM MODAL ══ */}
      {showForm && (
        <div style={{ position:'fixed', inset:0, background:'rgba(42,10,18,0.3)', backdropFilter:'blur(8px)', zIndex:200, display:'flex', alignItems:'flex-start', justifyContent:'center', padding:'16px', overflowY:'auto' }}>
          <div style={{ background:A.modalBg, borderRadius:'22px', border:`1.5px solid ${A.border}`, padding:'clamp(20px,3.5vw,36px)', width:'100%', maxWidth:'620px', marginTop:'20px', marginBottom:'20px', boxShadow:'0 24px 60px rgba(92,19,34,0.14)' }}>

            {/* Modal header */}
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'24px' }}>
              <div>
                <p style={{ fontSize:'11px', letterSpacing:'3px', textTransform:'uppercase', color:A.rose, marginBottom:'3px' }}>Gifting Hub</p>
                <h2 style={{ fontFamily:'Cormorant Garamond', fontSize:'22px', color:A.textMain, fontWeight:700 }}>{editId?'Edit Product':'Add New Product'}</h2>
              </div>
              <button onClick={()=>setShowForm(false)} style={{ width:'32px', height:'32px', borderRadius:'50%', background:A.blush, border:`1.5px solid ${A.border}`, color:A.burgundy, fontSize:'15px', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700 }}>✕</button>
            </div>

            {/* Name + Price */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px', marginBottom:'14px' }}>
              <div>
                <label style={LBL}>Product Name *</label>
                <input value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} placeholder="e.g. Custom Love Magazine" style={inp()}
                  onFocus={e=>{ e.target.style.borderColor=A.rose; e.target.style.boxShadow=`0 0 0 3px rgba(176,80,112,0.1)`; }}
                  onBlur={e=>{ e.target.style.borderColor=A.border; e.target.style.boxShadow='none'; }} />
              </div>
              <div>
                <label style={LBL}>Price (₹)</label>
                <input type="number" value={form.price} onChange={e=>setForm(f=>({...f,price:e.target.value}))} placeholder="599" style={inp()}
                  onFocus={e=>{ e.target.style.borderColor=A.rose; e.target.style.boxShadow=`0 0 0 3px rgba(176,80,112,0.1)`; }}
                  onBlur={e=>{ e.target.style.borderColor=A.border; e.target.style.boxShadow='none'; }} />
              </div>
            </div>

            {/* Category */}
            <div style={{ marginBottom:'14px' }}>
              <label style={LBL}>Category *</label>
              <select value={form.category} onChange={e=>setForm(f=>({...f,category:e.target.value}))} style={{ ...inp(), background:A.inputBg }}
                onFocus={e=>e.target.style.borderColor=A.rose} onBlur={e=>e.target.style.borderColor=A.border}>
                <option value="">Select a category…</option>
                {CATEGORIES.map(c=><option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            {/* Description */}
            <div style={{ marginBottom:'14px' }}>
              <label style={LBL}>Description</label>
              <textarea value={form.description} onChange={e=>setForm(f=>({...f,description:e.target.value}))} rows={3} placeholder="Describe this product…" style={{ ...inp(), resize:'vertical' }}
                onFocus={e=>{ e.target.style.borderColor=A.rose; e.target.style.boxShadow=`0 0 0 3px rgba(176,80,112,0.1)`; }}
                onBlur={e=>{ e.target.style.borderColor=A.border; e.target.style.boxShadow='none'; }} />
            </div>

            {/* Tags */}
            <div style={{ marginBottom:'14px' }}>
              <label style={LBL}>Tags</label>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(100px,1fr))', gap:'6px' }}>
                {ALL_TAGS.map(tag=>(
                  <button key={tag} type="button" onClick={()=>toggleTag(tag)} style={{ padding:'6px 8px', borderRadius:'8px', fontSize:'12px', cursor:'pointer', fontFamily:'DM Sans', transition:'all 0.15s', border:'none', background:form.tags.includes(tag)?`linear-gradient(135deg,${A.burgundy},${A.rose})`:A.blush, color:form.tags.includes(tag)?'#fff':A.textMuted, fontWeight:form.tags.includes(tag)?700:400 }}>{tag}</button>
                ))}
              </div>
            </div>

            {/* Images */}
            <div style={{ marginBottom:'14px' }}>
              <label style={LBL}>Images</label>

              {/* Existing */}
              {existingImages.length > 0 && (
                <div style={{ marginBottom:'10px' }}>
                  <p style={{ fontSize:'11px', color:A.textLight, marginBottom:'6px' }}>Current images (hover to remove):</p>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:'7px' }}>
                    {existingImages.map((url,i)=>(
                      <div key={i} style={{ position:'relative', width:'60px', height:'60px', borderRadius:'9px', overflow:'hidden', border:`1.5px solid ${A.border}` }}
                        onMouseEnter={e=>e.currentTarget.querySelector('.del-ov').style.opacity='1'}
                        onMouseLeave={e=>e.currentTarget.querySelector('.del-ov').style.opacity='0'}>
                        <img src={url} alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                        <button className="del-ov" onClick={()=>removeExisting(url)} style={{ position:'absolute', inset:0, background:'rgba(153,27,27,0.7)', border:'none', color:'#fff', fontSize:'18px', cursor:'pointer', opacity:0, transition:'opacity 0.2s', display:'flex', alignItems:'center', justifyContent:'center' }}>×</button>
                        {i===0 && <span style={{ position:'absolute', bottom:'2px', left:'2px', fontSize:'8px', background:'rgba(92,19,34,0.8)', color:'#fff', padding:'1px 4px', borderRadius:'3px' }}>Cover</span>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Previews */}
              {previews.length > 0 && (
                <div style={{ marginBottom:'10px' }}>
                  <p style={{ fontSize:'11px', color:A.textLight, marginBottom:'6px' }}>New (uploads on save):</p>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:'7px' }}>
                    {previews.map((url,i)=>(
                      <div key={i} style={{ position:'relative', width:'60px', height:'60px', borderRadius:'9px', overflow:'hidden', border:`2px dashed ${A.rose}` }}
                        onMouseEnter={e=>e.currentTarget.querySelector('.del-ov').style.opacity='1'}
                        onMouseLeave={e=>e.currentTarget.querySelector('.del-ov').style.opacity='0'}>
                        <img src={url} alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                        <button className="del-ov" onClick={()=>removeNew(i)} style={{ position:'absolute', inset:0, background:'rgba(153,27,27,0.7)', border:'none', color:'#fff', fontSize:'18px', cursor:'pointer', opacity:0, transition:'opacity 0.2s', display:'flex', alignItems:'center', justifyContent:'center' }}>×</button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Upload button */}
              <input ref={fileRef} type="file" accept="image/*" multiple onChange={handleFiles} style={{ display:'none' }} />
              <button type="button" onClick={()=>fileRef.current?.click()} style={{ width:'100%', padding:'20px', borderRadius:'11px', border:`2px dashed rgba(176,80,112,0.28)`, background:A.petal, color:A.rose, fontSize:'13px', cursor:'pointer', fontFamily:'DM Sans', fontWeight:600, display:'flex', flexDirection:'column', alignItems:'center', gap:'4px', transition:'all 0.18s' }}
                onMouseEnter={e=>e.currentTarget.style.borderColor=A.rose}
                onMouseLeave={e=>e.currentTarget.style.borderColor='rgba(176,80,112,0.28)'}>
                <span style={{ fontSize:'22px' }}>📁</span>
                Click to select images
                <span style={{ fontSize:'11px', color:A.textLight, fontWeight:400 }}>PNG · JPG · WebP · multiple allowed</span>
              </button>
            </div>

            {/* Featured */}
            <div onClick={()=>setForm(f=>({...f,featured:!f.featured}))} style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'24px', padding:'12px 14px', borderRadius:'11px', background:form.featured?A.blush:'transparent', border:`1.5px solid ${form.featured?A.borderStrong:A.border}`, cursor:'pointer', transition:'all 0.18s' }}>
              <div style={{ width:'19px', height:'19px', borderRadius:'5px', background:form.featured?`linear-gradient(135deg,${A.burgundy},${A.rose})`:'transparent', border:`2px solid ${form.featured?A.rose:A.border}`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                {form.featured && <span style={{ color:'#fff', fontSize:'11px', fontWeight:700 }}>✓</span>}
              </div>
              <div>
                <p style={{ fontSize:'13px', color:A.textMain, fontWeight:form.featured?700:400 }}>Mark as Featured ✨</p>
                <p style={{ fontSize:'11px', color:A.textLight, marginTop:'1px' }}>Shows at the top of the Gifting Hub page</p>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display:'flex', gap:'10px' }}>
              <button onClick={save} disabled={saving||uploading} style={{ flex:1, padding:'13px', borderRadius:'12px', background:(saving||uploading)?'rgba(92,19,34,0.4)':`linear-gradient(135deg,${A.burgundy},${A.rose})`, color:'#fff', fontWeight:700, fontSize:'14px', cursor:(saving||uploading)?'not-allowed':'pointer', opacity:(saving||uploading)?0.7:1, border:'none', boxShadow:`0 4px 16px rgba(92,19,34,0.2)` }}>
                {uploading?'Uploading…':saving?'Saving…':editId?'Update Product':'Create Product'}
              </button>
              <button onClick={()=>setShowForm(false)} style={{ padding:'13px 18px', borderRadius:'12px', background:A.blush, border:`1.5px solid ${A.border}`, color:A.textMain, cursor:'pointer', fontSize:'14px', fontWeight:600 }}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {deleteId && (
        <div style={{ position:'fixed', inset:0, background:'rgba(42,10,18,0.3)', backdropFilter:'blur(8px)', zIndex:200, display:'flex', alignItems:'center', justifyContent:'center', padding:'16px' }}>
          <div style={{ background:A.modalBg, borderRadius:'20px', border:'1.5px solid #FCA5A5', padding:'32px', maxWidth:'340px', width:'100%', textAlign:'center', boxShadow:'0 20px 50px rgba(92,19,34,0.12)' }}>
            <span style={{ fontSize:'40px' }}>🗑️</span>
            <h3 style={{ fontFamily:'Cormorant Garamond', fontSize:'21px', color:A.textMain, margin:'12px 0 6px', fontWeight:700 }}>Delete Product?</h3>
            <p style={{ color:A.textMuted, fontSize:'13px', marginBottom:'22px', lineHeight:1.6 }}>Permanently removes the product and all Cloudinary images. Cannot be undone.</p>
            <div style={{ display:'flex', gap:'10px' }}>
              <button onClick={confirmDelete} style={{ flex:1, padding:'11px', borderRadius:'10px', background:'#EF4444', color:'#fff', fontWeight:700, cursor:'pointer', fontSize:'13px', border:'none' }}>Delete</button>
              <button onClick={()=>setDeleteId(null)} style={{ flex:1, padding:'11px', borderRadius:'10px', background:A.blush, border:`1.5px solid ${A.border}`, color:A.textMain, cursor:'pointer', fontSize:'13px', fontWeight:600 }}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .mobile-sub { display: block !important; }
        }
        @media (min-width: 769px) {
          .mobile-sub { display: none !important; }
        }
      `}</style>
    </div>
  );
}

const TH = { padding:'11px 12px', textAlign:'left', fontSize:'10px', letterSpacing:'2px', textTransform:'uppercase', color:'rgba(92,19,34,0.55)', whiteSpace:'nowrap', fontWeight:700 };
const hideMobile = { '@media(max-width:768px)': { display:'none' } };
const LBL = { display:'block', fontSize:'11px', color:'rgba(92,19,34,0.55)', letterSpacing:'2px', textTransform:'uppercase', marginBottom:'6px' };