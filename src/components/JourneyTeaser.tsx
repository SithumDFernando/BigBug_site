import React from 'react';
import { Sparkles } from 'lucide-react';

export const JourneyTeaser: React.FC = () => {
  return (
    <section
      style={{
        maxWidth: '820px',
        margin: '20px auto 70px',
        padding: '0 24px',
        position: 'relative',
        zIndex: 10,
        textAlign: 'center',
      }}
    >
      <div
        className="glass-panel"
        style={{
          padding: '48px 36px',
          borderRadius: '20px',
          border: '1px solid rgba(0, 255, 136, 0.2)',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.5), inset 0 0 30px rgba(0, 255, 136, 0.03)',
        }}
      >
        <div
          className="badge-tech"
          style={{
            marginBottom: '18px',
            backgroundColor: 'rgba(0, 255, 136, 0.08)',
          }}
        >
          <Sparkles size={13} color="#00FF88" />
          <span>WHAT IS BREWING</span>
        </div>

        <h2
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
            fontWeight: 700,
            color: '#FFFFFF',
            marginBottom: '16px',
            letterSpacing: '-0.01em',
          }}
        >
          Our Journey. Our Trophies. <span style={{ color: '#00FF88' }}>Our Code.</span>
        </h2>

        <p
          style={{
            maxWidth: '620px',
            margin: '0 auto',
            color: 'var(--text-secondary)',
            fontSize: '1.05rem',
            lineHeight: 1.7,
          }}
        >
          We are preparing our central hub. This space will house our complete hackathon
          chronicles, sleepless 48-hour sprints, breakthrough project repositories,
          and podium finishes. Stay tuned as we compile our story.
        </p>
      </div>
    </section>
  );
};
