import React from 'react';

export default function HeroSection() {
  return (
    <>
      <section 
        className="relative no-underline-links px-4 pt-5 pb-2 lg:py-24"
        style={{
          background: 'linear-gradient(151deg, var(--token-39f1e7bd-d6a2-4d0f-90ef-8d65a8c77a7c, #165bff) 52%, rgb(30, 30, 69) 103%)'
        }}
      >
        <div className="relative z-5 flex flex-col items-center justify-between py-20">
          <a href="/docs/welcome">
            <h1
              className="mb-4 font-normal text-7xl text-white text-center"
            >
              Avalonia documentation
           </h1>
          <div className="mobile-hidden max-w-xl text-center text-3xl text-white" style={{
            fontFamily: 'Outfit',
            fontWeight: '400',
            lineHeight: '41px'
         }}>
            Harness the power of cross-platform .NET         
          </div>

          <div className="mobile-hidden max-w-xl text-center text-3xl text-white" style={{
            fontFamily: 'Outfit',
            fontWeight: '400',
            lineHeight: '41px'
          }}>
            One codebase. Infinite possibilities.     
          </div>
          
          </a>
        </div>
      </section>
    </>
  );
}