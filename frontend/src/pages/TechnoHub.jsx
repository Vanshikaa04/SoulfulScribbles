import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const WA = '919876543210';

const SERVICES = [
  { icon:'🌐', title:'Website Building',       desc:'Custom, responsive, high-performance websites — from landing pages to full-stack MERN apps tailored to your brand.', tags:['React','Next.js','MERN','WordPress'],  color:'#C4758A' },
  { icon:'✏️', title:'Logo Designing',          desc:'Logos that are the visual soul of your brand — timeless, versatile, delivered with a full branding kit.',              tags:['Figma','Vector','Branding Kit'],       color:'#D4956A' },
  { icon:'📣', title:'Digital Marketing',       desc:'Data-driven campaigns that actually convert. Strategy to execution — your brands growth is in good hands.',           tags:['Meta Ads','Google Ads','Analytics'],  color:'#A67CC5' },
  { icon:'🔍', title:'SEO Optimization',        desc:'Get found by the right people. On-page, off-page and technical SEO that moves you up the rankings sustainably.',       tags:['On-Page','Technical SEO','Local SEO'],color:'#6B8FD4' },
  { icon:'🎬', title:'Video Editing',            desc:'Cinematic reels, polished ads, YouTube content — edits that captivate and convert.',                                   tags:['Reels','YouTube','Motion Graphics'],  color:'#D46B8F' },
  { icon:'📱', title:'Social Media Marketing',  desc:'Full social management — content calendars, creatives, engagement and growth strategy across platforms.',               tags:['Instagram','LinkedIn','Facebook'],    color:'#6BC4B0' },
  { icon:'📊', title:'Data Analysis',           desc:'Turn raw data into clear decisions. Exploratory analysis, dashboards, visualisations and insight reports for businesses.', tags:['Python','Pandas','Power BI','Excel'], color:'#E8A56A' },
  { icon:'🤖', title:'Machine Learning',        desc:'Predictive models, recommendation engines and NLP solutions — bringing intelligent automation to real business problems.',  tags:['Python','Scikit-learn','TensorFlow','Jupyter'], color:'#7CC4A6' },
];

const CAT_COLORS = {
  'Web Dev':'#C4758A','Design':'#D4956A','Digital Marketing':'#A67CC5',
  'SEO':'#6B8FD4','Video':'#D46B8F','Social Media':'#6BC4B0',
  'Data Analysis':'#E8A56A','Machine Learning':'#7CC4A6','Other':'#9BA8C0',
};

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
  initial:{ opacity:0, y:28 },
  whileInView:{ opacity:1, y:0 },
  viewport:{ once:true },
  transition:{ duration:0.65, delay, ease:[0.22,1,0.36,1] },
});

export default function TechnoHub() {
  const [projects, setProjects]   = useState([]);
  const [loadingP, setLoadingP]   = useState(true);

  useEffect(() => {
    fetch('/api/projects')
      .then(r => r.json())
      .then(d => { if (Array.isArray(d)) setProjects(d); setLoadingP(false); })
      .catch(() => setLoadingP(false));
  }, []);

  return (
    <div style={{ background:'#1A0A0E', color:'#FAF0F2', minHeight:'100vh', overflowX:'hidden' }}>
      <HeroSection />
      <StatsBar />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection projects={projects} loading={loadingP} />
      <JoinSection />
      <TechnoCTA />
    </div>
  );
}

