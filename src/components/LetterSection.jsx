import React, { useRef, useState, useEffect } from 'react';

const letterLines = [
  { text: 'Happy birthday, Harun !', style: 'greeting' },
  { text: '', style: 'spacer' },
  {
    text: 'Selamat bertambah usia ya, cinta lamaku, terima kasihh karena kehadiranmu di hidup aku banyak memberikan cinta, kasih sayang dan kebahagiaan yang amat sangat berarti.',
    style: 'body'
  },
  { text: '', style: 'spacer' },
  {
    text: 'Sangat bersyukur kamu terlahir di dunia ini, terima kasih sudah bertahan dan berjuang melewati banyak lika liku kehidupan selama 19 tahun, banyak proses yang kamu lalui, tapi kamu terus bertahan! Aku selalu bangga sama kamu, terimakasih yaaa sudah hadir dalam kehidupanku, makasih yaa untuk semua canda tawa dan senyuman kamu yg selalu bikin aku bahagiaaa',
    style: 'body'
  },
  { text: '', style: 'spacer' },
  {
    text: 'Aku berdoa, dengan bertambahnya usia kamuu, kamu selalu diberikan kesehatan, keselamatan, kebahagiaan dan kasih sayang dari orang orang sekitar kamu, stay safe yaa disana, jaga kesehatan, jaga pergaulan dan pola hidup, aku doain semua perkuliahan kamu dilancarkan dan sukses!',
    style: 'body'
  }
];

export default function LetterSection() {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [renderedLines, setRenderedLines] = useState([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible || currentLineIndex >= letterLines.length) return;

    const currentLine = letterLines[currentLineIndex];

    if (currentLine.style === 'spacer') {
      setRenderedLines((prev) => [...prev, { text: '', style: 'spacer' }]);
      const t = setTimeout(() => {
        setCurrentLineIndex((prev) => prev + 1);
        setCurrentCharIndex(0);
      }, 150);
      return () => clearTimeout(t);
    }

    if (currentCharIndex <= currentLine.text.length) {
      const t = setTimeout(() => {
        const textSlice = currentLine.text.slice(0, currentCharIndex);
        setRenderedLines((prev) => {
          const next = [...prev];
          const lastIdx = next.length - 1;
          if (
            lastIdx >= 0 &&
            next[lastIdx].style === currentLine.style &&
            next[lastIdx]._lineIdx === currentLineIndex
          ) {
            next[lastIdx] = {
              text: textSlice,
              style: currentLine.style,
              _lineIdx: currentLineIndex
            };
          } else {
            next.push({
              text: textSlice,
              style: currentLine.style,
              _lineIdx: currentLineIndex
            });
          }
          return next;
        });
        setCurrentCharIndex((prev) => prev + 1);
      }, 28);
      return () => clearTimeout(t);
    }

    const t = setTimeout(() => {
      setCurrentLineIndex((prev) => prev + 1);
      setCurrentCharIndex(0);
    }, 300);
    return () => clearTimeout(t);
  }, [isVisible, currentLineIndex, currentCharIndex]);

  const isStillTyping = currentLineIndex < letterLines.length;

  const getStyleForLine = (styleType) => {
    switch (styleType) {
      case 'greeting':
        return {
          fontWeight: '600',
          marginBottom: '4px',
          fontSize: '1.08rem',
          color: '#38bdf8',
          fontFamily: 'var(--font-display)'
        };
      case 'ps':
        return {
          marginBottom: '0',
          fontStyle: 'italic',
          color: '#38bdf8',
          fontWeight: '500'
        };
      case 'spacer':
        return { height: '10px' };
      default:
        return { marginBottom: '4px' };
    }
  };

  return (
    <div
      ref={containerRef}
      style={{
        background: 'linear-gradient(165deg, rgba(10, 30, 63, 0.85) 0%, rgba(4, 16, 38, 0.92) 100%)',
        borderRadius: '28px',
        border: '1.5px solid rgba(96, 165, 250, 0.35)',
        padding: '28px 20px 24px',
        position: 'relative',
        boxShadow: '0 18px 40px rgba(0,0,0,0.7), inset 0 0 20px rgba(0, 210, 255, 0.1)',
        marginBottom: '36px'
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '12px',
          left: '16px',
          fontSize: '1.4rem',
          filter: 'drop-shadow(0 0 6px #00d2ff)'
        }}
      >
        💙
      </div>
      <div
        style={{
          position: 'absolute',
          top: '12px',
          right: '16px',
          fontSize: '1.4rem',
          filter: 'drop-shadow(0 0 6px #38bdf8)'
        }}
      >
        ✨
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: '16px',
          left: '16px',
          fontSize: '1.3rem',
          filter: 'drop-shadow(0 0 6px #60a5fa)'
        }}
      >
        🔹
      </div>

      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <p
          style={{
            fontSize: '0.75rem',
            letterSpacing: '1.5px',
            color: '#38bdf8',
            fontWeight: '600',
            marginBottom: '4px'
          }}
        >
          — FROM MY HEART —
        </p>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.55rem', marginBottom: '4px' }}>
          A Letter For You
        </h3>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '4px 14px',
            background: 'rgba(0, 210, 255, 0.15)',
            border: '1px solid rgba(96, 165, 250, 0.3)',
            borderRadius: '16px',
            fontSize: '0.78rem',
            color: '#e0f2fe',
            marginTop: '4px'
          }}
        >
          <span>💙</span>
          <span>20 Oktober</span>
          <span>💙</span>
        </div>
      </div>

      {/* Typed Letter Body */}
      <div
        style={{
          fontSize: '0.92rem',
          lineHeight: '1.65',
          color: '#e0f2fe',
          position: 'relative',
          zIndex: 2,
          minHeight: '200px'
        }}
      >
        {renderedLines.map((line, idx) => (
          <div key={idx} style={getStyleForLine(line.style)}>
            {line.text}
            {idx === renderedLines.length - 1 && isStillTyping && line.style !== 'spacer' && (
              <span
                style={{
                  display: 'inline-block',
                  width: '2px',
                  height: '14px',
                  backgroundColor: '#00d2ff',
                  marginLeft: '3px',
                  verticalAlign: 'middle',
                  boxShadow: '0 0 8px #00d2ff',
                  animation: 'pulseGlow 0.6s infinite alternate'
                }}
              />
            )}
          </div>
        ))}

        {/* Sender Sign-off (gaby) */}
        {!isStillTyping && renderedLines.length > 0 && (
          <div
            style={{
              marginTop: '20px',
              textAlign: 'right',
              fontWeight: '600',
              color: '#38bdf8',
              fontSize: '0.95rem',
              opacity: 0,
              animation: 'fadeInUp 0.8s forwards 0.3s'
            }}
          >
            <span style={{ color: '#60a5fa', fontSize: '0.85rem' }}>With all my love,</span>
            <br />
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.2rem',
                color: '#38bdf8',
                textShadow: '0 0 10px rgba(56,189,248,0.5)'
              }}
            >
              gaby 🤍
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
