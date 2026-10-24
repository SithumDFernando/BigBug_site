import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { soundEngine } from '../utils/audio';

export const Navbar: React.FC = () => {
  const [soundOn, setSoundOn] = useState(false);

  const toggleSound = () => {
    const newState = soundEngine.toggle();
    setSoundOn(newState);
  };

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        width: '100%',
        backdropFilter: 'blur(16px)',
        backgroundColor: 'rgba(8, 12, 16, 0.8)',
        borderBottom: '1px solid rgba(0, 255, 136, 0.12)',
      }}
    >
      <div
        style={{
          maxWidth: 'var(--max-w-content)',
          margin: '0 auto',
          padding: '16px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Brand / Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              backgroundColor: 'rgba(0, 255, 136, 0.1)',
              border: '1px solid rgba(0, 255, 136, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 12px rgba(0, 255, 136, 0.2)',
            }}
          >
            {/* Mini Bug Icon */}
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
              <path
                d="M12 4 C10 4 9 5.5 9 7 L15 7 C15 5.5 14 4 12 4 Z"
                fill="#00FF88"
              />
              <path
                d="M8 8 C8 8 7 13 8 16 C9 19 12 20 12 20 C12 20 15 19 16 16 C17 13 16 8 16 8 Z"
                fill="#152229"
                stroke="#00FF88"
                strokeWidth="1.5"
              />
              <circle cx="12" cy="13" r="2.5" fill="#00FF88" />
              <path d="M7 6 L4 4 M17 6 L20 4 M6 11 L2 10 M18 11 L22 10 M7 16 L4 18 M17 16 L20 18" stroke="#00FF88" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>

          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.3rem',
              fontWeight: 700,
              letterSpacing: '0.04em',
              color: '#FFFFFF',
            }}
          >
            BIG<span style={{ color: '#00FF88' }}>BUG</span>
          </span>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Sound Toggle Button */}
          <button
            onClick={toggleSound}
            aria-label={soundOn ? 'Mute Sci-Fi Sound FX' : 'Enable Sci-Fi Sound FX'}
            title={soundOn ? 'Sound FX Enabled (Click to Mute)' : 'Sound FX Muted (Click to Enable)'}
            style={{
              background: soundOn ? 'rgba(0, 255, 136, 0.15)' : 'rgba(255, 255, 255, 0.05)',
              border: `1px solid ${soundOn ? 'rgba(0, 255, 136, 0.4)' : 'rgba(255, 255, 255, 0.1)'}`,
              color: soundOn ? '#00FF88' : 'var(--text-secondary)',
              borderRadius: '8px',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            {soundOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>
        </div>
      </div>
    </header>
  );
};
