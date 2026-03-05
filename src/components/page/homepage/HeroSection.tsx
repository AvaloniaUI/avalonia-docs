import React from 'react';
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

function PrimaryButtonLazy({ to, variant, size, children }: { to: string; variant?: 'dark' | 'white'; size?: 'md' | 'lg'; children: React.ReactNode }) {
  return (
    <BrowserOnly fallback={
      <a
        href={to}
        className="inline-flex items-center gap-2 rounded-full whitespace-nowrap no-underline"
        style={{ backgroundColor: '#05051E', color: '#F3F1F0', padding: '12px 12px 12px 20px' }}
      >
        {children}
      </a>
    }>
      {() => {
        const { PrimaryButton } = require('@site/src/components/ui/PrimaryButton');
        return <PrimaryButton to={to} variant={variant} size={size}>{children}</PrimaryButton>;
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
          background: 'linear-gradient(to bottom, transparent, var(--hero-fade-target, #F3F1F0))',
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
              fontSize: 'clamp(48px, 6vw, 96px)',
              lineHeight: '1.125em',
              letterSpacing: '-1.92px',
            }}
          >
            The future of .NET UI
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
            Avalonia Developer Documentation
          </p>
        </div>

        <div className="flex items-center gap-6" style={{ marginTop: '56px' }}>
          <PrimaryButtonLazy to="/docs/welcome" variant="dark" size="lg">
            Get started
          </PrimaryButtonLazy>
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
