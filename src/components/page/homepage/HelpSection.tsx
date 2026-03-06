import React from 'react';
import Link from '@docusaurus/Link';
import { PrimaryButton } from '@site/src/components/ui/PrimaryButton';

const helpCards = [
  {
    title: 'Enhanced Support',
    description: 'Partner with the creators of Avalonia to ensure you have full support, every step of the way.',
    link: 'https://avaloniaui.net/support?utm_source=docs&utm_medium=referral&utm_content=homepage_link',
    linkText: 'Explore Subscriptions',
  },
  {
    title: 'Development Services',
    description: "Whether it's app modernization, custom controls or additional features, we're here to help.",
    link: 'https://avaloniaui.net/services?utm_source=docs&utm_medium=referral&utm_content=homepage_link',
    linkText: 'Learn More',
  },
  {
    title: 'FAQs',
    description: 'Browse our FAQs to find answers to commonly asked questions.',
    link: 'https://avaloniaui.net/faq?utm_source=docs&utm_medium=referral&utm_content=homepage_link',
    linkText: 'View FAQs',
  },
];

interface HelpSectionProps {
  className?: string;
}

export default function HelpSection({ className = '' }: HelpSectionProps): JSX.Element {
  return (
    <section className={`px-6 py-24 ${className}`} style={{ backgroundColor: 'var(--homepage-bg, #F3F1F0)' }}>
      <div className="mx-auto max-w-[1200px]">
        {/* Section label */}
        <p
          className="uppercase mb-4"
          style={{
            fontSize: '12px',
            letterSpacing: '2.4px',
            fontWeight: 380,
            color: '#696460',
          }}
        >
          Support
        </p>

        {/* Heading */}
        <h2
          className="text-[#21253B] dark:text-white mb-16 max-w-3xl"
          style={{
            fontWeight: 380,
            fontSize: 'clamp(32px, 5vw, 48px)',
            lineHeight: '1.2',
            letterSpacing: '-0.96px',
          }}
        >
          How can we help?
        </h2>

        {/* Cards grid with dividers (matching marketing FeaturesSection pattern) */}
        <div className="grid md:grid-cols-3" style={{ borderTop: '1px solid #E3DFDC' }}>
          {helpCards.map((card, i) => (
            <div
              key={card.title}
              className={`border-b ${i % 3 !== 2 ? 'md:border-r' : ''}`}
              style={{ borderColor: '#E3DFDC' }}
            >
              <div className="flex flex-col p-8">
                <h3
                  className="text-[#21253B] dark:text-white mb-2"
                  style={{ fontSize: '20px', lineHeight: '28px', letterSpacing: '-0.02em', fontWeight: 500 }}
                >
                  {card.title}
                </h3>
                <p
                  className="mb-6"
                  style={{ fontSize: '15px', lineHeight: '24px', letterSpacing: '0.32px', color: '#686770' }}
                >
                  {card.description}
                </p>
                <Link
                  href={card.link}
                  className="text-[#007DF9] no-underline hover:underline"
                  style={{ fontSize: '15px', fontWeight: 500 }}
                >
                  {card.linkText} &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
