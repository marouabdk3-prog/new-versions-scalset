"use client";
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function SSPrismaticIntegration() {
    const containerRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        
        let ctx = gsap.context(() => {
            


// Custom Cursor
const cursor = document.querySelector('.cursor') as HTMLElement | null;
const links = document.querySelectorAll('a, button, .service-card, .feature-item');

document.addEventListener('mousemove', (e) => {
  if (cursor) {
    cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  }
});

links.forEach(link => {
  link.addEventListener('mouseenter', () => cursor?.classList.add('hovered'));
  link.addEventListener('mouseleave', () => cursor?.classList.remove('hovered'));
});

// Language Switcher (Removed because buttons are gone)

// Animations
// Run immediately because module scripts are deferred by default
const initAnimations = () => {
// ── 3D STACKING CUBE ANIMATION ──
  const cubeTl = gsap.timeline({
    scrollTrigger: {
      trigger: '#stack-cube',
      start: 'top top',
      end: '+=2000',
      scrub: 1,
      pin: true
    }
  });

  const layers = gsap.utils.toArray('.cube-layer') as HTMLElement[];
  const texts = gsap.utils.toArray('.cube-text-item') as HTMLElement[];
  const zOffsets = [0, 50, 100, 150]; // How far apart they stack

  layers.forEach((layer: HTMLElement, index: number) => {
    // Drop each layer into place
    cubeTl.to(layer, {
      z: zOffsets[index], // Drop from Z=500 down to its stack level
      opacity: 1,
      duration: 1,
      ease: 'power2.out'
    }, index * 0.5); // Staggered start times

    // Simultaneously fade in and slide the corresponding text
    cubeTl.to(texts[index], {
      opacity: 1,
      x: 0,
      duration: 1,
      ease: 'power2.out',
      onStart: () => texts[index].classList.add('active'),
      onReverseComplete: () => texts[index].classList.remove('active')
    }, index * 0.5);
  });

  // Once all are dropped, trigger the glow
  cubeTl.to(layers, {
    onStart: () => {
      layers.forEach((l: HTMLElement) => l.classList.add('glow-active'));
    },
    onReverseComplete: () => {
      layers.forEach((l: HTMLElement) => l.classList.remove('glow-active'));
    },
    duration: 0.5
  });



  // ── STATS ANIMATION (Numbers, Charts & Crossfade) ──
  
  // Simply fade in the CTA instead of pinning
  gsap.to('.stats-cta-wrapper', {
    opacity: 1,
    y: 0,
    duration: 1,
    delay: 0.5,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.stats',
      start: 'top 60%',
      once: true
    }
  });

  const statsCounters = gsap.utils.toArray('.counter') as HTMLElement[];
  
  statsCounters.forEach(counter => {
    const targetVal = parseFloat(counter.getAttribute('data-target') || '0');
    
    gsap.fromTo(counter, 
      { innerHTML: 0 },
      {
        innerHTML: targetVal,
        duration: 2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.stats',
          start: 'top 80%',
          once: true
        },
        snap: { innerHTML: 1 } 
      }
    );
  });

  // Animate the Percent Counters for Graphs
  const percentCounters = gsap.utils.toArray('.counter-percent') as HTMLElement[];
  percentCounters.forEach((counter, index) => {
    const targetVal = parseFloat(counter.getAttribute('data-target') || '0');
    
    let proxy = { val: 0 };
    gsap.to(proxy, {
      val: targetVal,
      duration: 1.5,
      delay: index * 0.2, // Stagger slightly
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.stats',
        start: 'top 80%',
        once: true
      },
      onUpdate: () => {
        counter.innerHTML = Math.round(proxy.val) + '%';
      }
    });
  });

  // Animate the Bar Chart (Pillars)
  const bars = gsap.utils.toArray('.bar-fill') as HTMLElement[];
  bars.forEach((bar, index) => {
    const targetH = parseFloat(bar.getAttribute('data-target-height') || '0');
    const baseY = parseFloat(bar.getAttribute('data-base-y') || '140') || 140;
    gsap.fromTo(bar,
      { attr: { height: 0, y: baseY } },
      {
        attr: { height: targetH, y: baseY - targetH },
        duration: 1.5,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.stats', start: 'top 80%', once: true },
        delay: index * 0.1
      }
    );
  });

  // Animate labels and values
  const pillarTl = gsap.timeline({
    scrollTrigger: {
      trigger: '.stats',
      start: 'top 80%',
      once: true
    }
  });

  pillarTl.to('.graph-label, .graph-val', {
    opacity: 1,
    y: "-=10",
    duration: 1,
    stagger: 0.1,
    ease: 'power2.out'
  });

  // Animate the Cash Counters
  const cashCounters = gsap.utils.toArray('.counter-cash') as HTMLElement[];
  cashCounters.forEach((counter, index) => {
    const targetVal = parseFloat(counter.getAttribute('data-target') || '0');
    const delay = index === 1 ? 1 : 0.2;
    
    let proxy = { val: 0 };
    gsap.to(proxy, {
      val: targetVal,
      duration: 1.5,
      delay: delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.stats',
        start: 'top 80%',
        once: true
      },
      onUpdate: () => {
        counter.innerHTML = '$' + Math.round(proxy.val) + 'K';
      }
    });
  });

  // ── CLIENTS MARQUEE ANIMATION ──
  // Top row moves left
  gsap.to('.track-left .marquee-content', {
    xPercent: -50, // Move left by half its width (the duplicate handles the loop)
    ease: "none",
    duration: 20,
    repeat: -1
  });

  // Bottom row moves right
  gsap.fromTo('.track-right .marquee-content', 
    { xPercent: -50 }, // Start offset
    {
      xPercent: 0, // Move right
      ease: "none",
      duration: 20,
      repeat: -1
    }
  );

  // ── FEATURES (Grid Fade-in) ──
  const featureCards = gsap.utils.toArray('.feature-card') as HTMLElement[];
  
  gsap.from(featureCards, {
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.features-cards-container',
      start: 'top 80%',
      once: true
    }
  });

  // ── SERVICES ANIMATION (3D Tilt & Scroll) ──
  gsap.from('.services h2', {
    scrollTrigger: {
      trigger: '.services',
      start: 'top 80%',
    },
    y: 50,
    opacity: 0,
    duration: 1
  });

  gsap.from('.service-card', {
    scrollTrigger: {
      trigger: '.tilt-grid',
      start: 'top 80%',
    },
    y: 100,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: 'back.out(1.7)'
  });

  // Vanilla JS 3D Tilt Effect
  const tiltCards = document.querySelectorAll('.tilt-card') as NodeListOf<HTMLElement>;
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; // x position within the element.
      const y = e.clientY - rect.top;  // y position within the element.
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -10; // Max 10 deg tilt
      const rotateY = ((x - centerX) / centerX) * 10;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
    });
  });
};

