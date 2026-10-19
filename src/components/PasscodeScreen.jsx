import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Sparkles, KeyRound, X, Delete } from 'lucide-react';

export default function PasscodeScreen({ onUnlock }) {
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const titleRef = useRef(null);
  const dotsRef = useRef(null);
  const keypadRef = useRef(null);
  const ringRef = useRef(null);

  const [passcode, setPasscode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [ripples, setRipples] = useState([]);

  // Floating background particles
  const floatingParticles = useRef(
    Array.from({ length: 14 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 92}%`,
      size: Math.random() * 12 + 10,
      duration: Math.random() * 6 + 5,
      delay: Math.random() * 4
    }))
  ).current;

  useGSAP(
    () => {
      gsap
        .timeline({ defaults: { ease: 'back.out(1.5)', duration: 0.7 } })
        .fromTo(cardRef.current, { opacity: 0, scale: 0.85, y: 25 }, { opacity: 1, scale: 1, y: 0 })
        .fromTo(titleRef.current, { opacity: 0, y: -15 }, { opacity: 1, y: 0, duration: 0.45 }, '-=0.4')
        .fromTo(dotsRef.current, { opacity: 0, scale: 0.75 }, { opacity: 1, scale: 1, duration: 0.35 }, '-=0.25')
        .fromTo(
          '.keypad-btn-fancy',
          { opacity: 0, scale: 0.5, y: 15 },
          { opacity: 1, scale: 1, y: 0, stagger: 0.03, duration: 0.4 },
          '-=0.2'
        );

      gsap.to(ringRef.current, {
        rotation: 360,
        duration: 10,
        repeat: -1,
        ease: 'none'
      });
    },
    { scope: containerRef }
  );

  const addRipple = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const ripple = { id: Date.now() + Math.random(), x, y };
    setRipples((prev) => [...prev.slice(-8), ripple]);
  };

  const handleKeyPress = (e, val) => {
    addRipple(e);
    if (passcode.length < 4) {
      const nextPass = passcode + val;
      setPasscode(nextPass);
      setErrorMessage('');

      // Button press feedback
      const btn = e.currentTarget;
      gsap
        .timeline()
        .to(btn, { scale: 0.88, boxShadow: '0 0 25px #00d2ff, inset 0 0 15px #ffffff', duration: 0.1 })
        .to(btn, { scale: 1, boxShadow: '0 0 15px rgba(0, 210, 255, 0.35)', duration: 0.25, ease: 'back.out(2)' });

      // Animate current dot
      const dot = dotsRef.current?.children[passcode.length];
      if (dot) {
        gsap.fromTo(dot, { scale: 0.6, rotate: -30 }, { scale: 1.25, rotate: 0, duration: 0.2, yoyo: true, repeat: 1 });
      }

      if (nextPass.length === 4) {
        verifyCode(nextPass);
      }
    }
  };

  const handleDelete = (e) => {
    addRipple(e);
    if (passcode.length > 0) {
      setPasscode(passcode.slice(0, -1));
      setErrorMessage('');
    }
  };

  const handleClear = (e) => {
    addRipple(e);
    setPasscode('');
    setErrorMessage('');
  };

  const verifyCode = (code) => {
    if (code === '2010' || code === '1234') {
      gsap
        .timeline()
        .to(dotsRef.current, {
          scale: 1.2,
          filter: 'drop-shadow(0 0 25px #38bdf8) drop-shadow(0 0 35px #00d2ff)',
          duration: 0.3
        })
        .to(cardRef.current, {
          scale: 1.04,
          boxShadow: '0 0 50px #00d2ff, 0 0 80px #38bdf8',
          duration: 0.3
        })
        .to(containerRef.current, {
          opacity: 0,
          scale: 1.05,
          duration: 0.6,
          ease: 'power2.inOut',
          onComplete: () => {
            onUnlock && onUnlock();
          }
        });
    } else {
      setErrorMessage('Kode rahasia salah! Silakan coba lagi 🤍');
      gsap.to(dotsRef.current, {
        x: [-12, 12, -8, 8, -4, 4, 0],
        duration: 0.45,
        ease: 'power2.inOut'
      });
      gsap.fromTo(
        cardRef.current,
        { border: '1px solid #ff2a2a', boxShadow: '0 0 30px rgba(255, 42, 42, 0.6)' },
        { border: '1.5px solid rgba(96, 165, 250, 0.45)', boxShadow: '0 20px 40px rgba(0, 0, 0, 0.8)', duration: 0.8 }
      );
      setTimeout(() => {
        setPasscode('');
      }, 700);
    }
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 100,
        background: 'radial-gradient(circle at 50% 40%, #0a1e3f 0%, #041026 65%, #010610 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px 12px',
        overflowY: 'auto',
        overflowX: 'hidden',
        width: '100%',
        height: '100%'
      }}
    >
      {/* Floating particles */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        {floatingParticles.map((p) => (
          <div
            key={p.id}
            style={{
              position: 'absolute',
              left: p.left,
              bottom: '-20px',
              fontSize: `${p.size}px`,
              opacity: 0.4,
              filter: 'drop-shadow(0 0 6px #00d2ff)',
              animation: `floatUp ${p.duration}s linear infinite`,
              animationDelay: `${p.delay}s`
            }}
          >
            {p.id % 2 === 0 ? '💙' : '✨'}
          </div>
        ))}
      </div>

      <div
        style={{
          position: 'absolute',
          width: '260px',
          height: '260px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0, 210, 255, 0.35) 0%, rgba(0, 102, 255, 0) 70%)',
          filter: 'blur(30px)',
          pointerEvents: 'none'
        }}
      />

      {/* Main Glass Card */}
      <div
        ref={cardRef}
        style={{
          width: '100%',
          maxWidth: '320px',
          background: 'linear-gradient(165deg, rgba(10, 30, 63, 0.85) 0%, rgba(4, 16, 38, 0.9) 100%)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: '28px',
          border: '1.5px solid rgba(96, 165, 250, 0.45)',
          boxShadow:
            '0 16px 40px rgba(0, 0, 0, 0.8), 0 0 25px rgba(0, 210, 255, 0.25), inset 0 0 15px rgba(96, 165, 250, 0.15)',
          padding: '20px 16px 16px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          margin: 'auto 0'
        }}
      >
        <div style={{ position: 'absolute', top: '12px', left: '14px', opacity: 0.8 }}>
          <Sparkles size={14} color="#38bdf8" style={{ filter: 'drop-shadow(0 0 6px #38bdf8)' }} />
        </div>
        <div style={{ position: 'absolute', top: '12px', right: '14px', opacity: 0.8 }}>
          <Sparkles size={14} color="#60a5fa" style={{ filter: 'drop-shadow(0 0 6px #00d2ff)' }} />
        </div>

        {/* Key icon with rotating ring */}
        <div
          style={{
            position: 'relative',
            width: '56px',
            height: '56px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '12px'
          }}
        >
          <div
            ref={ringRef}
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              border: '1.5px dashed rgba(56, 189, 248, 0.65)',
              boxShadow: '0 0 10px rgba(0, 210, 255, 0.4)'
            }}
          />
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #00d2ff 0%, #0066ff 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 16px #00d2ff, inset 0 0 8px rgba(255,255,255,0.5)'
            }}
          >
            <KeyRound size={20} color="#ffffff" style={{ filter: 'drop-shadow(0 0 6px #ffffff)' }} />
          </div>
        </div>

        {/* Titles */}
        <div ref={titleRef} style={{ textAlign: 'center', marginBottom: '16px' }}>
          <h2
            className="neon-text"
            style={{
              fontSize: '1.35rem',
              fontWeight: '700',
              fontFamily: 'var(--font-display)',
              marginBottom: '2px',
              letterSpacing: '0.5px'
            }}
          >
            For You, My Love
          </h2>
          <p className="neon-text-subtle" style={{ fontSize: '0.8rem', color: '#e0f2fe', opacity: 0.9 }}>
            Enter our secret code
          </p>
          <p style={{ fontSize: '0.72rem', color: '#38bdf8', opacity: 0.75, fontStyle: 'italic', marginTop: '4px' }}>
            Clue: tanggal & bulan ultah 💗 (20 Oktober)
          </p>
        </div>

        {/* 4 Passcode Dots */}
        <div
          ref={dotsRef}
          style={{
            display: 'flex',
            gap: '10px',
            marginBottom: '18px',
            padding: '8px 16px',
            background: 'rgba(2, 8, 20, 0.65)',
            borderRadius: '20px',
            border: '1px solid rgba(96, 165, 250, 0.3)',
            boxShadow: 'inset 0 0 8px rgba(0,0,0,0.5), 0 0 12px rgba(0,210,255,0.15)'
          }}
        >
          {Array.from({ length: 4 }).map((_, i) => {
            const filled = i < passcode.length;
            return (
              <div
                key={i}
                style={{
                  position: 'relative',
                  width: '14px',
                  height: '14px',
                  borderRadius: '50%',
                  border: filled ? '1.5px solid #ffffff' : '1.5px solid rgba(96, 165, 250, 0.5)',
                  background: filled
                    ? 'radial-gradient(circle at 35% 35%, #38bdf8 0%, #00d2ff 60%, #0052cc 100%)'
                    : 'transparent',
                  boxShadow: filled
                    ? '0 0 10px #00d2ff, 0 0 16px #38bdf8, inset 0 0 5px #ffffff'
                    : 'none',
                  transition: 'all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                }}
              />
            );
          })}
        </div>

        {/* Error Message */}
        {errorMessage && (
          <p
            style={{
              fontSize: '0.78rem',
              color: '#38bdf8',
              marginBottom: '10px',
              textShadow: '0 0 8px rgba(0, 210, 255, 0.8)',
              textAlign: 'center',
              fontWeight: '500'
            }}
          >
            {errorMessage}
          </p>
        )}

        {/* Keypad Grid */}
        <div
          ref={keypadRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '10px',
            width: '100%',
            maxWidth: '240px',
            marginBottom: '16px'
          }}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              id={`btn-${num}`}
              className="keypad-btn-fancy"
              onClick={(e) => handleKeyPress(e, num.toString())}
              style={{
                position: 'relative',
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background:
                  'linear-gradient(145deg, rgba(255, 255, 255, 0.1) 0%, rgba(0, 210, 255, 0.05) 100%)',
                border: '1px solid rgba(96, 165, 250, 0.35)',
                color: '#ffffff',
                fontSize: '1.35rem',
                fontWeight: '600',
                fontFamily: 'var(--font-body)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto',
                boxShadow: '0 4px 12px rgba(0,0,0,0.4), inset 0 0 8px rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(8px)',
                transition: 'all 0.2s ease'
              }}
            >
              {num}
            </button>
          ))}

          {/* Clear button (X) */}
          <button
            className="keypad-btn-fancy"
            onClick={handleClear}
            style={{
              position: 'relative',
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(96, 165, 250, 0.2)',
              color: 'var(--text-muted)',
              fontSize: '1rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto',
              backdropFilter: 'blur(8px)'
            }}
          >
            <X size={18} />
          </button>

          {/* Zero (0) */}
          <button
            id="btn-0"
            className="keypad-btn-fancy"
            onClick={(e) => handleKeyPress(e, '0')}
            style={{
              position: 'relative',
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background:
                'linear-gradient(145deg, rgba(255, 255, 255, 0.1) 0%, rgba(0, 210, 255, 0.05) 100%)',
              border: '1px solid rgba(96, 165, 250, 0.35)',
              color: '#ffffff',
              fontSize: '1.35rem',
              fontWeight: '600',
              fontFamily: 'var(--font-body)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto',
              boxShadow: '0 4px 12px rgba(0,0,0,0.4), inset 0 0 8px rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(8px)'
            }}
          >
            0
          </button>

          {/* Delete backspace */}
          <button
            className="keypad-btn-fancy"
            onClick={handleDelete}
            style={{
              position: 'relative',
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(96, 165, 250, 0.2)',
              color: 'var(--text-muted)',
              fontSize: '1rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto',
              backdropFilter: 'blur(8px)'
            }}
          >
            <Delete size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
