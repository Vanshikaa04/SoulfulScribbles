import React, { useState, useEffect } from 'react';

const CATEGORIES = ['Magazine', 'Bouquets', 'Hampers', 'Keychains', 'Trousseau Packing', 'Crochet'];
const EMPTY_FORM = { name: '', description: '', price: '', category: '', tags: '', featured: false, images: [] };

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState('');
  const [deleteId, setDeleteId] = useState(null);
  const [imageInput, setImageInput] = useState('');
  const [msg, setMsg] = useState({ text: '', type: '' });

  const fetchProducts = () => {
    setLoading(true);
    fetch('/api/products', { credentials: 'include' })
      .then(r => r.json())
      .then(data => { setProducts(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { fetchProducts(); }, []);

  const showMsg = (text, type = 'success') => {
    setMsg({ text, type });
    setTimeout(() => setMsg({ text: '', type: '' }), 3000);
  };

  const openCreate = () => { setForm(EMPTY_FORM); setEditId(null); setImageInput(''); setShowForm(true); };
  const openEdit = (p) => {
    setForm({ name: p.name || '', description: p.description || '', price: p.price || '', category: p.category || '', tags: (p.tags || []).join(', '), featured: p.featured || false, images: p.images || [] });
    setEditId(p._id); setImageInput(''); setShowForm(true);
  };

  const addImageUrl = () => {
    if (imageInput.trim()) {
      setForm(f => ({ ...f, images: [...f.images, imageInput.trim()] }));
      setImageInput('');
    }
  };

  const removeImage = (idx) => setForm(f => ({ ...f, images: f.images.filter((_, i) => i !== idx) }));

  const save = async () => {
    setSaving(true);
    try {
      const body = { ...form, price: Number(form.price), tags: form.tags.split(',').map(t => t.trim()).filter(Boolean) };
      const url = editId ? `/api/products/${editId}` : '/api/products';
      const method = editId ? 'PUT' : 'POST';
      const res = await fetch(url, { method, credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      if (!res.ok) throw new Error('Failed to save');
      fetchProducts();
      setShowForm(false);
      showMsg(editId ? 'Product updated!' : 'Product created!');
    } catch (err) {
      showMsg(err.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  const toggleFeatured = async (id) => {
    await fetch(`/api/products/${id}/featured`, { method: 'PATCH', credentials: 'include' });
    fetchProducts();
  };

  const confirmDelete = async () => {
    try {
      await fetch(`/api/products/${deleteId}`, { method: 'DELETE', credentials: 'include' });
      fetchProducts();
      setDeleteId(null);
      showMsg('Product deleted!');
    } catch { showMsg('Delete failed', 'error'); }
  };

  const filtered = products.filter(p => !search || p.name?.toLowerCase().includes(search.toLowerCase()) || p.category?.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <p style={{ fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: '#C9877A', fontFamily: 'Space Mono', marginBottom: '6px' }}>Gifting Hub</p>
          <h1 style={{ fontSize: '28px', fontFamily: 'Cormorant Garamond', color: '#E2E8F0', fontWeight: 400 }}>Manage Products</h1>
        </div>
        <button onClick={openCreate} style={{ padding: '12px 24px', borderRadius: '12px', background: 'linear-gradient(135deg, #C9877A, #C8A96E)', color: '#fff', fontWeight: 600, fontSize: '14px', fontFamily: 'DM Sans', cursor: 'pointer', boxShadow: '0 4px 16px rgba(201,135,122,0.3)' }}>
          + Add Product
        </button>
      </div>

      {/* Toast */}
      {msg.text && (
        <div style={{ padding: '14px 20px', borderRadius: '12px', marginBottom: '24px', background: msg.type === 'error' ? 'rgba(239,68,68,0.1)' : 'rgba(16,185,129,0.1)', border: `1px solid ${msg.type === 'error' ? 'rgba(239,68,68,0.3)' : 'rgba(16,185,129,0.3)'}`, color: msg.type === 'error' ? '#FCA5A5' : '#6EE7B7' }}>
          {msg.text}
        </div>
      )}

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        {[
          { label: 'Total Products', value: products.length, color: '#C8A96E' },
          { label: 'Featured', value: products.filter(p => p.featured).length, color: '#C9877A' },
          ...CATEGORIES.map(c => ({ label: c, value: products.filter(p => p.category === c).length, color: '#8B6E6B' }))
        ].slice(0, 6).map(stat => (
          <div key={stat.label} style={{ padding: '20px', borderRadius: '16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <p style={{ fontSize: '28px', fontWeight: 700, color: stat.color, fontFamily: 'Cormorant Garamond' }}>{stat.value}</p>
            <p style={{ fontSize: '12px', color: 'rgba(226,232,240,0.4)', marginTop: '4px' }}>{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..."
        style={{ width: '100%', maxWidth: '360px', padding: '12px 20px', borderRadius: '12px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#E2E8F0', fontSize: '14px', outline: 'none', fontFamily: 'DM Sans', marginBottom: '24px', boxSizing: 'border-box' }}
      />

      {/* Table */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px', color: 'rgba(226,232,240,0.3)' }}>Loading...</div>
      ) : (
        <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  {['Product', 'Category', 'Price', 'Featured', 'Actions'].map(h => (
                    <th key={h} style={{ padding: '16px 20px', textAlign: 'left', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(226,232,240,0.3)', fontFamily: 'Space Mono', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={5} style={{ padding: '48px', textAlign: 'center', color: 'rgba(226,232,240,0.25)' }}>No products found</td></tr>
                ) : filtered.map(p => (
                  <tr key={p._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', transition: 'background 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <td style={{ padding: '16px 20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        {p.images?.[0] ? (
                          <img src={p.images[0]} alt="" style={{ width: '44px', height: '44px', borderRadius: '10px', objectFit: 'cover' }} />
                        ) : (
                          <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'rgba(201,135,122,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>🎁</div>
                        )}
                        <div>
                          <p style={{ fontSize: '14px', color: '#E2E8F0', fontWeight: 500 }}>{p.name}</p>
                          <p style={{ fontSize: '12px', color: 'rgba(226,232,240,0.35)', marginTop: '2px', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.description}</p>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '16px 20px' }}>
                      <span style={{ padding: '4px 12px', borderRadius: '20px', background: 'rgba(201,135,122,0.12)', color: '#C9877A', fontSize: '12px' }}>{p.category}</span>
                    </td>
                    <td style={{ padding: '16px 20px', fontSize: '15px', color: '#C8A96E', fontFamily: 'Cormorant Garamond', fontWeight: 600 }}>
                      {p.price ? `₹${p.price.toLocaleString('en-IN')}` : '—'}
                    </td>
                    <td style={{ padding: '16px 20px' }}>
                      <button onClick={() => toggleFeatured(p._id)} style={{ padding: '6px 14px', borderRadius: '20px', background: p.featured ? 'rgba(200,169,110,0.15)' : 'rgba(255,255,255,0.04)', border: `1px solid ${p.featured ? 'rgba(200,169,110,0.4)' : 'rgba(255,255,255,0.1)'}`, color: p.featured ? '#C8A96E' : 'rgba(226,232,240,0.4)', fontSize: '12px', cursor: 'pointer', fontFamily: 'DM Sans' }}>
                        {p.featured ? '✨ Yes' : 'No'}
                      </button>
                    </td>
                    <td style={{ padding: '16px 20px' }}>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button onClick={() => openEdit(p)} style={{ padding: '8px 16px', borderRadius: '8px', background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.3)', color: '#A78BFA', fontSize: '13px', cursor: 'pointer', fontFamily: 'DM Sans' }}>Edit</button>
                        <button onClick={() => setDeleteId(p._id)} style={{ padding: '8px 16px', borderRadius: '8px', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#FCA5A5', fontSize: '13px', cursor: 'pointer', fontFamily: 'DM Sans' }}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
          <div style={{ background: '#111827', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.08)', padding: '40px', width: '100%', maxWidth: '580px', maxHeight: '90vh', overflowY: 'auto' }}>
            <h2 style={{ fontSize: '24px', fontFamily: 'Cormorant Garamond', color: '#E2E8F0', marginBottom: '32px' }}>{editId ? 'Edit Product' : 'New Product'}</h2>

            {[
              { label: 'Product Name', key: 'name', type: 'text', placeholder: 'e.g. Custom Love Magazine' },
              { label: 'Price (₹)', key: 'price', type: 'number', placeholder: 'e.g. 599' },
            ].map(f => (
              <div key={f.key} style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '12px', color: 'rgba(226,232,240,0.5)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px', fontFamily: 'Space Mono' }}>{f.label}</label>
                <input type={f.type} value={form[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))} placeholder={f.placeholder}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#E2E8F0', fontSize: '14px', outline: 'none', fontFamily: 'DM Sans', boxSizing: 'border-box' }}
                />
              </div>
            ))}

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '12px', color: 'rgba(226,232,240,0.5)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px', fontFamily: 'Space Mono' }}>Category</label>
              <select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
                style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', background: '#1E293B', border: '1px solid rgba(255,255,255,0.1)', color: '#E2E8F0', fontSize: '14px', outline: 'none', fontFamily: 'DM Sans', boxSizing: 'border-box' }}>
                <option value="">Select category</option>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '12px', color: 'rgba(226,232,240,0.5)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px', fontFamily: 'Space Mono' }}>Description</label>
              <textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} rows={3} placeholder="Describe this product..."
                style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#E2E8F0', fontSize: '14px', outline: 'none', fontFamily: 'DM Sans', resize: 'vertical', boxSizing: 'border-box' }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '12px', color: 'rgba(226,232,240,0.5)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px', fontFamily: 'Space Mono' }}>Tags (comma separated)</label>
              <input value={form.tags} onChange={e => setForm(p => ({ ...p, tags: e.target.value }))} placeholder="for-her, birthday, custom"
                style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#E2E8F0', fontSize: '14px', outline: 'none', fontFamily: 'DM Sans', boxSizing: 'border-box' }}
              />
            </div>

            {/* Images */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '12px', color: 'rgba(226,232,240,0.5)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px', fontFamily: 'Space Mono' }}>Cloudinary Image URLs</label>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                <input value={imageInput} onChange={e => setImageInput(e.target.value)} placeholder="https://res.cloudinary.com/..."
                  style={{ flex: 1, padding: '10px 14px', borderRadius: '8px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#E2E8F0', fontSize: '13px', outline: 'none', fontFamily: 'DM Sans' }}
                  onKeyDown={e => e.key === 'Enter' && addImageUrl()}
                />
                <button onClick={addImageUrl} style={{ padding: '10px 16px', borderRadius: '8px', background: 'rgba(201,135,122,0.15)', border: '1px solid rgba(201,135,122,0.3)', color: '#C9877A', cursor: 'pointer', fontSize: '13px', fontFamily: 'DM Sans' }}>Add</button>
              </div>
              {form.images.length > 0 && (
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {form.images.map((url, i) => (
                    <div key={i} style={{ position: 'relative' }}>
                      <img src={url} alt="" style={{ width: '64px', height: '64px', objectFit: 'cover', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}
                        onError={e => { e.target.style.background = '#1E293B'; e.target.alt = '❌'; }}
                      />
                      <button onClick={() => removeImage(i)} style={{ position: 'absolute', top: '-6px', right: '-6px', width: '20px', height: '20px', borderRadius: '50%', background: '#EF4444', color: '#fff', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none' }}>×</button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Featured */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
              <input type="checkbox" id="featured" checked={form.featured} onChange={e => setForm(p => ({ ...p, featured: e.target.checked }))} style={{ width: '18px', height: '18px', accentColor: '#C8A96E' }} />
              <label htmlFor="featured" style={{ fontSize: '14px', color: '#E2E8F0', cursor: 'pointer' }}>Mark as Featured ✨</label>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={save} disabled={saving} style={{ flex: 1, padding: '14px', borderRadius: '12px', background: 'linear-gradient(135deg, #C9877A, #C8A96E)', color: '#fff', fontWeight: 600, fontSize: '15px', cursor: saving ? 'not-allowed' : 'pointer', fontFamily: 'DM Sans', opacity: saving ? 0.7 : 1 }}>
                {saving ? 'Saving...' : editId ? 'Update Product' : 'Create Product'}
              </button>
              <button onClick={() => setShowForm(false)} style={{ padding: '14px 24px', borderRadius: '12px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#E2E8F0', cursor: 'pointer', fontSize: '15px', fontFamily: 'DM Sans' }}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {deleteId && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#111827', borderRadius: '20px', border: '1px solid rgba(239,68,68,0.3)', padding: '40px', maxWidth: '380px', textAlign: 'center' }}>
            <span style={{ fontSize: '48px' }}>🗑️</span>
            <h3 style={{ fontSize: '22px', color: '#E2E8F0', fontFamily: 'Cormorant Garamond', margin: '16px 0 8px' }}>Delete Product?</h3>
            <p style={{ color: 'rgba(226,232,240,0.5)', fontSize: '14px', marginBottom: '28px' }}>This will also remove images from Cloudinary. This action cannot be undone.</p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={confirmDelete} style={{ flex: 1, padding: '12px', borderRadius: '10px', background: '#EF4444', color: '#fff', fontWeight: 600, cursor: 'pointer', fontFamily: 'DM Sans' }}>Delete</button>
              <button onClick={() => setDeleteId(null)} style={{ flex: 1, padding: '12px', borderRadius: '10px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#E2E8F0', cursor: 'pointer', fontFamily: 'DM Sans' }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}