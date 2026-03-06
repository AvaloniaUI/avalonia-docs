import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { PrimaryButton } from '@site/src/components/ui/PrimaryButton';

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

      {/* Bottom fade overlay */}
      <div
        className="absolute inset-x-0 bottom-0 z-[1] pointer-events-none"
        style={{
          height: '35%',
          background: 'linear-gradient(to bottom, transparent, var(--hero-fade-target, #F3F1F0))',
        }}
      />

      {/* Hero content — left-aligned like marketing site */}
      <div
        className="relative z-10 mx-auto px-6 sm:px-10 md:px-16 lg:px-20"
        style={{
          maxWidth: '1600px',
          paddingTop: 'clamp(140px, 16vw, 200px)',
          paddingBottom: 'clamp(40px, 8vw, 100px)',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h1
            className="text-white"
            style={{
              fontWeight: 380,
              fontSize: 'clamp(40px, 10vw, 96px)',
              lineHeight: '1.125em',
              letterSpacing: '-0.02em',
            }}
          >
            Avalonia Documentation
          </h1>

          <p
            className="text-white/80"
            style={{
              fontSize: '20px',
              fontWeight: 380,
              lineHeight: '1.6em',
              letterSpacing: '0.4px',
            }}
          >
            Everything you need to build cross-platform apps with Avalonia, trusted by JetBrains, Unity, and thousands of developers.
          </p>
        </div>

        <div className="flex items-center gap-4" style={{ marginTop: '48px' }}>
          <PrimaryButton to="/docs/get-started/" variant="white" size="lg">
            Get started
          </PrimaryButton>
        </div>
      </div>

      <style>{`
        html[data-theme='dark'] {
          --hero-fade-target: #05051E;
        }
      `}</style>
    </section>
  );
}
