import React from 'react';
import { PrimaryButton } from '@site/src/components/ui/PrimaryButton';

const steps = [
  {
    number: 1,
    title: 'Install the templates',
    command: 'dotnet new install Avalonia.Templates',
  },
  {
    number: 2,
    title: 'Create your first app',
    command: 'dotnet new avalonia.app -o MyApp',
  },
  {
    number: 3,
    title: 'Run your app',
    command: 'dotnet run',
  },
];

export default function QuickStartSection(): JSX.Element {
  return (
    <section className="py-24 px-6" style={{ backgroundColor: 'var(--homepage-bg, #F3F1F0)' }}>
      <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-12 items-start">
        {/* Left: Quick Start Guide card */}
        <div
          className="rounded-2xl bg-white dark:bg-[#18181b] p-8"
          style={{ border: '1px solid #E3DFDC' }}
        >
          <h3
            className="text-[#21253B] dark:text-white mb-2"
            style={{
              fontWeight: 380,
              fontSize: '24px',
              lineHeight: '32px',
              letterSpacing: '-0.48px',
            }}
          >
            Quick Start Guide
          </h3>

          <p
            className="mb-8"
            style={{ fontSize: '15px', lineHeight: '24px', letterSpacing: '0.32px', color: '#686770' }}
          >
            Get up and running with Avalonia in minutes
          </p>

          <div className="flex flex-col gap-6">
            {steps.map((step) => (
              <div key={step.number}>
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-7 h-7 rounded-full bg-[#05051E] dark:bg-white text-white dark:text-[#05051E] flex items-center justify-center flex-shrink-0"
                    style={{ fontSize: '13px', fontWeight: 600 }}
                  >
                    {step.number}
                  </div>
                  <span
                    className="font-medium text-[#21253B] dark:text-white"
                    style={{ fontSize: '15px', letterSpacing: '0.3px' }}
                  >
                    {step.title}
                  </span>
                </div>

                <div
                  className="rounded-lg px-4 py-3 font-mono text-[#21253B] dark:text-white"
                  style={{
                    fontSize: '13px',
                    lineHeight: '20px',
                    letterSpacing: '0.3px',
                    backgroundColor: '#FAF7F5',
                  }}
                >
                  <span style={{ color: '#007DF9' }}>dotnet</span>{' '}
                  <span>{step.command.replace('dotnet ', '')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: CTA */}
        <div className="flex flex-col justify-center h-full py-8">
          <p
            className="uppercase mb-4"
            style={{
              fontSize: '12px',
              letterSpacing: '2.4px',
              fontWeight: 380,
              color: '#696460',
            }}
          >
            Get started today
          </p>

          <h2
            className="text-[#05051E] dark:text-white mb-4"
            style={{
              fontWeight: 380,
              fontSize: 'clamp(32px, 5vw, 44px)',
              lineHeight: '1.2',
              letterSpacing: '-0.96px',
            }}
          >
            Ready to build cross-platform apps?
          </h2>

          <p
            className="mb-8"
            style={{ fontSize: '18px', lineHeight: '28px', letterSpacing: '0.4px', color: '#686770' }}
          >
            Start building with Avalonia today. It's free, open source, and production ready.
          </p>

          <div>
            <PrimaryButton to="/docs/get-started/" variant="dark" size="lg">
              View the docs
            </PrimaryButton>
          </div>
        </div>
      </div>
    </section>
  );
}
