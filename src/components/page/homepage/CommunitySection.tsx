import React, { useEffect, useRef, useState } from 'react';
import { PrimaryButton } from '@site/src/components/ui/PrimaryButton';

const stats: { value: string; numericValue?: number; label: string }[] = [
  { value: 'Most-starred', label: '.NET UI on GitHub' },
  { value: '534', numericValue: 534, label: 'Contributors' },
  { value: '124,340,248', numericValue: 124340248, label: 'Installs' },
  { value: '30,043', numericValue: 30043, label: 'Stargazers' },
];


function formatNumber(n: number): string {
  return n.toLocaleString('en-US');
}

function useCountUp(target: number, duration: number, trigger: boolean) {
  const [value, setValue] = useState(0);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (!trigger) return;

    const start = performance.now();
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = ease(progress);
      setValue(Math.round(eased * target));

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      }
    }

    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [target, duration, trigger]);

  return value;
}

function AnimatedStat({ stat, visible }: { stat: (typeof stats)[number]; visible: boolean }) {
  const animatedValue = useCountUp(stat.numericValue ?? 0, 2000, visible);

  const displayValue = stat.numericValue != null
    ? formatNumber(animatedValue)
    : stat.value;

  return (
    <div>
      <p
        className="text-white font-medium whitespace-nowrap m-0"
        style={{ fontSize: '20px', lineHeight: '28px', letterSpacing: '-0.4px' }}
      >
        {displayValue}
      </p>
      <p
        className="whitespace-nowrap m-0"
        style={{ fontSize: '12px', lineHeight: '18px', letterSpacing: '0.24px', color: '#9ED0F6', opacity: 0.8 }}
      >
        {stat.label}
      </p>
    </div>
  );
}

export default function CommunitySection(): JSX.Element {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative overflow-hidden py-24">
      {/* Blue gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #0B2A54 0%, #007DF9 50%, #0F4278 100%)',
        }}
      />
      {/* Noise overlay for texture */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(255,255,255,0.05) 0%, transparent 50%)',
        }}
      />

      <div ref={sectionRef} className="relative z-10 max-w-[1200px] mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: content */}
          <div>
            <h2
              className="text-white mb-8"
              style={{
                fontWeight: 380,
                fontSize: 'clamp(36px, 5vw, 56px)',
                lineHeight: '1.15',
                letterSpacing: '-1.12px',
              }}
            >
              Loved by developers.{'\n'}Trusted by enterprise.
            </h2>

            {/* Stats grid */}
            <div className="grid grid-cols-2 sm:flex sm:flex-nowrap gap-y-6 mb-10">
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className={`pr-5 sm:flex-shrink-0 ${i > 0 ? 'sm:pl-5 sm:border-l sm:border-white/20' : ''}`}
                >
                  <AnimatedStat stat={stat} visible={visible} />
                </div>
              ))}
            </div>

            <PrimaryButton to="/docs/welcome" variant="white" size="md">
              Get Started
            </PrimaryButton>
          </div>

      
        </div>
      </div>
    </section>
  );
}
