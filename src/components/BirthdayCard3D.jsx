import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, ChevronRight } from 'lucide-react';

export default function BirthdayCard3D() {
  const containerRef = useRef(null);
  const card3dRef = useRef(null);
  const coverRef = useRef(null);
  const badgeRef = useRef(null);
  const photoRef = useRef(null);
  const innerContentRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [floatingHearts, setFloatingHearts] = useState([]);

  useGSAP(
    () => {
      gsap.to(badgeRef.current, {
        scale: 1.03,
        duration: 1.6,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut'
      });
    },
    { scope: containerRef }
  );

  const handleMouseMove = (e) => {
    if (isOpen || !card3dRef.current) return;
    const rect = card3dRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(card3dRef.current, {
      rotateY: x * 0.04,
      rotateX: -y * 0.04,
      duration: 0.5,
      ease: 'power1.out'
    });
    gsap.to(badgeRef.current, {
      z: 25,
      x: x * 0.02,
      y: y * 0.02,
      duration: 0.5
    });
    gsap.to(photoRef.current, {
      z: 20,
      x: x * 0.02,
      y: y * 0.02,
      duration: 0.5
    });
  };

  const handleMouseLeave = () => {
    if (isOpen || !card3dRef.current) return;
    gsap.to(card3dRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.8,
      ease: 'power2.out'
    });
    gsap.to([badgeRef.current, photoRef.current], {
      z: 0,
      x: 0,
      y: 0,
      duration: 0.8
    });
  };

  const handleCardClick = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);

    if (nextState) {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#b4001e', '#ff4d6d', '#ffffff', '#ffccd5', '#ffd700']
      });

      const hearts = Array.from({ length: 12 }).map((_, i) => ({
        id: Date.now() + i,
        left: `${15 + Math.random() * 70}%`,
        size: 16 + Math.random() * 14,
        delay: Math.random() * 0.4
      }));
      setFloatingHearts(hearts);

      gsap
        .timeline({ defaults: { ease: 'power3.inOut' } })
        .to(coverRef.current, { rotateY: -160, duration: 1.1 })
        .fromTo(
          innerContentRef.current,
          { opacity: 0, scale: 0.9, z: -10 },
          { opacity: 1, scale: 1, z: 1, duration: 0.6, ease: 'back.out(1.5)' },
          '-=0.5'
        );
    } else {
      gsap
        .timeline({ defaults: { ease: 'power3.inOut' } })
        .to(coverRef.current, { rotateY: 0, duration: 0.9 })
        .to(innerContentRef.current, { opacity: 0, duration: 0.3 }, '-=0.8');
    }
  };

  // Scalloped badge path for SVG
  const generateScallopPath = () => {
    const pts = [];
    for (let i = 0; i < 40; i++) {
      const radius = i % 2 === 0 ? 90 : 78;
      const angle = (i * Math.PI) / 20;
      const px = 100 + radius * Math.cos(angle);
      const py = 100 + radius * Math.sin(angle);
      pts.push(`${px.toFixed(2)},${py.toFixed(2)}`);
    }
    return `M ${pts.join(' L ')} Z`;
  };

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        margin: '0 auto 36px',
        padding: '10px 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative'
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '18px' }}>
        <p
          style={{
            fontSize: '0.75rem',
            letterSpacing: '1.5px',
            color: '#ff4d6d',
            fontWeight: '600',
            marginBottom: '4px'
          }}
        >
          — SPECIAL BIRTHDAY CARD —
        </p>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: '4px' }}>
          Interactive Gift Card 🎁
        </h3>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          Tap the card to open Harun's birthday surprise ✨
        </p>
      </div>

      {/* 3D Perspective Container */}
      <div
        style={{
          perspective: '1400px',
          width: '100%',
          maxWidth: '360px',
          height: '240px',
          cursor: 'pointer',
          position: 'relative'
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleCardClick}
      >
        <div
          ref={card3dRef}
          style={{
            width: '100%',
            height: '100%',
            position: 'relative',
            transformStyle: 'preserve-3d',
            borderRadius: '16px',
            boxShadow: isOpen
              ? '0 20px 40px rgba(0,0,0,0.8), 0 0 30px rgba(180, 0, 30, 0.4)'
              : '0 14px 30px rgba(0,0,0,0.6), 0 0 20px rgba(0,0,0,0.4)',
            transition: 'box-shadow 0.4s ease'
          }}
        >
          {/* Card Inside Message */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #fff0f3 0%, #fff 50%, #ffe6ea 100%)',
              color: '#800016',
              padding: '20px 18px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: 'inset 0 0 15px rgba(180, 0, 30, 0.1)',
              border: '2px solid #ffccd5',
              overflow: 'hidden'
            }}
          >
            <div style={{ position: 'absolute', top: '10px', right: '12px', opacity: 0.15, fontSize: '3.5rem' }}>
              💖
            </div>

            <div ref={innerContentRef} style={{ opacity: 0, position: 'relative', zIndex: 2 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <Sparkles size={18} color="#b4001e" />
                <span
                  style={{
                    fontSize: '0.82rem',
                    fontWeight: '700',
                    letterSpacing: '1px',
                    color: '#b4001e'
                  }}
                >
                  A SPECIAL MESSAGE FOR HARUN
                </span>
              </div>
              <h4
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.25rem',
                  color: '#73000b',
                  marginBottom: '8px'
                }}
              >
                Happy birthday my old love !
              </h4>
              <p style={{ fontSize: '0.85rem', lineHeight: '1.55', color: '#590008', fontWeight: '500' }}>
                Kehadiranmu di dunia membawa banyak kebahagiaan, cinta, dan hal hal berharga yang sangat berarti dalam kehidupanku, semoga 19 tahunmu diwarnai dengan kesehatan, kebahagiaan, dan berkat yang tak terhenti.
              </p>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                position: 'relative',
                zIndex: 2
              }}
            >
              <span style={{ fontSize: '0.78rem', fontStyle: 'italic', color: '#b4001e', fontWeight: '600' }}>
                Made with all my love 🤍
              </span>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '0.75rem',
                  color: '#73000b',
                  fontWeight: '700'
                }}
              >
                <span>Tap to close</span>
                <ChevronRight size={14} />
              </div>
            </div>

            {/* Floating hearts inside */}
            {floatingHearts.map((h) => (
              <div
                key={h.id}
                style={{
                  position: 'absolute',
                  left: h.left,
                  bottom: '-10px',
                  fontSize: `${h.size}px`,
                  animation: 'floatUp 2.8s ease-out forwards',
                  animationDelay: `${h.delay}s`,
                  pointerEvents: 'none',
                  zIndex: 3
                }}
              >
                ❤️
              </div>
            ))}
          </div>

          {/* Card Folding Cover */}
          <div
            ref={coverRef}
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '16px',
              transformStyle: 'preserve-3d',
              transformOrigin: 'left center',
              display: 'flex',
              overflow: 'hidden',
              boxShadow: '4px 0 15px rgba(0,0,0,0.3)',
              border: '1.5px solid rgba(255, 255, 255, 0.4)',
              zIndex: 10
            }}
          >
            {/* Left half of cover */}
            <div
              style={{
                width: '50%',
                height: '100%',
                background: 'linear-gradient(150deg, #b4001e 0%, #8b0014 60%, #60000d 100%)',
                padding: '16px 10px 14px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                textAlign: 'center',
                position: 'relative',
                boxShadow: 'inset -3px 0 10px rgba(0,0,0,0.25)'
              }}
            >
              <p
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '0.85rem',
                  fontWeight: '700',
                  color: '#ffffff',
                  lineHeight: '1.3',
                  letterSpacing: '0.3px',
                  textShadow: '0 2px 4px rgba(0,0,0,0.4)',
                  padding: '0 4px'
                }}
              >
                This special gift belongs to Harun!
              </p>

              {/* Photo circular badge */}
              <div
                ref={photoRef}
                style={{
                  position: 'relative',
                  width: '95px',
                  height: '95px',
                  borderRadius: '50%',
                  padding: '3px',
                  background: 'linear-gradient(135deg, #ffffff 0%, #ffccd5 100%)',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.5), 0 0 15px rgba(255, 255, 255, 0.5)',
                  transformStyle: 'preserve-3d'
                }}
              >
                <img
                  src="/harun 1.jpeg"
                  alt="Harun"
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: '-2px',
                    right: '-2px',
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 3px 6px rgba(0,0,0,0.3)'
                  }}
                >
                  <Heart size={13} fill="#b4001e" color="#b4001e" />
                </div>
              </div>

              <div
                style={{
                  fontSize: '0.65rem',
                  color: 'rgba(255, 255, 255, 0.85)',
                  fontStyle: 'italic',
                  letterSpacing: '0.5px'
                }}
              >
                Tap to open 💌
              </div>
            </div>

            {/* Right half of cover (Gingham / Plaid with scalloped badge) */}
            <div
              style={{
                width: '50%',
                height: '100%',
                backgroundColor: '#ffffff',
                backgroundImage: `
                  linear-gradient(90deg, rgba(180, 0, 30, 0.42) 50%, transparent 50%),
                  linear-gradient(rgba(180, 0, 30, 0.42) 50%, transparent 50%)
                `,
                backgroundSize: '22px 22px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                boxShadow: 'inset 3px 0 10px rgba(0,0,0,0.15)'
              }}
            >
              <div
                ref={badgeRef}
                style={{
                  position: 'relative',
                  width: '120px',
                  height: '120px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  filter: 'drop-shadow(0 6px 14px rgba(0, 0, 0, 0.35))',
                  transformStyle: 'preserve-3d'
                }}
              >
                <svg viewBox="0 0 200 200" width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
                  <path d={generateScallopPath()} fill="#ffffff" stroke="#ffe6ea" strokeWidth="2" />
                </svg>

                <div
                  style={{
                    position: 'relative',
                    zIndex: 2,
                    textAlign: 'center',
                    padding: '12px 10px',
                    color: '#a80517',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <p
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: '0.78rem',
                      fontWeight: '800',
                      lineHeight: '1.25',
                      letterSpacing: '0.2px',
                      color: '#900014'
                    }}
                  >
                    Happy Birthday
                    <br />
                    My Favorite
                    <br />
                    Person
                  </p>
                  <div style={{ marginTop: '3px' }}>
                    <Heart
                      size={14}
                      fill="#a80517"
                      color="#a80517"
                      style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.2))' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
