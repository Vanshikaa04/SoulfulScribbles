import React, { useRef } from 'react';
import { A } from '../pages/admin/theme'; 

const ExperienceCarousel = () => {
  const scrollRef = useRef(null);

  const experience = [
    {
      id: 1,
      type: 'Certification',
      title: 'Oracle Cloud Infrastructure Generative AI',
      org: 'Oracle',
      date: 'July 2024',
      // Portrait image (e.g., you working at the office)
      img: '/certificates/oracle2.png', 
      aspect: 'portrait'
    },
    {
      id: 2,
      type: 'Internship',
      title: 'Data Analyst Job Simulation',
      org: 'Forage',
      date: 'August 2025',
      // Landscape image (e.g., a wide certificate)
      img: '/certificates/deloitte.png',
      aspect: 'landscape'
    },
     {
      id: 3,
      type: 'Internship',
      title: 'Gen AI Powered Data Analytics Job Simulation',
      org: 'Forage',
      date: 'April 2026',
      // Landscape image (e.g., a wide certificate)
      img: '/certificates/tata.png',
      aspect: 'landscape'
    } ,
      {
      id: 4,
      type: 'Internship',
      title: 'Python with django',
      org: 'Brainy Beams- Sukem Tech Lab',
      date: 'June- July 2024',
      // Landscape image (e.g., a wide certificate)
      img: '/certificates/brainy.jpg',
      aspect: 'landscape'
    } 
  ];

  const scroll = (dir) => {
    if (scrollRef.current) {
      const scrollAmount = 360;
      scrollRef.current.scrollBy({ 
        left: dir === 'left' ? -scrollAmount : scrollAmount, 
        behavior: 'smooth' 
      });
    }
  };

  return (
    <div className="container" style={{ marginTop: '80px' }}>
      <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <p style={{ fontSize: '11px', letterSpacing: '4px', textTransform: 'uppercase', color: A.rose, marginBottom: '10px', fontWeight: 600 }}>Experience</p>
          <h2 style={{ fontFamily: 'Cormorant Garamond', fontSize: 'clamp(28px,4vw,42px)', color: A.textMain, fontWeight: 300, lineHeight: 1.15 }}>Certifications & Internships</h2>
        </div>

        <div className="hidden-mobile" style={{ display: 'flex', gap: '8px' }}>
          <button onClick={() => scroll('left')} className="nav-btn">←</button>
          <button onClick={() => scroll('right')} className="nav-btn">→</button>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="carousel-container hide-scrollbar"
        style={{ display: 'flex', gap: '24px', overflowX: 'auto', paddingBottom: '30px', scrollSnapType: 'x mandatory' }}
      >
        {experience.map((item) => (
          <div 
            key={item.id}
            style={{ 
              minWidth: 'clamp(300px, 85vw, 420px)', 
              scrollSnapAlign: 'start',
              background: A.cardBg,
              border: `1px solid ${A.border}`,
              borderRadius: '28px',
              overflow: 'hidden',
              transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
            }}
            className="exp-card"
          >
            {/* Image Container: This handles the different orientations */}
            <div style={{ 
              height: '240px', 
              width: '100%', 
              background: A.petal, 
              position: 'relative',
              overflow: 'hidden'
            }}>
              <img 
                src={item.img} 
                alt={item.title} 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  // 'cover' ensures the portrait/landscape image fills the 240px box
                  objectFit: item.aspect === 'landscape' ? 'contain' : 'cover', 
                  padding: item.aspect === 'landscape' ? '20px' : '0',
                  transition: 'transform 0.6s ease'
                }}
                className="proof-img"
              />
              <div style={{ position: 'absolute', top: '15px', left: '15px' }}>
                <span style={{ fontSize: '9px', fontWeight: 800, letterSpacing: '1px', color: '#FFF', background: A.burgundy, padding: '5px 12px', borderRadius: '50px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
                  {item.type}
                </span>
              </div>
            </div>

            <div style={{ padding: '28px' }}>
              <span style={{ fontSize: '11px', color: A.textLight, fontWeight: 500 }}>{item.date}</span>
              <h3 style={{ fontFamily: 'Cormorant Garamond', fontSize: '24px', color: A.textMain, marginTop: '8px', fontWeight: 400 }}>
                {item.title}
              </h3>
              <p style={{ fontSize: '14px', color: A.rose, fontWeight: 600 }}>{item.org}</p>
              
              
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .carousel-container { -ms-overflow-style: none; scrollbar-width: none; }
        .carousel-container::-webkit-scrollbar { display: none; }
        
        .nav-btn {
          width: 46px; height: 46px; border-radius: 50%;
          border: 1.5px solid ${A.border}; background: white;
          color: ${A.burgundy}; cursor: pointer; transition: all 0.2s;
          display: flex; align-items: center; justify-content: center;
        }
        .nav-btn:hover { background: ${A.burgundy}; color: white; transform: scale(1.05); }

        .exp-card:hover {
           border-color: ${A.roseSoft} !important;
           box-shadow: 0 20px 40px -20px rgba(92, 19, 34, 0.15);
        }
        
        .exp-card:hover .proof-img {
          transform: scale(1.08);
        }

        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
        }
      `}</style>
    </div>
  );
};

export default ExperienceCarousel;