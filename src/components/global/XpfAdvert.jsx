import React from 'react';

const XpfLogo = () => (
<svg width="110" height="40" viewBox="0 0 110 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M31.8685 23.4009C32.4821 23.7603 33.0135 24.2427 33.429 24.8175L37.371 30.2708C39.0225 32.5555 38.4965 35.7374 36.1962 37.3777C35.3246 37.9991 34.2788 38.3334 33.2059 38.3334H26.0258C23.194 38.3334 20.8984 36.0534 20.8984 33.2408C20.8984 32.3309 21.1438 31.4376 21.6092 30.6539L24.8473 25.2005C26.2858 22.7779 29.4293 21.9722 31.8685 23.4009ZM27.1731 1.66675C30.0049 1.66675 32.3005 3.94678 32.3005 6.75934C32.3005 7.73098 32.0206 8.68234 31.4939 9.50114L14.4595 35.9826C13.5174 37.4472 11.8884 38.3334 10.1386 38.3334H6.79442C3.96262 38.3334 1.66699 36.0534 1.66699 33.2408V10.8334L1.68021 10.8342C1.94647 5.72667 6.20042 1.66675 11.4091 1.66675H27.1731Z" fill="#F5F5F5"/>
<path d="M70.6667 19.8818L76.4333 10.2485H72.0333L68.5333 16.2818L65.1 10.2485H60.6333L66.1667 19.4818L60 29.8485H64.4333L68.3333 23.1818L72.2333 29.8485H76.7L70.6667 19.8818ZM88.8167 9.84847C86.0167 9.84847 83.7167 10.9818 82.35 12.8151V10.2485H78.3833V33.5818H82.5833V27.5485C83.9833 29.2151 86.2167 30.2485 88.8167 30.2485C94.4167 30.2485 98.75 25.9151 98.75 20.0485C98.75 14.1485 94.4167 9.84847 88.8167 9.84847ZM88.3833 26.3151C84.8833 26.3151 82.25 23.6485 82.25 20.0151C82.25 16.3151 84.8833 13.6818 88.3833 13.6818C91.8833 13.6818 94.5167 16.3485 94.5167 20.0151C94.5167 23.6485 91.8833 26.3151 88.3833 26.3151ZM106.2 12.3151C106.2 10.8485 106.867 10.2151 108.367 10.2151H109L109.967 6.51514H108.267C104.733 6.51514 102.1 7.7818 102.1 12.0818V12.7485H100.067V16.3818H102.1V29.8485H106.2V16.3818H109.067V12.7485H106.2V12.3151Z" fill="#F5F5F5"/>
</svg>
);

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-1.5">
    <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const XpfAdvert = () => {
  return (
    <section className="py-6 lg:py-4 mx-auto max-w-7xl px-4">
      <div
        className="relative overflow-hidden rounded-2xl"
        style={{
          background: 'linear-gradient(135deg, #0a0f1a 0%, #101828 40%, #1a1f35 70%, #0d1117 100%)',
        }}
      >
        {/* Subtle gradient overlay for depth */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background: 'radial-gradient(ellipse at 80% 20%, rgba(99, 102, 241, 0.15) 0%, transparent 50%), radial-gradient(ellipse at 20% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
          }}
        />

        <div className="relative z-10 py-10 px-8 md:py-8 md:px-12 text-center">
          {/* XPF Logo */}
          <div className="flex items-center justify-center gap-2 mb-8 text-white/80">
            <XpfLogo />
          </div>

          {/* Headline */}
          <h2
            className="text-white mb-3 mx-auto max-w-4xl"
            style={{
              fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
              fontWeight: 300,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            A cross-platform WPF.
          </h2>

          {/* Subtext */}
          <p className="text-gray-400 text-lg mb-5 mx-auto max-w-xl">
            Experience your WPF app on macOS, Linux, Mobile & Web
          </p>

          {/* Buttons */}
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <a
              href="https://avaloniaui.net/xpf?utm_source=docs&utm_medium=referral&utm_content=advert#get-started"
              className="inline-flex items-center px-6 py-3 bg-white text-gray-900 rounded-full text-sm font-medium transition-all hover:bg-gray-100 hover:shadow-lg"
            >
              Try it now
              <ArrowIcon />
            </a>
            <a
              href="https://avaloniaui.net/xpf?utm_source=docs&utm_medium=referral&utm_content=advert#pricing"
              className="inline-flex items-center px-6 py-3 text-white text-sm font-medium transition-all hover:text-gray-300"
            >
              See plans
              <ArrowIcon />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default XpfAdvert;