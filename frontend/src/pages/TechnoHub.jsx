import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import ExperienceCarousel from '../components/ExperienceCarousel';

const WA = '917202052004';
/* ─────────────────────────────────────────────
   PALETTE
   bg      = pure white        #FFFFFF
   bg2     = lightest pink     #FDF5F7
   bg3     = soft blush pink   #FFF0F4
   bg4     = deeper blush      #F9E4EB
   text    = near-black        #1A0408
   textSub = dark burgundy     #5C1322
   textMid = medium            #7A3040
   textMut = muted             #9B5868
   rose    = accent rose       #C4758A
   burg    = burgundy accent   #8B2535  ← used sparingly as accent, NOT bg
───────────────────────────────────────────── */
const C = {
  white:   '#FFFFFF',
  bg2:     '#FDF5F7',
  bg3:     '#FFF0F4',
  bg4:     '#F9E4EB',
  text:    '#1A0408',
  textSub: '#5C1322',
  textMid: '#7A3040',
  textMut: '#9B5868',
  textLt:  '#BF8090',
  rose:    '#C4758A',
  roseDk:  '#A85870',
  burg:    '#8B2535',
  blush:   '#F7E8EC',
  petal:   '#FDEEF2',
  border:  'rgba(92,19,34,0.1)',
  bdHov:   'rgba(92,19,34,0.22)',
};

/* section bg alternates */
const SEC = {
  white: C.white,
  pink:  C.bg3,
  blush: C.bg2,
};

/* category colours on light bg */
const CAT_COLOR = {
  'Web Dev':          '#7C1F3A',
  'Design':           '#9C3A10',
  'Digital Marketing':'#5C2A80',
  'SEO':              '#183A7C',
  'Video':            '#8C1A3A',
  'Social Media':     '#0A5C4A',
  'Data Analysis':    '#7C4A08',
  'Machine Learning': '#0C4A50',
  'Other':            '#403050',
};
    const WAIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
);
const SERVICES = [
  { icon:'🌐', title:'Website Building',       desc:'Custom, responsive, high-performance websites — from landing pages to full-stack MERN apps built exactly for your brand.',  tags:['React','Next.js','MERN','WordPress'],    cat:'Web Dev' },
  { icon:'📊', title:'Data Analysis',           desc:'Turn raw data into clear decisions. Exploratory analysis, dashboards, visualisations and insight reports for businesses.',  tags:['Python','Pandas','Power BI','Excel'],    cat:'Data Analysis' },
  { icon:'🤖', title:'Machine Learning',        desc:'Predictive models, recommendation engines and NLP — intelligent automation for real business problems.',                    tags:['Python','Scikit-learn','TensorFlow'],    cat:'Machine Learning' },
  { icon:'🎬', title:'Video Editing',            desc:'Cinematic reels, polished ads, YouTube content — professional edits that captivate and convert.',                          tags:['Reels','YouTube','Motion Graphics'],     cat:'Video' },
  { icon:'✏️', title:'Logo Designing',          desc:'Logos that are the visual soul of your brand — timeless, versatile, delivered with a full branding kit.',                  tags:['Figma','Vector','Branding Kit'],         cat:'Design' },
  { icon:'📣', title:'Digital Marketing',       desc:'Data-driven campaigns that convert. Strategy to execution — your brand\'s growth handled personally.',                     tags:['Meta Ads','Google Ads','Analytics'],     cat:'Digital Marketing' },
  { icon:'🔍', title:'SEO Optimization',        desc:'Get found by the right people. On-page, off-page and technical SEO that moves your rankings sustainably.',                 tags:['On-Page','Technical SEO','Local SEO'],   cat:'SEO' },
  // { icon:'📱', title:'Social Media Marketing',  desc:'Full social management — content calendars, creatives, engagement and growth strategy across all key platforms.',           tags:['Instagram','LinkedIn','Facebook'],       cat:'Social Media' },
];

function useInView(thresh = 0.1) {
  const [v, setV] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: thresh });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, v];
}

const fv = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.62, delay, ease: [0.22, 1, 0.36, 1] },
});
const fa = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
});

/* ═══════════════════════════════════════════════════════════ */
export default function TechnoHub() {
  const [projects, setProjects] = useState([]);
  const [loadingP, setLoadingP] = useState(true);

  useEffect(() => {
    fetch('/api/projects')
      .then(r => r.json())
      .then(d => { if (Array.isArray(d)) setProjects(d); setLoadingP(false); })
      .catch(() => setLoadingP(false)); 
  }, []);


  return (
    <div style={{ background: C.white, color: C.text, minHeight: '100vh', overflowX: 'hidden' }}>
      <HeroSection />
      <StatsBar />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection projects={projects} loading={loadingP} />
      <JoinSection />
      <CtaSection />
    </div>
  );
}

