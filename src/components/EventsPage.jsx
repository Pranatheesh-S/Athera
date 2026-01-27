import React, { useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- RECAP MODAL COMPONENT ---
const RecapModal = ({ onClose }) => {
  const modalRef = useRef(null);
  const contentRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(modalRef.current, { opacity: 0, duration: 0.5 });
      gsap.from(contentRef.current, {
        scale: 0.9, opacity: 0, duration: 0.6, ease: "power3.out", delay: 0.1
      });
      gsap.from(".recap-item", {
        y: 30, opacity: 0, stagger: 0.1, duration: 0.8, ease: "power2.out", delay: 0.3
      });
    }, modalRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={modalRef} className="modal-overlay">
      <div ref={contentRef} className="modal-content">
        <button onClick={onClose} className="close-btn">× CLOSE REPORT</button>

        <div className="modal-header">
          <h2 className="modal-title">PITCH ARENA // <span className="highlight-text">RESULTS</span></h2>
        </div>

        <div className="winners-grid">
          {/* 1ST PLACE */}
          <div className="winner-card first-place recap-item">
            <div className="medal-icon">🥇 1ST PLACE</div>
            <img
              src="/pitch_first.jpg"
              onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/400x500?text=No+Image"; }}
              alt="First Prize Winner"
              className="winner-img"
            />
            <div className="winner-info">
              <h3>PROJECT: NEURO-LINK</h3>
              <p>Dev: Alex Mercer</p>
              <span className="prize-pool">🏆 Prize: $5,000</span>
            </div>
          </div>

          {/* 2ND PLACE */}
          <div className="winner-card second-place recap-item">
            <div className="medal-icon">🥈 2ND PLACE</div>
            <img
              src="/pitch_second.jpg"
              onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/400x500?text=No+Image"; }}
              alt="Second Prize Winner"
              className="winner-img"
            />
            <div className="winner-info">
              <h3>PROJECT: CYBER-SAFE</h3>
              <p>Dev: Sarah Connor</p>
            </div>
          </div>

          {/* 3RD PLACE */}
          <div className="winner-card third-place recap-item">
            <div className="medal-icon">🥉 3RD PLACE</div>
            <img
              src="/pitch_third.jpg"
              onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/400x500?text=No+Image"; }}
              alt="Third Prize Winner"
              className="winner-img"
            />
            <div className="winner-info">
              <h3>PROJECT: GREEN-GRID</h3>
              <p>Dev: David Martinez</p>
            </div>
          </div>
        </div>

        <div className="team-section recap-item">
          <h3 className="section-title">ORGANIZING SQUADRON</h3>
          <div className="team-img-wrapper">
            <img
              src="/pitch_team.jfif"
              onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/800x400?text=Team+Image"; }}
              alt="Team Group Photo"
              className="team-img"
            />
            <div className="tech-decor"></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .modal-overlay {
          position: fixed; inset: 0; background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(8px); z-index: 1000;
          display: flex; justify-content: center; align-items: center; padding: 1rem;
        }
        .modal-content {
          background: #09090b; border: 1px solid #3f3f46;
          width: 100%; max-width: 900px; max-height: 90vh;
          overflow-y: auto; padding: 3rem; position: relative;
          box-shadow: 0 0 50px rgba(0,0,0,0.8);
        }
        .modal-content::-webkit-scrollbar { width: 8px; }
        .modal-content::-webkit-scrollbar-track { background: #18181b; }
        .modal-content::-webkit-scrollbar-thumb { background: #3f3f46; border-radius: 4px; }

        .close-btn {
          position: absolute; top: 1.5rem; right: 1.5rem;
          background: transparent; border: 1px solid #dc2626; color: #dc2626;
          padding: 0.5rem 1rem; cursor: pointer; font-family: 'JetBrains Mono', monospace;
          font-weight: bold; transition: all 0.3s; z-index: 10;
        }
        .close-btn:hover { background: #dc2626; color: white; }

        .modal-header { text-align: center; margin-bottom: 3rem; margin-top: 1rem; }
        .modal-title { font-family: 'Orbitron', sans-serif; font-size: 2.5rem; margin: 0; color: white; }

        .winners-grid {
          display: grid; grid-template-columns: 1fr 1fr 1fr;
          gap: 1.5rem; margin-bottom: 3rem; align-items: end; 
        }

        .winner-card {
          background: #18181b; border: 1px solid #27272a;
          padding: 1rem; text-align: center; position: relative;
        }

        /* --- UPDATED IMAGE STYLE TO SHOW COMPLETE PICTURE --- */
        .winner-img {
          width: 100%;
          height: 280px; /* Fixed height for alignment */
          object-fit: contain; /* Prevents cropping, shows full image */
          background-color: #000; /* Fills empty space if ratio differs */
          margin-bottom: 1rem;
          border-bottom: 2px solid #27272a;
        }

        .winner-info h3 { font-family: 'Orbitron'; font-size: 0.9rem; margin: 0.5rem 0; color: #fff; }
        .winner-info p { font-family: 'JetBrains Mono'; font-size: 0.75rem; color: #a1a1aa; margin: 0; }

        .first-place { 
          transform: scale(1.05); /* Slightly reduced scale to fit taller images better */
          border-color: #eab308; box-shadow: 0 0 20px rgba(234, 179, 8, 0.15); z-index: 2;
        }
        .first-place .medal-icon { color: #eab308; }
        .first-place .prize-pool { display: block; margin-top: 0.5rem; color: #eab308; font-weight: bold; font-size: 0.8rem; }

        .second-place { border-color: #94a3b8; }
        .second-place .medal-icon { color: #94a3b8; }

        .third-place { border-color: #b45309; }
        .third-place .medal-icon { color: #b45309; }

        .medal-icon {
          font-family: 'Orbitron'; font-weight: bold;
          margin-bottom: 0.5rem; font-size: 0.9rem;
        }

        .team-section { text-align: center; border-top: 1px solid #27272a; padding-top: 2rem; }
        .section-title { font-family: 'Orbitron'; color: #fff; margin-bottom: 1.5rem; }
        .team-img-wrapper { position: relative; width: 100%; height: 300px; overflow: hidden; border: 1px solid #27272a; }
        
        /* Team image uses cover because group photos usually fill the width */
        .team-img { width: 100%; height: 100%; object-fit: cover; filter: grayscale(50%); } 

        @media (max-width: 900px) {
           .winners-grid { grid-template-columns: 1fr; gap: 2rem; align-items: stretch; }
           .first-place { order: -1; transform: scale(1.02); margin-bottom: 1rem; }
           .modal-content { padding: 1.5rem; }
           .modal-title { font-size: 1.8rem; }
           .close-btn { top: 0.5rem; right: 0.5rem; padding: 0.4rem 0.8rem; font-size: 0.7rem; }
           .team-img-wrapper { height: 200px; }
           /* On mobile, let height adjust automatically to preserve aspect ratio */
           .winner-img { height: auto; max-height: 400px; } 
        }
      `}</style>
    </div>
  );
};

const EventsPage = () => {
  const containerRef = useRef(null);
  const [showRecap, setShowRecap] = useState(false);

  const titleRef = useRef(null);
  const cardRef = useRef(null);
  const workshopTitleRef = useRef(null);
  const workshopCardRef = useRef(null);
  const pastTitleRef = useRef(null);
  const pastCardRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(containerRef.current, { opacity: 1, duration: 0.5 });
      gsap.from(titleRef.current.querySelectorAll(".event-char"), {
        y: 50, opacity: 0, stagger: 0.02, duration: 0.5, ease: "power2.out"
      });
      gsap.from(cardRef.current, { y: 30, opacity: 0, duration: 0.5, ease: "power2.out", delay: 0.1 });
      gsap.from(workshopTitleRef.current, {
        y: 30, opacity: 0, duration: 0.5, ease: "power2.out",
        scrollTrigger: { trigger: workshopTitleRef.current, start: "top 95%" }
      });
      gsap.from(workshopCardRef.current, {
        y: 30, opacity: 0, duration: 0.5, ease: "power2.out", delay: 0.1,
        scrollTrigger: { trigger: workshopCardRef.current, start: "top 90%" }
      });
      gsap.from(pastTitleRef.current, {
        y: 30, opacity: 0, duration: 0.5, ease: "power2.out",
        scrollTrigger: { trigger: pastTitleRef.current, start: "top 95%" }
      });
      gsap.from(pastCardRef.current, {
        y: 30, opacity: 0, duration: 0.5, ease: "power2.out", delay: 0.1,
        scrollTrigger: { trigger: pastCardRef.current, start: "top 90%" }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="events-container" style={{ opacity: 0 }}>
      <nav className="events-nav">
        <Link to="/" className="back-link">← BACK TO HOME</Link>
      </nav>

      <div className="events-content">
        <div className="header-section">
          <h1 ref={titleRef} className="page-title">
            {"ONGOING EVENTS".split("").map((char, i) => (
              <span key={i} className="event-char" style={{ display: 'inline-block', minWidth: char === ' ' ? '1rem' : '0' }}>{char}</span>
            ))}
          </h1>
        </div>

        <div ref={cardRef} className="event-card-large">
          <div className="card-image-wrapper">
            <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop" alt="Hack with Magnus" className="card-bg" />
            <div className="card-overlay"></div><div className="tech-decor"></div>
          </div>
          <div className="card-details">
            <div className="card-details-bg-pattern"></div>
            <div className="content-inner">
              <div className="top-row">
                <div className="status-badge"><span className="blink-dot"></span> Registration Open</div>
                <span className="tech-id">ID: MGNS-25</span>
              </div>
              <h2 className="event-name">HACK WITH<br /><span className="highlight-text">MAGNUS</span></h2>
              <div className="meta-row">
                <div className="meta-item"><span className="label">DATE</span><span className="value">FEB 2, 2025</span></div>
                <div className="meta-item"><span className="label">LOCATION</span><span className="value">ON-SPOT</span></div>
              </div>
              <p className="event-desc">Join the ultimate coding confrontation. 6 hours to build, break, and rebuild. Magnus awaits those ready to challenge the status quo.</p>
              <div className="card-actions">
                <a href="https://athera-hackathon.vercel.app/" target="_blank" rel="noopener noreferrer" className="primary-btn">
                  <span className="btn-text">Register Protocol</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="section-spacer"></div>

        <div className="header-section">
          <h1 ref={workshopTitleRef} className="page-title">UPCOMING WORKSHOPS</h1>
        </div>

        <div ref={workshopCardRef} className="event-card-large">
          <div className="card-image-wrapper">
            <img src="/workshop.jpg" onError={(e) => { e.target.onerror = null; e.target.src = "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop"; }} alt="Upcoming Workshop" className="card-bg" />
            <div className="card-overlay"></div><div className="tech-decor"></div>
          </div>
          <div className="card-details">
            <div className="card-details-bg-pattern"></div>
            <div className="content-inner">
              <div className="top-row">
                <div className="status-badge"><span className="blink-dot"></span> Registration Open</div>
                <span className="tech-id">ID: WRK-25</span>
              </div>
              <h2 className="event-name">COMPUTER VISION<br /><span className="highlight-text">WITH TINYGRAND</span></h2>
              <div className="meta-row">
                <div className="meta-item"><span className="label">DATE</span><span className="value">MARCH 15, 2025</span></div>
                <div className="meta-item"><span className="label">LOCATION</span><span className="value">MAIN AUDITORIUM</span></div>
              </div>
              <p className="event-desc">Dive deep into the world of artificial intelligence and robotics. Hands-on sessions with industry experts to build the future.</p>
              <div className="card-actions">
                <a href="https://docs.google.com/forms/d/e/1FAIpQLSdGTTrO7dEf27iOqipBzqtBEIqldQZPCtS5q1dKj2Lz5MjJsQ/viewform" className="primary-btn">
                  <span className="btn-text">Reserve Seat</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="section-spacer"></div>

        <div className="header-section">
          <h1 ref={pastTitleRef} className="page-title">PAST EVENTS</h1>
        </div>

        <div ref={pastCardRef} className="event-card-large past-event-card">
          <div className="card-image-wrapper">
            <img src="/pitch.jpg" onError={(e) => { e.target.onerror = null; e.target.src = "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2032&auto=format&fit=crop"; }} alt="Pitch Arena" className="card-bg" />
            <div className="card-overlay"></div><div className="tech-decor"></div>
          </div>
          <div className="card-details">
            <div className="card-details-bg-pattern"></div>
            <div className="content-inner">
              <div className="top-row">
                <div className="status-badge status-completed"><span className="solid-dot"></span> Completed</div>
                <span className="tech-id">ID: PTCH-26</span>
              </div>
              <h2 className="event-name">PITCH<br /><span className="highlight-text">ARENA</span></h2>
              <div className="meta-row">
                <div className="meta-item"><span className="label">DATE</span><span className="value">JANUARY 07, 2026</span></div>
                <div className="meta-item"><span className="label">LOCATION</span><span className="value">Python Lab,CIT</span></div>
              </div>
              <p className="event-desc">Innovate your ideas to improve the future. A battleground for visionaries to showcase their blueprints for the new world order.</p>
              <div className="card-actions">
                <button className="secondary-btn disabled-btn" disabled><span className="btn-text">Registration Closed</span></button>
                <button className="secondary-btn" onClick={() => setShowRecap(true)}><span className="btn-text">View Recap</span></button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showRecap && <RecapModal onClose={() => setShowRecap(false)} />}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Inter:wght@300;500;600&family=JetBrains+Mono:wght@400;700&display=swap');
        
        body {
          margin: 0; padding: 0; background-color: #050505;
          background-image: radial-gradient(circle at 50% 0%, rgba(220, 38, 38, 0.08), transparent 40%),
            linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
          background-size: 100% 100%, 60px 60px, 60px 60px;
          background-attachment: fixed;
        }
        .events-container { min-height: 100vh; color: #fff; font-family: 'Inter', sans-serif; padding: 3rem; box-sizing: border-box; overflow-x: hidden; }
        .events-nav { margin-bottom: 4rem; }
        .back-link { color: #71717a; text-decoration: none; font-size: 0.75rem; letter-spacing: 0.2em; text-transform: uppercase; transition: color 0.3s; font-family: 'JetBrains Mono', monospace; }
        .back-link:hover { color: #dc2626; }
        .header-section { margin-bottom: 4rem; }
        .section-spacer { height: 6rem; }
        .page-title { font-family: 'Orbitron', sans-serif; font-size: 4.5rem; margin: 0; line-height: 0.9; letter-spacing: -0.02em; overflow: hidden; color: #ffffff; font-weight: 900; text-shadow: 0 0 20px rgba(255, 255, 255, 0.15); }
        .event-card-large { display: grid; grid-template-columns: 1.1fr 1fr; border: 1px solid #27272a; background: #09090b; max-width: 1300px; margin-bottom: 2rem; position: relative; transition: border-color 0.4s ease, transform 0.4s ease; box-shadow: 0 0 0 1px rgba(255,255,255,0.02); }
        .event-card-large:hover { border-color: #52525b; box-shadow: 0 20px 40px -10px rgba(0,0,0,0.5); }
        .past-event-card { border-color: #18181b; opacity: 0.9; }
        .past-event-card:hover { opacity: 1; border-color: #3f3f46; }
        .past-event-card .card-bg { filter: grayscale(100%) contrast(1); }
        .past-event-card:hover .card-bg { filter: grayscale(80%) contrast(1.1); }
        .card-image-wrapper { position: relative; height: 100%; min-height: 500px; overflow: hidden; border-right: 1px solid #27272a; }
        .card-bg { width: 100%; height: 100%; object-fit: cover; transition: transform 1.2s cubic-bezier(0.22, 1, 0.36, 1), filter 0.3s; filter: grayscale(80%) contrast(1.1); }
        .event-card-large:hover .card-bg { transform: scale(1.03); filter: grayscale(0%) contrast(1.1); }
        .card-overlay { position: absolute; inset: 0; background: linear-gradient(90deg, rgba(9,9,11,0.2), #09090b); z-index: 1; }
        .card-details { position: relative; padding: 4rem; display: flex; flex-direction: column; justify-content: center; overflow: hidden; }
        .card-details-bg-pattern { position: absolute; inset: 0; background-image: radial-gradient(#3f3f46 1px, transparent 1px); background-size: 20px 20px; opacity: 0.1; pointer-events: none; }
        .content-inner { position: relative; z-index: 2; }
        .top-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
        .status-badge { display: flex; align-items: center; gap: 8px; padding: 4px 10px; background: rgba(34, 197, 94, 0.1); border: 1px solid rgba(34, 197, 94, 0.3); color: #4ade80; font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600; font-family: 'JetBrains Mono', monospace; }
        .status-completed { background: rgba(113, 113, 122, 0.1); border: 1px solid rgba(113, 113, 122, 0.3); color: #a1a1aa; }
        .blink-dot { width: 6px; height: 6px; background-color: #4ade80; border-radius: 50%; animation: blink 2s infinite; }
        .solid-dot { width: 6px; height: 6px; background-color: #71717a; border-radius: 50%; }
        @keyframes blink { 0% { opacity: 0.4; } 50% { opacity: 1; box-shadow: 0 0 8px #4ade80; } 100% { opacity: 0.4; } }
        .tech-id { font-family: 'JetBrains Mono', monospace; color: #52525b; font-size: 0.75rem; }
        .event-name { font-family: 'Orbitron', sans-serif; font-size: 3.5rem; line-height: 0.95; margin: 0 0 2rem 0; color: #fff; font-weight: 900; letter-spacing: -1px; }
        .highlight-text { color: #dc2626; }
        .meta-row { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-bottom: 2rem; padding-bottom: 2rem; border-bottom: 1px solid #27272a; }
        .meta-item { display: flex; flex-direction: column; gap: 4px; }
        .meta-item .label { color: #71717a; font-size: 0.7rem; font-family: 'JetBrains Mono', monospace; text-transform: uppercase; }
        .meta-item .value { color: #e4e4e7; font-family: 'Orbitron', sans-serif; font-weight: 600; font-size: 0.95rem; letter-spacing: 0.05em; }
        .event-desc { color: #a1a1aa; line-height: 1.6; margin-bottom: 3rem; font-size: 1rem; max-width: 95%; }
        .card-actions { display: flex; gap: 1.5rem; align-items: center; }
        .primary-btn, .secondary-btn { position: relative; padding: 1.1rem 2.5rem; font-family: 'Orbitron', sans-serif; text-transform: uppercase; cursor: pointer; font-weight: 700; font-size: 0.85rem; letter-spacing: 0.1em; border: none; clip-path: polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px); transition: all 0.3s ease; text-decoration: none; display: inline-block; text-align: center; }
        .primary-btn { background: #dc2626; color: white; }
        .primary-btn:hover { background: #ef4444; transform: translateY(-2px); box-shadow: 0 10px 20px -5px rgba(220, 38, 38, 0.4); color: white; }
        .secondary-btn { background: #18181b; color: #d4d4d8; box-shadow: inset 0 0 0 1px #3f3f46; }
        .secondary-btn:hover { background: #27272a; color: #fff; box-shadow: inset 0 0 0 1px #fff; }
        .disabled-btn { cursor: not-allowed; opacity: 0.6; background: #09090b; }
        .disabled-btn:hover { background: #09090b; box-shadow: inset 0 0 0 1px #3f3f46; color: #d4d4d8; }

        @media (max-width: 1024px) {
          .event-card-large { grid-template-columns: 1fr; max-width: 600px; margin-left: auto; margin-right: auto; }
          .card-image-wrapper { min-height: 300px; max-height: 400px; border-right: none; border-bottom: 1px solid #27272a; }
          .card-overlay { background: linear-gradient(180deg, transparent, #09090b); }
          .page-title { font-size: 3.5rem; }
        }
        @media (max-width: 768px) {
          .events-container { padding: 1.5rem 1rem; }
          .header-section { margin-bottom: 2rem; }
          .page-title { font-size: 2.5rem; }
          .card-details { padding: 2rem 1.5rem; }
          .event-name { font-size: 2rem; margin-bottom: 1.5rem; }
          .meta-row { grid-template-columns: 1fr; gap: 1rem; margin-bottom: 1.5rem; padding-bottom: 1.5rem; }
          .card-actions { flex-direction: column; width: 100%; gap: 1rem; }
          .primary-btn, .secondary-btn { width: 100%; padding: 1rem; }
          .section-spacer { height: 4rem; }
        }
      `}</style>
    </div >
  );
};

export default EventsPage;