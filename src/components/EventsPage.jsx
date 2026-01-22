import React, { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

const EventsPage = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const cardRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Fade in container
      gsap.to(containerRef.current, { opacity: 1, duration: 1 });

      // 2. Animate Title Stagger
      gsap.from(".event-char", {
        y: 100,
        opacity: 0,
        stagger: 0.05,
        duration: 1,
        ease: "power4.out",
        delay: 0.2
      });

      // 3. Slide up the card
      gsap.from(cardRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.8
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
        <div className="header-section">
          <p className="overline">Active Protocols</p>
          <h1 ref={titleRef} className="page-title">
            {"UPCOMING EVENTS".split("").map((char, i) => (
              <span key={i} className="event-char" style={{ display: 'inline-block', minWidth: char === ' ' ? '1rem' : '0' }}>
                {char}
              </span>
            ))}
          </h1>
        </div>

        {/* Featured Event Card: Hack with Magnus */}
        <div ref={cardRef} className="event-card-large">
          <div className="card-image-wrapper">
            {/* Placeholder image - replace with actual Hack with Magnus flyer if available */}
            <img
              src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop"
              alt="Hack with Magnus"
              className="card-bg"
            />
            <div className="card-overlay"></div>
          </div>

          <div className="card-details">
            <div className="status-badge">Registration Open</div>
            <h2 className="event-name">HACK WITH MAGNUS</h2>
            <p className="event-date">MARCH 15 - 16, 2025 // HYBRID MODE</p>
            <p className="event-desc">
              Join the ultimate coding confrontation. 24 hours to build, break, and rebuild.
              Magnus awaits those ready to challenge the status quo of AI and automated systems.
            </p>

            <div className="card-actions">
              <button className="primary-btn">Register Now</button>
              <button className="secondary-btn">View Problem Statements</button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@900&family=Inter:wght@300;600;900&display=swap');

        .events-container {
          min-height: 100vh;
          background-color: #050505;
          color: #fff;
          font-family: 'Inter', sans-serif;
          padding: 3rem;
          box-sizing: border-box;
          background-image: 
            radial-gradient(circle at 50% 0%, rgba(220, 38, 38, 0.15), transparent 40%),
            linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
          background-size: 100% 100%, 40px 40px, 40px 40px;
        }

        .events-nav { margin-bottom: 4rem; }
        .back-link { 
          color: #71717a; 
          text-decoration: none; 
          font-size: 0.75rem; 
          letter-spacing: 0.2em; 
          text-transform: uppercase; 
          transition: color 0.3s;
        }
        .back-link:hover { color: #dc2626; }

        .header-section { margin-bottom: 3rem; }
        .overline { color: #dc2626; font-size: 0.75rem; letter-spacing: 0.3em; text-transform: uppercase; margin-bottom: 1rem; font-weight: bold; }
        .page-title { 
          font-family: 'Orbitron', sans-serif; 
          font-size: 4rem; 
          margin: 0; 
          line-height: 1;
          overflow: hidden;
        }

        .event-card-large {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          border: 1px solid #27272a;
          border-radius: 12px;
          overflow: hidden;
          background: #09090b;
          max-width: 1200px;
          transition: border-color 0.3s ease;
        }
        .event-card-large:hover { border-color: #dc2626; }

        .card-image-wrapper { position: relative; height: 100%; min-height: 400px; overflow: hidden; }
        .card-bg { width: 100%; height: 100%; object-fit: cover; transition: transform 0.7s ease; }
        .event-card-large:hover .card-bg { transform: scale(1.05); }
        .card-overlay { position: absolute; inset: 0; background: linear-gradient(90deg, transparent, #09090b); }

        .card-details { padding: 4rem; display: flex; flexDirection: column; justify-content: center; }
        .status-badge { 
          display: inline-block; 
          padding: 6px 12px; 
          border: 1px solid #22c55e; 
          color: #22c55e; 
          font-size: 0.65rem; 
          text-transform: uppercase; 
          letter-spacing: 0.1em; 
          border-radius: 4px;
          margin-bottom: 1.5rem;
          align-self: flex-start;
        }

        .event-name { font-family: 'Orbitron', sans-serif; font-size: 2.5rem; margin: 0 0 0.5rem 0; color: #fff; }
        .event-date { color: #dc2626; font-family: 'Orbitron', sans-serif; letter-spacing: 0.1em; font-size: 0.9rem; margin-bottom: 1.5rem; }
        .event-desc { color: #a1a1aa; line-height: 1.7; margin-bottom: 2.5rem; max-width: 90%; }

        .card-actions { display: flex; gap: 1rem; }
        .primary-btn { 
          background: #dc2626; 
          color: white; 
          border: none; 
          padding: 1rem 2rem; 
          font-family: 'Orbitron', sans-serif; 
          text-transform: uppercase; 
          cursor: pointer; 
          font-weight: bold;
          transition: background 0.3s;
        }
        .primary-btn:hover { background: #b91c1c; }

        .secondary-btn { 
          background: transparent; 
          color: white; 
          border: 1px solid #3f3f46; 
          padding: 1rem 2rem; 
          font-family: 'Orbitron', sans-serif; 
          text-transform: uppercase; 
          cursor: pointer; 
          font-weight: bold;
          transition: border-color 0.3s;
        }
        .secondary-btn:hover { border-color: #fff; }

        @media (max-width: 900px) {
          .event-card-large { grid-template-columns: 1fr; }
          .card-overlay { background: linear-gradient(180deg, transparent, #09090b); }
          .card-details { padding: 2rem; }
          .page-title { font-size: 2.5rem; }
        }
      `}</style>
    </div>
  );
};

export default EventsPage;