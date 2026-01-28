import React, { useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- EVIDENCE BOARD COMPONENT (New Addition) ---
const EvidenceBoard = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const evidenceItems = [
    { id: 'p1', top: '10%', left: '10%', rot: '-5deg', label: '', img: '/arena.jpg' },
    { id: 'p2', top: '5%', left: '40%', rot: '3deg', label: '', img: '/arena1.jpg' },
    { id: 'p3', top: '15%', left: '75%', rot: '-8deg', label: '', img: '/arena2.jpg' },
    { id: 'p4', top: '40%', left: '25%', rot: '6deg', label: '', img: '/arena3.jpg' },
    { id: 'p5', top: '35%', left: '55%', rot: '-2deg', label: '', img: '/arena4.jpg' },
    { id: 'p6', top: '70%', left: '15%', rot: '4deg', label: '', img: '/arena5.jpg' },
    { id: 'p7', top: '65%', left: '45%', rot: '-4deg', label: '', img: '/arena6.jpg' },
    { id: 'p8', top: '60%', left: '80%', rot: '2deg', label: '', img: '/arena7.jpg' },
  ];

  return (
    <div className="evidence-section recap-item">
      <h3 className="section-title">EVENT RECAP :</h3>
      <div className="evidence-board-wrapper">
        <div className="evidence-board">
          {/* Red Strings SVG Layer */}
          <svg className="connections">
            <line x1="16%" y1="20%" x2="46%" y2="15%" />
            <line x1="46%" y1="15%" x2="81%" y2="25%" />
            <line x1="46%" y1="15%" x2="61%" y2="45%" />
            <line x1="31%" y1="50%" x2="16%" y2="20%" />
            <line x1="31%" y1="50%" x2="51%" y2="75%" />
            <line x1="51%" y1="75%" x2="61%" y2="45%" />
            <line x1="61%" y1="45%" x2="86%" y2="70%" />
            <line x1="21%" y1="80%" x2="51%" y2="75%" />
          </svg>

          {/* Photos */}
          {evidenceItems.map((item) => (
            <div
              key={item.id}
              className="evidence-photo"
              style={{ top: item.top, left: item.left, transform: `rotate(${item.rot})` }}
              onClick={() => setSelectedImage(item)}
            >
              <img src={item.img} alt={item.label} />
              <div className="caption">{item.label}</div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal (Scoped to Evidence Board) */}
        {selectedImage && (
          <div className="evidence-modal" onClick={() => setSelectedImage(null)}>
            <span className="evidence-close">&times;</span>
            <img className="evidence-modal-content" src={selectedImage.img} alt="Evidence" onClick={(e) => e.stopPropagation()} />
            <div className="evidence-caption">{selectedImage.label}</div>
          </div>
        )}
      </div>

      <style>{`
        .evidence-section { margin-top: 4rem; width: 100%; }
        .evidence-board-wrapper {
          position: relative;
          width: 100%;
          height: 600px; /* Fixed height for the scrollable container */
          background-color: #111; /* Slightly lighter than pure black for contrast */
          border: 1px solid #3f3f46;
          box-shadow: inset 0 0 100px rgba(0, 0, 0, 0.7);
          overflow: hidden;
          margin-top: 1rem;
        }

        .evidence-board {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .connections {
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          z-index: 1; pointer-events: none;
        }

        .connections line {
          stroke: #d9381e; stroke-width: 3; stroke-opacity: 0.8;
          filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.3));
        }

        .evidence-photo {
          position: absolute;
          width: 140px; /* Scaled down slightly for the modal container */
          background: #fff;
          padding: 8px 8px 24px 8px; /* Polaroid padding */
          box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.5);
          transition: transform 0.2s, z-index 0s;
          cursor: pointer;
          z-index: 2;
        }

        .evidence-photo:hover {
          transform: scale(1.1) !important;
          z-index: 10;
          box-shadow: 10px 10px 25px rgba(0, 0, 0, 0.6);
        }

        .evidence-photo img {
          width: 100%; height: auto; display: block;
          filter: sepia(30%) contrast(1.2);
        }

        /* The Pin */
        .evidence-photo::after {
          content: ''; position: absolute;
          top: -5px; left: 50%; transform: translateX(-50%);
          width: 12px; height: 12px; border-radius: 50%;
          background: radial-gradient(circle at 30% 30%, #ff4d4d, #990000);
          box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
        }

        .caption {
          text-align: center; margin-top: 8px; font-size: 0.7rem;
          font-weight: bold; color: #333; font-family: 'Courier New', monospace;
        }

        /* Lightbox Styles */
        .evidence-modal {
          position: fixed; z-index: 2000; /* Higher than RecapModal */
          left: 0; top: 0; width: 100%; height: 100%;
          background-color: rgba(0, 0, 0, 0.95);
          display: flex; flex-direction: column;
          justify-content: center; align-items: center;
        }

        .evidence-modal-content {
          max-width: 80%; max-height: 80%;
          border: 10px solid #fff;
          box-shadow: 0 0 50px rgba(0, 0, 0, 1);
        }

        .evidence-close {
          position: absolute; top: 20px; right: 35px;
          color: #f1f1f1; font-size: 40px; font-weight: bold; cursor: pointer;
        }

        .evidence-caption {
          color: #fff; margin-top: 15px; font-size: 1.5rem;
          font-family: 'Courier New', monospace;
        }
        
        @media (max-width: 768px) {
          .evidence-board-wrapper { height: 400px; }
          .evidence-photo { width: 90px; padding: 4px 4px 16px 4px; }
        }
      `}</style>
    </div>
  );
};

// --- RECAP MODAL COMPONENT ---
const RecapModal = ({ onClose }) => {
  const modalRef = useRef(null);
  const contentRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(modalRef.current, { opacity: 0, duration: 0.5 });
      gsap.from(contentRef.current, {
        scale: 0.9,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        delay: 0.1
      });
      gsap.from(".recap-item", {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.3
      });
    }, modalRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={modalRef} className="modal-overlay">
      <div ref={contentRef} className="modal-content">
        <button onClick={onClose} className="close-btn">× CLOSE REPORT</button>
        <div className="modal-header">
          <h2 className="modal-title">PITCH ARENA  <span className="highlight-text">RESULTS</span></h2>
        </div>
        <div className="winners-grid">
          <div className="winner-card first-place recap-item">
            <div className="medal-icon">🥇 1ST PLACE</div>
            <img src="/pitch_first.jpg" alt="Winner" className="winner-img" />
          </div>
          <div className="winner-card second-place recap-item">
            <div className="medal-icon">🥈 2ND PLACE</div>
            <img src="/pitch_second.jpg" alt="Winner" className="winner-img" />
          </div>
          <div className="winner-card third-place recap-item">
            <div className="medal-icon">🥉 3RD PLACE</div>
            <img src="/pitch_third.jpg" alt="Winner" className="winner-img" />
          </div>
        </div>

        <div className="team-section recap-item">
          <h3 className="section-title">ORGANIZING SQUADRON :</h3>
          <div className="team-img-wrapper">
            <img src="/pitch_team.jfif" onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"; }} alt="Team" className="team-img" />
            <div className="tech-decor"></div>
          </div>
        </div>

        {/* MERGED: Evidence Board is placed here, below Organizing Squadron */}
        <EvidenceBoard />

      </div>
      <style>{`
        .modal-overlay { position: fixed; inset: 0; background: rgba(0, 0, 0, 0.85); backdrop-filter: blur(8px); z-index: 1000; display: flex; justify-content: center; align-items: center; padding: 1rem; }
        .modal-content { background: #09090b; border: 1px solid #3f3f46; width: 100%; max-width: 900px; max-height: 90vh; overflow-y: auto; padding: 3rem; position: relative; }
        .close-btn { position: absolute; top: 1.5rem; right: 1.5rem; background: transparent; border: 1px solid #dc2626; color: #dc2626; padding: 0.5rem 1rem; cursor: pointer; font-family: 'JetBrains Mono'; }
        .modal-title { font-family: 'Orbitron'; font-size: 2.5rem; color: white; text-align: center; margin-bottom: 2rem; }
        .section-title { font-family: 'Orbitron'; font-size: 1.5rem; color: white; margin-bottom: 1rem; margin-top: 1rem; }
        .winners-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1.5rem; margin-bottom: 3rem; align-items: end; }
        .winner-card { background: #18181b; border: 1px solid #27272a; padding: 1rem; text-align: center; }
        
        .winner-img { width: 100%; aspect-ratio: 1/1; object-fit: contain; background: #000; border-bottom: 2px solid #27272a; }
        
        .first-place { transform: scale(1.1); border-color: #eab308; }
        .team-img-wrapper { position: relative; width: 100%; height: 300px; overflow: hidden; border: 1px solid #27272a; background: #000; }
        
        .team-img { width: 100%; height: 100%; object-fit: contain; }
        
        @media (max-width: 900px) { .winners-grid { grid-template-columns: 1fr; } .first-place { transform: scale(1); order: -1; } }
      `}</style>
    </div>
  );
};

