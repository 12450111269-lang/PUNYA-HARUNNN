import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { Sparkles } from 'lucide-react';

export default function FarewellSection({ onOpenCake }) {
  const containerRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          gsap
            .timeline({ defaults: { ease: 'back.out(1.5)', duration: 0.7 } })
            .fromTo(
              '.farewell-eyebrow',
              { opacity: 0, y: -15, scale: 0.85 },
              { opacity: 1, y: 0, scale: 1, duration: 0.5 }
            )
            .fromTo(
              '.farewell-title',
              { opacity: 0, y: 30, filter: 'blur(8px)', scale: 0.9 },
              { opacity: 1, y: 0, filter: 'blur(0px)', scale: 1, duration: 0.8 },
              '-=0.3'
            )
            .fromTo(
              '.farewell-message',
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
              '-=0.4'
            )
            .fromTo(
              '.farewell-blossom',
              { opacity: 0, scale: 0.3, rotate: -45 },
              { opacity: 1, scale: 1, rotate: 0, duration: 0.5, ease: 'back.out(2)' },
              '-=0.3'
            )
            .fromTo(
              '.farewell-closing',
              { opacity: 0, y: 15 },
              { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
              '-=0.3'
            )
            .fromTo(
              '.farewell-btn',
              { opacity: 0, scale: 0.6, y: 25 },
              { opacity: 1, scale: 1, y: 0, duration: 0.65, ease: 'back.out(1.8)' },
              '-=0.2'
            );
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <div
      ref={containerRef}
      style={{
        textAlign: 'center',
        marginTop: '10px',
        paddingTop: '40px',
        paddingBottom: '50px',
        position: 'relative'
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '8%',
          left: '10%',
          fontSize: '1rem',
          opacity: 0.5,
          filter: 'drop-shadow(0 0 6px #00d2ff)'
        }}
      >
        💙
      </div>
      <div
        style={{
          position: 'absolute',
          top: '5%',
          right: '12%',
          fontSize: '0.9rem',
          opacity: 0.4,
          filter: 'drop-shadow(0 0 6px #38bdf8)'
        }}
      >
        ✨
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: '20%',
          left: '6%',
          fontSize: '0.8rem',
          opacity: 0.35,
          filter: 'drop-shadow(0 0 6px #00d2ff)'
        }}
      >
        🔹
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: '15%',
          right: '8%',
          fontSize: '0.85rem',
          opacity: 0.4,
          filter: 'drop-shadow(0 0 6px #38bdf8)'
        }}
      >
        💙
      </div>

      <p
        className="farewell-eyebrow"
        style={{
          fontSize: '0.85rem',
          color: '#38bdf8',
          marginBottom: '18px',
          letterSpacing: '0.5px'
        }}
      >
        💙 With all my heart 💙
      </p>

      <h2
        className="farewell-title"
        style={{
          fontFamily: "'Playfair Display', 'Cinzel', serif",
          fontSize: '2rem',
          lineHeight: '1.25',
          color: '#fff',
          textShadow: '0 0 15px rgba(0, 210, 255, 0.5), 0 0 30px rgba(0, 210, 255, 0.3)',
          marginBottom: '24px',
          fontWeight: '600'
        }}
      >
        May your life
        <br />
        <span
          style={{
            fontStyle: 'italic',
            color: '#38bdf8',
            textShadow: '0 0 20px rgba(56, 189, 248, 0.6), 0 0 40px rgba(0, 210, 255, 0.4)'
          }}
        >
          always be fulled
        </span>
        <br />
        with love
      </h2>

      <p
        className="farewell-message"
        style={{
          fontSize: '0.88rem',
          lineHeight: '1.7',
          color: 'rgba(224, 242, 254, 0.85)',
          maxWidth: '320px',
          margin: '0 auto 24px',
          fontWeight: '400'
        }}
      >
        Happy 19th Birthday Harun! kamu manusia yang berharga, amat teramat indah, bahkan berjuta bunga ditaman, ga ada yang menyamai betapa indahnya kamu, terima kasih sudah hadir di dunia ini, semua doa yang terbaik, ku panjatkan untuk kamu!
      </p>

      <div
        className="farewell-blossom"
        style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}
      >
        <img
          src="/bucket bunga 2 no bg.png"
          alt="Flower Bucket"
          style={{
            width: '85px',
            height: 'auto',
            filter: 'drop-shadow(0 0 16px #00d2ff) drop-shadow(0 0 30px #38bdf8)'
          }}
        />
      </div>

      <p
        className="farewell-closing"
        style={{
          fontFamily: "'Playfair Display', 'Cinzel', serif",
          fontStyle: 'italic',
          fontSize: '0.92rem',
          color: 'rgba(224, 242, 254, 0.85)',
          letterSpacing: '0.3px',
          marginBottom: '28px',
          lineHeight: '1.6'
        }}
      >
        "Takkan ku berubah, walau tak bersama, kita tak pernah berpisah, melintasi ruang waktu, selamanya"
        <br />
        <span style={{ color: '#38bdf8', fontWeight: 600, fontStyle: 'normal' }}>Love you, my Panasea 💙</span>
      </p>

      <button
        className="farewell-btn"
        onClick={onOpenCake}
        style={{
          background: 'linear-gradient(135deg, #00d2ff 0%, #38bdf8 100%)',
          color: '#fff',
          border: 'none',
          padding: '13px 30px',
          borderRadius: '30px',
          fontSize: '0.95rem',
          fontWeight: '700',
          cursor: 'pointer',
          boxShadow: '0 0 25px var(--neon-pink), 0 0 50px rgba(0, 210, 255, 0.3)',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          transition: 'transform 0.25s ease, box-shadow 0.25s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
          e.currentTarget.style.boxShadow =
            '0 0 35px var(--neon-pink-light), 0 0 60px var(--neon-pink)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow =
            '0 0 25px var(--neon-pink), 0 0 50px rgba(0, 210, 255, 0.3)';
        }}
      >
        <Sparkles size={18} /> Happy Birthday Wishes! 💕
      </button>
    </div>
  );
}
