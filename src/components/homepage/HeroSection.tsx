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

 

  export default function HeroSection() {
    return (
      <>
        <section className="no-underline-links px-4 pt-16 lg:py-0">
          <div className="flex flex-col items-center justify-between py-14">
            <h2 className="mb-4 font-jakarta text-5xl font-bold">
              Build with Avalonia
            </h2>
            <p className="max-w-xl text-center text-text-400 mt-5">
              Avalonia empowers developers to create cross-platform applications for Windows, macOS, Linux, iOS, Android, and web browsers using .NET with unparalleled ease.             
            </p>
            <div>
              <Link
                className="button button--secondary button--lg"
                to="/docs/welcome">
                Get Started! 
              </Link>
            </div>
          </div>
        </section>
    
      </>
    );
  }