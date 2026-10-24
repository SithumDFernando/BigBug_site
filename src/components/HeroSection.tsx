import React from 'react';
import { BigBugMascot } from './BigBugMascot';
import { ArrowDown } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section
      style={{
        position: 'relative',
        padding: '60px 20px 40px',
        textAlign: 'center',
        zIndex: 10,
      }}
    >
      {/* Top Cyber Badge */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
        <div
          className="badge-tech pulse-dot"
          style={{
            padding: '6px 18px',
            fontSize: '0.8rem',
            background: 'rgba(0, 255, 136, 0.08)',
            border: '1px solid rgba(0, 255, 136, 0.3)',
          }}
        >
          <span>LAUNCHING SOON</span>
        </div>
      </div>

      {/* Main Title & Slogan */}
      <h1
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(2.5rem, 7vw, 4.8rem)',
          fontWeight: 700,
          letterSpacing: '-0.02em',
          lineHeight: 1.1,
          marginBottom: '16px',
        }}
      >
        <span style={{ color: '#F8FAFC' }}>DEBUGGING REALITY.</span>
        <br />
        <span
          style={{
            background: 'linear-gradient(135deg, #FFFFFF 15%, #00FF88 80%, #00F0FF 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 0 40px rgba(0, 255, 136, 0.3)',
          }}
        >
          BUILDING THE FUTURE.
        </span>
      </h1>

      <p
        style={{
          maxWidth: '640px',
          margin: '0 auto 36px',
          fontSize: 'clamp(1rem, 2vw, 1.15rem)',
          color: 'var(--text-secondary)',
          lineHeight: 1.6,
        }}
      >
        Launching soon. We are <strong style={{ color: '#FFFFFF' }}>BigBug</strong> — building the future,
        debugging the present. The official portal chronicling our hackathon journeys, projects, and achievements
        is on the way.
      </p>

      {/* Animated Centerpiece: The BigBug Mascot */}
      <div style={{ margin: '10px auto 40px' }}>
        <BigBugMascot />
      </div>

      {/* Scroll Hint */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          color: 'var(--text-muted)',
          fontSize: '0.8rem',
          fontFamily: 'var(--font-mono)',
        }}
      >
        <ArrowDown size={14} />
        <span>SCROLL TO EXPLORE</span>
      </div>
    </section>
  );
};
