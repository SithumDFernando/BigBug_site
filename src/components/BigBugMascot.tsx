import React, { useState, useRef, useEffect } from 'react';
import { soundEngine } from '../utils/audio';

interface Spark {
  id: number;
  tx: number;
  ty: number;
  color: string;
}

export const BigBugMascot: React.FC = () => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [overloadCount, setOverloadCount] = useState(0);
  const [shockwaves, setShockwaves] = useState<number[]>([]);
  const [sparks, setSparks] = useState<Spark[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Mouse 3D tilt tracking
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Normalize -1 to 1
    const x = (e.clientX - centerX) / (rect.width / 2);
    const y = (e.clientY - centerY) / (rect.height / 2);
    
    setTilt({
      x: -y * 12, // tilt pitch
      y: x * 14,  // tilt yaw
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    soundEngine.playBlip(900);
  };

  // Click Overload Blast
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundEngine.playPulse();
    setOverloadCount((prev) => prev + 1);

    const waveId = Date.now();
    setShockwaves((prev) => [...prev, waveId]);

    // Create 12 scattering cyber sparks
    const newSparks: Spark[] = [];
    const colors = ['#00FF88', '#00F0FF', '#34D399', '#F8FAFC'];
    for (let i = 0; i < 14; i++) {
      const angle = (i / 14) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
      const distance = 80 + Math.random() * 90;
      newSparks.push({
        id: waveId + i,
        tx: Math.cos(angle) * distance,
        ty: Math.sin(angle) * distance,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
    setSparks((prev) => [...prev, ...newSparks]);

    setTimeout(() => {
      setShockwaves((prev) => prev.filter((id) => id !== waveId));
    }, 900);

    setTimeout(() => {
      setSparks((prev) => prev.filter((s) => !newSparks.some((ns) => ns.id === s.id)));
    }, 700);
  };

  // Keyboard shortcut or cleanup
  useEffect(() => {
    return () => {
      setShockwaves([]);
      setSparks([]);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{
        position: 'relative',
        width: '380px',
        maxWidth: '92vw',
        height: '420px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        perspective: '1000px',
        userSelect: 'none',
      }}
    >
      {/* Background Rotating Cyber Radar Reticle */}
      <div
        style={{
          position: 'absolute',
          width: '360px',
          height: '360px',
          borderRadius: '50%',
          border: '1px dashed rgba(0, 255, 136, 0.18)',
          boxShadow: isHovered
            ? '0 0 60px rgba(0, 255, 136, 0.22), inset 0 0 40px rgba(0, 255, 136, 0.08)'
            : '0 0 30px rgba(0, 255, 136, 0.1)',
          pointerEvents: 'none',
          animation: 'radarScan 24s linear infinite',
          transition: 'box-shadow 0.4s ease',
        }}
      >
        {/* Radar crosshairs & tick marks */}
        <div style={{ position: 'absolute', top: 0, bottom: 0, left: '50%', width: '1px', background: 'rgba(0, 255, 136, 0.07)' }} />
        <div style={{ position: 'absolute', left: 0, right: 0, top: '50%', height: '1px', background: 'rgba(0, 255, 136, 0.07)' }} />
        <div
          style={{
            position: 'absolute',
            inset: '30px',
            borderRadius: '50%',
            border: '1px solid rgba(0, 255, 136, 0.1)',
          }}
        />
      </div>

      {/* Under-glow Energy Spot */}
      <div
        style={{
          position: 'absolute',
          width: '260px',
          height: '260px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0, 255, 136, 0.18) 0%, rgba(5, 223, 114, 0.05) 50%, transparent 75%)',
          filter: 'blur(30px)',
          pointerEvents: 'none',
          transform: isHovered ? 'scale(1.2)' : 'scale(1)',
          transition: 'transform 0.5s ease',
        }}
      />

      {/* Dynamic Shockwaves on click */}
      {shockwaves.map((waveId) => (
        <div
          key={waveId}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '180px',
            height: '180px',
            borderRadius: '50%',
            border: '2px solid #00FF88',
            boxShadow: '0 0 20px #00FF88',
            pointerEvents: 'none',
            animation: 'shockwaveExpand 0.85s cubic-bezier(0.1, 0.8, 0.3, 1) forwards',
            zIndex: 10,
          }}
        />
      ))}

      {/* Dynamic Scattering Sparks */}
      {sparks.map((spark) => (
        <div
          key={spark.id}
          style={
            {
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: spark.color,
              boxShadow: `0 0 10px ${spark.color}`,
              pointerEvents: 'none',
              zIndex: 11,
              '--tx': `${spark.tx}px`,
              '--ty': `${spark.ty}px`,
              animation: 'sparkScatter 0.65s ease-out forwards',
            } as React.CSSProperties
          }
        />
      ))}

      {/* Interactive 3D Card Shell */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: isHovered ? 'transform 0.08s ease-out' : 'transform 0.5s ease-out',
          animation: 'bugHover 6s ease-in-out infinite',
        }}
      >
        {/* The BigBug Vector Cybernetic Beetle */}
        <svg
          viewBox="0 0 320 380"
          width="320"
          height="380"
          style={{
            filter: isHovered
              ? 'drop-shadow(0 15px 30px rgba(0, 255, 136, 0.35))'
              : 'drop-shadow(0 10px 25px rgba(0, 0, 0, 0.7))',
            transition: 'filter 0.3s ease',
          }}
        >
          <defs>
            {/* Gradients */}
            <linearGradient id="armorMetal" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1E2830" />
              <stop offset="50%" stopColor="#141C22" />
              <stop offset="100%" stopColor="#0B1014" />
            </linearGradient>

            <linearGradient id="armorHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#2E3C47" />
              <stop offset="100%" stopColor="#151E24" />
            </linearGradient>

            <linearGradient id="neonGreenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00FF88" />
              <stop offset="100%" stopColor="#00C853" />
            </linearGradient>

            <linearGradient id="cyanAccentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00F0FF" />
              <stop offset="100%" stopColor="#00FF88" />
            </linearGradient>

            <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="25%" stopColor="#00FF88" />
              <stop offset="70%" stopColor="#065F46" />
              <stop offset="100%" stopColor="#042F2E" />
            </radialGradient>

            {/* Circuit Glow Filter */}
            <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* ================= LEGS (Background / Articulated) ================= */}
          {/* Top Legs */}
          <g style={{ animation: 'legTwitchLeft 5s ease-in-out infinite' }}>
            <path
              d="M120 160 L60 120 L25 135"
              fill="none"
              stroke="#22313B"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M120 160 L60 120 L25 135"
              fill="none"
              stroke="#00FF88"
              strokeWidth="1.5"
              strokeOpacity="0.8"
              strokeLinecap="round"
            />
            <circle cx="60" cy="120" r="3.5" fill="#00FF88" />
            <circle cx="25" cy="135" r="2.5" fill="#00F0FF" />
          </g>
          <g style={{ animation: 'legTwitchRight 5s ease-in-out infinite' }}>
            <path
              d="M200 160 L260 120 L295 135"
              fill="none"
              stroke="#22313B"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M200 160 L260 120 L295 135"
              fill="none"
              stroke="#00FF88"
              strokeWidth="1.5"
              strokeOpacity="0.8"
              strokeLinecap="round"
            />
            <circle cx="260" cy="120" r="3.5" fill="#00FF88" />
            <circle cx="295" cy="135" r="2.5" fill="#00F0FF" />
          </g>

          {/* Middle Legs */}
          <g style={{ animation: 'legTwitchLeft 6s ease-in-out 1s infinite' }}>
            <path
              d="M115 190 L45 200 L15 225"
              fill="none"
              stroke="#22313B"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M115 190 L45 200 L15 225"
              fill="none"
              stroke="#00FF88"
              strokeWidth="1.5"
              strokeOpacity="0.8"
              strokeLinecap="round"
            />
            <circle cx="45" cy="200" r="3.5" fill="#00FF88" />
            <circle cx="15" cy="225" r="2.5" fill="#00F0FF" />
          </g>
          <g style={{ animation: 'legTwitchRight 6s ease-in-out 1s infinite' }}>
            <path
              d="M205 190 L275 200 L305 225"
              fill="none"
              stroke="#22313B"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M205 190 L275 200 L305 225"
              fill="none"
              stroke="#00FF88"
              strokeWidth="1.5"
              strokeOpacity="0.8"
              strokeLinecap="round"
            />
            <circle cx="275" cy="200" r="3.5" fill="#00FF88" />
            <circle cx="305" cy="225" r="2.5" fill="#00F0FF" />
          </g>

          {/* Bottom Legs */}
          <g style={{ animation: 'legTwitchLeft 5.5s ease-in-out 0.5s infinite' }}>
            <path
              d="M120 230 L55 270 L30 320"
              fill="none"
              stroke="#22313B"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M120 230 L55 270 L30 320"
              fill="none"
              stroke="#00FF88"
              strokeWidth="1.5"
              strokeOpacity="0.8"
              strokeLinecap="round"
            />
            <circle cx="55" cy="270" r="3.5" fill="#00FF88" />
            <circle cx="30" cy="320" r="2.5" fill="#00F0FF" />
          </g>
          <g style={{ animation: 'legTwitchRight 5.5s ease-in-out 0.5s infinite' }}>
            <path
              d="M200 230 L265 270 L290 320"
              fill="none"
              stroke="#22313B"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M200 230 L265 270 L290 320"
              fill="none"
              stroke="#00FF88"
              strokeWidth="1.5"
              strokeOpacity="0.8"
              strokeLinecap="round"
            />
            <circle cx="265" cy="270" r="3.5" fill="#00FF88" />
            <circle cx="290" cy="320" r="2.5" fill="#00F0FF" />
          </g>

          {/* ================= SENSORY ANTENNAE ================= */}
          <g style={{ animation: 'antennaWave 4s ease-in-out infinite' }}>
            {/* Left Antenna */}
            <path
              d="M145 90 Q120 50 85 45"
              fill="none"
              stroke="#00FF88"
              strokeWidth="2.5"
              strokeLinecap="round"
              filter="url(#glowFilter)"
            />
            <circle cx="85" cy="45" r="4.5" fill="#00FF88" filter="url(#glowFilter)" />
            <circle cx="85" cy="45" r="2" fill="#FFFFFF" />
            {/* Left Antenna Radar Wave */}
            <circle cx="85" cy="45" r="10" fill="none" stroke="#00FF88" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />

            {/* Right Antenna */}
            <path
              d="M175 90 Q200 50 235 45"
              fill="none"
              stroke="#00FF88"
              strokeWidth="2.5"
              strokeLinecap="round"
              filter="url(#glowFilter)"
            />
            <circle cx="235" cy="45" r="4.5" fill="#00FF88" filter="url(#glowFilter)" />
            <circle cx="235" cy="45" r="2" fill="#FFFFFF" />
            {/* Right Antenna Radar Wave */}
            <circle cx="235" cy="45" r="10" fill="none" stroke="#00FF88" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
          </g>

          {/* ================= MANDIBLES / PINCHERS ================= */}
          <path
            d="M142 98 L130 80 Q138 72 150 82 Z"
            fill="url(#armorMetal)"
            stroke="#00FF88"
            strokeWidth="1.5"
          />
          <path
            d="M178 98 L190 80 Q182 72 170 82 Z"
            fill="url(#armorMetal)"
            stroke="#00FF88"
            strokeWidth="1.5"
          />

          {/* ================= ABDOMEN BASE / UNDER-CHASSIS ================= */}
          <path
            d="M130 190 Q160 330 190 190 Z"
            fill="#090E11"
            stroke="#1D2A32"
            strokeWidth="2"
          />
          {/* Heat dissipation vents with green back-illumination */}
          <line x1="145" y1="230" x2="175" y2="230" stroke="#00FF88" strokeWidth="2.5" opacity="0.8" />
          <line x1="148" y1="250" x2="172" y2="250" stroke="#00FF88" strokeWidth="2" opacity="0.7" />
          <line x1="152" y1="270" x2="168" y2="270" stroke="#00FF88" strokeWidth="1.5" opacity="0.6" />

          {/* ================= CRANIAL HEADPLATE ================= */}
          <polygon
            points="160,88 185,105 178,135 142,135 135,105"
            fill="url(#armorMetal)"
            stroke="#37474F"
            strokeWidth="2"
          />
          <polygon
            points="160,94 178,107 172,130 148,130 142,107"
            fill="url(#armorHighlight)"
          />

          {/* Compound Cyber Eyes (Hexagonal Glowing Lenses) */}
          <polygon
            points="140,110 148,114 148,124 140,128 134,124 134,114"
            fill="#00FF88"
            filter="url(#glowFilter)"
          />
          <circle cx="141" cy="119" r="2" fill="#FFFFFF" />

          <polygon
            points="180,110 188,114 188,124 180,128 172,124 172,114"
            fill="#00FF88"
            filter="url(#glowFilter)"
          />
          <circle cx="179" cy="119" r="2" fill="#FFFFFF" />

          {/* ================= THORAX / CARAPACE WINGS ================= */}
          {/* Left Wing Elytron */}
          <path
            d="M156 142 L112 165 C100 215 110 270 156 295 L156 142 Z"
            fill="url(#armorMetal)"
            stroke="#2B3A42"
            strokeWidth="2"
          />

          {/* Right Wing Elytron */}
          <path
            d="M164 142 L208 165 C220 215 210 270 164 295 L164 142 Z"
            fill="url(#armorMetal)"
            stroke="#2B3A42"
            strokeWidth="2"
          />

          {/* Outer Carapace Edge Glow */}
          <path
            d="M112 165 C100 215 110 270 156 295"
            fill="none"
            stroke="url(#cyanAccentGrad)"
            strokeWidth="2"
            opacity="0.9"
          />
          <path
            d="M208 165 C220 215 210 270 164 295"
            fill="none"
            stroke="url(#cyanAccentGrad)"
            strokeWidth="2"
            opacity="0.9"
          />

          {/* Laser-Etched PCB Circuit Traces with Flowing Light */}
          {/* Left Wing Circuits */}
          <path
            d="M156 160 L130 175 L130 210 L118 225 L118 250"
            fill="none"
            stroke="#00FF88"
            strokeWidth="1.8"
            strokeDasharray="4 8"
            style={{ animation: 'circuitDash 2.5s linear infinite' }}
            filter="url(#glowFilter)"
          />
          <circle cx="118" cy="250" r="3" fill="#00F0FF" />
          <circle cx="130" cy="210" r="2" fill="#00FF88" />

          <path
            d="M156 200 L140 215 L140 255 L148 265"
            fill="none"
            stroke="#00FF88"
            strokeWidth="1.5"
            strokeDasharray="3 6"
            style={{ animation: 'circuitDash 3s linear infinite reverse' }}
          />

          {/* Right Wing Circuits */}
          <path
            d="M164 160 L190 175 L190 210 L202 225 L202 250"
            fill="none"
            stroke="#00FF88"
            strokeWidth="1.8"
            strokeDasharray="4 8"
            style={{ animation: 'circuitDash 2.5s linear infinite' }}
            filter="url(#glowFilter)"
          />
          <circle cx="202" cy="250" r="3" fill="#00F0FF" />
          <circle cx="190" cy="210" r="2" fill="#00FF88" />

          <path
            d="M164 200 L180 215 L180 255 L172 265"
            fill="none"
            stroke="#00FF88"
            strokeWidth="1.5"
            strokeDasharray="3 6"
            style={{ animation: 'circuitDash 3s linear infinite reverse' }}
          />

          {/* Dorsal Spine Division / Seam */}
          <line x1="160" y1="142" x2="160" y2="295" stroke="#00FF88" strokeWidth="2.5" opacity="0.85" />

          {/* ================= CENTER ARC REACTOR CORE ================= */}
          {/* Mechanical Core Housing */}
          <circle cx="160" cy="180" r="28" fill="#0E161B" stroke="#2A3B45" strokeWidth="3" />
          <circle
            cx="160"
            cy="180"
            r="23"
            fill="none"
            stroke="#00FF88"
            strokeWidth="2"
            strokeDasharray="6 4"
            style={{ animation: 'radarScan 10s linear infinite' }}
          />

          {/* Glowing Reactor Core Orb */}
          <circle
            cx="160"
            cy="180"
            r="16"
            fill="url(#coreGlow)"
            style={{ animation: 'corePulse 2s ease-in-out infinite' }}
          />

          {/* Center Energy Singularity */}
          <circle cx="160" cy="180" r="5" fill="#FFFFFF" />
        </svg>

        {/* Floating Telemetry HUD Readout */}
        <div
          style={{
            position: 'absolute',
            bottom: '-12px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(8, 13, 16, 0.85)',
            border: '1px solid rgba(0, 255, 136, 0.3)',
            borderRadius: '999px',
            padding: '4px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.5), 0 0 10px rgba(0, 255, 136, 0.15)',
            backdropFilter: 'blur(8px)',
            whiteSpace: 'nowrap',
          }}
        >
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: '#00FF88',
              boxShadow: '0 0 6px #00FF88',
              display: 'inline-block',
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              color: 'var(--text-secondary)',
              letterSpacing: '0.06em',
            }}
          >
            {overloadCount > 0 ? (
              <span style={{ color: '#00FF88' }}>
                OVERCLOCK: {overloadCount * 10 + 100}% // CLICK TO BURST
              </span>
            ) : (
              <span>INTERACTIVE CORE // CLICK TO DISCHARGE</span>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};
