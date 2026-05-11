import React from 'react';
import Link from '@docusaurus/Link';
import {
  Globe,
  Monitor,
  Download,
  BookOpen,
  PlayCircle,
  Code2,
  Megaphone,
  Users,
} from 'lucide-react';

interface QuickLinkCardProps {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  description: string;
}

function QuickLinkCard({
  title,
  icon: Icon,
  href,
  description,
}: QuickLinkCardProps): JSX.Element {
  return (
    <Link
      to={href}
      className="flex flex-col p-8 no-underline hover:no-underline group transition-colors"
    >
      <div className="mb-5">
        <Icon className="w-10 h-10 text-[#05051E] dark:text-[#F3F1F0]" />
      </div>
      <h3
        className="mb-2 text-[#21253B] dark:text-white group-hover:text-[#007DF9] transition-colors"
        style={{
          fontWeight: 500,
          fontSize: '20px',
          lineHeight: '28px',
          letterSpacing: '-0.02em',
        }}
      >
        {title}
      </h3>
      <span
        style={{
          fontSize: '15px',
          lineHeight: '24px',
          letterSpacing: '0.32px',
          color: '#686770',
        }}
      >
        {description}
      </span>
    </Link>
  );
}

interface QuickLink {
  description: string;
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

export default function HeroQuickLinks(): JSX.Element {
  const quickLinks: QuickLink[] = [
    {
      description: 'Learn about the cross-platform .NET UI framework.',
      title: 'What is Avalonia?',
      href: '/docs/welcome#what-is-avalonia',
      icon: Globe,
    },
    {
      description: 'Windows, macOS, Linux, iOS, Android, and WASM.',
      title: 'Supported platforms',
      href: '/docs/supported-platforms',
      icon: Monitor,
    },
    {
      description: 'Set up your development environment.',
      title: 'Installation',
      href: '/docs/get-started/install-avalonia',
      icon: Download,
    },
    {
      description: 'Step-by-step walkthrough for new developers.',
      title: 'Build your first app',
      href: '/docs/get-started/starter-tutorial/',
      icon: BookOpen,
    }
  ];

  return (
    <section className="py-24 px-6" style={{ backgroundColor: 'var(--homepage-bg, #F3F1F0)' }}>
      <div className="max-w-[1200px] mx-auto">
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
          Documentation
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
          Everything you need to build with Avalonia.
        </h2>

        {/* 4x2 grid with dividers (matching marketing pattern) */}
        <div
          className="grid md:grid-cols-4"
          style={{ borderTop: '1px solid #E3DFDC' }}
        >
          {quickLinks.map((link, index) => (
            <div
              key={index}
              className={index % 4 !== 3 ? 'md:border-r' : ''}
              style={{
                borderBottom: '1px solid #E3DFDC',
                borderColor: '#E3DFDC',
              }}
            >
              <QuickLinkCard
                title={link.title}
                icon={link.icon}
                href={link.href}
                description={link.description}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