/* ════ HERO ════ */
function HeroSection() {
  return (
    <section style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'linear-gradient(160deg,#1A0A0E 0%,#2A1218 50%,#1A0A0E 100%)', paddingTop:'72px', position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(196,117,138,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(196,117,138,0.04) 1px,transparent 1px)', backgroundSize:'64px 64px', pointerEvents:'none' }} />
      <div style={{ position:'absolute', top:'25%', left:'15%', width:'400px', height:'400px', borderRadius:'50%', background:'radial-gradient(circle,rgba(107,26,42,0.3) 0%,transparent 70%)', filter:'blur(60px)', pointerEvents:'none' }} />
      <div style={{ position:'absolute', bottom:'20%', right:'10%', width:'320px', height:'320px', borderRadius:'50%', background:'radial-gradient(circle,rgba(196,117,138,0.18) 0%,transparent 70%)', filter:'blur(50px)', pointerEvents:'none' }} />

      <div style={{ textAlign:'center', padding:'0 20px', position:'relative', zIndex:1, maxWidth:'860px', width:'100%' }}>
        <motion.div initial={{ opacity:0, y:32 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.8 }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:'10px', padding:'7px 20px', borderRadius:'40px', background:'rgba(196,117,138,0.08)', border:'1px solid rgba(196,117,138,0.22)', marginBottom:'30px' }}>
            <div style={{ width:'7px', height:'7px', borderRadius:'50%', background:'#C4758A', animation:'glow-pulse 2s infinite' }} />
            <span style={{ fontSize:'11px', letterSpacing:'3px', textTransform:'uppercase', color:'#C4758A', fontFamily:'Space Mono' }}>Techno Hub — Available for Projects</span>
          </div>

          <h1 style={{ fontFamily:'Cormorant Garamond', fontSize:'clamp(44px,9vw,88px)', fontWeight:300, color:'#FAF0F2', lineHeight:1.0, marginBottom:'24px' }}>
            Your Digital Presence,<br />
            <em style={{ fontStyle:'italic', background:'linear-gradient(135deg,#6B1A2A,#C4758A,#F0D5DC)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
              Crafted with Precision
            </em>
          </h1>

          <p style={{ fontSize:'clamp(14px,2.2vw,18px)', color:'rgba(250,240,242,0.55)', maxWidth:'540px', margin:'0 auto 44px', lineHeight:1.9, fontWeight:300 }}>
            Solo freelance tech services by <strong style={{ color:'#FAF0F2' }}>Vanshika Wadhwani</strong> — ex Full Stack Developer &amp; Tech Educator at Code Master Technology. Personalized. Professional. Passionate.
          </p>

          <div style={{ display:'flex', gap:'14px', justifyContent:'center', flexWrap:'wrap' }}>
            <a href="#services"
              style={{ padding:'13px 30px', borderRadius:'50px', background:'linear-gradient(135deg,#6B1A2A,#C4758A)', color:'#fff', fontWeight:600, fontSize:'14px', boxShadow:'0 8px 24px rgba(107,26,42,0.35)' }}>
              Explore Services
            </a>
            <a href={`https://wa.me/${WA}?text=${encodeURIComponent("Hi Vanshika! I'd like to discuss a tech project 💻")}`}
              target="_blank" rel="noopener noreferrer"
              style={{ padding:'13px 30px', borderRadius:'50px', background:'transparent', color:'#C4758A', border:'1px solid rgba(196,117,138,0.35)', fontSize:'14px', fontWeight:600 }}>
              💬 Let's Talk
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ════ STATS ════ */
function StatsBar() {
  const stats = [['1yr+','Industry Experience'],['8+','Services Offered'],['50+','Projects Delivered'],['1:1','Personal Attention']];
  return (
    <div style={{ background:'#120608', borderTop:'1px solid rgba(196,117,138,0.1)', borderBottom:'1px solid rgba(196,117,138,0.1)', padding:'28px 0' }}>
      <div className="container">
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(120px,1fr))', gap:'20px', textAlign:'center' }}>
          {stats.map(([num,label]) => (
            <div key={label}>
              <p style={{ fontFamily:'Cormorant Garamond', fontSize:'clamp(26px,4vw,38px)', color:'#C4758A', fontWeight:700, lineHeight:1 }}>{num}</p>
              <p style={{ fontSize:'11px', color:'rgba(250,240,242,0.35)', letterSpacing:'2px', textTransform:'uppercase', marginTop:'5px' }}>{label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ════ ABOUT ════ */
function AboutSection() {
  const [ref, v] = useInView();
  return (
    <section style={{ padding:'clamp(60px,8vw,100px) 0' }}>
      <div className="container">
        <div ref={ref} style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,300px),1fr))', gap:'clamp(36px,6vw,72px)', alignItems:'center', opacity:v?1:0, transform:v?'translateY(0)':'translateY(32px)', transition:'all 0.8s' }}>
          <div>
            <p style={{ fontSize:'11px', letterSpacing:'4px', textTransform:'uppercase', color:'#C4758A', marginBottom:'14px', fontFamily:'Space Mono' }}>// Who I Am</p>
            <h2 style={{ fontFamily:'Cormorant Garamond', fontSize:'clamp(28px,5vw,50px)', color:'#FAF0F2', fontWeight:300, marginBottom:'24px', lineHeight:1.2 }}>
              Not an agency.<br />
              <em style={{ fontStyle:'italic', color:'#C4758A' }}>Just me — and I mean it.</em>
            </h2>
            <p style={{ fontSize:'15px', color:'rgba(250,240,242,0.58)', lineHeight:1.95, marginBottom:'16px', fontWeight:300 }}>
              I'm <strong style={{ color:'#FAF0F2' }}>Vanshika Wadhwani</strong> — Full Stack Developer, designer, data analyst and digital strategist. I spent a year as a <span style={{ color:'#D4956A' }}>Full Stack Developer &amp; Tech Educator at Code Master Technology</span>, building real-world projects and teaching developers.
            </p>
            <p style={{ fontSize:'15px', color:'rgba(250,240,242,0.58)', lineHeight:1.95, fontWeight:300 }}>
              Now I bring that expertise directly to you as a solo freelancer. From sleek websites to predictive ML models — when you hire me, you get <em style={{ color:'#C4758A', fontStyle:'italic' }}>me</em>, not a junior.
            </p>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px' }}>
            {[['💻','Full Stack Dev','React, Node, MongoDB'],['📊','Data Analysis','Python, Power BI, Pandas'],['🤖','Machine Learning','Scikit-learn, TensorFlow'],['🎓','Tech Educator','Code Master Technology']].map(([icon,title,sub]) => (
              <div key={title} style={{ padding:'18px', borderRadius:'16px', background:'rgba(255,255,255,0.03)', border:'1px solid rgba(196,117,138,0.12)', transition:'all 0.25s' }}
                onMouseEnter={e=>{ e.currentTarget.style.background='rgba(196,117,138,0.06)'; e.currentTarget.style.borderColor='rgba(196,117,138,0.25)'; }}
                onMouseLeave={e=>{ e.currentTarget.style.background='rgba(255,255,255,0.03)'; e.currentTarget.style.borderColor='rgba(196,117,138,0.12)'; }}>
                <span style={{ fontSize:'24px', marginBottom:'8px', display:'block' }}>{icon}</span>
                <p style={{ fontSize:'13px', fontWeight:600, color:'#FAF0F2', marginBottom:'3px' }}>{title}</p>
                <p style={{ fontSize:'11px', color:'rgba(250,240,242,0.38)' }}>{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════ SERVICES ════ */
function ServicesSection() {
  const [ref, v] = useInView();
  return (
    <section id="services" style={{ padding:'clamp(60px,8vw,100px) 0', background:'#120608' }}>
      <div className="container">
        <motion.div {...fv(0)} style={{ marginBottom:'56px' }}>
          <p style={{ fontSize:'11px', letterSpacing:'4px', textTransform:'uppercase', color:'#C4758A', marginBottom:'10px', fontFamily:'Space Mono' }}>// What I Offer</p>
          <h2 style={{ fontFamily:'Cormorant Garamond', fontSize:'clamp(28px,5vw,50px)', color:'#FAF0F2', fontWeight:300 }}>
            Services <em style={{ fontStyle:'italic', color:'#C4758A' }}>à la carte</em>
          </h2>
          <p style={{ fontSize:'14px', color:'rgba(250,240,242,0.4)', marginTop:'10px' }}>Each service delivered personally. No outsourcing, no middlemen.</p>
        </motion.div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(min(100%,290px),1fr))', gap:'18px' }}>
          {SERVICES.map((s,i) => <ServiceCard key={s.title} service={s} delay={i*0.05} />)}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service, delay }) {
  const [hov, setHov] = useState(false);
  return (
    <motion.div {...fv(delay)}
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{
        padding:'clamp(22px,3vw,34px)', borderRadius:'20px', height:'100%',
        background:hov?'rgba(255,255,255,0.04)':'rgba(255,255,255,0.02)',
        border:hov?`1px solid ${service.color}40`:'1px solid rgba(255,255,255,0.06)',
        transition:'all 0.32s', transform:hov?'translateY(-5px)':'translateY(0)',
        boxShadow:hov?`0 18px 44px rgba(0,0,0,0.32),inset 0 1px 0 ${service.color}18`:'none',
        position:'relative', overflow:'hidden', display:'flex', flexDirection:'column',
      }}>
      {hov && <div style={{ position:'absolute', top:0, left:0, right:0, height:'2px', background:`linear-gradient(90deg,transparent,${service.color},transparent)` }} />}
      <span style={{ fontSize:'32px', marginBottom:'16px', display:'block' }}>{service.icon}</span>
      <h3 style={{ fontFamily:'Cormorant Garamond', fontSize:'20px', fontWeight:600, color:'#FAF0F2', marginBottom:'10px' }}>{service.title}</h3>
      <p style={{ fontSize:'13px', color:'rgba(250,240,242,0.5)', lineHeight:1.82, marginBottom:'18px', fontWeight:300, flex:1 }}>{service.desc}</p>
      <div style={{ display:'flex', flexWrap:'wrap', gap:'5px', marginBottom:'16px' }}>
        {service.tags.map(t=>(
          <span key={t} style={{ padding:'3px 10px', borderRadius:'20px', fontSize:'11px', background:`${service.color}12`, color:service.color, border:`1px solid ${service.color}20`, fontFamily:'Space Mono' }}>{t}</span>
        ))}
      </div>
      <a href={`https://wa.me/${WA}?text=${encodeURIComponent(`Hi Vanshika! I'm interested in your ${service.title} service 💻`)}`}
        target="_blank" rel="noopener noreferrer"
        style={{ fontSize:'13px', color:service.color, display:'flex', alignItems:'center', gap:'6px', transition:'gap 0.2s' }}
        onMouseEnter={e=>e.currentTarget.style.gap='10px'}
        onMouseLeave={e=>e.currentTarget.style.gap='6px'}>
        Get a Quote →
      </a>
    </motion.div>
  );
}

/* ════ PROJECTS ════ */
function ProjectsSection({ projects, loading }) {
  const [filter, setFilter] = useState('All');
  const allCats = ['All', ...new Set(projects.map(p => p.category).filter(Boolean))];
  const filtered = filter === 'All' ? projects : projects.filter(p => p.category === filter);

  return (
    <section style={{ padding:'clamp(60px,8vw,100px) 0' }}>
      <div className="container">
        <motion.div {...fv(0)} style={{ marginBottom:'44px' }}>
          <p style={{ fontSize:'11px', letterSpacing:'4px', textTransform:'uppercase', color:'#D4956A', marginBottom:'10px', fontFamily:'Space Mono' }}>// Portfolio</p>
          <h2 style={{ fontFamily:'Cormorant Garamond', fontSize:'clamp(28px,5vw,50px)', color:'#FAF0F2', fontWeight:300, lineHeight:1.15 }}>
            Projects at <em style={{ fontStyle:'italic', color:'#D4956A' }}>Code Master Technology</em><br />
            <span style={{ fontSize:'55%', color:'rgba(250,240,242,0.38)', fontStyle:'normal' }}>&amp; Freelance Work</span>
          </h2>
        </motion.div>

        {/* Category filter */}
        <div style={{ display:'flex', gap:'8px', flexWrap:'wrap', marginBottom:'32px' }}>
          {allCats.map(c => (
            <button key={c} onClick={()=>setFilter(c)}
              style={{ padding:'7px 16px', borderRadius:'40px', fontSize:'12px', cursor:'pointer', fontFamily:'DM Sans', transition:'all 0.22s', background:filter===c?'linear-gradient(135deg,#6B1A2A,#C4758A)':'rgba(255,255,255,0.04)', color:filter===c?'#fff':'rgba(250,240,242,0.5)', border:filter===c?'none':'1px solid rgba(255,255,255,0.08)', fontWeight:filter===c?600:400, display:'flex', alignItems:'center', gap:'5px' }}>
              {CAT_COLORS[c] && c!=='All' && <span style={{ width:'6px', height:'6px', borderRadius:'50%', background:CAT_COLORS[c], display:'inline-block' }} />}
              {c}
            </button>
          ))}
        </div>

        {loading ? (
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(min(100%,300px),1fr))', gap:'20px' }}>
            {[1,2,3,4,5,6].map(i=>(
              <div key={i} style={{ borderRadius:'18px', overflow:'hidden', background:'#221215', border:'1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ height:'160px', background:'linear-gradient(90deg,#221215,#2A1218,#221215)', backgroundSize:'200% 100%', animation:'shimmer 1.5s infinite' }} />
                <div style={{ padding:'18px' }}>
                  <div style={{ height:'16px', background:'#2A1218', borderRadius:'4px', marginBottom:'8px' }} />
                  <div style={{ height:'12px', width:'60%', background:'#1E0C10', borderRadius:'4px' }} />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign:'center', padding:'60px 0', color:'rgba(250,240,242,0.35)' }}>
            <span style={{ fontSize:'48px', display:'block', marginBottom:'12px' }}>💻</span>
            <p style={{ fontFamily:'Cormorant Garamond', fontSize:'22px', fontStyle:'italic' }}>No projects in this category yet</p>
          </div>
        ) : (
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(min(100%,300px),1fr))', gap:'20px' }}>
            {filtered.map((p,i) => <ProjectCard key={p._id} project={p} delay={i*0.05} />)}
          </div>
        )}
      </div>
    </section>
  );
}

function ProjectCard({ project, delay }) {
  const [hov, setHov] = useState(false);
  const accentColor = CAT_COLORS[project.category] || '#C4758A';
  return (
    <motion.div {...fv(delay)}
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{ borderRadius:'20px', overflow:'hidden', background:'#221215', border:hov?`1px solid ${accentColor}40`:'1px solid rgba(255,255,255,0.06)', transition:'all 0.35s', transform:hov?'translateY(-6px)':'translateY(0)', boxShadow:hov?'0 22px 50px rgba(0,0,0,0.4)':'0 2px 10px rgba(0,0,0,0.2)' }}>
      {/* Image */}
      <div style={{ height:'170px', background:`linear-gradient(135deg,#2A1218,#3D1020)`, position:'relative', overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center' }}>
        {project.image
          ? <img src={project.image} alt={project.title} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.45s', transform:hov?'scale(1.06)':'scale(1)' }} />
          : <span style={{ fontSize:'44px', opacity:0.18 }}>💻</span>}
        {/* Category */}
        <div style={{ position:'absolute', top:'11px', right:'11px', padding:'4px 11px', borderRadius:'20px', background:`rgba(34,18,21,0.85)`, backdropFilter:'blur(8px)', color:accentColor, fontSize:'11px', fontFamily:'Space Mono', border:`1px solid ${accentColor}30` }}>
          {project.category}
        </div>
        {/* Org */}
        {project.org && (
          <div style={{ position:'absolute', bottom:'11px', left:'11px', padding:'3px 10px', borderRadius:'20px', background:'rgba(212,149,106,0.15)', border:'1px solid rgba(212,149,106,0.3)', color:'#D4956A', fontSize:'10px' }}>
            🏢 {project.org}
          </div>
        )}
        {project.featured && (
          <div style={{ position:'absolute', top:'11px', left:'11px', padding:'3px 10px', borderRadius:'20px', background:'linear-gradient(135deg,#6B1A2A,#C4758A)', color:'#fff', fontSize:'10px', fontWeight:600 }}>⭐ Featured</div>
        )}
      </div>

      <div style={{ padding:'18px 20px' }}>
        <h3 style={{ fontFamily:'Cormorant Garamond', fontSize:'18px', color:'#FAF0F2', marginBottom:'7px', fontWeight:600, lineHeight:1.3 }}>{project.title}</h3>
        <p style={{ fontSize:'13px', color:'rgba(250,240,242,0.45)', lineHeight:1.72, marginBottom:'14px', display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' }}>{project.description}</p>
        {project.tech?.length > 0 && (
          <div style={{ display:'flex', flexWrap:'wrap', gap:'5px', marginBottom:'14px' }}>
            {project.tech.slice(0,4).map(t=>(
              <span key={t} style={{ padding:'2px 9px', borderRadius:'20px', fontSize:'11px', background:`${accentColor}12`, color:accentColor, fontFamily:'Space Mono' }}>{t}</span>
            ))}
          </div>
        )}
        {project.link && (
          <a href={project.link} target="_blank" rel="noopener noreferrer"
            style={{ fontSize:'13px', color:accentColor, display:'flex', alignItems:'center', gap:'5px', transition:'gap 0.18s' }}
            onMouseEnter={e=>e.currentTarget.style.gap='9px'}
            onMouseLeave={e=>e.currentTarget.style.gap='5px'}>
            View Project →
          </a>
        )}
      </div>
    </motion.div>
  );
}

/* ════ JOIN ════ */
function JoinSection() {
  return (
    <section style={{ padding:'clamp(60px,8vw,100px) 0', background:'#120608' }}>
      <div className="container">
        <motion.div {...fv(0)} style={{ maxWidth:'700px', margin:'0 auto', textAlign:'center' }}>
          <div style={{ display:'inline-flex', gap:'8px', padding:'5px 18px', borderRadius:'40px', background:'rgba(212,149,106,0.08)', border:'1px solid rgba(212,149,106,0.2)', marginBottom:'24px' }}>
            <span style={{ fontSize:'11px', letterSpacing:'3px', textTransform:'uppercase', color:'#D4956A', fontFamily:'Space Mono' }}>Collaborate</span>
          </div>
          <h2 style={{ fontFamily:'Cormorant Garamond', fontSize:'clamp(28px,5vw,48px)', color:'#FAF0F2', fontWeight:300, marginBottom:'20px', lineHeight:1.2 }}>
            Work as Part of My<br />
            <em style={{ fontStyle:'italic', background:'linear-gradient(135deg,#D4956A,#C4758A)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>Freelance Network</em>
          </h2>
          <p style={{ fontSize:'15px', color:'rgba(250,240,242,0.5)', lineHeight:1.95, marginBottom:'14px', fontWeight:300 }}>
            I occasionally collaborate with fellow developers, designers, data analysts and content creators on client projects. If you're passionate and want real-world experience — let's connect.
          </p>
          <p style={{ fontSize:'15px', color:'rgba(250,240,242,0.5)', lineHeight:1.95, marginBottom:'40px', fontWeight:300 }}>
            Fresher looking for mentorship or a professional wanting collaboration — I believe in building together.
          </p>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(130px,1fr))', gap:'12px', marginBottom:'40px' }}>
            {[['🚀','Real Projects'],['💡','Mentorship'],['🌐','Remote Work'],['📈','Portfolio Growth']].map(([e,l])=>(
              <div key={l} style={{ padding:'16px 10px', borderRadius:'14px', background:'rgba(255,255,255,0.03)', border:'1px solid rgba(196,117,138,0.12)', textAlign:'center' }}>
                <span style={{ fontSize:'22px', display:'block', marginBottom:'7px' }}>{e}</span>
                <p style={{ fontSize:'12px', color:'rgba(250,240,242,0.42)', lineHeight:1.4 }}>{l}</p>
              </div>
            ))}
          </div>
          <a href={`https://wa.me/${WA}?text=${encodeURIComponent("Hi Vanshika! I'd love to collaborate with you 🙋")}`}
            target="_blank" rel="noopener noreferrer"
            style={{ display:'inline-flex', alignItems:'center', gap:'10px', padding:'14px 34px', borderRadius:'50px', background:'linear-gradient(135deg,#6B1A2A,#C4758A)', color:'#fff', fontWeight:600, fontSize:'15px', boxShadow:'0 8px 28px rgba(107,26,42,0.35)' }}>
            💬 Let's Connect on WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ════ FINAL CTA ════ */
function TechnoCTA() {
  return (
    <section style={{ padding:'clamp(56px,7vw,88px) 0', background:'linear-gradient(135deg,#2A0A12 0%,#6B1A2A 50%,#C4758A 100%)', textAlign:'center', position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)', backgroundSize:'48px 48px', pointerEvents:'none' }} />
      <div className="container" style={{ position:'relative', zIndex:1 }}>
        <motion.div {...fv(0)}>
          <h2 style={{ fontFamily:'Cormorant Garamond', fontSize:'clamp(28px,5vw,48px)', color:'#fff', fontWeight:300, marginBottom:'14px', fontStyle:'italic' }}>Ready to build something great?</h2>
          <p style={{ color:'rgba(255,255,255,0.7)', fontSize:'16px', marginBottom:'34px', maxWidth:'440px', margin:'0 auto 34px', lineHeight:1.8 }}>
            Let's have a conversation. No commitment, no pressure — just exploring what's possible for your brand.
          </p>
          <div style={{ display:'flex', gap:'12px', justifyContent:'center', flexWrap:'wrap' }}>
            <a href={`https://wa.me/${WA}?text=${encodeURIComponent("Hi! I want to discuss a tech project 💻")}`} target="_blank" rel="noopener noreferrer"
              style={{ padding:'13px 30px', borderRadius:'50px', background:'#25D366', color:'#fff', fontWeight:600, fontSize:'14px', boxShadow:'0 6px 18px rgba(0,0,0,0.2)', display:'flex', alignItems:'center', gap:'7px' }}>
              💬 WhatsApp
            </a>
            <a href="mailto:soulfulscribble@gmail.com"
              style={{ padding:'13px 30px', borderRadius:'50px', background:'rgba(255,255,255,0.12)', color:'#fff', fontWeight:500, fontSize:'14px', border:'1px solid rgba(255,255,255,0.25)', backdropFilter:'blur(8px)' }}>
              ✉️ Email
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}