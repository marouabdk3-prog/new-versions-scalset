import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Custom Cursor
const cursor = document.querySelector('.cursor');
const links = document.querySelectorAll('a, button, .service-card, .feature-item');

document.addEventListener('mousemove', (e) => {
  cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
});

links.forEach(link => {
  link.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
  link.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
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

  const layers = gsap.utils.toArray('.cube-layer');
  const texts = gsap.utils.toArray('.cube-text-item');
  const zOffsets = [0, 50, 100, 150]; // How far apart they stack

  layers.forEach((layer, index) => {
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
      layers.forEach(l => l.classList.add('glow-active'));
    },
    onReverseComplete: () => {
      layers.forEach(l => l.classList.remove('glow-active'));
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

  const statsCounters = gsap.utils.toArray('.counter');
  
  statsCounters.forEach(counter => {
    const targetVal = parseFloat(counter.getAttribute('data-target'));
    
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
  const percentCounters = gsap.utils.toArray('.counter-percent');
  percentCounters.forEach((counter, index) => {
    const targetVal = parseFloat(counter.getAttribute('data-target'));
    
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
  const bars = gsap.utils.toArray('.bar-fill');
  bars.forEach((bar, index) => {
    const targetH = parseFloat(bar.getAttribute('data-target-height'));
    const baseY = parseFloat(bar.getAttribute('data-base-y')) || 140;
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
  const cashCounters = gsap.utils.toArray('.counter-cash');
  cashCounters.forEach((counter, index) => {
    const targetVal = parseFloat(counter.getAttribute('data-target'));
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
  const featureCards = gsap.utils.toArray('.feature-card');
  
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
  const tiltCards = document.querySelectorAll('.tilt-card');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', e => {
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

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAnimations);
} else {
  initAnimations();
}


