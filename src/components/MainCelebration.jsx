import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import confetti from 'canvas-confetti';
import {
  Volume2,
  VolumeX,
  ChevronDown,
  Music,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Calendar,
  X
} from 'lucide-react';

import BirthdayCard3D from './BirthdayCard3D.jsx';
import LetterSection from './LetterSection.jsx';
import HeartfeltNote from './HeartfeltNote.jsx';
import FarewellSection from './FarewellSection.jsx';

const playlist = [
  {
    id: 1,
    title: 'lalu biru X panasea',
    artist: 'Special Melody',
    duration: '3:35',
    src: '/lalu biru.mp3'
  },
  {
    id: 2,
    title: 'Terpukau',
    artist: 'Astrid',
    duration: '4:14',
    src: '/Terpukau - Astrid.mp3'
  },
  {
    id: 3,
    title: 'Segalanya Itu Kamu',
    artist: 'David Bayu',
    duration: '3:58',
    src: '/segalanya itu kamu.mp3'
  }
];

const flowerCompliments = {
  rose: {
    name: 'Mawar',
    icon: '🌹',
    color: '#ff69b4',
    text: 'kamu itu seperti mawar, yang pernah memberiku cinta dan kasih sayang yang begitu hangat dan dalam, mawarmu akan terus abadi, seperti mawar yang udah kamu kasih'
  },
  tulip: {
    name: 'Tulip',
    icon: '🌷',
    color: '#ff85c8',
    text: 'bentuknya cenderung mekar kedalam, ternyata menyimpan keindahan didalamnya, yaitu kamu, tulip sama seperti hati aku yg masih ada kamu didalamnya'
  },
  sakura: {
    name: 'Sakura',
    icon: '🌸',
    color: '#ff9ed8',
    text: 'indah dan membawa kebahagiaan dan keceriaan, sangat menggambarkan diri kamu, u made my day, thanks love!'
  },
  sunflower: {
    name: 'Sunflower',
    icon: '🌻',
    color: '#ffb3e0',
    text: 'persis seperti namanya, kehadiran kamu memberi sinar yang menghangatkan dan menyinari hari hariku setiap hari'
  },
  daisy: {
    name: 'Daisy',
    icon: '🌼',
    color: '#ffc0eb',
    text: 'maknanya tentang kesetiaan, kemurnian, dan ketulusanku ke kamu, meskipun semua sudah selesai. maaf'
  }
};

const photoList = [
  {
    id: 1,
    title: 'My favorite boy',
    date: 'Childhood Memories',
    location: 'Our Journey',
    img: '/harun 1.jpeg',
    rotation: '-3deg'
  },
  {
    id: 2,
    title: 'My favorite man',
    date: 'Special Moment',
    location: 'Our Journey',
    img: '/harun 2.jpeg',
    rotation: '2.5deg'
  },
  {
    id: 3,
    title: 'My favorit person',
    date: 'Special Moment',
    location: 'Our Journey',
    img: '/harun 3.jpeg',
    rotation: '-2deg'
  },
  {
    id: 4,
    title: 'My love of my life',
    date: 'Special Moment',
    location: 'Our Journey',
    img: '/harun 4.jpeg',
    rotation: '3deg'
  },
  {
    id: 5,
    title: 'Always be us',
    date: 'Special Moment',
    location: 'Our Journey',
    img: '/harun 5.jpeg',
    rotation: '-1.5deg'
  },
  {
    id: 6,
    title: 'Happy birthday, My Panasea',
    date: '20 Oktober Special',
    location: 'Our Journey',
    img: '/harun 6.jpeg',
    rotation: '2deg'
  }
];

const jarNotes = [
  'Karena kamu, orang pertama yang bikin Gaby merasakan dicintai sedalam itu, bahagia bareng, dan ngukir banyak kenangan yang tak terlupakan, ga lupa juga, di kamu, Gaby bisa menemukan seseorang yang bener bener cocok, ga sekedar pasangan, tapi soal partner yang sefrekuensi dan Gaby bisa jadi diri sendiri ketika sama Harun. Aku beruntung pernah memiliki kamu dalam hidup aku, terima kasih ya sudah menjadi manusia yang lahir ke dunia membawa kebahagiaan dan banyak hal berharga yang amat berarti dalam kehidupan aku.'
];

