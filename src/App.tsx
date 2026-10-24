import React from 'react';
import { ParticleField } from './components/ParticleField';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { JourneyTeaser } from './components/JourneyTeaser';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
      {/* Background Interactive Particle Field */}
      <ParticleField />

      {/* Cyber Grid & Vignette Overlays */}
      <div className="cyber-grid-overlay" />
      <div className="cyber-vignette" />

      {/* Navigation Bar */}
      <Navbar />

      {/* Main Content Area */}
      <main style={{ position: 'relative', zIndex: 10 }}>
        <HeroSection />
        <JourneyTeaser />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