const EventsPage = () => {
  const containerRef = useRef(null);
  const [showRecap, setShowRecap] = useState(false);

  const titleRef = useRef(null);
  const cardRef = useRef(null);
  const workshopCardRef = useRef(null);
  const pastTitleRef = useRef(null);
  const pastCardRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance Animations
      gsap.to(containerRef.current, { opacity: 1, duration: 1 });
      gsap.from(titleRef.current.querySelectorAll(".event-char"), {
        y: 100, opacity: 0, stagger: 0.05, duration: 1, ease: "power4.out", delay: 0.2
      });
      gsap.from(cardRef.current, { y: 50, opacity: 0, duration: 1, ease: "power3.out", delay: 0.8 });
      gsap.from(workshopCardRef.current, { y: 50, opacity: 0, duration: 1, ease: "power3.out", delay: 1.0 });

      // Scroll Animations
      gsap.from(pastTitleRef.current, {
        y: 30, opacity: 0, duration: 0.8, scrollTrigger: { trigger: pastTitleRef.current, start: "top 95%" }
      });
      gsap.from(pastCardRef.current, {
        y: 50, opacity: 0, duration: 1, scrollTrigger: { trigger: pastCardRef.current, start: "top 90%" }
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

        {/* Magnus Card */}
        <div ref={cardRef} className="event-card-large">
          <div className="card-image-wrapper">
            <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop" alt="Hack with Magnus" className="card-bg" />
            <div className="card-overlay"></div>
          </div>
          <div className="card-details">
            <div className="card-details-bg-pattern"></div>
            <div className="content-inner">
              <div className="top-row">
                <div className="status-badge"><span className="blink-dot"></span> Registration Open</div>
              </div>
              <h2 className="event-name">HACK WITH<br /><span className="highlight-text">MAGNUS</span></h2>
              <div className="meta-row">
                <div className="meta-item"><span className="label">DATE: </span><span className="value">FEB 2, 2026</span></div>
                <div className="meta-item"><span className="label">LOCATION: </span><span className="value">OFFLINE</span></div>
              </div>
              <p className="event-desc">Join the ultimate coding confrontation. 6 hours to build and break AI systems.</p>
              <div className="card-actions">
                <a href="https://athera-hackathon.vercel.app/" target="_blank" rel="noopener noreferrer" className="primary-btn">Register Protocol</a>
              </div>
            </div>
          </div>
        </div>

        {/* Workshop Card */}
        <div ref={workshopCardRef} className="event-card-large">
          <div className="card-image-wrapper">
            <img src="/workshop.jpg" alt="Computer Vision" className="card-bg workshop-card-img" />
            <div className="card-overlay"></div>
          </div>
          <div className="card-details">
            <div className="card-details-bg-pattern"></div>
            <div className="content-inner">
              <div className="top-row">
                <div className="status-badge"><span className="blink-dot"></span> Registration Open</div>
              </div>
              <h2 className="event-name">COMPUTER VISION<br /><span className="highlight-text">WITH TINYGRAD</span></h2>
              <div className="meta-row">
                <div className="meta-item"><span className="label">DATE: </span><span className="value">FEB 02, 2026</span></div>
                <div className="meta-item"><span className="label">LOCATION: </span><span className="value">CIT, CHENNAI</span></div>
                <div className="meta-item"><span className="label">MODE: </span><span className="value">OFFLINE</span></div>
                <div className="meta-item"><span className="label">DURATION: </span><span className="value">2.5 HOURS</span></div>
              </div>
              <p className="event-desc">Build vision models from scratch using TinyGrad and explore the mechanics behind CNN architectures.</p>
              <div className="card-actions">
                <a href="https://docs.google.com/forms/d/e/1FAIpQLSdHIt1tBmDNejBAXR4w5jRTZ6ZS6B4QB68NpD1xupvTINS_fQ/viewform" target="_blank" rel="noopener noreferrer" className="primary-btn">Reserve Seat</a>
              </div>
            </div>
          </div>
        </div>

        <div className="section-spacer"></div>

        <div className="header-section">
          <h1 ref={pastTitleRef} className="page-title">PAST EVENTS</h1>
        </div>

        {/* Past Event Card */}
        <div ref={pastCardRef} className="event-card-large past-event-card">
          <div className="card-image-wrapper">
            <img src="/pitch.jpg" onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2032&auto=format&fit=crop"; }} alt="Pitch Arena" className="card-bg" />
            <div className="card-overlay"></div>
          </div>
          <div className="card-details">
            <div className="card-details-bg-pattern"></div>
            <div className="content-inner">
              <div className="top-row">
                <div className="status-badge status-completed"><span className="solid-dot"></span> Completed</div>
              </div>
              <h2 className="event-name">PITCH<br /><span className="highlight-text">ARENA</span></h2>
              <div className="meta-row">
                <div className="meta-item"><span className="label">DATE: </span><span className="value">JANUARY 07, 2026</span></div>
                <div className="meta-item"><span className="label">LOCATION: </span><span className="value">Python Lab, CIT</span></div>
              </div>
              <p className="event-desc">A battleground for visionaries to showcase their blueprints for the new world order.</p>
              <div className="card-actions">
                <button className="secondary-btn" onClick={() => setShowRecap(true)}>View Recap</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showRecap && <RecapModal onClose={() => setShowRecap(false)} />}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Inter:wght@300;500;600&family=JetBrains+Mono:wght@400;700&display=swap');

        body { margin: 0; background-color: #050505; color: #fff; font-family: 'Inter', sans-serif; overflow-x: hidden; }
        .events-container { min-height: 100vh; padding: 3rem 2rem 3rem 4rem; display: flex; flex-direction: column; align-items: flex-start; }
        .back-link { color: #71717a; text-decoration: none; font-size: 0.75rem; font-family: 'JetBrains Mono'; letter-spacing: 0.2em; transition: 0.3s; }
        .back-link:hover { color: #dc2626; }
        .page-title { font-family: 'Orbitron'; font-size: clamp(3rem, 8vw, 6rem); font-weight: 900; margin-bottom: 4rem; }
        .event-card-large { display: grid; grid-template-columns: 1.2fr 1fr; border: 1px solid #27272a; background: #09090b; width: 100%; max-width: 1600px; margin-bottom: 5rem; border-left: 4px solid #dc2626; }
        
        /* UPDATED: Added centering and background for non-filling images */
        .card-image-wrapper { position: relative; min-height: 500px; overflow: hidden; background-color: #000; display: flex; align-items: center; justify-content: center; }
        
        /* UPDATED: Changed object-fit to 'contain' to show full image */
        .card-bg { width: 100%; height: 100%; object-fit: contain; filter: grayscale(80%); transition: 1.2s cubic-bezier(0.22, 1, 0.36, 1); }
        
        .event-card-large:hover .card-bg { transform: scale(1.03); filter: grayscale(0%); }
        .card-overlay { position: absolute; inset: 0; background: linear-gradient(90deg, rgba(9,9,11,0.2), #09090b); pointer-events: none; }
        .card-details { padding: 4rem; position: relative; }
        .event-name { font-family: 'Orbitron'; font-size: 3.5rem; line-height: 0.95; margin-bottom: 2rem; }
        .highlight-text { color: #dc2626; }
        .meta-row { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; border-bottom: 1px solid #27272a; padding-bottom: 2rem; margin-bottom: 2rem; }
        .meta-item .label { color: #71717a; font-size: 0.7rem; font-family: 'JetBrains Mono'; }
        .meta-item .value { font-family: 'Orbitron'; font-size: 0.95rem; }
        .primary-btn { background: #dc2626; color: white; padding: 1rem 2rem; font-family: 'Orbitron'; cursor: pointer; text-decoration: none; clip-path: polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px); }
        .secondary-btn { background: #18181b; color: #d4d4d8; border: 1px solid #3f3f46; padding: 1rem 2rem; font-family: 'Orbitron'; cursor: pointer; clip-path: polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px); }
        .status-badge { display: flex; align-items: center; gap: 8px; color: #4ade80; font-family: 'JetBrains Mono'; font-size: 0.7rem; }
        .blink-dot { width: 6px; height: 6px; background: #4ade80; border-radius: 50%; animation: blink 2s infinite; }
        @keyframes blink { 50% { opacity: 0.4; } }
        
        .workshop-card-img { } 
        
        @media (max-width: 1100px) { .event-card-large { grid-template-columns: 1fr; } .card-image-wrapper { min-height: 300px; } .card-overlay { background: linear-gradient(0deg, #09090b 10%, transparent 100%); } }
        @media (max-width: 768px) { .events-container { padding: 2rem 1.5rem; } .page-title { font-size: 2.8rem; } .card-details { padding: 2rem; } .event-name { font-size: 2.2rem; } .meta-row { grid-template-columns: 1fr; } .card-actions { flex-direction: column; width: 100%; } }
      `}</style>
    </div>
  );
};

export default EventsPage;