/* ════════════════ HERO ════════════════ */
function HeroSection() {
  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      /* white → lightest pink → soft blush — all very light */
      background: `linear-gradient(155deg, ${C.white} 0%, ${C.bg2} 55%, ${C.bg3} 100%)`,
      paddingTop: '72px', position: 'relative', overflow: 'hidden',
    }}>
      {/* Decorative soft blobs */}
      <div style={{ position:'absolute', top:'-100px', right:'-80px', width:'420px', height:'420px', borderRadius:'50%', background:'radial-gradient(circle, rgba(196,117,138,0.1) 0%, transparent 70%)', pointerEvents:'none' }} />
      <div style={{ position:'absolute', bottom:'-80px', left:'-60px', width:'360px', height:'360px', borderRadius:'50%', background:'radial-gradient(circle, rgba(139,37,53,0.05) 0%, transparent 70%)', pointerEvents:'none' }} />

      {/* Very faint grid */}
      <div style={{ position:'absolute', inset:0, backgroundImage:`linear-gradient(rgba(92,19,34,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(92,19,34,0.04) 1px, transparent 1px)`, backgroundSize:'60px 60px', pointerEvents:'none' }} />

      {/* Big faint letter */}
      <span style={{ position:'absolute', top:'12%', left:'1%', fontFamily:'Cormorant Garamond', fontSize:'clamp(90px,16vw,200px)', color:'rgba(92,19,34,0.035)', fontStyle:'italic', lineHeight:1, userSelect:'none', pointerEvents:'none' }}>S</span>

      <div className="container" style={{ position:'relative', zIndex:1 }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr auto', gap:'clamp(32px,5vw,80px)', alignItems:'center' }} className="techno-hero-grid">

          {/* LEFT text */}
          <div>
            <motion.div {...fa(0)}>
              {/* Badge */}
              <div style={{ display:'inline-flex', alignItems:'center', gap:'8px', padding:'6px 18px', borderRadius:'40px', background:C.petal, border:`1.5px solid rgba(92,19,34,0.14)`, marginBottom:'28px' }}>
                <div style={{ width:'7px', height:'7px', borderRadius:'50%', background:C.textSub }} />
                <span style={{ fontSize:'11px', letterSpacing:'3px', textTransform:'uppercase', color:C.textSub, fontWeight:600 }}>Techno Hub — Available for Projects</span>
              </div>
            </motion.div>

            <motion.h1 {...fa(0.08)} style={{ fontFamily:'Cormorant Garamond', fontSize:'clamp(40px,7.5vw,82px)', fontWeight:300, color:C.text, lineHeight:1.0, marginBottom:'20px' }}>
             Soulfully Designed to blend<br />
              <em style={{ fontStyle:'italic', color:C.textSub }}>Creativity with Intelligence!</em>
            </motion.h1>

            <motion.div {...fa(0.14)} style={{ display:'flex', alignItems:'center', gap:'14px', marginBottom:'20px' }}>
              <div style={{ width:'56px', height:'1.5px', background:`linear-gradient(to right, transparent, ${C.rose})` }} />
              <span style={{ fontSize:'11px', color:C.textMut, letterSpacing:'3px', textTransform:'uppercase' }}>Solo · Freelance · Personal</span>
            </motion.div>

            <motion.p {...fa(0.2)} style={{ fontSize:'clamp(14px,2vw,17px)', color:C.textMid, lineHeight:1.9, fontWeight:300, maxWidth:'520px', marginBottom:'32px' }}>
              Freelance tech services by <strong style={{ color:C.text }}>Vanshika Wadhwani</strong> — ex Full Stack Developer &amp; Tech Educator at Code Master Technology. Personalized. Professional. Passionate.
            </motion.p>

            <motion.div {...fa(0.26)} style={{ display:'flex', gap:'14px', flexWrap:'wrap' }}>
              <a href="#services" style={{ padding:'13px 28px', borderRadius:'50px', background:`linear-gradient(135deg,${C.textSub},${C.rose})`, color:'#fff', fontWeight:600, fontSize:'14px', boxShadow:`0 8px 24px rgba(92,19,34,0.22)`, transition:'all 0.28s' }}
                onMouseEnter={e => { e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow=`0 12px 32px rgba(92,19,34,0.32)`; }}
                onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow=`0 8px 24px rgba(92,19,34,0.22)`; }}>
                Explore Services
              </a>
              <a href={`https://wa.me/${WA}?text=${encodeURIComponent("Hi Vanshika! I'd like to discuss a tech project 💻")}`}
                target="_blank" rel="noopener noreferrer"
                style={{ padding:'13px 28px', borderRadius:'50px', background:'transparent', color:C.textSub, border:`1.5px solid rgba(92,19,34,0.2)`, fontSize:'14px', fontWeight:600, transition:'all 0.28s' }}
                onMouseEnter={e => { e.currentTarget.style.background=C.petal; e.currentTarget.style.borderColor=`rgba(92,19,34,0.35)`; }}
                onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.borderColor=`rgba(92,19,34,0.2)`; }}>
                                   <WAIcon />
 Let's Talk
              </a>
            </motion.div>
          </div>

          {/* RIGHT — floating skill pill card */}
          <motion.div {...fa(0.32)} className="techno-hero-right">
            <div style={{ display:'flex', flexDirection:'column', gap:'12px', minWidth:'220px' }}>
              {[
                { icon:'💻', label:'Full Stack Dev',      sub:'React · Node · MongoDB' },
                { icon:'📊', label:'Data Analysis',       sub:'Python · Power BI · Pandas' },
                { icon:'🤖', label:'Machine Learning',    sub:'Scikit-learn · TensorFlow' },
                { icon:'🎓', label:'Ex Tech Educator',    sub:'Code Master Technology' },
              ].map(({ icon, label, sub }) => (
                <div key={label} style={{ display:'flex', alignItems:'center', gap:'12px', padding:'14px 18px', borderRadius:'16px', background:C.white, border:`1.5px solid ${C.border}`, boxShadow:`0 2px 12px rgba(92,19,34,0.06)`, transition:'all 0.22s' }}
                  onMouseEnter={e => { e.currentTarget.style.background=C.blush; e.currentTarget.style.borderColor=C.bdHov; e.currentTarget.style.transform='translateX(4px)'; e.currentTarget.style.boxShadow=`0 6px 20px rgba(92,19,34,0.1)`; }}
                  onMouseLeave={e => { e.currentTarget.style.background=C.white; e.currentTarget.style.borderColor=C.border; e.currentTarget.style.transform='translateX(0)'; e.currentTarget.style.boxShadow=`0 2px 12px rgba(92,19,34,0.06)`; }}>
                  <span style={{ fontSize:'22px', flexShrink:0 }}>{icon}</span>
                  <div>
                    <p style={{ fontSize:'13px', fontWeight:700, color:C.text, lineHeight:1.2 }}>{label}</p>
                    <p style={{ fontSize:'11px', color:C.textMut, marginTop:'2px' }}>{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .techno-hero-grid { grid-template-columns: 1fr !important; }
          .techno-hero-right { min-width: unset !important; }
          .techno-hero-right > div { flex-direction: row !important; flex-wrap: wrap !important; gap: 10px !important; }
          .techno-hero-right > div > div { flex: 1; min-width: 140px; }
        }
      `}</style>
    </section>
  );
}

/* ════════════════ STATS ════════════════ */
/* pastel pink strip */
function StatsBar() {
  const stats = [['1yr+','Experience'],['8+','Services'],['15+','Projects'],['1:1','Attention']];
  return (
    <div style={{ background:C.bg4, borderTop:`1px solid ${C.border}`, borderBottom:`1px solid ${C.border}`, padding:'32px 0' }}>
      <div className="container">
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(110px,1fr))', gap:'16px', textAlign:'center' }}>
          {stats.map(([num, label]) => (
            <div key={label}>
              <p style={{ fontFamily:'Cormorant Garamond', fontSize:'clamp(28px,4vw,42px)', color:C.textSub, fontWeight:700, lineHeight:1 }}>{num}</p>
              <p style={{ fontSize:'11px', color:C.textMut, letterSpacing:'2px', textTransform:'uppercase', marginTop:'5px' }}>{label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ════════════════ ABOUT ════════════════ */
/* white background */
function AboutSection() {
  const [ref, v] = useInView();
  return (
    <section style={{ padding:'clamp(60px,8vw,100px) 0', background:C.white }}>
      <div className="container">
        <div ref={ref} style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,300px),1fr))', gap:'clamp(36px,6vw,72px)', alignItems:'center', opacity:v?1:0, transform:v?'translateY(0)':'translateY(26px)', transition:'all 0.75s ease' }}>

          {/* Text */}
          <div>
            <p style={{ fontSize:'11px', letterSpacing:'4px', textTransform:'uppercase', color:C.rose, marginBottom:'14px', fontWeight:600 }}>About Me</p>
            <h2 style={{ fontFamily:'Cormorant Garamond', fontSize:'clamp(28px,5vw,50px)', color:C.text, fontWeight:300, marginBottom:'18px', lineHeight:1.2 }}>
              {/* Not an agency.<br /> */}
              <em style={{ fontStyle:'italic', color:C.textSub }}>Vanshika Wadhwani</em>
            </h2>
            <div style={{ width:'48px', height:'2px', background:`linear-gradient(to right,${C.textSub},${C.rose})`, marginBottom:'20px', borderRadius:'2px' }} />
            <p style={{ fontSize:'15px', color:C.textMid, lineHeight:1.95, marginBottom:'14px', fontWeight:300 }}>
              I'm  a  Full Stack Developer, designer, data analyst and digital strategist. I spent a year as a <span style={{ color:C.textSub, fontWeight:600 }}>Full Stack Developer &amp; Tech Educator at Code Master Technology</span>, building real projects and teaching developers.
            </p>
            <p style={{ fontSize:'15px', color:C.textMid, lineHeight:1.95, fontWeight:300 }}>
              Now I bring that expertise directly to you. From sleek websites to predictive ML models — when you hire me, you get <em style={{ color:C.textSub, fontStyle:'italic' }}>me</em>, not a junior.
            </p>
          </div>

          {/* Skill grid */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px' }}>
            {[
              ['💻','Full Stack Dev','React, Node, MongoDB'],
              ['📊','Data Analysis','Python, Power BI, Pandas'],
              ['🤖','Machine Learning','Scikit-learn, TensorFlow'],
              ['🎓','Tech Educator','Code Master Technology'],
            ].map(([icon, title, sub]) => (
              <motion.div key={title} whileHover={{ y:-4, boxShadow:`0 10px 24px rgba(92,19,34,0.1)` }}
                style={{ padding:'20px 16px', borderRadius:'18px', background:C.bg2, border:`1.5px solid ${C.border}`, transition:'all 0.22s', cursor:'default' }}>
                <span style={{ fontSize:'26px', display:'block', marginBottom:'10px' }}>{icon}</span>
                <p style={{ fontSize:'13px', fontWeight:700, color:C.text, marginBottom:'4px' }}>{title}</p>
                <p style={{ fontSize:'11px', color:C.textMut, lineHeight:1.5 }}>{sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════ SERVICES ════════════════ */
/* pastel pink section */
function ServicesSection() {
  return (
   <section id="services" style={{ padding: 'clamp(60px,8vw,100px) 0', background: C.bg3 }}>
      {/* 🛠️ Dynamic CSS Injection to hide elements on smaller screens */}
      <style>{`
        @media (max-width: 576px) {
          .hide-on-mobile {
            display: none !important;
          }
        }
      `}</style>

      <div className="container">
        <motion.div {...fv(0)} style={{ textAlign: 'center', marginBottom: '52px' }}>
          <p style={{ fontSize: '11px', letterSpacing: '4px', textTransform: 'uppercase', color: C.rose, marginBottom: '10px', fontWeight: 600 }}>What I Offer</p>
          <h2 style={{ fontFamily: 'Cormorant Garamond', fontSize: 'clamp(28px,5vw,52px)', color: C.text, fontWeight: 300 }}>
            Services <em style={{ fontStyle: 'italic', color: C.textSub }}>à la carte</em>
          </h2>
          <p style={{ fontSize: '14px', color: C.textMut, marginTop: '10px' }}>Each service delivered personally — no outsourcing, no middlemen.</p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(min(45%,260px),1fr))', gap: '16px' }}>
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.title} service={s} delay={i * 0.05} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service, delay }) {
  return (
    <motion.div
      {...fv(delay)}
      style={{
        background: '#fff',
        padding: '24px',
        borderRadius: '20px',
        border: '1px solid rgba(196,117,138,0.14)',
        boxShadow: '0 4px 20px rgba(107,26,42,0.02)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        boxSizing: 'border-box'
      }}
    >
      {/* Logo / Icon */}
      <div style={{ fontSize: '32px', marginBottom: '12px' }}>{service.icon}</div>
      
      {/* Title */}
      <h3 style={{ fontFamily: 'Cormorant Garamond', fontSize: '22px', fontWeight: 600, color: C.text, marginBottom: '8px' }}>
        {service.title}
      </h3>

      {/* Description - Hidden on Mobile */}
      <p className="hide-on-mobile" style={{ fontSize: '13px', color: C.textMut, lineHeight: 1.6, marginBottom: '16px', flexGrow: 1 }}>
        {service.desc}
      </p>

      {/* Tags - Hidden on Mobile */}
      {service.tags && (
        <div className="hide-on-mobile" style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: 'auto' }}>
          {service.tags.map(t => (
            <span key={t} style={{ padding: '4px 10px', background: 'rgba(196,117,138,0.07)', borderRadius: '20px', fontSize: '11px', color: C.rose, fontWeight: 500 }}>
              {t}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
}

/* ════════════════ PROJECTS ════════════════ */
/* white background */
function ProjectsSection({ projects, loading }) {
  const [filter, setFilter] = useState('All');
  const allCats = ['All', ...new Set(projects.map(p => p.category).filter(Boolean))];

  const isCMT = p => p.org?.toLowerCase().includes('code master');

  // --- NEW LOGIC: Filter & Limit to 4 Projects Total ---
  let selectedProjects = [];
  
  if (filter === 'All') {
    const seenCats = new Set();
    
    // Pass 1: Try to get exactly 1 project per unique category
    for (const p of projects) {
      if (p.category && !seenCats.has(p.category)) {
        selectedProjects.push(p);
        seenCats.add(p.category);
      }
      if (selectedProjects.length === 4) break; // Stop at 4
    }
    
    // Pass 2: If we have less than 4 categories, fill the remaining slots with other projects
    if (selectedProjects.length < 4) {
      for (const p of projects) {
        // Only add if it's not already in the selected list
        if (!selectedProjects.some(sp => sp._id === p._id)) {
          selectedProjects.push(p);
        }
        if (selectedProjects.length === 4) break;
      }
    }
  } else {
    // If a specific category is selected, just grab the first 4 that match
    selectedProjects = projects.filter(p => p.category === filter).slice(0, 4);
  }

  // Split our finalized 4 projects into their respective arrays
  const cmtList = selectedProjects.filter(isCMT);
  const freeList = selectedProjects.filter(p => !isCMT(p));

  return (
    <section style={{ padding: 'clamp(60px,8vw,100px) 0', background: C.white }}>
      <div className="container">
        <motion.div {...fv(0)} style={{ marginBottom: '36px' }}>
          <p style={{ fontSize: '11px', letterSpacing: '4px', textTransform: 'uppercase', color: C.rose, marginBottom: '10px', fontWeight: 600 }}>Portfolio</p>
          <h2 style={{ fontFamily: 'Cormorant Garamond', fontSize: 'clamp(28px,5vw,52px)', color: C.text, fontWeight: 300, lineHeight: 1.15 }}>My Work</h2>
          <p style={{ fontSize: '15px', color: C.textMut, marginTop: '8px' }}>Projects at Code Master Technology &amp; freelance engagements</p>
        </motion.div>

        {/* Filter pills */}
        <div style={{ display: 'flex', gap: '7px', flexWrap: 'wrap', marginBottom: '36px' }}>
          {allCats.map(c => (
            <button key={c} onClick={() => setFilter(c)}
              style={{ padding: '7px 16px', borderRadius: '40px', fontSize: '12px', cursor: 'pointer', fontFamily: 'DM Sans', transition: 'all 0.2s', background: filter === c ? `linear-gradient(135deg,${C.textSub},${C.rose})` : C.bg2, color: filter === c ? '#fff' : C.textMid, border: filter === c ? 'none' : `1.5px solid ${C.border}`, fontWeight: filter === c ? 700 : 400 }}>
              {c}
            </button>
          ))}
        </div>

        {loading ? (
          <SkeletonGrid />
        ) : (
          <>
            {freeList.length > 0 && (
              <div>
                <SectionDivider icon="💼" title="Freelance Work" sub="Independent projects and client engagements" count={freeList.length} />
                <div className="proj-grid-4">
                  {freeList.map((p, i) => <ProjectCard key={p._id} project={p} delay={i * 0.04} />)}
                </div>
              </div>
            )}

            {cmtList.length > 0 && (
              <div style={{ marginBottom: '52px', marginTop: freeList.length > 0 ? '40px' : '0' }}>
                <SectionDivider icon="🏢" title="Code Master Technology" sub="During my tenure as Full Stack Developer & Tech Educator" count={cmtList.length} />
                <div className="proj-grid-4 mt-5">
                  {cmtList.map((p, i) => <ProjectCard key={p._id} project={p} delay={i * 0.04} />)}
                </div>
              </div>
            )}

            {cmtList.length === 0 && freeList.length === 0 && (
              <div style={{ textAlign: 'center', padding: '60px 0' }}>
                <span style={{ fontSize: '44px', display: 'block', marginBottom: '12px' }}>💻</span>
                <p style={{ fontFamily: 'Cormorant Garamond', fontSize: '22px', color: C.textMid, fontStyle: 'italic' }}>No projects in this category yet</p>
              </div>
            )}

            {/* "See all Projects" CTA */}
            {(cmtList.length > 0 || freeList.length > 0) && (
              <div style={{ textAlign: 'center', marginTop: '48px' }}>
                <a href="/projects" style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 32px',
                  background: C.textSub, color: '#fff', borderRadius: '40px', fontSize: '15px', fontWeight: 600,
                  textDecoration: 'none', transition: 'all 0.3s', boxShadow: '0 4px 14px rgba(107,26,42,0.2)'
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(107,26,42,0.3)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 14px rgba(107,26,42,0.2)'; }}
                >
                  See all Projects <span style={{ fontSize: '18px' }}>&rarr;</span>
                </a>
              </div>
            )}
          </>
        )}
      </div>

      <ExperienceCarousel />

      <style>{`
        .proj-grid-4 {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        @media (max-width: 1100px) { .proj-grid-4 { grid-template-columns: repeat(3,1fr); } }
        @media (max-width:  768px) { .proj-grid-4 { grid-template-columns: repeat(2,1fr); gap:12px; } }
        @media (max-width:  420px) { .proj-grid-4 { grid-template-columns: repeat(2,1fr); gap:10px; } }
      `}</style>
    </section>
  );
}

function SectionDivider({ icon, title, sub, count }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'22px', paddingBottom:'14px', borderBottom:`1.5px solid ${C.border}` }}>
      <div style={{ width:'36px', height:'36px', borderRadius:'10px', background:`linear-gradient(135deg,${C.textSub},${C.rose})`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'18px', flexShrink:0 }}>{icon}</div>
      <div>
        <h3 style={{ fontFamily:'Cormorant Garamond', fontSize:'clamp(17px,2.5vw,22px)', color:C.text, fontWeight:700 }}>{title}</h3>
        <p style={{ fontSize:'12px', color:C.textMut, marginTop:'2px' }}>{sub}</p>
      </div>
      <span style={{ marginLeft:'auto', padding:'3px 12px', borderRadius:'20px', background:C.bg3, color:C.textSub, fontSize:'12px', fontWeight:700, flexShrink:0 }}>{count}</span>
    </div>
  );
}

function ProjectCard({ project: p, delay }) {
  const [hov, setHov] = useState(false);
  const accent = CAT_COLOR[p.category] || C.textSub;
  return (
    <motion.div {...fv(delay)}>
      <div
        onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
        style={{ borderRadius:'16px', overflow:'hidden', background:C.white, border:`1.5px solid ${hov ? C.bdHov : C.border}`, transition:'all 0.28s', transform:hov?'translateY(-5px)':'translateY(0)', boxShadow:hov?`0 14px 36px rgba(92,19,34,0.1)`:'0 2px 8px rgba(92,19,34,0.04)' }}>

        {/* Thumbnail */}
        <div style={{ 
  height: '200px', // Increased height for better visibility
  background: C.bg3, 
  position: 'relative', 
  overflow: 'hidden', 
  display: 'flex', 
  alignItems: 'center', 
  justifyContent: 'center' 
}}>
  {p.media && p.media.length > 0 ? (
    p.media[0].type === 'video' ? (
      <video 
        src={p.media[0].url} 
        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        muted 
        loop 
        playsInline
        onMouseEnter={e => e.target.play()} 
        onMouseLeave={e => e.target.pause()} 
      />
    ) : (
      <img 
        src={p.media[0].url} 
        alt={p.title} 
        style={{ 
          width: '100%', 
          height: '100%', 
          objectFit: 'cover', // Use 'contain' if you want to see the WHOLE image without cropping
          transition: 'transform 0.4s ease', 
          transform: hov ? 'scale(1.08)' : 'scale(1)' 
        }} 
      />
    )
  ) : (
    <span style={{ fontSize: '34px', opacity: 0.22 }}>💻</span>
  )}

  {/* Overlays (Category & Featured) remain same */}
  {p.category && (
    <div style={{ position: 'absolute', top: '8px', right: '8px', padding: '3px 9px', borderRadius: '20px', background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(6px)', color: C.textSub, fontSize: '10px', fontWeight: 700, border: `1px solid ${C.border}`, zIndex: 2 }}>
      {p.category}
    </div>
  )}
</div>

        <div style={{ padding:'13px 15px' }}>
          <h3 style={{ fontFamily:'Cormorant Garamond', fontSize:'15px', color:C.text, fontWeight:700, marginBottom:'5px', lineHeight:1.3, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{p.title}</h3>
          {p.org && <p style={{ fontSize:'10px', color:C.textMut, marginBottom:'6px', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>🏢 {p.org}</p>}
          <p style={{ fontSize:'12px', color:C.textMut, lineHeight:1.65, marginBottom:'10px', display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' }}>{p.description}</p>
          {p.tech?.length > 0 && (
            <div style={{ display:'flex', flexWrap:'wrap', gap:'4px', marginBottom:'10px' }}>
              {p.tech.slice(0,3).map(t => (
                <span key={t} style={{ padding:'2px 8px', borderRadius:'20px', fontSize:'10px', background:`${accent}0F`, color:accent, fontWeight:600 }}>{t}</span>
              ))}
              {p.tech.length > 3 && <span style={{ fontSize:'10px', color:C.textLt }}>+{p.tech.length-3}</span>}
            </div>
          )}
          {p.link && (
            <a href={p.link} target="_blank" rel="noopener noreferrer"
              style={{ fontSize:'12px', color:accent, fontWeight:700, display:'flex', alignItems:'center', gap:'4px', transition:'gap 0.18s' }}
              onMouseEnter={e => e.currentTarget.style.gap='7px'}
              onMouseLeave={e => e.currentTarget.style.gap='4px'}>
              View Project →
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function SkeletonGrid() {
  return (
    <div className="proj-grid-4">
      {[1,2,3,4,5,6,7,8].map(i => (
        <div key={i} style={{ borderRadius:'16px', overflow:'hidden', background:C.bg2, border:`1.5px solid ${C.border}` }}>
          <div style={{ height:'130px', background:`linear-gradient(90deg,${C.bg3},${C.petal},${C.bg3})`, backgroundSize:'200% 100%', animation:'shimmer 1.5s infinite' }} />
          <div style={{ padding:'13px' }}>
            <div style={{ height:'13px', background:C.bg3, borderRadius:'4px', marginBottom:'7px' }} />
            <div style={{ height:'10px', width:'60%', background:C.petal, borderRadius:'4px' }} />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ════════════════ JOIN ════════════════ */
/* pastel pink section */
function JoinSection() {
  return (
    <section style={{ padding:'clamp(60px,8vw,100px) 0', background:C.bg3 }}>
      <div className="container">
        <motion.div {...fv(0)} style={{ maxWidth:'680px', margin:'0 auto', textAlign:'center' }}>
          <div style={{ display:'inline-flex', padding:'5px 18px', borderRadius:'40px', background:C.white, border:`1.5px solid ${C.border}`, marginBottom:'24px' }}>
            <span style={{ fontSize:'11px', letterSpacing:'3px', textTransform:'uppercase', color:C.textSub, fontWeight:700 }}>Collaborate</span>
          </div>
          <h2 style={{ fontFamily:'Cormorant Garamond', fontSize:'clamp(26px,5vw,46px)', color:C.text, fontWeight:300, marginBottom:'18px', lineHeight:1.2 }}>
            Work as Part of My<br />
            <em style={{ fontStyle:'italic', color:C.textSub }}>Freelance Network</em>
          </h2>
          <div style={{ width:'48px', height:'2px', background:`linear-gradient(to right,${C.textSub},${C.rose})`, margin:'0 auto 20px', borderRadius:'2px' }} />
          <p style={{ fontSize:'15px', color:C.textMid, lineHeight:1.95, marginBottom:'14px', fontWeight:300 }}>
            I occasionally collaborate with developers, designers, data analysts and content creators on real client projects. Passionate about your craft and want experience? Let's connect.
          </p>
          <p style={{ fontSize:'15px', color:C.textMid, lineHeight:1.95, marginBottom:'36px', fontWeight:300 }}>
            Fresher looking for mentorship or a professional wanting collaboration — I believe in building together, not just building products.
          </p>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(130px,1fr))', gap:'12px', marginBottom:'36px' }}>
            {[['🚀','Real Projects'],['💡','Mentorship'],['🌐','Remote Work'],['📈','Portfolio Growth']].map(([e,l]) => (
              <div key={l} style={{ padding:'16px 10px', borderRadius:'14px', background:C.white, border:`1.5px solid ${C.border}`, textAlign:'center', boxShadow:'0 2px 8px rgba(92,19,34,0.04)' }}>
                <span style={{ fontSize:'22px', display:'block', marginBottom:'7px' }}>{e}</span>
                <p style={{ fontSize:'12px', color:C.textMut, lineHeight:1.4 }}>{l}</p>
              </div>
            ))}
          </div>

          <a href={`https://wa.me/${WA}?text=${encodeURIComponent("Hi Vanshika! I'd love to collaborate with you 🙋")}`}
            target="_blank" rel="noopener noreferrer"
            style={{ display:'inline-flex', alignItems:'center', gap:'10px', padding:'14px 34px', borderRadius:'50px', background:`linear-gradient(135deg,${C.textSub},${C.rose})`, color:'#fff', fontWeight:700, fontSize:'15px', boxShadow:`0 8px 24px rgba(92,19,34,0.22)`, transition:'all 0.28s' }}
            onMouseEnter={e => { e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow=`0 12px 32px rgba(92,19,34,0.32)`; }}
            onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow=`0 8px 24px rgba(92,19,34,0.22)`; }}>
                               <WAIcon />
 Let's Connect on WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ════════════════ CTA ════════════════ */
/* soft burgundy → rose gradient — the ONLY section with a coloured bg,
   kept intentionally for contrast as a final call to action              */
function CtaSection() {
  return (
    <section style={{ padding:'clamp(56px,7vw,88px) 0', background:`linear-gradient(135deg,${C.textSub} 0%, #A84060 50%, ${C.rose} 100%)`, textAlign:'center', position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', top:'-60px', right:'-60px', width:'260px', height:'260px', borderRadius:'50%', background:'rgba(255,255,255,0.07)', pointerEvents:'none' }} />
      <div style={{ position:'absolute', bottom:'-40px', left:'-40px', width:'200px', height:'200px', borderRadius:'50%', background:'rgba(255,255,255,0.05)', pointerEvents:'none' }} />
      {/* Light grid overlay */}
      <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(255,255,255,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.06) 1px,transparent 1px)', backgroundSize:'52px 52px', pointerEvents:'none' }} />

      <div className="container" style={{ position:'relative', zIndex:1 }}>
        <motion.div {...fv(0)}>
          <p style={{ fontSize:'11px', letterSpacing:'4px', textTransform:'uppercase', color:'rgba(255,255,255,0.65)', marginBottom:'14px' }}>Get Started</p>
          <h2 style={{ fontFamily:'Cormorant Garamond', fontSize:'clamp(28px,5vw,50px)', color:'#fff', fontWeight:300, marginBottom:'14px', fontStyle:'italic' }}>
            Ready to build something great?
          </h2>
          <p style={{ color:'rgba(255,255,255,0.78)', fontSize:'16px', marginBottom:'36px', maxWidth:'440px', margin:'0 auto 36px', lineHeight:1.8 }}>
            No commitment, no pressure — just a conversation about what's possible for your brand.
          </p>
          <div style={{ display:'flex', gap:'12px', justifyContent:'center', flexWrap:'wrap' }}>
            <a href={`https://wa.me/${WA}?text=${encodeURIComponent("Hi! I want to discuss a tech project 💻")}`}
              target="_blank" rel="noopener noreferrer"
              style={{ padding:'13px 30px', borderRadius:'50px', background:'#25D366', color:'#fff', fontWeight:700, fontSize:'14px', boxShadow:'0 6px 18px rgba(0,0,0,0.18)', display:'flex', alignItems:'center', gap:'7px', transition:'all 0.25s' }}
              onMouseEnter={e => e.currentTarget.style.transform='translateY(-2px)'}
              onMouseLeave={e => e.currentTarget.style.transform='translateY(0)'}>
                                 <WAIcon />
 WhatsApp
            </a>
            <a href="mailto:soulfulscribble@gmail.com"
              style={{ padding:'13px 30px', borderRadius:'50px', background:'rgba(255,255,255,0.15)', color:'#fff', fontWeight:500, fontSize:'14px', border:'1.5px solid rgba(255,255,255,0.32)', backdropFilter:'blur(8px)', transition:'all 0.25s' }}
              onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,0.24)'}
              onMouseLeave={e => e.currentTarget.style.background='rgba(255,255,255,0.15)'}>
              ✉️ Email
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}