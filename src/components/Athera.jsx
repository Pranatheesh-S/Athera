import React, { useLayoutEffect, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { Link } from 'react-router-dom';
import logoImg from '../assets/logo.png';

// Register GSAP Plugin
gsap.registerPlugin(ScrollTrigger);

// --- HELPER: Linear Interpolation for smoothing ---
const lerp = (start, end, factor) => start + (end - start) * factor;

const Athera = () => {
  // --- Refs ---
  const mainRef = useRef(null);
  const wrapperRef = useRef(null);
  const audioRef = useRef(null);
  const lenisRef = useRef(null);

  // Motion Section Refs
  const diagonal1Ref = useRef(null);
  const diagonal2Ref = useRef(null);
  const workshopsTitleRef = useRef(null);

  // Scrolling Text Refs
  const scrollingTextRef = useRef(null);
  const scrollSpeedRef = useRef(0);
  const currentSkewRef = useRef(0);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


  // --- DATA: All Topics ---
  const topics = [
    { tag: "01 / Intelligence", title: "Agentic AI Systems", desc: "Beyond simple automation. AI agents that perceive, reason, and act to achieve complex goals without constant human intervention.", img: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800" },
    { tag: "02 / Practical", title: "Hands-on Innovation", desc: "Bridging the gap between theory and reality through rapid prototyping and experimental engineering.", img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800" },
    { tag: "03 / Community", title: "Hackathons & Tech Events", desc: "Fostering a competitive spirit through high-intensity building sessions and global technical gatherings.", img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800" },
    { tag: "04 / Academia", title: "Research Implementation", desc: "Translating cutting-edge research papers into scalable, real-world software architectures.", img: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=800" },
    {
      tag: "05 / Advanced",
      title: "Advanced AI & ML",
      desc: "Deep diving into neural networks, transformer architectures, and the math behind modern intelligence.",
      img: "/aiml.jpg",
      isLarge: true // Custom flag for larger rendering
    },

    { tag: "06 / Professional", title: "Skill and Career growth", desc: "Empowering the next generation of engineers with industry-ready skills and strategic networking.", img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800" }
  ];

  // --- CONFIGURATION ---
  const SCROLL_DURATION = 2.5;

  // --- Navigation Helper ---
  const scrollToSection = (targetId) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(targetId, {
        duration: 2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    }
  };

  // --- SMOOTH SCROLL SETUP (LENIS) ---
  useEffect(() => {
    const lenis = new Lenis({
      duration: SCROLL_DURATION,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 0.5,
      smoothTouch: false,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    lenis.on('scroll', (e) => {
      ScrollTrigger.update();
      scrollSpeedRef.current = e.velocity;
    });

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(lenis.raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useLayoutEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    const mm = gsap.matchMedia();

    // Add responsiveness using gsap.matchMedia
    mm.add({
      isDesktop: "(min-width: 769px)",
      isMobile: "(max-width: 768px)",
      all: "all"
    }, (context) => {
      let { isDesktop } = context.conditions;

      // --- 0. PRE-CALCULATE MASK DATA (For the Wipe) ---
      const masks = gsap.utils.toArray('.mask');
      const maskData = masks.map(() => ({
        startOffset: 0.04 + Math.random() * 0.22,
        speed: 0.269 + Math.random() * 0.331,
        zone: Math.floor(Math.random() * 3),
        delays: [0, 1, 2].map(idx => idx * 0.29 + Math.random() * 0.172)
      }));
      const getSliceOrder = (zone) => (zone === 0 ? [0, 1, 2] : zone === 1 ? [1, 0, 2] : [2, 1, 0]);

      // --- 1. HERO PARALLELOGRAM WIPE & TEXT FADE (ALL DEVICES) ---
      ScrollTrigger.create({
        trigger: ".hero-section",
        start: "top top",
        end: "+=1500",
        pin: true,
        scrub: 1,
        refreshPriority: 1,
        onUpdate: (self) => {
          const progress = self.progress;

          const textOpacity = gsap.utils.mapRange(0, 0.8, 1, 0, progress);
          gsap.set(".hero-title, .hero-sub", { opacity: textOpacity });

          const transitionOpacity = gsap.utils.mapRange(0.85, 1, 1, 0, progress);

          masks.forEach((mask, i) => {
            const data = maskData[i];
            const slices = mask.querySelectorAll("span");
            const order = getSliceOrder(data.zone);
            let local = Math.min(Math.max((progress - data.startOffset) * data.speed, 0), 1);
            const eased = 1 - Math.pow(1 - local, 4);

            gsap.set(mask, { opacity: transitionOpacity });

            order.forEach((sliceIndex, idx) => {
              const sliceProgress = Math.max(0, eased - data.delays[idx]);
              gsap.set(slices[sliceIndex], { height: `${Math.min(sliceProgress, 1) * 160}%` });
            });
          });
        }
      });

      // --- 2. DIAGONAL CARDS & TITLE SCROLL (ALL DEVICES) ---
      const xMult = isDesktop ? 1 : 0.3; // Reduce horizontal movement on mobile
      const yMult = isDesktop ? 1 : 0.5; // Reduce vertical movement on mobile

      if (diagonal1Ref.current) {
        gsap.to(diagonal1Ref.current, {
          scrollTrigger: {
            trigger: "#motion-section",
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
          x: -window.innerWidth * 0.4 * xMult,
          y: -window.innerHeight * 1.5 * yMult,
          rotation: isDesktop ? -10 : -5,
          scale: 0.8
        });
      }

      if (diagonal2Ref.current) {
        gsap.to(diagonal2Ref.current, {
          scrollTrigger: {
            trigger: "#motion-section",
            start: "top 60%",
            end: "bottom top",
            scrub: 1,
          },
          x: window.innerWidth * 0.2 * xMult,
          y: -window.innerHeight * 1.8 * yMult,
          rotation: isDesktop ? 10 : 5,
          scale: 0.9
        });
      }

      if (workshopsTitleRef.current) {
        gsap.to(workshopsTitleRef.current, {
          x: -window.innerWidth * (isDesktop ? 1.5 : 0.5), // Less horizontal scroll for title on mobile
          ease: "none",
          scrollTrigger: {
            trigger: "#motion-section",
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          }
        });
      }

      // --- 3. IMMERSIVE WORLD LOGIC (ALL DEVICES) ---
      const renderWorld = (p) => {
        // Mobile: 7 segments (6 images + 1 quote). Desktop: 6 segments.
        const isMobile = window.innerWidth <= 768;
        const total = isMobile ? topics.length + 1 : topics.length;
        const segment = 1 / total;

        topics.forEach((_, i) => {
          const sectionEl = document.getElementById(`section-${i}`);
          const contentEl = document.getElementById(`content-${i}`);
          if (!sectionEl || !contentEl) return;

          const start = i * segment;
          const end = (i + 1) * segment;

          if (p >= start && p <= end) {
            const localP = (p - start) / segment;
            sectionEl.style.opacity = 1;
            sectionEl.style.visibility = "visible";

            let tx = 0, ty = 0;
            const moveAmt = isDesktop ? 150 : 30; // Reduce movement inside immersive slides on mobile

            if (i % 3 === 0) { tx = (1 - localP) * moveAmt; ty = 0; }
            else if (i % 3 === 1) { tx = (localP - 1) * moveAmt; ty = 0; }
            else { tx = (1 - localP) * (moveAmt * 0.66); ty = (1 - localP) * (moveAmt * 0.66); }

            contentEl.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
            sectionEl.classList.add('active');
          } else {
            sectionEl.style.opacity = 0;
            sectionEl.style.visibility = "hidden";
            sectionEl.classList.remove('active');
          }
        });

        if (scrollingTextRef.current) {
          let textOpacity = 0;
          let textTransX = '0px';

          if (isDesktop) {
            textOpacity = p > 0.05 && p < 0.95 ? 1 : 0;
            textTransX = (120 - (p * 400)) + 'vw';
          } else {
            // Mobile: Visible only in the 7th segment
            // quoteStart is the threshold where the last image finishes (e.g. 6/7)
            const quoteStart = topics.length * segment;

            if (p > quoteStart) {
              textOpacity = 1;
              // Normalize p from quoteStart -> 1.0 (the 7th segment)
              const localProgress = (p - quoteStart) / segment;
              // Marquee from 100vw to -100vw
              const val = 100 - (localProgress * 200);
              textTransX = `${val}vw`;
            } else {
              textOpacity = 0;
              textTransX = '100vw';
            }
          }

          const targetVelocity = scrollSpeedRef.current;
          currentSkewRef.current = lerp(currentSkewRef.current, Math.max(Math.min(targetVelocity * 0.25, 20), -20), 0.1);

          gsap.set(scrollingTextRef.current, {
            x: textTransX,
            skewX: currentSkewRef.current,
            opacity: textOpacity,
            position: 'absolute',
            top: isDesktop ? '70%' : '45%', // Reduce vertical gap on mobile (was 70% in CSS)
            marginTop: 0
          });
        }
      };

      ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: "top top",
        end: `+=${topics.length * (isDesktop ? 2000 : 1000)}`, // Reduced mobile duration to 1000 to close gaps
        pin: true,
        scrub: 0.1,
        onUpdate: (self) => renderWorld(self.progress)
      });

      ScrollTrigger.refresh();

    }, mainRef); // Scope for matchMedia selectors

    return () => mm.revert();
  }, [topics]);

  const textQuote = "Designing autonomous intelligence for the future";

  return (
    <div ref={mainRef} className="athera-container">
      <audio ref={audioRef} loop>
        <source src="/audio.mp3" type="audio/mp3" />
      </audio>

      <video autoPlay muted loop playsInline className="fixed-bg-video">
        <source src="/athera9 (1).mp4" type="video/mp4" />
      </video>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@900&family=Inter:wght@300;900&display=swap');
        :root {
          color-scheme: dark;
          background-color: #000;
        }
        html.lenis { height: auto; }
        .lenis.lenis-smooth { scroll-behavior: auto; }
        .lenis.lenis-stopped { overflow: hidden; }

        .athera-container {
          background-color: transparent !important; 
          color: #fff !important;
          position: relative;
          z-index: 1;
        }
        .fixed-bg-video {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.6; 
          z-index: -2; 
          pointer-events: none;
          background-color: #000;
        }
        @media (prefers-color-scheme: light) {
          .athera-container, body { background-color: #000 !important; }
        }
        
        .nav-bar { 
            position: fixed; top: 0; width: 100%; padding: 2.4rem 3rem; 
            display: flex; justify-content: space-between; align-items: center; 
            z-index: 100; box-sizing: border-box; 
            background: linear-gradient(to bottom, rgba(0,0,0,0.8), transparent); 
        }
        .nav-left { position: absolute; left: 3rem; top: 50%; transform: translateY(-50%); }
        .nav-center { 
            position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); 
            display: flex; gap: 3rem; font-size: 0.65rem; text-transform: uppercase; 
            letter-spacing: 0.3em; font-weight: bold; 
        }
        .nav-center a { color: white; text-decoration: none; transition: color 0.3s; cursor: pointer; }
        .nav-center a:hover { color: #dc2626; }
        .nav-right { position: absolute; right: 3rem; top: 50%; transform: translateY(-50%); display: flex; align-items: center; gap: 1.2rem; }
        
        .logo-circle { 
            width: 60px; height: 60px; border-radius: 50%; overflow: hidden; 
            border: 2px solid #dc2626; display: flex; align-items: center; justify-content: center; 
            background: transparent; cursor: pointer; transition: transform 0.3s ease, box-shadow 0.3s ease; 
        }
        .logo-circle:hover { transform: scale(1.1); box-shadow: 0 0 15px rgba(220, 38, 38, 0.5); }
        .logo-img { width: 100%; height: 100%; object-fit: cover; }
        
        .reg-btn { 
            border: 1px solid #dc2626; padding: 0.5rem 1.5rem; font-size: 0.65rem; 
            font-weight: bold; text-transform: uppercase; background: transparent; 
            color: white; cursor: pointer; transition: background 0.3s; 
        }
        .reg-btn:hover { background: #dc2626; }

        
        .mobile-menu-btn { display: none; } /* Hidden on desktop */
        .mobile-menu-overlay { display: none; } /* Hidden on desktop, enabled in media query */

        .hero-title { 
            font-family: 'Orbitron', sans-serif; font-size: 13vw; font-weight: 900; 
            font-style: italic; line-height: 1; letter-spacing: -0.05em; margin: 0; 
            position: relative; z-index: 10; text-transform: uppercase; will-change: opacity;
        }
        .hero-section { background: transparent !important; }
        .hero-sub { 
            color: #dc2626; letter-spacing: 1.5em; font-size: 0.65rem; 
            text-transform: uppercase; margin-top: 1rem; position: relative; 
            z-index: 10; will-change: opacity;
        }

        .technical-grid {
            position: relative; min-height: 160vh; display: flex; 
            padding: 10rem 5rem; overflow: hidden; 
        }
        .sticky-text { position: sticky; top: 25%; width: 35%; z-index: 5; }
        .vision-main { font-size: 2.25rem; font-weight: 300; line-height: 1.2; }
        
        .newses {
            position: relative; /* In flow */
            font-size: 6rem; 
            font-weight: 900; line-height: 1; color: rgba(220, 38, 38, 0.8); 
            white-space: nowrap; z-index: 50; pointer-events: none;
            margin-bottom: 2rem;
        }

        .card-wrapper { position: absolute; z-index: 10; width: 350px; }
        .card-wrapper.c1 { position: absolute; right: 10%; top: 45%; width: 380px; z-index: 60; }
        
        .interactive-card {
            width: 100%; border-radius: 4px; border: 1px solid rgba(220, 38, 38, 0.3);
            box-shadow: 0 20px 40px rgba(0,0,0,0.6);
        }
        .interactive-card:hover { filter: grayscale(0%); }
        .card-meta { margin-top: 1rem; border-left: 2px solid #dc2626; padding-left: 1rem; }
        .card-label { font-size: 10px; font-weight: bold; color: #dc2626; text-transform: uppercase; }
        .card-title { font-size: 1.25rem; font-weight: bold; }

        #immersive-wrapper { position: relative; width: 100vw; height: 100vh; overflow: hidden; background: transparent; }
        .imm-section { 
            position: absolute; inset: 0; display: flex; justify-content: center; 
            align-items: center; visibility: hidden; opacity: 0; 
            will-change: transform; transition: opacity 0.5s ease; 
        }
        .split-layout { display: flex; align-items: center; gap: 4rem; width: 85%; max-width: 1200px; }
        .split-image { width: 100%; max-width: 500px; border-radius: 12px; box-shadow: 0 20px 50px rgba(0,0,0,0.8); }
        .imm-h1 { font-size: 3.5rem; text-transform: uppercase; font-weight: 900; margin-bottom: 10px; }
        .imm-tag { 
            background: #ff0000; padding: 6px 16px; border-radius: 20px; 
            font-size: 0.75rem; font-weight: bold; text-transform: uppercase; 
            display: inline-block; margin-bottom: 20px; 
        }
        .horizontal-quote { 
            position: absolute; top: 70%; left: 0; font-size: 8vw; white-space: nowrap; 
            font-weight: 900; text-transform: uppercase; opacity: 0; pointer-events: none; 
            z-index: 50; text-shadow: 0 10px 30px rgba(0,0,0,0.5); 
        }

        footer { background: #000; padding-top: 10rem; padding-bottom: 2.5rem; position: relative; border-top: 1px solid #18181b; }
        .footer-content { max-width: 1200px; margin: 0 auto; padding: 0 2.5rem; }
        .footer-top { display: flex; flex-wrap: wrap; justify-content: space-between; margin-bottom: 5rem; align-items: flex-end; }
        .footer-reveal-text { 
            font-family: 'Orbitron', sans-serif; font-size: 8vw; line-height: 0.8; 
            font-weight: 900; font-style: italic; color: #1a1a1a; 
            transition: color 0.5s ease; cursor: default; user-select: none; 
            letter-spacing: -0.05em; text-transform: uppercase;
        }
        .footer-container:hover .footer-reveal-text { color: #dc2626; }
        .footer-links ul { list-style: none; padding: 0; color: #52525b; font-size: 10px; text-transform: uppercase; letter-spacing: 0.05em; line-height: 2; }
        .footer-links a { color: inherit; text-decoration: none; transition: color 0.3s; }
        .footer-links a:hover { color: #dc2626; }

        .mask {
            position: absolute; top: 0; height: 100%; pointer-events: none;
            transform: skewX(-12deg); transform-origin: bottom; z-index: 20; will-change: opacity;
        }
        .mask span { position: absolute; left: 0; width: 100%; height: 0%; background: #000; will-change: height; }
        .m1 { left: -15%; width: 35%; } 
        .m2 { left: 15%;  width: 40%; } 
        .m3 { left: 45%;  width: 40%; }
        .m4 { left: 75%;  width: 35%; }
        .mask span:nth-child(1) { bottom: 40%; }
        .mask span:nth-child(2) { bottom: 0%; }
        .mask span:nth-child(3) { bottom: 70%; }

        /* --- MOBILE & RESPONSIVE STYLES --- */
        @media (max-width: 768px) {
            /* Mobile Navigation */
            .nav-bar { padding: 1.5rem 1.5rem; }
            .nav-left { 
                left: 1.5rem; 
                top: 40%; /* Moved up from 50% */
            } 
            .nav-center { display: none; } /* Hide default center menu */
            .nav-right { display: none; } /* Hide default right menu elements if any, or keeps reg-btn hidden? User said "under a icon" */
            
            .mobile-menu-btn {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                width: 30px;
                height: 20px;
                position: absolute;
                right: 1.5rem;
                top: 50%;
                transform: translateY(-50%);
                z-index: 200;
                cursor: pointer;
            }
            
            .mobile-menu-btn span {
                width: 100%;
                height: 2px;
                background-color: #fff;
                transition: all 0.3s ease;
            }
            
            .mobile-menu-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100vh;
                background: rgba(0,0,0,0.95);
                backdrop-filter: blur(10px);
                z-index: 150;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                gap: 3rem;
                opacity: 0;
                visibility: hidden;
                transition: all 0.4s ease;
            }
            
            .mobile-menu-overlay.open {
                opacity: 1;
                visibility: visible;
            }

            .mobile-menu-close {
                position: absolute;
                top: 2rem;
                right: 2rem;
                width: 40px;
                height: 40px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .mobile-menu-close::before, .mobile-menu-close::after {
                content: '';
                position: absolute;
                width: 100%;
                height: 2px;
                background-color: #fff;
            }
            .mobile-menu-close::before { transform: rotate(45deg); }
            .mobile-menu-close::after { transform: rotate(-45deg); }
            
            .mobile-menu-link {
                font-family: 'Orbitron', sans-serif;
                font-size: 1.5rem;
                color: #fff;
                text-transform: uppercase;
                letter-spacing: 0.2em;
                font-weight: 900;
                cursor: pointer;
            }
            
            .mobile-menu-link:hover { color: #dc2626; }

            .hero-title { font-size: 18vw; }
            .hero-sub { letter-spacing: 0.5em; font-size: 0.55rem; }

            .technical-grid { flex-direction: column; min-height: auto; padding: 5rem 1.5rem; }
            .sticky-text { position: relative; top: 0; width: 100%; margin-bottom: 3rem; }
            .vision-main { font-size: 1.8rem; }
            
            .newses {
                position: relative; top: 0; right: auto; font-size: 13vw; 
                margin: 4rem 0 2rem; color: rgba(220, 38, 38, 0.4); display: block; text-align: center;
                line-height: 1.1;
            }

            .card-wrapper.c1 { 
                position: relative; right: auto; top: auto; width: 80%; max-width: 280px;
                margin: 0 auto 3rem; transform: none !important; 
            }

            /* Animated "Backside" Glow for Workshop Card */
            .card-wrapper.c1::before {
                content: '';
                position: absolute;
                inset: -10px;
                background: linear-gradient(45deg, #dc2626, transparent, #ef4444, transparent);
                z-index: -1;
                border-radius: 12px;
                filter: blur(15px);
                animation: bg-pulse 3s infinite linear;
                opacity: 0.6;
            }
            @keyframes bg-pulse {
                0% { opacity: 0.4; transform: scale(0.95); }
                50% { opacity: 0.8; transform: scale(1.05); }
                100% { opacity: 0.4; transform: scale(0.95); }
            }

            .interactive-card {
                 /* Ensure image fits nicely */
                 height: auto;
                 display: block;
                 background: #000; /* Prevent transparency looking weird with glow */
            }

            .card-title { font-size: 1rem !important; }
            .card-label { font-size: 0.6rem !important; }
            .card-meta { margin-top: 0.5rem; padding-left: 0.8rem; border-left-width: 2px; }

            /* Improve Immersive Section on Mobile Content Layout */
            .split-layout { 
                flex-direction: column !important; /* Force Image Top, Text Bottom for consistency */
                gap: 2rem; 
                width: 100%; 
                text-align: center;
                padding-top: 2rem; 
            }
            
            /* Override the row/row-reverse inline styles from JS loop on mobile */
            .inner-content {
                flex-direction: column !important; 
            }

            .split-image { max-width: 80%; margin: 0 auto; height: auto; }
            .imm-h1 { font-size: 2rem; }
            .imm-p { font-size: 0.9rem; } /* Assuming there's a paragraph class or use generic p */
            
            /* Allow GSAP to handle the wrappers, but ensure content fits */
            #immersive-wrapper {
                /* We rely on GSAP Pinning now, so no height: auto override */
            }

            .imm-section {
                /* We rely on absolute positioning for the fade effect */
                width: 100%;
                height: 100vh;
                padding: 0 1.5rem; /* Add side padding */
                box-sizing: border-box;
            }

            .horizontal-quote {
               font-size: 1.5rem !important; /* Readability */
               width: 100%;
               white-space: nowrap !important; /* Force single line for marquee */
               text-align: left; /* Allow left alignment for movement */
               left: 0 !important;
               padding: 0 1rem;
            }

            .footer-top { flex-direction: column; align-items: flex-start; gap: 2rem; }
            .footer-reveal-text { font-size: 15vw; }
        }

        @media (max-width: 480px) {
             .hero-title { font-size: 20vw; }
             .logo-circle { width: 50px; height: 50px; }
        }`}</style>

      <section className="hero-section" style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <nav className="nav-bar">
          <div className="nav-left">
            <div className="logo-circle" onClick={() => window.location.reload()}>
              <img src={logoImg} alt="Athera Logo" className="logo-img" />
            </div>
          </div>

          {/* --- UPDATED NAVIGATION CENTER --- */}
          <div className="nav-center">
            {/* Clicking Events now redirects to the /events route */}
            <Link to="/events">Events</Link>
            <a onClick={(e) => { e.preventDefault(); scrollToSection('#footer'); }}>About Us</a>
          </div>

          <div className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <span style={{ transform: isMobileMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }}></span>
            <span style={{ opacity: isMobileMenuOpen ? 0 : 1 }}></span>
            <span style={{ transform: isMobileMenuOpen ? 'rotate(-45deg) translate(5px, -6px)' : 'none' }}></span>
          </div>
        </nav>

        <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'open' : ''}`}>
          <div className="mobile-menu-close" onClick={() => setIsMobileMenuOpen(false)}></div>
          <Link to="/events" className="mobile-menu-link">Events</Link>
          <a className="mobile-menu-link" onClick={() => { setIsMobileMenuOpen(false); scrollToSection('#footer'); }}>About Us</a>
        </div>

        <h1 className="hero-title">ATHERA</h1>
        <p className="hero-sub">The Digital Renaissance</p>

        <div style={{ position: 'absolute', bottom: '2.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: 0.4 }}>
          <p style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '1rem' }}>Scroll to explore</p>
          <div style={{ width: '1px', height: '4rem', background: 'linear-gradient(to bottom, #dc2626, transparent)' }}></div>
        </div>

        <div className="mask m1"><span></span><span></span><span></span></div>
        <div className="mask m2"><span></span><span></span><span></span></div>
        <div className="mask m3"><span></span><span></span><span></span></div>
        <div className="mask m4"><span></span><span></span><span></span></div>
      </section>

      <section id="motion-section" className="technical-grid">
        {/* Left Side: Sticky Information */}
        <div className="sticky-text">
          {/* The Big Title that scrolls horizontally */}
          <h1 ref={workshopsTitleRef} className="newses">WORKSHOPS</h1>

          <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '8px', height: '8px', background: '#dc2626', borderRadius: '50%', display: 'inline-block' }}></span>
            <span style={{ fontSize: '0.7rem', color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.2em' }}>Mission Protocol</span>
          </div>
          <p className="vision-main">We don't just host events. We engineer <span style={{ fontWeight: 900, fontStyle: 'italic', color: '#dc2626' }}>movements.</span></p>
          <p style={{ marginTop: '2rem', fontSize: '1rem', color: '#a1a1aa', lineHeight: '1.6', maxWidth: '100%' }}>
            Athera is the convergence point for minds that refuse to settle for the present.
          </p>
          <div style={{ marginTop: '2.5rem' }}>
            <button className="reg-btn" style={{ padding: '0.75rem 2rem' }} onClick={() => scrollToSection('#immersive-wrapper')}>
              Explore Our Vision
            </button>
          </div>
        </div>

        {/* The Workshop Card */}
        <div ref={diagonal1Ref} className="card-wrapper c1">
          <div className="interactive-card-container">
            <img src="/workshop.jpg" alt="Computer Vision" className="interactive-card" />
            <div className="card-meta">
              <p className="card-label">Workshop 01</p>
              <p className="card-title">COMPUTER VISION</p>
            </div>
          </div>
        </div>
      </section>

      <div id="immersive-wrapper" ref={wrapperRef}>
        {topics.map((item, index) => (
          <div className="imm-section" id={`section-${index}`} key={index}>
            <div id={`content-${index}`} className="inner-content split-layout" style={{ flexDirection: index % 2 !== 0 ? 'row-reverse' : 'row' }}>
              <div className="split-image-wrapper">
                <img src={item.img} alt={item.title} className="split-image" />
              </div>
              <div className="split-text-wrapper">
                <span className="imm-tag">{item.tag}</span>
                <h1 className="imm-h1">{item.title}</h1>
                <p style={{ color: '#ccc', fontSize: '1.1rem', lineHeight: '1.6' }}>{item.desc}</p>
              </div>
            </div>
          </div>
        ))}
        <div className="horizontal-quote" ref={scrollingTextRef}>{textQuote}</div>
      </div>

      <footer id="footer" className="footer-container">
        <div className="footer-content">
          <div className="footer-top">
            <div style={{ maxWidth: '340px' }}>
              <p style={{ color: '#dc2626', fontWeight: 'bold', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '0.75rem' }}>ATHERA</p>
              <p style={{ color: '#71717a', fontSize: '0.85rem', lineHeight: 1.6 }}>AI & Technology Hub for Enhanced Research and Analytics</p>
            </div>
            <div className="footer-links">
              {/* <h4>About ATHERA</h4> */}
              <ul>
                {/* <li><a href="#">About the Club</a></li>
                <li><a href="#">Vision & Mission</a></li> */}
              </ul>
            </div>
          </div>
          <div className="footer-reveal-text">ATHERA</div>
          <div style={{ marginTop: '4rem', display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #18181b', paddingTop: '2rem', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.3em', color: '#3f3f46' }}>
            <h3>© 2025 ATHERA CLUB</h3>
            <p><a href="https://www.linkedin.com/in/athera-cit-21a04b39b/">LinkedIn</a> · <a href="https://www.instagram.com/athera_cit/">Instagram</a></p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Athera;