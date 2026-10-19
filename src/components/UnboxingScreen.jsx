import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import confetti from 'canvas-confetti';
import { Sparkles, Star, Heart } from 'lucide-react';

const flowerAssets = ['/bunga 1 no bg.png', '/bunga 2 no bg.png', '/bunga 3 no bg.png'];

export default function UnboxingScreen({ onOpen }) {
  const containerRef = useRef(null);
  const giftBoxRef = useRef(null);
  const lidRef = useRef(null);
  const headerRef = useRef(null);
  const flashGlowRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [burstFlowers, setBurstFlowers] = useState([]);

  // Floating background particles
  const floatingParticles = useRef(
    Array.from({ length: 16 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 95}%`,
      size: Math.random() * 12 + 8,
      duration: Math.random() * 5 + 4,
      delay: Math.random() * 3
    }))
  ).current;

  useGSAP(
    () => {
      gsap.fromTo(containerRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6 });
      gsap.fromTo(
        giftBoxRef.current,
        { scale: 0.5, y: 50, opacity: 0 },
        { scale: 1, y: 0, opacity: 1, duration: 0.8, ease: 'back.out(1.7)' }
      );
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.3 }
      );

      // Gentle floating bob
      gsap.to(giftBoxRef.current, {
        y: '-=12',
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    },
    { scope: containerRef }
  );

  const handleOpenGift = () => {
    if (isOpen) return;
    setIsOpen(true);

    // Create 28 radiating flowers
    const burst = Array.from({ length: 28 }).map((_, i) => {
      const angle = (i / 28) * Math.PI * 2 + (Math.random() * 0.4 - 0.2);
      const dist = 120 + Math.random() * 180;
      return {
        id: i,
        src: flowerAssets[i % flowerAssets.length],
        tx: Math.cos(angle) * dist,
        ty: Math.sin(angle) * dist - 50,
        rot: Math.random() * 360 - 180,
        size: 55 + Math.random() * 50
      };
    });
    setBurstFlowers(burst);

    // Confetti blast
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.55 },
      colors: ['#00d2ff', '#38bdf8', '#0066ff', '#ffffff', '#60a5fa', '#ff69b4']
    });

    requestAnimationFrame(() => {
      gsap
        .timeline()
        .to(giftBoxRef.current, { rotation: -10, duration: 0.1 })
        .to(giftBoxRef.current, { rotation: 10, duration: 0.1 })
        .to(giftBoxRef.current, { rotation: -8, duration: 0.1 })
        .to(giftBoxRef.current, { rotation: 8, duration: 0.1 })
        .to(giftBoxRef.current, { rotation: 0, scale: 1.2, duration: 0.25, ease: 'back.out(2)' })
        .to(lidRef.current, { y: -70, rotation: -30, opacity: 0, duration: 0.4, ease: 'power2.out' }, '-=0.1')
        .to(
          '.burst-flower-img',
          {
            scale: 1,
            opacity: 1,
            x: (i) => burst[i]?.tx || 0,
            y: (i) => burst[i]?.ty || 0,
            rotation: (i) => burst[i]?.rot || 0,
            duration: 0.8,
            ease: 'back.out(1.5)',
            stagger: 0.02
          },
          '-=0.3'
        )
        .to(flashGlowRef.current, { scale: 6, opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.5')
        .to(containerRef.current, {
          opacity: 0,
          scale: 1.1,
          duration: 0.7,
          ease: 'power2.inOut',
          delay: 0.4,
          onComplete: () => {
            onOpen && onOpen();
          }
        });
    });
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 100,
        background: 'radial-gradient(circle at 50% 45%, #0a1e3f 0%, #041026 60%, #010610 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 16px',
        overflow: 'hidden',
        width: '100%',
        height: '100%'
      }}
    >
      {/* Floating particles background */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        {floatingParticles.map((p) => (
          <div
            key={p.id}
            style={{
              position: 'absolute',
              left: p.left,
              bottom: '-20px',
              fontSize: `${p.size}px`,
              opacity: 0.5,
              filter: 'drop-shadow(0 0 6px #00d2ff)',
              animation: `floatUp ${p.duration}s linear infinite`,
              animationDelay: `${p.delay}s`
            }}
          >
            {p.id % 2 === 0 ? '✨' : '🔹'}
          </div>
        ))}
      </div>

      {/* Glow flare for opening explosion */}
      <div
        ref={flashGlowRef}
        style={{
          position: 'absolute',
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(56, 189, 248, 0.9) 0%, rgba(0, 210, 255, 0.8) 40%, transparent 70%)',
          filter: 'blur(15px)',
          opacity: 0,
          scale: 0.5,
          pointerEvents: 'none'
        }}
      />

      {/* Header section */}
      <div ref={headerRef} style={{ textAlign: 'center', marginBottom: '40px', zIndex: 2 }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 16px',
            background: 'rgba(0, 210, 255, 0.15)',
            border: '1px solid rgba(96, 165, 250, 0.4)',
            borderRadius: '20px',
            marginBottom: '14px',
            boxShadow: '0 0 15px rgba(0, 210, 255, 0.3)'
          }}
        >
          <Sparkles size={14} color="#38bdf8" />
          <span style={{ fontSize: '0.85rem', color: '#e0f2fe', fontWeight: '500' }}>
            Surprise Unboxing
          </span>
          <Sparkles size={14} color="#38bdf8" />
        </div>
        <h2
          className="neon-text"
          style={{
            fontSize: '1.45rem',
            fontWeight: '700',
            fontFamily: 'var(--font-display)',
            letterSpacing: '0.5px',
            lineHeight: '1.3'
          }}
        >
          {isOpen ? '✨ Opening your gift... ✨' : 'Tap the gift box to open it 🎁'}
        </h2>
      </div>

      {/* Interactive Gift Box */}
      <div
        ref={giftBoxRef}
        onClick={handleOpenGift}
        style={{
          position: 'relative',
          width: '160px',
          height: '160px',
          cursor: 'pointer',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: '-20px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,210,255,0.5) 0%, transparent 70%)',
            filter: 'blur(20px)',
            animation: 'pulseGlow 2.2s infinite ease-in-out'
          }}
        />

        {/* Radiating flowers */}
        {burstFlowers.map((f) => (
          <img
            key={f.id}
            src={f.src}
            className="burst-flower-img"
            alt=""
            draggable={false}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: `${f.size}px`,
              height: `${f.size}px`,
              marginLeft: `-${f.size / 2}px`,
              marginTop: `-${f.size / 2}px`,
              objectFit: 'contain',
              pointerEvents: 'none',
              zIndex: 15,
              opacity: 0,
              transform: 'scale(0)',
              filter:
                'drop-shadow(0 0 12px rgba(0,210,255,0.6)) drop-shadow(0 0 20px rgba(255,105,180,0.4))'
            }}
          />
        ))}

        {/* Cute Mascot sticker */}
        <img
          src="/lucu 2 no bg.png"
          alt="Cute Sticker"
          style={{
            position: 'absolute',
            top: '-45px',
            right: '-30px',
            width: '60px',
            height: 'auto',
            filter: 'drop-shadow(0 0 10px #00d2ff)',
            pointerEvents: 'none',
            zIndex: 10
          }}
        />

        <div style={{ position: 'absolute', top: '-15px', right: '-10px', pointerEvents: 'none' }}>
          <Star size={18} color="#38bdf8" fill="#38bdf8" style={{ filter: 'drop-shadow(0 0 8px #38bdf8)' }} />
        </div>
        <div style={{ position: 'absolute', bottom: '-10px', left: '-15px', pointerEvents: 'none' }}>
          <Sparkles size={20} color="#60a5fa" style={{ filter: 'drop-shadow(0 0 8px #00d2ff)' }} />
        </div>

        {/* Gift Box SVG */}
        <svg
          viewBox="0 0 200 200"
          width="100%"
          height="100%"
          style={{ filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.6))' }}
        >
          <defs>
            <linearGradient id="boxGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="50%" stopColor="#00d2ff" />
              <stop offset="100%" stopColor="#0044b3" />
            </linearGradient>
            <linearGradient id="ribbonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e0f2fe" />
              <stop offset="50%" stopColor="#7dd3fc" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
            <filter id="giftGlow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          <rect x="35" y="75" width="130" height="95" rx="10" fill="url(#boxGrad)" stroke="#ffffff" strokeWidth="1.5" />
          <rect x="88" y="75" width="24" height="95" fill="url(#ribbonGrad)" />
          <g ref={lidRef}>
            <rect
              x="25"
              y="55"
              width="150"
              height="30"
              rx="6"
              fill="url(#boxGrad)"
              stroke="#ffffff"
              strokeWidth="1.5"
              filter="url(#giftGlow)"
            />
            <rect x="88" y="55" width="24" height="30" fill="url(#ribbonGrad)" />
            <path d="M 100 55 C 75 25, 50 35, 88 55 Z" fill="url(#ribbonGrad)" stroke="#ffffff" strokeWidth="1" />
            <path d="M 100 55 C 125 25, 150 35, 112 55 Z" fill="url(#ribbonGrad)" stroke="#ffffff" strokeWidth="1" />
            <circle cx="100" cy="55" r="8" fill="#ffffff" filter="drop-shadow(0 0 6px #38bdf8)" />
            <circle cx="100" cy="55" r="5" fill="#38bdf8" />
          </g>
        </svg>
      </div>

      <div
        style={{
          marginTop: '36px',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '0.85rem',
          color: '#e0f2fe',
          opacity: 0.9,
          zIndex: 2
        }}
      >
        <Heart size={14} fill="var(--neon-pink)" color="var(--neon-pink)" />
        <span>Sent with special love for Harun 💗</span>
        <Heart size={14} fill="var(--neon-pink)" color="var(--neon-pink)" />
      </div>
    </div>
  );
}
