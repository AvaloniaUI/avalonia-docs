import React from 'react';
import Link from '@docusaurus/Link';
import BrowserOnly from '@docusaurus/BrowserOnly';

function AnimatedBlueLazy() {
  return (
    <BrowserOnly fallback={
      <div className="absolute inset-0" style={{ background: 'linear-gradient(151deg, #165bff 52%, rgb(30, 30, 69) 103%)' }} />
    }>
      {() => {
        const { AnimatedBlue } = require('@site/src/components/ui/AnimatedBlue');
        return <AnimatedBlue className="absolute inset-0" />;
      }}
    </BrowserOnly>
  );
}

export default function HeroSection() {
  return (
    <section
      className="relative z-10"
      style={{ overflow: 'clip' }}
    >
      {/* Animated blue gradient background (matches marketing site) */}
      <AnimatedBlueLazy />

      {/* Bottom fade overlay — smooths the transition into the page background */}
      <div
        className="absolute inset-x-0 bottom-0 z-[1] pointer-events-none"
        style={{
          height: '35%',
          background: 'linear-gradient(to bottom, transparent, var(--hero-fade-target, rgb(243, 241, 240)))',
        }}
      />

      {/* Hero content */}
      <div
        className="relative z-10 flex flex-col justify-center items-center"
        style={{
          padding: 'clamp(100px, 14vw, 156px) clamp(24px, 6vw, 80px) clamp(40px, 6vw, 80px)',
          textAlign: 'center',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
          <h1
            className="text-white"
            style={{
              fontWeight: 380,
              fontSize: 'clamp(40px, 8vw, 72px)',
              lineHeight: '1.125em',
              letterSpacing: '-0.02em',
            }}
          >
            Avalonia documentation
          </h1>

          <p
            className="text-white max-w-xl"
            style={{
              fontSize: '20px',
              fontWeight: 300,
              lineHeight: '32px',
              letterSpacing: '0.4px',
              opacity: 0.8,
            }}
          >
            Harness the power of cross-platform .NET. One codebase. Infinite possibilities.
          </p>
        </div>

        <div style={{ marginTop: '48px' }}>
          <Link
            to="/docs/welcome"
            className="inline-flex items-center no-underline hover:no-underline"
            style={{
              backgroundColor: '#05051E',
              color: '#F3F1F0',
              borderRadius: '9999px',
              padding: '12px 24px',
              fontWeight: 550,
              letterSpacing: '0.28px',
              fontSize: '16px',
              transition: 'opacity 0.2s',
            }}
          >
            Get started
          </Link>
        </div>
      </div>

      <style>{`
        html[data-theme='dark'] {
          --hero-fade-target: #1B1B1B;
        }
      `}</style>
    </section>
  );
}
