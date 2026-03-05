import React from 'react';
import Link from '@docusaurus/Link';
import clsx from 'clsx';

interface HelpSectionProps {
  className?: string;
}

export default function HelpSection({ className = '' }: HelpSectionProps): JSX.Element {
  return (
    <section className="px-4 py-10" style={{ backgroundColor: 'var(--help-section-bg, #F3F1F0)' }}>
      <div
        className={clsx(
          'mx-auto max-w-7xl p-4 py-10 lg:p-24 lg:py-20',
          className
        )}
      >
        <h2 className="mb-12 text-center text-[#21253B] dark:text-white lg:text-5xl" style={{ fontWeight: 500 }}>
          How can we help?
        </h2>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="rounded-2xl bg-white dark:bg-[#05051E] p-6" style={{ border: '1px solid rgba(0,0,0,0.06)' }}>

            <h3 className="my-3 text-[#21253B] dark:text-white font-medium">Premium Support</h3>
            <p className="text-[#686770] dark:text-[#C1BBB8]">
            Partner with the creators of Avalonia to ensure you have full support, every step of the way.
            </p>
            <Link
              href="https://avaloniaui.net/support?utm_source=docs&utm_medium=referral&utm_content=homepage_link"
              className="text-primary-00 dark:text-primary-100"
            >
              Explore Subscriptions &rarr;
            </Link>
          </div>

          <div className="rounded-2xl bg-white dark:bg-[#05051E] p-6" style={{ border: '1px solid rgba(0,0,0,0.06)' }}>

            <h3 className="my-3 text-[#21253B] dark:text-white font-medium">Development Services</h3>
            <p className="text-[#686770] dark:text-[#C1BBB8]">
              Whether it's app modernization, custom controls or additional features, we're here to help.
            </p>
            <Link
              href="https://avaloniaui.net/services?utm_source=docs&utm_medium=referral&utm_content=homepage_link"
              className="text-primary-500 dark:text-primary-100"
            >
              Learn More &rarr;
            </Link>
          </div>

          <div className="rounded-2xl bg-white dark:bg-[#05051E] p-6" style={{ border: '1px solid rgba(0,0,0,0.06)' }}>
            <h3 className="my-3 text-[#21253B] dark:text-white font-medium">FAQs</h3>
            <p className="text-[#686770] dark:text-[#C1BBB8]">
              Browse our FAQs to find answers to commonly asked
              questions.
            </p>
            <Link href="https://avaloniaui.net/faq?utm_source=docs&utm_medium=referral&utm_content=homepage_link" className="text-primary-500 dark:text-primary-100">
              View FAQs &rarr;
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        [data-theme='dark'] {
          --help-section-bg: #0B2A54;
        }
      `}</style>
    </section>
  );
}
