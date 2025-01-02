import React from 'react';
import Waves from './homepage/Waves'; 

const Cta = () => {
  return (
    <>
      <section className="py-5 lg:py-[20px] mx-auto max-w-7xl">
        <div className="container mx-auto relative">
          <div className="relative z-10 overflow-hidden py-12 px-8 md:p-[25px]">
            <div className="flex flex-wrap items-center -mx-4">
              <div className="w-full px-4 lg:w-2/3">
                <h2 className="block mb-4 font-medium text-white">
                  Avalonia XPF - Cross-Platform WPF
                </h2>
                <p className="mb-6 text-white sm:mb-8 sm:text-[30px]/[38px] lg:mb-0" style={{ fontSize: '4.5rem', whiteSpace: 'normal', width: 'fit-content', lineHeight: '1.2' }}>
                  Take your WPF apps to macOS and Linux in minutes, not months.
                </p>
              </div>
              <div className="w-full px-4 lg:w-1/3">
                <div className="flex flex-wrap lg:justify-end">
                  <a
                    href="https://avaloniaui.net/xpf?utm_source=docs&utm_medium=referral&utm_content=advert"
                    className="inline-flex py-3 my-1 mr-4 text-base font-medium transition bg-white rounded-md hover:bg-shadow-1 text-primary px-7"
                  >
                    Start Free Trial
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 z-0 overflow-hidden rounded-2xl">
            <Waves />
          </div>
        </div>
      </section>
    </>
  );
};

export default Cta;