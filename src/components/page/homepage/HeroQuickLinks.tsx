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
        className="text-[#686770]"
        style={{
          fontSize: '15px',
          lineHeight: '24px',
          letterSpacing: '0.32px',
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
      href: '/docs/get-started/',
      icon: Download,
    },
    {
      description: 'Step-by-step walkthrough for new developers.',
      title: 'Build your first app',
      href: '/docs/get-started/starter-tutorial',
      icon: BookOpen,
    },
    {
      description: 'Watch guided video walkthroughs.',
      title: 'Video tutorials',
      href: 'https://www.youtube.com/playlist?list=PLrW43fNmjaQWwIdZxjZrx5FSXcNzaucOO',
      icon: PlayCircle,
    },
    {
      description: 'Clone and explore real-world examples.',
      title: 'Get sample code',
      href: '/docs/samples-tutorials',
      icon: Code2,
    },
    {
      description: 'See the latest features and improvements.',
      title: "What's new?",
      href: 'https://github.com/AvaloniaUI/Avalonia/releases',
      icon: Megaphone,
    },
    {
      description: 'Connect with the Avalonia community.',
      title: 'Join the community',
      href: '/docs/community',
      icon: Users,
    },
  ];

  return (
    <section className="py-12">
      <div className="container">
        <div
          className="grid md:grid-cols-4"
          style={{ borderTop: '1px solid rgba(0,0,0,0.08)' }}
        >
          {quickLinks.map((link, index) => (
            <div
              key={index}
              className={index % 4 !== 3 ? 'md:border-r' : ''}
              style={{
                borderBottom: '1px solid rgba(0,0,0,0.08)',
                borderColor: 'rgba(0,0,0,0.08)',
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
