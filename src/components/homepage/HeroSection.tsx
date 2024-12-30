import React from 'react';
import Link from '@docusaurus/Link';
import {
  ChatMultipleRegular,
  LiveRegular,
  MicRegular,
  VideoRegular,
} from '@fluentui/react-icons';
import ThemedImage from '@theme/ThemedImage';
import clsx from 'clsx';
import Waves from './Waves';

export default function HeroSection() {
  return (
    <>
      <section className="relative no-underline-links px-4 pt-5 pb-2 lg:py-0">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Waves />
        </div>
        <div className="relative z-5 flex flex-col items-center justify-between py-20">
          <h2
            className="mb-4 font-outfit font-normal text-white text-center hero-title"
          >
            Avalonia documentation
          </h2>
          <p className="mobile-hidden max-w-xl text-center font-outfit text-xl text-white">
            Avalonia empowers developers to create cross-platform applications for Windows, macOS, Linux, iOS, Android, and web browsers using .NET.
          </p>
          <div>
           
          </div>
        </div>
      </section>
    </>
  );
}