export default function MainCelebration() {
  const containerRef = useRef(null);
  const heroSectionRef = useRef(null);
  const heroH1Ref = useRef(null);
  const heroH2Ref = useRef(null);
  const heroH3Ref = useRef(null);
  const heroSubtitleRef = useRef(null);
  const heroTagRef = useRef(null);
  const vinylRecordRef = useRef(null);
  const jarRef = useRef(null);
  const audioRef = useRef(null);

  // States
  const [heroTypingText, setHeroTypingText] = useState('');
  const [isHeroTypingDone, setIsHeroTypingDone] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(0);
  const [songProgress, setSongProgress] = useState(0);
  const [selectedFlower, setSelectedFlower] = useState('sakura');
  const [activePhotoModal, setActivePhotoModal] = useState(null);
  const [pickedJarNote, setPickedJarNote] = useState(null);
  const [isCakeModalOpen, setIsCakeModalOpen] = useState(false);

  // Auto-scroll and typewriter hero effect
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
    window.scrollTo(0, 0);

    const fullText = 'Scroll pelan-pelan yaa, aku punya sedikit sesuatu buat kamu 🥹🤍';
    let charIdx = 0;
    const typeInterval = setInterval(() => {
      if (charIdx <= fullText.length) {
        setHeroTypingText(fullText.slice(0, charIdx));
        charIdx++;
      } else {
        setIsHeroTypingDone(true);
        clearInterval(typeInterval);
      }
    }, 70);

    const audioTimer = setTimeout(() => {
      if (audioRef.current) {
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch((err) => console.log('Autoplay deferred:', err));
      }
    }, 300);

    return () => {
      clearInterval(typeInterval);
      clearTimeout(audioTimer);
    };
  }, []);

  // GSAP Animations
  useGSAP(
    () => {
      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .fromTo(
          heroSubtitleRef.current,
          { opacity: 0, y: -20, scale: 0.8 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8 }
        )
        .fromTo(
          heroH1Ref.current,
          { opacity: 0, y: 35, filter: 'blur(8px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.9 },
          '-=0.5'
        )
        .fromTo(
          heroH2Ref.current,
          { opacity: 0, scale: 0.85, filter: 'blur(10px)' },
          { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1, ease: 'back.out(1.5)' },
          '-=0.6'
        )
        .fromTo(
          heroH3Ref.current,
          { opacity: 0, y: 35, filter: 'blur(8px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.9 },
          '-=0.6'
        )
        .fromTo(heroTagRef.current, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.3');

      // Floating hero emojis
      gsap.utils.toArray('.floating-hero-flower').forEach((el, i) => {
        gsap.to(el, {
          y: i % 2 === 0 ? -16 : 16,
          rotation: i % 2 === 0 ? 25 : -25,
          scale: 1.15,
          duration: 2.5 + i * 0.4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.2
        });
      });

      // Glow on "My Love 🤍"
      gsap.to(heroH2Ref.current, {
        filter: 'drop-shadow(0 0 25px #00d2ff) drop-shadow(0 0 45px #38bdf8)',
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      gsap.to('.hero-scroll-indicator', {
        y: 8,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      // Rotating vinyl record
      if (isPlaying) {
        gsap.to(vinylRecordRef.current, {
          rotation: 360,
          duration: 4,
          repeat: -1,
          ease: 'none'
        });
      } else {
        gsap.killTweensOf(vinylRecordRef.current);
      }
    },
    { scope: containerRef, dependencies: [isPlaying] }
  );

  // Audio Handlers
  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  };

  const playSongIndex = (idx) => {
    setCurrentSong(idx);
    setIsPlaying(true);
    setTimeout(() => {
      audioRef.current && audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }, 50);
  };

  const nextSong = () => {
    const next = (currentSong + 1) % playlist.length;
    playSongIndex(next);
  };

  const prevSong = () => {
    const prev = (currentSong - 1 + playlist.length) % playlist.length;
    playSongIndex(prev);
  };

  const handleSelectFlower = (key) => {
    setSelectedFlower(key);
    gsap.fromTo(
      `.flower-node-${key}`,
      { scale: 0.8, rotate: -15 },
      { scale: 1.25, rotate: 0, duration: 0.4, ease: 'back.out(2)' }
    );
    gsap.fromTo(
      '.compliment-toast-box',
      { opacity: 0, y: 15, scale: 0.94 },
      { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: 'power2.out' }
    );
  };

  const handleShakeJar = () => {
    if (!jarRef.current) return;
    setPickedJarNote(null);
    gsap
      .timeline()
      .to(jarRef.current, { rotation: -22, scale: 1.18, y: -10, duration: 0.09, ease: 'power1.out' })
      .to(jarRef.current, { rotation: 22, y: -12, duration: 0.09, ease: 'power1.inOut' })
      .to(jarRef.current, { rotation: -16, y: -8, duration: 0.09, ease: 'power1.inOut' })
      .to(jarRef.current, { rotation: 16, y: -6, duration: 0.09, ease: 'power1.inOut' })
      .to(jarRef.current, { rotation: -8, y: -3, duration: 0.08, ease: 'power1.inOut' })
      .to(jarRef.current, {
        rotation: 0,
        scale: 1,
        y: 0,
        duration: 0.15,
        ease: 'back.out(2)',
        onComplete: () => {
          const chosen = jarNotes[Math.floor(Math.random() * jarNotes.length)];
          setPickedJarNote(chosen);
          requestAnimationFrame(() => {
            gsap.fromTo(
              '.note-popup',
              { opacity: 0, scale: 0.2, y: 50, rotation: -15, filter: 'blur(8px)' },
              { opacity: 1, scale: 1, y: 0, rotation: 0, filter: 'blur(0px)', duration: 0.65, ease: 'back.out(1.8)' }
            );
          });
        }
      });
  };

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        flexShrink: 0,
        padding: '24px 16px 80px',
        color: '#fff',
        position: 'relative'
      }}
    >
      {/* Background Audio */}
      <audio
        ref={audioRef}
        src={playlist[currentSong].src}
        onEnded={nextSong}
        onTimeUpdate={() => {
          if (audioRef.current) {
            const prog = (audioRef.current.currentTime / audioRef.current.duration) * 100;
            setSongProgress(prog || 0);
          }
        }}
      />

      {/* Floating fixed audio toggle button */}
      <button
        onClick={togglePlay}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 90,
          width: '46px',
          height: '46px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #00d2ff 0%, #0066ff 100%)',
          border: '1.5px solid rgba(255,255,255,0.7)',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 20px #00d2ff, 0 4px 12px rgba(0,0,0,0.4)',
          cursor: 'pointer'
        }}
      >
        {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
      </button>

      {/* Hero Section */}
      <div
        ref={heroSectionRef}
        style={{
          minHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          position: 'relative',
          padding: '30px 0 10px',
          marginBottom: '36px'
        }}
      >
        <img
          src="/lucu1 no bg.png"
          alt="Cute Mascot"
          style={{
            position: 'absolute',
            top: '2%',
            right: '4%',
            width: '65px',
            height: 'auto',
            filter: 'drop-shadow(0 0 12px #38bdf8)',
            animation: 'pulseGlow 2.5s infinite ease-in-out',
            pointerEvents: 'none'
          }}
        />
        <img
          src="/bunga no bg 2.png"
          alt="Decorative Flower"
          style={{
            position: 'absolute',
            top: '40%',
            left: '2%',
            width: '45px',
            height: 'auto',
            filter: 'drop-shadow(0 0 10px #00d2ff)',
            opacity: 0.85,
            pointerEvents: 'none'
          }}
        />

        {/* Floating Hero Emojis */}
        <div
          className="floating-hero-flower"
          style={{ position: 'absolute', top: '4%', left: '8%', fontSize: '1.6rem', filter: 'drop-shadow(0 0 8px #00d2ff)' }}
        >
          💙
        </div>
        <div
          className="floating-hero-flower"
          style={{ position: 'absolute', top: '12%', right: '8%', fontSize: '1.8rem', filter: 'drop-shadow(0 0 8px #38bdf8)' }}
        >
          ✨
        </div>
        <div
          className="floating-hero-flower"
          style={{ position: 'absolute', top: '45%', left: '4%', fontSize: '1.5rem', filter: 'drop-shadow(0 0 8px #00d2ff)' }}
        >
          🔹
        </div>
        <div
          className="floating-hero-flower"
          style={{ position: 'absolute', top: '48%', right: '6%', fontSize: '1.7rem', filter: 'drop-shadow(0 0 8px #38bdf8)' }}
        >
          💙
        </div>

        {/* Radial blur center */}
        <div
          style={{
            position: 'absolute',
            width: '260px',
            height: '260px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0, 210, 255, 0.4) 0%, transparent 70%)',
            filter: 'blur(35px)',
            pointerEvents: 'none'
          }}
        />

        {/* Top Subtitle */}
        <div
          ref={heroSubtitleRef}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.82rem',
            color: '#7dd3fc',
            marginBottom: '20px',
            letterSpacing: '0.5px',
            textShadow: '0 0 8px rgba(0, 210, 255, 0.6)',
            padding: '0 8px'
          }}
        >
          <span>🤍</span>
          <span style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}>
            Untuk seseorang yang selalu punya tempat spesial di hatiku.
          </span>
          <span>🤍</span>
        </div>

        {/* Main Title Group */}
        <div
          style={{
            fontFamily: 'var(--font-display)',
            lineHeight: 1.15,
            marginBottom: '16px',
            position: 'relative',
            zIndex: 2
          }}
        >
          <div
            ref={heroH1Ref}
            style={{
              fontSize: '2.8rem',
              fontWeight: 600,
              color: '#ffffff',
              letterSpacing: '0.5px',
              textShadow: '0 0 20px rgba(255, 255, 255, 0.6)'
            }}
          >
            Happy Birthday,
          </div>
          <div
            ref={heroH2Ref}
            style={{
              fontSize: '3.1rem',
              fontStyle: 'italic',
              fontWeight: 600,
              background: 'linear-gradient(135deg, #ff9ed8 0%, #ff69b4 50%, #cc1a6e 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 0 15px rgba(255, 105, 180, 0.8))',
              margin: '6px 0',
              letterSpacing: '0.5px'
            }}
          >
            My Love 🤍
          </div>
          <div
            ref={heroH3Ref}
            style={{
              fontSize: '3.4rem',
              fontWeight: 600,
              color: '#ffffff',
              letterSpacing: '1px',
              textShadow: '0 0 20px rgba(255, 255, 255, 0.6)'
            }}
          >
            Harun
          </div>
        </div>

        {/* Typewriter text line */}
        <div style={{ minHeight: '28px', marginBottom: '20px', padding: '0 12px' }}>
          <p
            style={{
              fontSize: '0.92rem',
              fontStyle: 'italic',
              color: '#e0f2fe',
              fontFamily: 'var(--font-display)',
              letterSpacing: '0.5px',
              textShadow: '0 0 10px rgba(0, 210, 255, 0.8)'
            }}
          >
            {heroTypingText}
            <span
              style={{
                display: 'inline-block',
                width: '2px',
                height: '14px',
                backgroundColor: '#00d2ff',
                marginLeft: '3px',
                verticalAlign: 'middle',
                boxShadow: '0 0 8px #00d2ff',
                opacity: isHeroTypingDone ? 0.3 : 1,
                animation: 'pulseGlow 0.8s infinite alternate'
              }}
            />
          </p>
        </div>

        {/* Glowing Divider */}
        <div
          style={{
            width: '140px',
            height: '1.5px',
            background: 'linear-gradient(90deg, transparent, rgba(56, 189, 248, 0.8), transparent)',
            marginBottom: '22px',
            boxShadow: '0 0 10px rgba(0, 210, 255, 0.5)'
          }}
        />

        {/* Tagline */}
        <div
          ref={heroTagRef}
          style={{
            fontSize: '0.78rem',
            letterSpacing: '3.5px',
            color: 'rgba(224, 242, 254, 0.85)',
            fontWeight: 600,
            textTransform: 'uppercase',
            textShadow: '0 0 8px rgba(0, 210, 255, 0.4)',
            marginBottom: '28px'
          }}
        >
          HAPPY 19TH BIRTHDAY &nbsp; 20 OKTOBER 🤍
        </div>

        {/* Scroll Indicator */}
        <div className="hero-scroll-indicator" style={{ opacity: 0.8 }}>
          <ChevronDown size={22} color="#38bdf8" style={{ filter: 'drop-shadow(0 0 8px #00d2ff)' }} />
        </div>
      </div>

      {/* 3D Birthday Card */}
      <BirthdayCard3D />

      {/* Digital Bouquet Section */}
      <div
        style={{
          background: 'rgba(40, 10, 30, 0.7)',
          backdropFilter: 'blur(18px)',
          borderRadius: '28px',
          border: '1.5px solid rgba(255, 105, 180, 0.4)',
          padding: '24px 12px',
          textAlign: 'center',
          boxShadow: '0 12px 35px rgba(0,0,0,0.6), 0 0 20px rgba(255,105,180,0.1)',
          marginBottom: '36px'
        }}
      >
        <p style={{ fontSize: '0.75rem', letterSpacing: '1.5px', color: '#ff69b4', fontWeight: 600, marginBottom: '4px' }}>
          — MY FIRST GIFT —
        </p>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: '8px' }}>
          A Digital Bouquet
        </h3>
        <p
          style={{
            fontSize: '0.82rem',
            color: 'var(--text-muted)',
            marginBottom: '16px',
            lineHeight: '1.6',
            maxWidth: '340px',
            margin: '0 auto 16px',
            fontStyle: 'italic'
          }}
        >
          "Makasih ya udah ngasih aku bunga pertama dalam hidup aku, tapi sebelum kamu ngasih, ternyata aku udah punya bunga yang paling indah dan berarti yaitu kamu sendiri"
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '14px' }}>
          <img
            src="/bunga bucket no bg.png"
            alt="Bouquet Banner"
            style={{
              width: '80px',
              height: 'auto',
              filter: 'drop-shadow(0 0 14px #ff69b4) drop-shadow(0 0 25px #ff85c8)'
            }}
          />
        </div>

        {/* Flower SVG Bouquet Canvas */}
        <div style={{ position: 'relative', width: '100%', maxWidth: '350px', height: '240px', margin: '0 auto 20px' }}>
          <svg viewBox="0 0 350 240" width="100%" height="100%">
            <defs>
              <linearGradient id="potGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ff85c8" />
                <stop offset="60%" stopColor="#ff69b4" />
                <stop offset="100%" stopColor="#cc1a6e" />
              </linearGradient>
            </defs>

            {/* Stems & Leaves */}
            <path d="M 175 195 Q 90 140, 30 70" fill="none" stroke="#4ade80" strokeWidth="4.5" strokeLinecap="round" />
            <path d="M 85 130 Q 70 125, 65 140 Z" fill="#22c55e" />

            <path d="M 175 195 Q 125 110, 100 45" fill="none" stroke="#4ade80" strokeWidth="4.5" strokeLinecap="round" />
            <path d="M 125 110 Q 140 105, 140 120 Z" fill="#22c55e" />

            <path d="M 175 195 L 175 30" fill="none" stroke="#4ade80" strokeWidth="5" strokeLinecap="round" />
            <path d="M 175 115 Q 160 105, 160 120 Z" fill="#22c55e" />

            <path d="M 175 195 Q 225 110, 250 45" fill="none" stroke="#4ade80" strokeWidth="4.5" strokeLinecap="round" />
            <path d="M 225 110 Q 210 105, 210 120 Z" fill="#22c55e" />

            <path d="M 175 195 Q 260 140, 320 70" fill="none" stroke="#4ade80" strokeWidth="4.5" strokeLinecap="round" />
            <path d="M 265 130 Q 280 125, 285 140 Z" fill="#22c55e" />

            {/* Pot */}
            <path
              d="M 115 160 C 115 160, 95 215, 120 225 C 145 235, 205 235, 230 225 C 255 215, 235 160, 235 160 Z"
              fill="url(#potGrad)"
              stroke="#ffffff"
              strokeWidth="1.5"
              filter="drop-shadow(0 8px 15px rgba(0,0,0,0.6))"
            />
            <circle cx="175" cy="190" r="11" fill="#ffffff" />
            <circle cx="175" cy="190" r="7" fill="#ff69b4" />
            <path d="M 175 190 C 150 175, 140 200, 175 190 Z" fill="#ffffff" />
            <path d="M 175 190 C 200 175, 210 200, 175 190 Z" fill="#ffffff" />
          </svg>

          {/* Interactive Flower Nodes */}
          <div
            className="flower-node-rose"
            onClick={() => handleSelectFlower('rose')}
            style={{
              position: 'absolute',
              left: '4px',
              top: '32px',
              fontSize: '2.4rem',
              cursor: 'pointer',
              filter: selectedFlower === 'rose' ? 'drop-shadow(0 0 16px #ff69b4)' : 'drop-shadow(0 0 4px rgba(0,0,0,0.5))',
              transform: selectedFlower === 'rose' ? 'scale(1.25)' : 'scale(1)',
              transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), filter 0.3s ease'
            }}
          >
            🌹
          </div>

          <div
            className="flower-node-tulip"
            onClick={() => handleSelectFlower('tulip')}
            style={{
              position: 'absolute',
              left: '74px',
              top: '8px',
              fontSize: '2.4rem',
              cursor: 'pointer',
              filter: selectedFlower === 'tulip' ? 'drop-shadow(0 0 16px #ff85c8)' : 'drop-shadow(0 0 4px rgba(0,0,0,0.5))',
              transform: selectedFlower === 'tulip' ? 'scale(1.25)' : 'scale(1)',
              transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), filter 0.3s ease'
            }}
          >
            🌷
          </div>

          <div
            className="flower-node-sakura"
            onClick={() => handleSelectFlower('sakura')}
            style={{
              position: 'absolute',
              left: '50%',
              transform: selectedFlower === 'sakura' ? 'translateX(-50%) scale(1.3)' : 'translateX(-50%) scale(1)',
              top: '-14px',
              fontSize: '2.8rem',
              cursor: 'pointer',
              filter: selectedFlower === 'sakura' ? 'drop-shadow(0 0 18px #ff9ed8)' : 'drop-shadow(0 0 4px rgba(0,0,0,0.5))',
              transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), filter 0.3s ease'
            }}
          >
            🌸
          </div>

          <div
            className="flower-node-sunflower"
            onClick={() => handleSelectFlower('sunflower')}
            style={{
              position: 'absolute',
              right: '74px',
              top: '8px',
              fontSize: '2.4rem',
              cursor: 'pointer',
              filter: selectedFlower === 'sunflower' ? 'drop-shadow(0 0 16px #ffb3e0)' : 'drop-shadow(0 0 4px rgba(0,0,0,0.5))',
              transform: selectedFlower === 'sunflower' ? 'scale(1.25)' : 'scale(1)',
              transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), filter 0.3s ease'
            }}
          >
            🌻
          </div>

          <div
            className="flower-node-daisy"
            onClick={() => handleSelectFlower('daisy')}
            style={{
              position: 'absolute',
              right: '4px',
              top: '32px',
              fontSize: '2.4rem',
              cursor: 'pointer',
              filter: selectedFlower === 'daisy' ? 'drop-shadow(0 0 16px #ffc0eb)' : 'drop-shadow(0 0 4px rgba(0,0,0,0.5))',
              transform: selectedFlower === 'daisy' ? 'scale(1.25)' : 'scale(1)',
              transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), filter 0.3s ease'
            }}
          >
            🌼
          </div>
        </div>

        {/* Flower Selection Buttons */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '18px' }}>
          {Object.keys(flowerCompliments).map((k) => {
            const item = flowerCompliments[k];
            const active = selectedFlower === k;
            return (
              <button
                key={k}
                onClick={() => handleSelectFlower(k)}
                style={{
                  background: active
                    ? `linear-gradient(135deg, ${item.color}44 0%, ${item.color}22 100%)`
                    : 'rgba(255, 255, 255, 0.05)',
                  border: active ? `1.5px solid ${item.color}` : '1px solid rgba(255, 105, 180, 0.25)',
                  color: '#fff',
                  padding: '8px 14px',
                  borderRadius: '20px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: active ? `0 0 15px ${item.color}66` : 'none',
                  transition: 'all 0.25s ease'
                }}
              >
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Flower Compliment Box */}
        <div
          className="compliment-toast-box"
          style={{
            padding: '16px',
            background: 'linear-gradient(135deg, rgba(255,105,180,0.2) 0%, rgba(40,10,30,0.85) 100%)',
            border: `1.5px solid ${flowerCompliments[selectedFlower].color}`,
            borderRadius: '20px',
            boxShadow: `0 0 20px ${flowerCompliments[selectedFlower].color}44`,
            transition: 'all 0.3s ease'
          }}
        >
          <p style={{ fontSize: '0.9rem', lineHeight: '1.5', color: '#ffffff', fontWeight: 500 }}>
            "{flowerCompliments[selectedFlower].text}"
          </p>
        </div>
      </div>

      {/* Typewriter Letter Section */}
      <LetterSection />

      {/* Heartfelt Note */}
      <HeartfeltNote />

      {/* Our Photo Memories Section */}
      <div style={{ textAlign: 'center', marginBottom: '36px' }}>
        <p style={{ fontSize: '0.75rem', letterSpacing: '1.5px', color: '#38bdf8', fontWeight: 600, marginBottom: '4px' }}>
          — A COLLECTION OF MEMORIES —
        </p>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: '4px' }}>
          Our Photo Memories
        </h3>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
          Click any photo to view in detail 📸
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
          {photoList.map((p) => (
            <div
              key={p.id}
              onClick={() => setActivePhotoModal(p)}
              style={{
                width: '100%',
                maxWidth: '280px',
                background: '#ffffff',
                padding: '12px 12px 18px',
                borderRadius: '8px',
                transform: `rotate(${p.rotation})`,
                boxShadow: '0 12px 25px rgba(0,0,0,0.7)',
                cursor: 'pointer',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.04) rotate(0deg)';
                e.currentTarget.style.boxShadow = '0 15px 35px rgba(0, 210, 255, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = `rotate(${p.rotation})`;
                e.currentTarget.style.boxShadow = '0 12px 25px rgba(0,0,0,0.7)';
              }}
            >
              <img
                src={p.img}
                alt={p.title}
                style={{
                  width: '100%',
                  height: '210px',
                  objectFit: 'cover',
                  borderRadius: '4px',
                  marginBottom: '10px'
                }}
              />
              <p
                style={{
                  color: '#111111',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  fontFamily: 'var(--font-display)'
                }}
              >
                {p.title}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Special Playlist Section */}
      <div
        style={{
          background: 'rgba(10, 30, 63, 0.75)',
          backdropFilter: 'blur(16px)',
          borderRadius: '24px',
          border: '1.5px solid rgba(96, 165, 250, 0.35)',
          padding: '22px 16px',
          textAlign: 'center',
          boxShadow: '0 12px 35px rgba(0,0,0,0.6)',
          marginBottom: '36px'
        }}
      >
        <p style={{ fontSize: '0.75rem', letterSpacing: '1.5px', color: '#38bdf8', fontWeight: 600, marginBottom: '4px' }}>
          — OUR SONGS —
        </p>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.45rem', marginBottom: '16px' }}>
          Special Playlist
        </h3>

        {/* Spinning Vinyl Record */}
        <div style={{ position: 'relative', width: '130px', height: '130px', margin: '0 auto 16px' }}>
          <div
            ref={vinylRecordRef}
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              background: 'radial-gradient(circle, #333 15%, #111 20%, #222 35%, #050505 60%)',
              border: '3px solid rgba(0, 210, 255, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 25px rgba(0,210,255,0.4)'
            }}
          >
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #00d2ff 0%, #38bdf8 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Music size={20} color="#fff" />
            </div>
          </div>
        </div>

        <h4 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '2px', fontFamily: 'var(--font-display)' }}>
          {playlist[currentSong].title}
        </h4>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
          {playlist[currentSong].artist}
        </p>

        {/* Song Progress Bar */}
        <div
          style={{
            width: '100%',
            height: '5px',
            background: 'rgba(255,255,255,0.15)',
            borderRadius: '10px',
            marginBottom: '16px',
            overflow: 'hidden'
          }}
        >
          <div
            style={{
              width: `${songProgress}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #00d2ff, #38bdf8)',
              transition: 'width 0.2s linear'
            }}
          />
        </div>

        {/* Playback Controls */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', marginBottom: '24px' }}>
          <button onClick={prevSong} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
            <SkipBack size={24} />
          </button>
          <button
            onClick={togglePlay}
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #00d2ff 0%, #0066ff 100%)',
              border: 'none',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 20px #00d2ff',
              cursor: 'pointer'
            }}
          >
            {isPlaying ? <Pause size={24} fill="#fff" /> : <Play size={24} fill="#fff" style={{ marginLeft: '2px' }} />}
          </button>
          <button onClick={nextSong} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
            <SkipForward size={24} />
          </button>
        </div>

        {/* Track List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', textAlign: 'left' }}>
          <p style={{ fontSize: '0.78rem', color: '#38bdf8', fontWeight: 600, marginBottom: '2px', textAlign: 'center' }}>
            📜 Select Song from Playlist:
          </p>
          {playlist.map((item, idx) => {
            const isSelected = idx === currentSong;
            return (
              <div
                key={item.id}
                onClick={() => playSongIndex(idx)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 14px',
                  borderRadius: '16px',
                  background: isSelected
                    ? 'linear-gradient(135deg, rgba(0,210,255,0.3) 0%, rgba(0,102,255,0.15) 100%)'
                    : 'rgba(255, 255, 255, 0.04)',
                  border: isSelected ? '1.5px solid var(--neon-pink)' : '1px solid rgba(96, 165, 250, 0.15)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: isSelected ? '0 0 15px rgba(0,210,255,0.25)' : 'none'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: isSelected ? '#00d2ff' : 'rgba(255,255,255,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      color: '#fff'
                    }}
                  >
                    {isSelected && isPlaying ? <Music size={14} className="animate-spin" /> : idx + 1}
                  </div>
                  <div>
                    <p style={{ fontSize: '0.9rem', fontWeight: 600, color: isSelected ? '#ffffff' : '#e0f2fe' }}>
                      {item.title}
                    </p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.artist}</p>
                  </div>
                </div>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{item.duration}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Grateful Jar Section */}
      <div
        style={{
          background: 'rgba(10, 30, 63, 0.65)',
          backdropFilter: 'blur(16px)',
          borderRadius: '24px',
          border: '1px solid rgba(96, 165, 250, 0.3)',
          padding: '20px 16px',
          textAlign: 'center',
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
          marginBottom: '36px',
          position: 'relative'
        }}
      >
        <img
          src="/lucu 2 no bg.png"
          alt="Cute Mascot 2"
          style={{
            position: 'absolute',
            top: '-20px',
            right: '12px',
            width: '58px',
            height: 'auto',
            filter: 'drop-shadow(0 0 10px #00d2ff)',
            pointerEvents: 'none'
          }}
        />

        <p style={{ fontSize: '0.75rem', letterSpacing: '1.5px', color: '#38bdf8', fontWeight: 600, marginBottom: '4px' }}>
          — FROM MY HEART TO YOURS —
        </p>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', marginBottom: '4px' }}>
          Reasons I'm Grateful To Know You
        </h3>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
          Shake the jar and pick a note 📜
        </p>

        {/* Jar Icon */}
        <div
          ref={jarRef}
          style={{ fontSize: '3.5rem', marginBottom: '12px', cursor: 'pointer' }}
          onClick={handleShakeJar}
        >
          🫙
        </div>

        <button
          onClick={handleShakeJar}
          style={{
            background: 'linear-gradient(135deg, #00d2ff 0%, #0066ff 100%)',
            color: '#fff',
            border: 'none',
            padding: '10px 22px',
            borderRadius: '20px',
            fontSize: '0.88rem',
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 0 15px rgba(0,210,255,0.4)'
          }}
        >
          Shake the Jar ✨
        </button>

        {/* Revealed Note Popup */}
        {pickedJarNote && (
          <div
            className="note-popup"
            style={{
              marginTop: '26px',
              padding: '26px 16px 18px',
              background: 'linear-gradient(145deg, #f0f9ff 0%, #e0f2fe 100%)',
              color: '#0f172a',
              borderRadius: '20px',
              border: '2.5px solid #38bdf8',
              fontSize: '0.92rem',
              fontWeight: 600,
              boxShadow: '0 12px 30px rgba(0,0,0,0.6), 0 0 25px rgba(0, 210, 255, 0.35)',
              lineHeight: 1.55,
              position: 'relative',
              textAlign: 'center'
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '-14px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'linear-gradient(135deg, #00d2ff 0%, #0066ff 100%)',
                color: '#ffffff',
                padding: '4px 14px',
                borderRadius: '12px',
                fontSize: '0.72rem',
                letterSpacing: '0.8px',
                fontWeight: 700,
                boxShadow: '0 4px 10px rgba(0,0,0,0.35)',
                whiteSpace: 'nowrap',
                zIndex: 5
              }}
            >
              📜 SPECIAL NOTE FOR HARUN 💙
            </div>
            <p style={{ marginTop: '4px', fontFamily: 'var(--font-body)' }}>
              "{pickedJarNote}"
            </p>
          </div>
        )}
      </div>

      {/* Farewell Section */}
      <FarewellSection
        onOpenCake={() => {
          setIsCakeModalOpen(true);
          confetti({
            particleCount: 100,
            spread: 80,
            origin: { y: 0.5 },
            colors: ['#ff2a8d', '#ffd700', '#ff77bc', '#ffffff', '#e0115f']
          });
        }}
      />

      {/* Photo Lightbox Modal */}
      {activePhotoModal && (
        <div
          onClick={() => setActivePhotoModal(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999,
            background: 'rgba(3, 12, 27, 0.9)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#ffffff',
              padding: '16px 16px 20px',
              borderRadius: '16px',
              maxWidth: '340px',
              width: '100%',
              textAlign: 'center',
              boxShadow: '0 25px 60px rgba(0,0,0,0.9), 0 0 30px rgba(0, 210, 255, 0.4)',
              position: 'relative',
              animation: 'pulseGlow 3s infinite ease-in-out'
            }}
          >
            <button
              onClick={() => setActivePhotoModal(null)}
              style={{
                position: 'absolute',
                top: '-12px',
                right: '-12px',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: '#00d2ff',
                color: '#fff',
                border: '2px solid #fff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 10px #00d2ff'
              }}
            >
              <X size={18} />
            </button>
            <img
              src={activePhotoModal.img}
              alt={activePhotoModal.title}
              style={{
                width: '100%',
                maxHeight: '360px',
                objectFit: 'cover',
                borderRadius: '10px',
                marginBottom: '14px'
              }}
            />
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: '4px 12px',
                background: 'rgba(0, 210, 255, 0.12)',
                borderRadius: '12px',
                fontSize: '0.78rem',
                color: '#00d2ff',
                fontWeight: 600,
                marginBottom: '8px'
              }}
            >
              <Calendar size={12} /> {activePhotoModal.date} · {activePhotoModal.location}
            </div>
            <h4 style={{ color: '#111111', fontSize: '1rem', fontFamily: 'var(--font-display)', lineHeight: 1.3 }}>
              {activePhotoModal.title}
            </h4>
          </div>
        </div>
      )}

      {/* Birthday Wishes Pop-up Modal */}
      {isCakeModalOpen && (
        <div
          onClick={() => setIsCakeModalOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999,
            background: 'rgba(0,0,0,0.85)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'linear-gradient(145deg, #0a1e3f 0%, #041026 100%)',
              border: '1.5px solid var(--neon-pink)',
              padding: '24px',
              borderRadius: '24px',
              maxWidth: '320px',
              width: '100%',
              textAlign: 'center',
              boxShadow: '0 0 40px var(--neon-pink)'
            }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '10px' }}>💖</div>
            <h3
              className="neon-text"
              style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: '8px' }}
            >
              Happy 19th Birthday!
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#e0f2fe', marginBottom: '20px' }}>
              The most special Harun 💗
            </p>
            <button
              onClick={() => setIsCakeModalOpen(false)}
              style={{
                padding: '8px 24px',
                background: 'rgba(0,210,255,0.2)',
                border: '1px solid var(--neon-pink)',
                color: '#fff',
                borderRadius: '20px',
                cursor: 'pointer'
              }}
            >
              Close ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
