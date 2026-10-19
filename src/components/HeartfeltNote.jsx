import React, { useRef } from 'react';

export default function HeartfeltNote() {
  const containerRef = useRef(null);

  return (
    <div
      ref={containerRef}
      style={{
        background: 'linear-gradient(165deg, rgba(10, 30, 63, 0.85) 0%, rgba(4, 16, 38, 0.92) 100%)',
        borderRadius: '28px',
        border: '1.5px solid rgba(96, 165, 250, 0.4)',
        padding: '26px 20px',
        textAlign: 'center',
        position: 'relative',
        boxShadow: '0 18px 40px rgba(0,0,0,0.7), inset 0 0 20px rgba(0, 210, 255, 0.1)',
        marginBottom: '36px',
        overflow: 'hidden'
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '-30px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '180px',
          height: '180px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0, 210, 255, 0.2) 0%, transparent 70%)',
          filter: 'blur(20px)',
          pointerEvents: 'none'
        }}
      />
      <p
        style={{
          fontSize: '0.75rem',
          letterSpacing: '1.5px',
          color: '#38bdf8',
          fontWeight: '600',
          marginBottom: '6px'
        }}
      >
        — PERSONAL MESSAGE —
      </p>
      <h3
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.45rem',
          color: '#ffffff',
          marginBottom: '16px'
        }}
      >
        A Heartfelt Note For You 🤍
      </h3>
      <div
        style={{
          padding: '20px 18px',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '20px',
          border: '1px solid rgba(96, 165, 250, 0.25)',
          boxShadow: 'inset 0 0 15px rgba(0, 210, 255, 0.08)'
        }}
      >
        <p
          style={{
            fontSize: '0.94rem',
            lineHeight: '1.75',
            color: '#e0f2fe',
            fontStyle: 'italic',
            fontWeight: '400',
            margin: 0,
            fontFamily: 'var(--font-body)'
          }}
        >
          "Jangan memaksakan diri ya, kadang kala, kalau kamu capek dengan banyak hal, kamu berhak istirahat dan rehat sejenak, jangan lupa untuk mengapresiasi hal hal sederhana yang sudah kamu capai, dibanding melihat sesuatu yang belum, atau gagal kamu lakukan, dan jangan banyak overthinking ya, atau minder, kamu berharga, kamu amat sangat berharga dan berarti, cuman kamu yang kadang hanya fokus di kekurangan kamu, padahal kamu punya banyak keindahan dan hal hal yang gabisa di temuin dibanyak orang, U're so special, be grateful babe"
        </p>
      </div>
    </div>
  );
}
