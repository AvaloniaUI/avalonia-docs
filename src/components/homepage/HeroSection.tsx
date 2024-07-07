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
      <section className="relative no-underline-links px-4 pt-10 pb-10 lg:py-0">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Waves />
        </div>
        <div className="relative z-5 flex flex-col items-center justify-between py-32">
          <h2
            className="mb-4 font-outfit font-normal text-white text-center hero-title"
          >
            Avalonia <br/> Documentation
          </h2>
          <p className="max-w-xl text-center font-outfit text-xl text-white mt-5">
            Avalonia empowers developers to create cross-platform applications for Windows, macOS, Linux, iOS, Android, and web browsers using .NET with unparalleled ease. One codebase, infinite possibilities.
          </p>
          <div>
            <Link
              className="button button--secondary button--lg"
              to="/docs/welcome"
            >
              Get Started!
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}