initAnimations();



        }, containerRef);

        return () => {
            ctx.revert();
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    const htmlContent = `
    <!-- Custom Cursor -->
    <div class="cursor"></div>

    <!-- SVG Definitions -->
    <svg width="0" height="0" style="position: absolute; width: 0; height: 0; overflow: hidden;">
      <defs>
        <!-- The Sun -->
        <g id="sun-svg">
          <path d="M50 0 L55 35 L90 20 L70 50 L100 70 L65 75 L80 110 L50 85 L20 110 L35 75 L0 70 L30 50 L10 20 L45 35 Z" fill="currentColor"/>
        </g>
        
        <!-- Logo Path Definition (for clipping and static use) -->
        <path id="base-logo-path" d="M33.07,51.25L9.62,89.35L50,10.65l40.38,78.7L50,25.41L33.07,51.25z M46.35,50.43L50,46.57l40.38,42.78
          L66.36,56.63L50,33.99L33.64,56.63L9.62,89.35l31.54-33.42l22.04,17.05c0.69,0.54,1.42,1.03,2.17,1.48l25,14.89L46.35,50.43z
           M49.2,66.17l-6.71-5.57L9.62,89.35L35.4,74.17L49.2,66.17z M34.59,74.65L50,75.91l15.38-1.45L50,74.65H34.59z M34.59,74.65
          L50,78.71l15.38-4.25L50,77.45L34.59,74.65z M34.59,74.65L50,81.42l15.38-6.97L50,80.16L34.59,74.65z"/>

        <!-- Static Silver Gradient (Header) -->
        <linearGradient id="static-silver" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="100" y2="100">
          <stop offset="0%" stop-color="#ffffff"/>
          <stop offset="50%" stop-color="#999999"/>
          <stop offset="100%" stop-color="#e6e6e6"/>
        </linearGradient>

        <!-- Dynamic Liquid Silver Gradient -->
        <linearGradient id="liquid-silver" x1="0%" y1="0%" x2="100%" y2="100%">
          <animate attributeName="x1" values="0%; 100%; 0%" dur="8s" repeatCount="indefinite"/>
          <animate attributeName="y1" values="0%; 100%; 0%" dur="10s" repeatCount="indefinite"/>
          <stop offset="0%" stop-color="#e6e6e6"/>
          <stop offset="25%" stop-color="#999999"/>
          <stop offset="50%" stop-color="#ffffff"/>
          <stop offset="75%" stop-color="#666666"/>
          <stop offset="100%" stop-color="#cccccc"/>
        </linearGradient>

        <!-- Intense Liquid Filter Distortion for Logo -->
        <filter id="liquid-distortion" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="4" result="noise" seed="42">
            <animate attributeName="baseFrequency" values="0.04; 0.07; 0.04" dur="15s" repeatCount="indefinite" />
          </feTurbulence>
          <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -5" in="noise" result="coloredNoise" />
          <feDisplacementMap in="SourceGraphic" in2="coloredNoise" scale="60" xChannelSelector="R" yChannelSelector="G">
            <animate attributeName="scale" values="40; 80; 40" dur="20s" repeatCount="indefinite"/>
          </feDisplacementMap>
        </filter>

        <!-- RGB Chromatic Aberration Liquid Filter for Text color only -->
        <!-- This filter shifts HUE/color only, not shape - applied to a canvas overlay on the letters -->
        <filter id="color-liquid" x="0%" y="0%" width="100%" height="100%" color-interpolation-filters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" result="noise" seed="12">
            <animate attributeName="baseFrequency" values="0.03; 0.05; 0.03" dur="8s" repeatCount="indefinite" />
          </feTurbulence>
          <feColorMatrix in="noise" type="saturate" values="3" result="colorNoise" />
          <feBlend in="SourceGraphic" in2="colorNoise" mode="overlay" result="blended" />
          <feComposite in="blended" in2="SourceGraphic" operator="in" />
        </filter>


        <!-- Sharp Clip Path of Logo -->
        <clipPath id="logo-clip">
          <use href="#base-logo-path" />
        </clipPath>

        <!-- Final Composed Logos -->
        <g id="header-logo">
          <use href="#base-logo-path" fill="url(#static-silver)" />
        </g>

        <g id="liquid-hero-logo">
          <g clip-path="url(#logo-clip)">
            <!-- The distorted liquid filling the logo shape -->
            <rect x="-20" y="-20" width="140" height="140" fill="url(#liquid-silver)" filter="url(#liquid-distortion)" />
          </g>
        </g>
      </defs>
    </svg>

    <div class="page-wrapper">


      <!-- 3D STACKING CUBE SECTION -->
      <section class="stack-cube-section" id="stack-cube">
        <div class="cube-layout">
          
          <!-- LEFT: The 3D Stack -->
          <div class="cube-left">
            <div class="cube-container">
              <div class="cube-layer layer-1"></div>
              <div class="cube-layer layer-2"></div>
              <div class="cube-layer layer-3"></div>
              <div class="cube-layer layer-4"></div>
            </div>
          </div>

          <!-- RIGHT: The Text -->
          <div class="cube-right">
            <div class="cube-text-item">
              <span class="layer-num">01</span>
              <h3 data-en="Pre-Vetted Experts" data-fr="Experts Pré-sélectionnés">Experts Pré-sélectionnés</h3>
            </div>
            <div class="cube-text-item">
              <span class="layer-num">02</span>
              <h3 data-en="End-to-End Management" data-fr="Gestion de A à Z">Gestion de A à Z</h3>
            </div>
            <div class="cube-text-item">
              <span class="layer-num">03</span>
              <h3 data-en="Optimized Taxation" data-fr="Fiscalité Optimisée">Fiscalité Optimisée</h3>
            </div>
            <div class="cube-text-item">
              <span class="layer-num">04</span>
              <h3 data-en="Scalable Resources" data-fr="Ressources Évolutives">Ressources Évolutives</h3>
            </div>
          </div>
        </div>

        <!-- Floating Decoration -->
        <img src="/chess_piece.png" class="floating-decoration" alt="Decoration" />
      </section>


      <!-- Golden Lining -->
      <div class="golden-lining"></div>

      <!-- STATS SECTION -->
      <section class="stats section">
        
        <div class="stats-text" style="text-align: center; margin-bottom: 4rem;">
            <h3 data-en="You can do more without spending more" data-fr="Vous pouvez faire plus sans dépenser plus" style="font-size: clamp(2rem, 4vw, 3rem); margin-bottom: 1rem;">
              Vous pouvez faire plus <br><span class="text-gray">sans dépenser plus</span>
            </h3>
            <p data-en="What holds back your growth today is not your business, but the cost of your teams. Take back control of your organization and improve your results by reducing your expenses." data-fr="Ce qui freine votre croissance aujourd'hui, ce n'est pas votre business, mais le coût de vos équipes. Reprenez le contrôle de votre organisation et améliorez vos résultats en réduisant vos dépenses." style="color: rgba(255, 255, 255, 0.6); font-size: 1.2rem; max-width: 800px; margin: 0 auto;">
              Ce qui freine votre croissance aujourd'hui, ce n'est pas votre business, mais le coût de vos équipes. Reprenez le contrôle de votre organisation et améliorez vos résultats en réduisant vos dépenses.
            </p>
        </div>

        <div class="stats-content-wrapper" style="position: relative;">
          
          <div class="stats-grid">
            
            <!-- Stat 1: 98% with Pillar Graph -->
            <div class="stat-item comparison-item" style="justify-content: center;">
                <div class="comparison-row" style="width: 100%;">
                  <svg viewBox="0 0 300 170" class="pillar-graph-svg" style="width: 100%; height: auto; overflow: visible;">
                    <!-- X-Axis -->
                    <line x1="20" y1="140" x2="280" y2="140" stroke="rgba(255,255,255,0.2)" stroke-width="2" stroke-linecap="round" />
                    
                    <!-- Pillars -->
                    <rect class="bar-fill without-scalset" x="60" y="140" width="60" height="0" data-target-height="60" data-base-y="140" fill="rgba(255,255,255,0.2)" rx="4" />
                    <rect class="bar-fill with-scalset" x="180" y="140" width="60" height="0" data-target-height="100" data-base-y="140" fill="url(#static-silver)" rx="4" />
                    
                    <!-- Labels -->
                    <text class="graph-label" x="90" y="160" fill="rgba(255,255,255,0.5)" font-size="10" font-family="var(--font-sans)" font-weight="600" letter-spacing="1" text-anchor="middle" data-en="Without SCALSET" data-fr="Sans SCALSET">Sans SCALSET</text>
                    <text class="graph-label" x="210" y="160" fill="rgba(212,175,55,0.8)" font-size="10" font-family="var(--font-sans)" font-weight="600" letter-spacing="1" text-anchor="middle" data-en="With SCALSET" data-fr="Avec SCALSET">Avec SCALSET</text>
                    
                    <!-- Values -->
                    <text class="graph-val counter-percent" data-target="65" x="90" y="70" fill="rgba(255,255,255,0.8)" font-size="16" font-family="var(--font-display)" font-weight="800" text-anchor="middle" opacity="0">0%</text>
                    <text class="graph-val counter-percent" data-target="98" x="210" y="30" fill="var(--accent-color)" font-size="20" font-family="var(--font-display)" font-weight="900" text-anchor="middle" opacity="0">0%</text>
                  </svg>
                </div>
                <p class="stat-desc" style="margin-top: 1.5rem;" data-en="Satisfaction Rate" data-fr="Taux de satisfaction">Taux de satisfaction</p>
            </div>

            <!-- Stat 2: 50% with Pillar Graph -->
            <div class="stat-item comparison-item" style="justify-content: center;">
                <div class="comparison-row" style="width: 100%;">
                  <svg viewBox="0 0 300 170" class="pillar-graph-svg" style="width: 100%; height: auto; overflow: visible;">
                    <!-- X-Axis -->
                    <line x1="20" y1="140" x2="280" y2="140" stroke="rgba(255,255,255,0.2)" stroke-width="2" stroke-linecap="round" />
                    
                    <!-- Pillars -->
                    <rect class="bar-fill without-scalset" x="60" y="140" width="60" height="0" data-target-height="15" data-base-y="140" fill="rgba(255,255,255,0.2)" rx="4" />
                    <rect class="bar-fill with-scalset" x="180" y="140" width="60" height="0" data-target-height="85" data-base-y="140" fill="url(#static-silver)" rx="4" />
                    
                    <!-- Labels -->
                    <text class="graph-label" x="90" y="160" fill="rgba(255,255,255,0.5)" font-size="10" font-family="var(--font-sans)" font-weight="600" letter-spacing="1" text-anchor="middle" data-en="Without SCALSET" data-fr="Sans SCALSET">Sans SCALSET</text>
                    <text class="graph-label" x="210" y="160" fill="rgba(212,175,55,0.8)" font-size="10" font-family="var(--font-sans)" font-weight="600" letter-spacing="1" text-anchor="middle" data-en="With SCALSET" data-fr="Avec SCALSET">Avec SCALSET</text>
                    
                    <!-- Values -->
                    <text class="graph-val counter-percent" data-target="0" x="90" y="115" fill="rgba(255,255,255,0.8)" font-size="16" font-family="var(--font-display)" font-weight="800" text-anchor="middle" opacity="0">0%</text>
                    <text class="graph-val counter-percent" data-target="50" x="210" y="45" fill="var(--accent-color)" font-size="20" font-family="var(--font-display)" font-weight="900" text-anchor="middle" opacity="0">0%</text>
                  </svg>
                </div>
                <p class="stat-desc" style="margin-top: 1.5rem;" data-en="Productivity Gain" data-fr="Gain en productivité">Gain en productivité</p>
            </div>

            <!-- Stat 3: 70K with Pillar Graph -->
            <div class="stat-item comparison-item" style="justify-content: center;">
                <div class="comparison-row" style="width: 100%;">
                  <svg viewBox="0 0 300 170" class="pillar-graph-svg" style="width: 100%; height: auto; overflow: visible;">
                    <!-- X-Axis -->
                    <line x1="20" y1="140" x2="280" y2="140" stroke="rgba(255,255,255,0.2)" stroke-width="2" stroke-linecap="round" />
                    
                    <!-- Pillars -->
                    <rect class="bar-fill without-scalset" x="60" y="140" width="60" height="0" data-target-height="25" data-base-y="140" fill="rgba(255,255,255,0.2)" rx="4" />
                    <rect class="bar-fill with-scalset" x="180" y="140" width="60" height="0" data-target-height="100" data-base-y="140" fill="url(#static-silver)" rx="4" />
                    
                    <!-- Labels -->
                    <text class="graph-label" x="90" y="160" fill="rgba(255,255,255,0.5)" font-size="10" font-family="var(--font-sans)" font-weight="600" letter-spacing="1" text-anchor="middle" data-en="Without SCALSET" data-fr="Sans SCALSET">Sans SCALSET</text>
                    <text class="graph-label" x="210" y="160" fill="rgba(212,175,55,0.8)" font-size="10" font-family="var(--font-sans)" font-weight="600" letter-spacing="1" text-anchor="middle" data-en="With SCALSET" data-fr="Avec SCALSET">Avec SCALSET</text>
                    
                    <!-- Values -->
                    <text class="graph-val counter-cash" data-target="15" x="90" y="105" fill="rgba(255,255,255,0.8)" font-size="16" font-family="var(--font-display)" font-weight="800" text-anchor="middle" opacity="0">\$0K</text>
                    <text class="graph-val counter-cash" data-target="70" x="210" y="30" fill="var(--accent-color)" font-size="20" font-family="var(--font-display)" font-weight="900" text-anchor="middle" opacity="0">\$0K</text>
                  </svg>
                </div>
                <p class="stat-desc" style="margin-top: 1.5rem;" data-en="Cost Savings" data-fr="Économie réalisée">Économie réalisée</p>
            </div>

          </div>
        </div>
        
        <!-- Page-centered CTA (Normal Flow) -->
        <div class="stats-cta-wrapper" style="width: 100%; display: flex; justify-content: center; margin-top: 4rem; opacity: 0; transform: translateY(30px);">
          <a href="#services" class="btn-shiny" data-en="Our Services" data-fr="Nos Services">Nos Services</a>
        </div>
      </section>

      <!-- CLIENTS MARQUEE SECTION -->
      <section class="clients-section section">
        <h2 class="clients-title" data-en="Who needs us" data-fr="Qui a besoin de nous">Qui a besoin de nous</h2>
        
        <div class="marquee-container">
          <!-- Top row (Scrolls Left) -->
          <div class="marquee-track track-left">
            <div class="marquee-content">
              <div class="client-box">Grandes entreprises</div>
              <div class="client-box">E-commerce</div>
              <div class="client-box">Agences</div>
              <div class="client-box">Startups</div>
              <div class="client-box">Entrepreneurs</div>
              <div class="client-box">Cabinets & services</div>
              <!-- Duplicate for seamless loop -->
              <div class="client-box">Grandes entreprises</div>
              <div class="client-box">E-commerce</div>
              <div class="client-box">Agences</div>
              <div class="client-box">Startups</div>
              <div class="client-box">Entrepreneurs</div>
              <div class="client-box">Cabinets & services</div>
            </div>
          </div>
          
          <!-- Bottom row (Scrolls Right) -->
          <div class="marquee-track track-right">
            <div class="marquee-content">
              <div class="client-box">Grandes entreprises</div>
              <div class="client-box">E-commerce</div>
              <div class="client-box">Agences</div>
              <div class="client-box">Startups</div>
              <div class="client-box">Entrepreneurs</div>
              <div class="client-box">Cabinets & services</div>
              <!-- Duplicate for seamless loop -->
              <div class="client-box">Grandes entreprises</div>
              <div class="client-box">E-commerce</div>
              <div class="client-box">Agences</div>
              <div class="client-box">Startups</div>
              <div class="client-box">Entrepreneurs</div>
              <div class="client-box">Cabinets & services</div>
            </div>
          </div>
        </div>
      </section>

      <!-- WHY CHOOSE US (Grid) -->
      <section class="features section" id="features">
        <div class="features-header">
          <h2 data-en="Why companies choose ScalSet" data-fr="Pourquoi les entreprises choisissent ScalSet">
            Pourquoi les entreprises<br>choisissent ScalSet
          </h2>
        </div>
        
        <div class="features-cards-container">
          
          <div class="feature-card">
            <div class="card-glow"></div>
            <div class="feature-index">01</div>
            <div class="feature-content">
              <h3 data-en="Reduce costs without losing performance" data-fr="Réduisez vos coûts sans perdre en performance">Réduisez vos coûts sans perdre en performance</h3>
              <p data-en="Benefit from a high-performing team at a cost well below the local market." data-fr="Bénéficiez d’une équipe performante à un coût bien inférieur au marché local.">Bénéficiez d’une équipe performante à un coût bien inférieur au marché local.</p>
            </div>
          </div>

          <div class="feature-card">
            <div class="card-glow"></div>
            <div class="feature-index">02</div>
            <div class="feature-content">
              <h3 data-en="Supervised teams, not isolated freelancers" data-fr="Des équipes encadrées, pas des freelances isolés">Des équipes encadrées, pas des freelances isolés</h3>
              <p data-en="Your teams work in our offices, supervised by our managers daily." data-fr="Vos équipes travaillent dans nos locaux, supervisées par nos managers au quotidien.">Vos équipes travaillent dans nos locaux, supervisées par nos managers au quotidien.</p>
            </div>
          </div>

          <div class="feature-card">
            <div class="card-glow"></div>
            <div class="feature-index">03</div>
            <div class="feature-content">
              <h3 data-en="We handle everything, you stay focused" data-fr="On s’occupe de tout, vous restez concentré">On s’occupe de tout, vous restez concentré</h3>
              <p data-en="Recruitment, training, and management: we handle it all for you." data-fr="Recrutement, formation et management : nous gérons l’ensemble pour vous.">Recrutement, formation et management : nous gérons l’ensemble pour vous.</p>
            </div>
          </div>

          <div class="feature-card">
            <div class="card-glow"></div>
            <div class="feature-index">04</div>
            <div class="feature-content">
              <h3 data-en="Lower costs, better results" data-fr="Moins de coûts, plus de résultats">Moins de coûts, plus de résultats</h3>
              <p data-en="Improve profitability while maintaining high performance." data-fr="Améliorez votre rentabilité tout en maintenant un haut niveau de performance.">Améliorez votre rentabilité tout en maintenant un haut niveau de performance.</p>
            </div>
          </div>

          <div class="feature-card">
            <div class="card-glow"></div>
            <div class="feature-index">05</div>
            <div class="feature-content">
              <h3 data-en="No HR or admin constraints" data-fr="Aucune contrainte RH ni charges administratives">Aucune contrainte RH ni charges administratives</h3>
              <p data-en="No HR management, no payroll taxes, no admin constraints on your side." data-fr="Aucune gestion RH, aucune cotisation, aucune contrainte administrative de votre côté.">Aucune gestion RH, aucune cotisation, aucune contrainte administrative de votre côté.</p>
            </div>
          </div>

          <div class="feature-card">
            <div class="card-glow"></div>
            <div class="feature-index">06</div>
            <div class="feature-content">
              <h3 data-en="Multilingual coverage" data-fr="Couverture multilingue">Couverture multilingue</h3>
              <p data-en="We build teams capable of working in English, French, and other languages as needed." data-fr="Nous mettons en place des équipes capables d’intervenir en français, anglais et dans d’autres langues selon vos besoins.">Nous mettons en place des équipes capables d’intervenir en français, anglais et dans d’autres langues selon vos besoins.</p>
            </div>
          </div>

        </div>

        <div style="text-align: center; margin-top: 8rem;">
          <a href="#about" class="btn-shiny" data-en="About Us" data-fr="À Propos De Nous">À Propos De Nous</a>
        </div>
      </section>

      <!-- SERVICES SECTION -->
      <section class="services section">
        <h2 data-en="The teams we build for you." data-fr="Les équipes que nous mettons en place pour vous.">
          Les équipes que nous <br><span class="italic text-gray">mettons en place pour vous.</span>
        </h2>
        
        <div class="services-grid tilt-grid">
          <div class="service-card tilt-card" data-tilt>
            <div class="service-bg" style="background: linear-gradient(rgba(10,10,10,0.5), rgba(10,10,10,0.8)), url('/sales_bg.png') center/cover;"></div>
            <div class="service-content">
              <span class="service-number">01</span>
              <h3 data-en="Sales & Operations" data-fr="Vente & Opérations">Vente & Opérations</h3>
            </div>
          </div>
          <div class="service-card tilt-card" data-tilt>
            <div class="service-bg" style="background: linear-gradient(rgba(10,10,10,0.5), rgba(10,10,10,0.8)), url('/marketing_bg.png') center/cover;"></div>
            <div class="service-content">
              <span class="service-number">02</span>
              <h3 data-en="Marketing & Growth" data-fr="Marketing & Croissance">Marketing & Croissance</h3>
            </div>
          </div>
          <div class="service-card tilt-card" data-tilt>
            <div class="service-bg" style="background: linear-gradient(rgba(10,10,10,0.5), rgba(10,10,10,0.8)), url('/support_bg.png') center/cover;"></div>
            <div class="service-content">
              <span class="service-number">03</span>
              <h3 data-en="Customer Support" data-fr="Support Client">Support Client</h3>
            </div>
          </div>
          <div class="service-card tilt-card" data-tilt>
            <div class="service-bg" style="background: linear-gradient(rgba(10,10,10,0.5), rgba(10,10,10,0.8)), url('/admin_bg.png') center/cover;"></div>
            <div class="service-content">
              <span class="service-number">04</span>
                    <rect class="bar-fill without-scalset" x="60" y="140" width="60" height="0" data-target-height="15" data-base-y="140" fill="rgba(255,255,255,0.2)" rx="4" />
                    <rect class="bar-fill with-scalset" x="180" y="140" width="60" height="0" data-target-height="85" data-base-y="140" fill="url(#static-silver)" rx="4" />
                    
                    <!-- Labels -->
                    <text class="graph-label" x="90" y="160" fill="rgba(255,255,255,0.5)" font-size="10" font-family="var(--font-sans)" font-weight="600" letter-spacing="1" text-anchor="middle" data-en="Without SCALSET" data-fr="Sans SCALSET">Sans SCALSET</text>
                    <text class="graph-label" x="210" y="160" fill="rgba(212,175,55,0.8)" font-size="10" font-family="var(--font-sans)" font-weight="600" letter-spacing="1" text-anchor="middle" data-en="With SCALSET" data-fr="Avec SCALSET">Avec SCALSET</text>
                    
                    <!-- Values -->
                    <text class="graph-val counter-percent" data-target="0" x="90" y="115" fill="rgba(255,255,255,0.8)" font-size="16" font-family="var(--font-display)" font-weight="800" text-anchor="middle" opacity="0">0%</text>
                    <text class="graph-val counter-percent" data-target="50" x="210" y="45" fill="var(--accent-color)" font-size="20" font-family="var(--font-display)" font-weight="900" text-anchor="middle" opacity="0">0%</text>
                  </svg>
                </div>
                <p class="stat-desc" style="margin-top: 1.5rem;" data-en="Productivity Gain" data-fr="Gain en productivité">Gain en productivité</p>
            </div>

            <!-- Stat 3: 70K with Pillar Graph -->
            <div class="stat-item comparison-item" style="justify-content: center;">
                <div class="comparison-row" style="width: 100%;">
                  <svg viewBox="0 0 300 170" class="pillar-graph-svg" style="width: 100%; height: auto; overflow: visible;">
                    <!-- X-Axis -->
                    <line x1="20" y1="140" x2="280" y2="140" stroke="rgba(255,255,255,0.2)" stroke-width="2" stroke-linecap="round" />
                    
                    <!-- Pillars -->
                    <rect class="bar-fill without-scalset" x="60" y="140" width="60" height="0" data-target-height="25" data-base-y="140" fill="rgba(255,255,255,0.2)" rx="4" />
                    <rect class="bar-fill with-scalset" x="180" y="140" width="60" height="0" data-target-height="100" data-base-y="140" fill="url(#static-silver)" rx="4" />
                    
                    <!-- Labels -->
                    <text class="graph-label" x="90" y="160" fill="rgba(255,255,255,0.5)" font-size="10" font-family="var(--font-sans)" font-weight="600" letter-spacing="1" text-anchor="middle" data-en="Without SCALSET" data-fr="Sans SCALSET">Sans SCALSET</text>
                    <text class="graph-label" x="210" y="160" fill="rgba(212,175,55,0.8)" font-size="10" font-family="var(--font-sans)" font-weight="600" letter-spacing="1" text-anchor="middle" data-en="With SCALSET" data-fr="Avec SCALSET">Avec SCALSET</text>
                    
                    <!-- Values -->
                    <text class="graph-val counter-cash" data-target="15" x="90" y="105" fill="rgba(255,255,255,0.8)" font-size="16" font-family="var(--font-display)" font-weight="800" text-anchor="middle" opacity="0">\$0K</text>
                    <text class="graph-val counter-cash" data-target="70" x="210" y="30" fill="var(--accent-color)" font-size="20" font-family="var(--font-display)" font-weight="900" text-anchor="middle" opacity="0">\$0K</text>
                  </svg>
                </div>
                <p class="stat-desc" style="margin-top: 1.5rem;" data-en="Cost Savings" data-fr="Économie réalisée">Économie réalisée</p>
            </div>

          </div>
        </div>
        
        <!-- Page-centered CTA (Normal Flow) -->
        <div class="stats-cta-wrapper" style="width: 100%; display: flex; justify-content: center; margin-top: 4rem; opacity: 0; transform: translateY(30px);">
          <a href="#services" class="btn-shiny" data-en="Our Services" data-fr="Nos Services">Nos Services</a>
        </div>
      </section>

      <!-- CLIENTS MARQUEE SECTION -->
      <section class="clients-section section">
        <h2 class="clients-title" data-en="Who needs us" data-fr="Qui a besoin de nous">Qui a besoin de nous</h2>
        
        <div class="marquee-container">
          <!-- Top row (Scrolls Left) -->
          <div class="marquee-track track-left">
            <div class="marquee-content">
              <div class="client-box">Grandes entreprises</div>
              <div class="client-box">E-commerce</div>
              <div class="client-box">Agences</div>
              <div class="client-box">Startups</div>
              <div class="client-box">Entrepreneurs</div>
              <div class="client-box">Cabinets & services</div>
              <!-- Duplicate for seamless loop -->
              <div class="client-box">Grandes entreprises</div>
              <div class="client-box">E-commerce</div>
              <div class="client-box">Agences</div>
              <div class="client-box">Startups</div>
              <div class="client-box">Entrepreneurs</div>
              <div class="client-box">Cabinets & services</div>
            </div>
          </div>
          
          <!-- Bottom row (Scrolls Right) -->
          <div class="marquee-track track-right">
            <div class="marquee-content">
              <div class="client-box">Grandes entreprises</div>
              <div class="client-box">E-commerce</div>
              <div class="client-box">Agences</div>
              <div class="client-box">Startups</div>
              <div class="client-box">Entrepreneurs</div>
              <div class="client-box">Cabinets & services</div>
              <!-- Duplicate for seamless loop -->
              <div class="client-box">Grandes entreprises</div>
              <div class="client-box">E-commerce</div>
              <div class="client-box">Agences</div>
              <div class="client-box">Startups</div>
              <div class="client-box">Entrepreneurs</div>
              <div class="client-box">Cabinets & services</div>
            </div>
          </div>
        </div>
      </section>

      <!-- WHY CHOOSE US (Grid) -->
      <section class="features section" id="features">
        <div class="features-header">
          <h2 data-en="Why companies choose ScalSet" data-fr="Pourquoi les entreprises choisissent ScalSet">
            Pourquoi les entreprises<br>choisissent ScalSet
          </h2>
        </div>
        
        <div class="features-cards-container">
          
          <div class="feature-card">
            <div class="card-glow"></div>
            <div class="feature-index">01</div>
            <div class="feature-content">
              <h3 data-en="Reduce costs without losing performance" data-fr="Réduisez vos coûts sans perdre en performance">Réduisez vos coûts sans perdre en performance</h3>
              <p data-en="Benefit from a high-performing team at a cost well below the local market." data-fr="Bénéficiez d’une équipe performante à un coût bien inférieur au marché local.">Bénéficiez d’une équipe performante à un coût bien inférieur au marché local.</p>
            </div>
          </div>

          <div class="feature-card">
            <div class="card-glow"></div>
            <div class="feature-index">02</div>
            <div class="feature-content">
              <h3 data-en="Supervised teams, not isolated freelancers" data-fr="Des équipes encadrées, pas des freelances isolés">Des équipes encadrées, pas des freelances isolés</h3>
              <p data-en="Your teams work in our offices, supervised by our managers daily." data-fr="Vos équipes travaillent dans nos locaux, supervisées par nos managers au quotidien.">Vos équipes travaillent dans nos locaux, supervisées par nos managers au quotidien.</p>
            </div>
          </div>

          <div class="feature-card">
            <div class="card-glow"></div>
            <div class="feature-index">03</div>
            <div class="feature-content">
              <h3 data-en="We handle everything, you stay focused" data-fr="On s’occupe de tout, vous restez concentré">On s’occupe de tout, vous restez concentré</h3>
              <p data-en="Recruitment, training, and management: we handle it all for you." data-fr="Recrutement, formation et management : nous gérons l’ensemble pour vous.">Recrutement, formation et management : nous gérons l’ensemble pour vous.</p>
            </div>
          </div>

          <div class="feature-card">
            <div class="card-glow"></div>
            <div class="feature-index">04</div>
            <div class="feature-content">
              <h3 data-en="Lower costs, better results" data-fr="Moins de coûts, plus de résultats">Moins de coûts, plus de résultats</h3>
              <p data-en="Improve profitability while maintaining high performance." data-fr="Améliorez votre rentabilité tout en maintenant un haut niveau de performance.">Améliorez votre rentabilité tout en maintenant un haut niveau de performance.</p>
            </div>
          </div>

          <div class="feature-card">
            <div class="card-glow"></div>
            <div class="feature-index">05</div>
            <div class="feature-content">
              <h3 data-en="No HR or admin constraints" data-fr="Aucune contrainte RH ni charges administratives">Aucune contrainte RH ni charges administratives</h3>
              <p data-en="No HR management, no payroll taxes, no admin constraints on your side." data-fr="Aucune gestion RH, aucune cotisation, aucune contrainte administrative de votre côté.">Aucune gestion RH, aucune cotisation, aucune contrainte administrative de votre côté.</p>
            </div>
          </div>

          <div class="feature-card">
            <div class="card-glow"></div>
            <div class="feature-index">06</div>
            <div class="feature-content">
              <h3 data-en="Multilingual coverage" data-fr="Couverture multilingue">Couverture multilingue</h3>
              <p data-en="We build teams capable of working in English, French, and other languages as needed." data-fr="Nous mettons en place des équipes capables d’intervenir en français, anglais et dans d’autres langues selon vos besoins.">Nous mettons en place des équipes capables d’intervenir en français, anglais et dans d’autres langues selon vos besoins.</p>
            </div>
          </div>

        </div>

        <div style="text-align: center; margin-top: 8rem;">
          <a href="#about" class="btn-shiny" data-en="About Us" data-fr="À Propos De Nous">À Propos De Nous</a>
        </div>
      </section>

      <!-- SERVICES SECTION -->
      <section class="services section">
        <h2 data-en="The teams we build for you." data-fr="Les équipes que nous mettons en place pour vous.">
          Les équipes que nous <br><span class="italic text-gray">mettons en place pour vous.</span>
        </h2>
        
        <div class="services-grid tilt-grid">
          <div class="service-card tilt-card" data-tilt>
            <div class="service-bg" style="background: linear-gradient(rgba(10,10,10,0.5), rgba(10,10,10,0.8)), url('/sales_bg.png') center/cover;"></div>
            <div class="service-content">
              <span class="service-number">01</span>
              <h3 data-en="Sales & Operations" data-fr="Vente & Opérations">Vente & Opérations</h3>
            </div>
          </div>
          <div class="service-card tilt-card" data-tilt>
            <div class="service-bg" style="background: linear-gradient(rgba(10,10,10,0.5), rgba(10,10,10,0.8)), url('/marketing_bg.png') center/cover;"></div>
            <div class="service-content">
              <span class="service-number">02</span>
              <h3 data-en="Marketing & Growth" data-fr="Marketing & Croissance">Marketing & Croissance</h3>
            </div>
          </div>
          <div class="service-card tilt-card" data-tilt>
            <div class="service-bg" style="background: linear-gradient(rgba(10,10,10,0.5), rgba(10,10,10,0.8)), url('/support_bg.png') center/cover;"></div>
            <div class="service-content">
              <span class="service-number">03</span>
              <h3 data-en="Customer Support" data-fr="Support Client">Support Client</h3>
            </div>
          </div>
          <div class="service-card tilt-card" data-tilt>
            <div class="service-bg" style="background: linear-gradient(rgba(10,10,10,0.5), rgba(10,10,10,0.8)), url('/admin_bg.png') center/cover;"></div>
            <div class="service-content">
              <span class="service-number">04</span>
              <h3 data-en="Admin & Org" data-fr="Administratif & Organisation">Administratif & Organisation</h3>
            </div>
          </div>
        </div>

        <div style="text-align: center; margin-top: 15rem; position: relative; z-index: 5;">
          <a href="#contact" class="btn-shiny" data-en="Contact Us" data-fr="Nous Contacter">Nous Contacter</a>
        </div>
      </section>
    </div>
    `;

    return (
        <div style={{ position: "relative", zIndex: 2, background: "#000" }}>
            <div ref={containerRef} suppressHydrationWarning dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </div>
    );
}