import React from 'react';
import Link from '@docusaurus/Link';
import clsx from 'clsx';

export default function HelpSection({ className = '' }) {
  return (
    <section className="px-4">
      <div
        className={clsx(
          'mx-auto max-w-7xl rounded-3xl bg-white p-4 py-10 text-black dark:bg-darkblue dark:text-white lg:p-24 lg:py-20',
          className
        )}
      >
        <h2 className="mb-12 text-center lg:text-3xl">
          How can we help?
        </h2>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="rounded-lg bg-zinc-100 p-6 dark:bg-zinc-900">
            
            <h3 className="my-3">Premium Support</h3>
            <p className="text-zinc-600 dark:text-zinc-400">
            Partner with the creators of Avalonia to ensure you have the best support, every step of the way.
            </p>
            <Link
              href="https://avaloniaui.net/support"
              className="text-primary-00 dark:text-primary-100"
            >
              Explore Subscriptions &rarr;
            </Link>
          </div>

          <div className="rounded-lg bg-zinc-100 p-6 dark:bg-zinc-900">
          
            <h3 className="my-3">Development Services</h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              Whether it's app modernisation, custom controls or additional features, we're here to help.
            </p>
            <Link
              href="https://avaloniaui.net/Services"
              className="text-primary-500 dark:text-primary-100"
            >
              Learn More &rarr;
            </Link>
          </div>

          <div className="rounded-lg bg-zinc-100 p-6 dark:bg-zinc-900">
            <h3 className="my-3">FAQs</h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              Browse through our FAQs to find answers to commonly asked
              questions.
            </p>
            <Link href="https://avaloniaui.net/FAQ" className="text-primary-500 dark:text-primary-100">
              View FAQs &rarr;
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
