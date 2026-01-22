import React, { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'; // Ensure you have ScrollTrigger registered if you want scroll animations, otherwise standard timeline works.

// Register ScrollTrigger (optional, but good for long pages)
gsap.registerPlugin(ScrollTrigger);

const EventsPage = () => {
  const containerRef = useRef(null);
  
  // Refs for Ongoing Section
  const titleRef = useRef(null);
  const cardRef = useRef(null);
  
  // Refs for Past Section
  const pastTitleRef = useRef(null);
  const pastCardRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Fade in container
      gsap.to(containerRef.current, { opacity: 1, duration: 1 });

      // 2. Animate Main Title Stagger
      gsap.from(titleRef.current.querySelectorAll(".event-char"), {
        y: 100,
        opacity: 0,
        stagger: 0.05,
        duration: 1,
        ease: "power4.out",
        delay: 0.2
      });

      // 3. Slide up the FIRST card (Ongoing)
      gsap.from(cardRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.8
      });

      // 4. Animate PAST Section (Simple scroll trigger or delay)
      gsap.from(pastTitleRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 1.2,
        scrollTrigger: {
            trigger: pastTitleRef.current,
            start: "top 90%", // Animate when top of element hits 90% of viewport
        }
      });

      gsap.from(pastCardRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 1.4,
        scrollTrigger: {
            trigger: pastCardRef.current,
            start: "top 85%",
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="events-container" style={{ opacity: 0 }}>
      {/* Navigation Back Link */}
      <nav className="events-nav">
        <Link to="/" className="back-link">← BACK TO HOME</Link>
      </nav>

      <div className="events-content">
        
        {/* =========================================
            SECTION 1: ONGOING EVENTS
           ========================================= */}
        <div className="header-section">
          {/* <p className="overline">Active Protocols</p> */}
          <h1 ref={titleRef} className="page-title">
            {"ONGOING EVENTS".split("").map((char, i) => (
              <span key={i} className="event-char" style={{ display: 'inline-block', minWidth: char === ' ' ? '1rem' : '0' }}>
                {char}
              </span>
            ))}
          </h1>
        </div>

        {/* Featured Event Card: Hack with Magnus */}
        <div ref={cardRef} className="event-card-large">
          <div className="card-image-wrapper">
            <img
              src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop"
              alt="Hack with Magnus"
              className="card-bg"
            />
            <div className="card-overlay"></div>
            <div className="tech-decor"></div>
          </div>

          <div className="card-details">
            <div className="card-details-bg-pattern"></div>
            <div className="content-inner">
              <div className="top-row">
                <div className="status-badge">
                  <span className="blink-dot"></span> Registration Open
                </div>
                <span className="tech-id">ID: MGNS-25</span>
              </div>
              
              <h2 className="event-name">HACK WITH<br/><span className="highlight-text">MAGNUS</span></h2>
              
              <div className="meta-row">
                <div className="meta-item">
                  <span className="label">DATE</span>
                  <span className="value">MARCH 15 - 16, 2025</span>
                </div>
                <div className="meta-item">
                  <span className="label">LOCATION</span>
                  <span className="value">HYBRID // TERMINAL A</span>
                </div>
              </div>

              <p className="event-desc">
                Join the ultimate coding confrontation. 24 hours to build, break, and rebuild.
                Magnus awaits those ready to challenge the status quo of AI and automated systems.
              </p>

              <div className="card-actions">
                <a 
                  href="https://athera-hackathon.vercel.app/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="primary-btn"
                >
                  <span className="btn-text">Register Protocol</span>
                  <span className="btn-decor"></span>
                </a>
                
                <button className="secondary-btn">
                  <span className="btn-text">Data Packet</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================
            SECTION 2: PAST EVENTS (NEW)
           ========================================= */}
        
        {/* Spacer */}
        <div className="section-spacer"></div>

        <div className="header-section">
           {/* Simple title for Past Events (Non-staggered for simplicity, or reuse logic) */}
          <h1 ref={pastTitleRef} className="page-title">
            PAST EVENTS
          </h1>
        </div>

        {/* Past Event Card: Pitch Arena */}
        <div ref={pastCardRef} className="event-card-large past-event-card">
          <div className="card-image-wrapper">
            {/* Make sure 'pitch.jpg' is in your 'public' folder. 
                If it is in src, import it at the top and use src={pitchImg} 
            */}
            <img
              src="/pitch.jpg"
              onError={(e) => {
                e.target.onerror = null; 
                e.target.src = "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2032&auto=format&fit=crop"; // Fallback if local image not found
              }}
              alt="Pitch Arena"
              className="card-bg"
            />
            <div className="card-overlay"></div>
            <div className="tech-decor"></div>
          </div>

          <div className="card-details">
            <div className="card-details-bg-pattern"></div>
            <div className="content-inner">
              <div className="top-row">
                {/* Grey Status Badge for Past Events */}
                <div className="status-badge status-completed">
                  <span className="solid-dot"></span> Completed
                </div>
                <span className="tech-id">ID: PTCH-26</span>
              </div>
              
              <h2 className="event-name">PITCH<br/><span className="highlight-text">ARENA</span></h2>
              
              <div className="meta-row">
                <div className="meta-item">
                  <span className="label">DATE</span>
                  <span className="value">JANUARY 07, 2026</span>
                </div>
                <div className="meta-item">
                  <span className="label">LOCATION</span>
                  <span className="value">MAIN AUDITORIUM</span>
                </div>
              </div>

              <p className="event-desc">
                Innovate your ideas to improve the future. A battleground for visionaries to showcase their blueprints for the new world order.
              </p>

              <div className="card-actions">
                <button className="secondary-btn disabled-btn" disabled>
                  <span className="btn-text">Registration Closed</span>
                </button>
                <button className="secondary-btn">
                  <span className="btn-text">View Recap</span>
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Inter:wght@300;500;600&family=JetBrains+Mono:wght@400;700&display=swap');

        /* --- GLOBAL & LAYOUT --- */
        .events-container {
          min-height: 100vh;
          background-color: #050505;
          color: #fff;
          font-family: 'Inter', sans-serif;
          padding: 3rem;
          box-sizing: border-box;
          background-image: 
            radial-gradient(circle at 50% 0%, rgba(220, 38, 38, 0.08), transparent 40%),
            linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
          background-size: 100% 100%, 60px 60px, 60px 60px;
        }

        .events-nav { margin-bottom: 4rem; }
        .back-link { 
          color: #71717a; 
          text-decoration: none; 
          font-size: 0.75rem; 
          letter-spacing: 0.2em; 
          text-transform: uppercase; 
          transition: color 0.3s;
          font-family: 'JetBrains Mono', monospace;
        }
        .back-link:hover { color: #dc2626; }

        .header-section { margin-bottom: 4rem; }
        .section-spacer { height: 6rem; } /* Spacer between sections */

        .overline { color: #dc2626; font-size: 0.8rem; letter-spacing: 0.4em; text-transform: uppercase; margin-bottom: 1rem; font-weight: bold; font-family: 'JetBrains Mono', monospace; }
        
        /* UPDATED PAGE TITLE STYLE */
        .page-title { 
          font-family: 'Orbitron', sans-serif; 
          font-size: 4.5rem; 
          margin: 0; 
          line-height: 0.9;
          letter-spacing: -0.02em;
          overflow: hidden;
          color: #ffffff; 
          font-weight: 900; 
          text-shadow: 0 0 20px rgba(255, 255, 255, 0.15);
        }

        /* --- FEATURED CARD STYLES --- */
        .event-card-large {
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          border: 1px solid #27272a;
          background: #09090b;
          max-width: 1300px;
          margin-bottom: 2rem;
          position: relative;
          transition: border-color 0.4s ease, transform 0.4s ease;
          box-shadow: 0 0 0 1px rgba(255,255,255,0.02);
        }
        
        .event-card-large:hover { 
          border-color: #52525b; 
          box-shadow: 0 20px 40px -10px rgba(0,0,0,0.5);
        }

        /* Styling for Past Event Card to look slightly different/inactive */
        .past-event-card {
            border-color: #18181b;
            opacity: 0.9;
        }
        .past-event-card:hover {
            opacity: 1;
            border-color: #3f3f46;
        }
        .past-event-card .card-bg {
             filter: grayscale(100%) contrast(1); /* Fully greyscale for past events */
        }
        .past-event-card:hover .card-bg {
             filter: grayscale(80%) contrast(1.1);
        }

        /* IMAGE SIDE */
        .card-image-wrapper { 
          position: relative; 
          height: 100%; 
          min-height: 500px; 
          overflow: hidden; 
          border-right: 1px solid #27272a;
        }
        
        .card-bg { 
          width: 100%; 
          height: 100%; 
          object-fit: cover; 
          transition: transform 1.2s cubic-bezier(0.22, 1, 0.36, 1), filter 0.3s; 
          filter: grayscale(80%) contrast(1.1);
        }
        
        .event-card-large:hover .card-bg { 
          transform: scale(1.03); 
          filter: grayscale(0%) contrast(1.1);
        }
        
        .card-overlay { 
          position: absolute; 
          inset: 0; 
          background: linear-gradient(90deg, rgba(9,9,11,0.2), #09090b); 
          z-index: 1;
        }

        /* CONTENT SIDE */
        .card-details { 
          position: relative;
          padding: 4rem; 
          display: flex; 
          flex-direction: column; 
          justify-content: center;
          overflow: hidden;
        }

        .card-details-bg-pattern {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(#3f3f46 1px, transparent 1px);
          background-size: 20px 20px;
          opacity: 0.1;
          pointer-events: none;
        }

        .content-inner { position: relative; z-index: 2; }

        .top-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
        
        .status-badge { 
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 4px 10px; 
          background: rgba(34, 197, 94, 0.1);
          border: 1px solid rgba(34, 197, 94, 0.3);
          color: #4ade80; 
          font-size: 0.7rem; 
          text-transform: uppercase; 
          letter-spacing: 0.05em; 
          font-weight: 600;
          font-family: 'JetBrains Mono', monospace;
        }

        /* Completed Status Badge Override */
        .status-completed {
            background: rgba(113, 113, 122, 0.1);
            border: 1px solid rgba(113, 113, 122, 0.3);
            color: #a1a1aa;
        }

        .blink-dot {
          width: 6px;
          height: 6px;
          background-color: #4ade80;
          border-radius: 50%;
          animation: blink 2s infinite;
        }
        
        .solid-dot {
            width: 6px;
            height: 6px;
            background-color: #71717a;
            border-radius: 50%;
        }

        @keyframes blink { 0% { opacity: 0.4; } 50% { opacity: 1; box-shadow: 0 0 8px #4ade80; } 100% { opacity: 0.4; } }

        .tech-id {
          font-family: 'JetBrains Mono', monospace;
          color: #52525b;
          font-size: 0.75rem;
        }

        .event-name { 
          font-family: 'Orbitron', sans-serif; 
          font-size: 3.5rem; 
          line-height: 0.95; 
          margin: 0 0 2rem 0; 
          color: #fff; 
          font-weight: 900;
          letter-spacing: -1px;
        }
        
        .highlight-text { color: #dc2626; }

        .meta-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          margin-bottom: 2rem;
          padding-bottom: 2rem;
          border-bottom: 1px solid #27272a;
        }

        .meta-item { display: flex; flex-direction: column; gap: 4px; }
        
        .meta-item .label {
          color: #71717a;
          font-size: 0.7rem;
          font-family: 'JetBrains Mono', monospace;
          text-transform: uppercase;
        }
        
        .meta-item .value {
          color: #e4e4e7;
          font-family: 'Orbitron', sans-serif;
          font-weight: 600;
          font-size: 0.95rem;
          letter-spacing: 0.05em;
        }

        .event-desc { 
          color: #a1a1aa; 
          line-height: 1.6; 
          margin-bottom: 3rem; 
          font-size: 1rem;
          max-width: 95%; 
        }

        /* Action Buttons with Cuts */
        .card-actions { display: flex; gap: 1.5rem; align-items: center; }
        
        .primary-btn, .secondary-btn {
          position: relative;
          padding: 1.1rem 2.5rem;
          font-family: 'Orbitron', sans-serif;
          text-transform: uppercase;
          cursor: pointer;
          font-weight: 700;
          font-size: 0.85rem;
          letter-spacing: 0.1em;
          border: none;
          clip-path: polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px);
          transition: all 0.3s ease;
          text-decoration: none; 
          display: inline-block; 
          text-align: center;
        }

        .primary-btn {
          background: #dc2626;
          color: white;
        }
        
        .primary-btn:hover { 
          background: #ef4444; 
          transform: translateY(-2px);
          box-shadow: 0 10px 20px -5px rgba(220, 38, 38, 0.4);
          color: white; 
        }

        .secondary-btn {
          background: #18181b;
          color: #d4d4d8;
          box-shadow: inset 0 0 0 1px #3f3f46;
        }
        
        .secondary-btn:hover {
          background: #27272a;
          color: #fff;
          box-shadow: inset 0 0 0 1px #fff;
        }
        
        .disabled-btn {
            cursor: not-allowed;
            opacity: 0.6;
            background: #09090b;
        }
        .disabled-btn:hover {
            background: #09090b;
            box-shadow: inset 0 0 0 1px #3f3f46;
            color: #d4d4d8;
        }

        /* Mobile Responsive */
        @media (max-width: 960px) {
          .page-title { font-size: 2.8rem; }
          
          .event-card-large { 
            grid-template-columns: 1fr; 
            max-width: 500px;
            margin: 0 auto 4rem auto;
          }
          
          .card-image-wrapper { 
            min-height: 250px; 
            border-right: none;
            border-bottom: 1px solid #27272a;
          }
          
          .card-overlay { background: linear-gradient(180deg, transparent, #09090b); }
          
          .card-details { padding: 2.5rem 1.5rem; }
          
          .event-name { font-size: 2.25rem; }
          
          .meta-row { grid-template-columns: 1fr; gap: 1rem; padding-bottom: 1.5rem; margin-bottom: 1.5rem; }
          
          .card-actions { flex-direction: column; gap: 1rem; }
          
          .primary-btn, .secondary-btn { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default EventsPage;