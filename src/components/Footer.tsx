import React from 'react';
import { ArrowUp } from 'lucide-react';
import { soundEngine } from '../utils/audio';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    soundEngine.playBlip(1000);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        borderTop: '1px solid rgba(0, 255, 136, 0.12)',
        backgroundColor: 'rgba(6, 10, 13, 0.95)',
        padding: '36px 24px 28px',
        position: 'relative',
        zIndex: 10,
      }}
    >
      <div
        style={{
          maxWidth: 'var(--max-w-content)',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '20px',
          }}
        >
          {/* Logo & Tagline */}
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '6px',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: '#FFFFFF',
                }}
              >
                BIG<span style={{ color: '#00FF88' }}>BUG</span>
              </span>
            </div>
            <p
              style={{
                color: 'var(--text-secondary)',
                fontSize: '0.88rem',
                maxWidth: '420px',
                lineHeight: 1.5,
              }}
            >
              Debugging the present, building the future.
            </p>
          </div>

          {/* Back to Top */}
          <div>
            <button
              onClick={scrollToTop}
              title="Return to top"
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '8px',
                backgroundColor: 'rgba(0, 255, 136, 0.1)',
                border: '1px solid rgba(0, 255, 136, 0.3)',
                color: '#00FF88',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>

        {/* Bottom Line */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '16px',
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.72rem',
            color: 'var(--text-muted)',
            gap: '12px',
          }}
        >
          <div>BIGBUG © {new Date().getFullYear()}</div>
          <div style={{ color: '#00FF88' }}>● LAUNCHING SOON</div>
        </div>
      </div>
    </footer>
  );
};
