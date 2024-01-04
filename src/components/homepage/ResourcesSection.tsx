import Link from '@docusaurus/Link';
import React, { useState } from 'react';
import clsx from 'clsx';
import {
  ArrowRightFilled,
  ChevronLeftRegular,
  ChevronRightRegular,
} from '@fluentui/react-icons';

interface Resource {
  url: string;
  type: string;
  title: string;
  description: string;
  image: string;
}

const ALL_RESOURCES: Resource[] = [
  {
    url: 'https://avaloniaui.net/Blog/is-wpf-dead',
    type: 'blog',
    title: 'Is WPF Dead?',
    description:
      'The Future of WPF: A Glimmer of Hope or a Fading Light? Taking a look at the state of WPF and how it compares with Avalonia.',
    image:
      'https://sq.avaloniaui.net/api/assets/a87f1f33-353b-40c8-a47c-d58fec240880',
  },
  {
    url: 'https://avaloniaui.net/Blog/balancing-growth-and-sustainability-avalonia-s-financial-evolution',
    type: 'blog',
    title: 'Balancing Growth and Sustainability - Avalonias Financial Evolution',
    description:
      "Discussing the challenges of monetising open-source software and how we're handling Avalonia's rapid growth and revenue diversification.",
    image:
      'https://sq.avaloniaui.net/api/assets/015d1f17-3b5a-4359-ae26-2501de542c5f',
  },
  {
    url: 'https://avaloniaui.net/Blog/10-years-of-avalonia',
    type: 'blog',
    title: '10 years of Avalonia!',
    description:
      "Celebrating a decade of innovation and community-driven development, this blog post takes a deep dive into Avalonia's ten-year journey.",
    image:
      'https://sq.avaloniaui.net/api/assets/745fccb4-5577-4319-a629-b21e2fdf1d2f',
  },
  {
    url: 'https://www.youtube.com/watch?v=THKjD-ZwGPk&t=3s&ab_channel=JetBrains',
    type: 'video',
    title: 'Avalonia UI and JetBrains Rider - JetBrains .NET Day Online 23',
    description:
      'Our latest session from JetBrains .NET Day Online 2023',
    image: 'https://i3.ytimg.com/vi/THKjD-ZwGPk/maxresdefault.jpg',
  },
  {
    url: 'https://www.youtube.com/watch?v=ZkrZc8Neh6A',
    type: 'video',
    title: 'Unleashing the Power of Cross-Platform Development with Avalonia UI | .NET Conf 2023',
    description:
      'Our latest session from .NET Conf 2023',
    image: 'https://i3.ytimg.com/vi/9PZVjcp3Xxc/maxresdefault.jpg',
  },
  {
    url: 'https://www.youtube.com/watch?v=bDyXfEWyJe8&ab_channel=.NETFoundation',
    type: 'video',
    title: 'Building Cross-Platform Apps with Avalonia',
    description: 'Whats new in Avalonia!',
    image: 'https://i3.ytimg.com/vi/bDyXfEWyJe8/maxresdefault.jpg',
  },
];

function Resource({
  type,
  url,
  image,
  title,
  description,
}: Resource) {
  return (
    <Link
      className="fade-in group flex flex-col justify-between"
      key={title}
      href={url}
    >
      <div>
        <div className="mb-3 overflow-hidden rounded-lg">
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="aspect-video h-full w-full object-cover transition-transform group-hover:scale-110"
          />
        </div>
        <h3 className="font-semibold text-black group-hover:text-primary-100 dark:text-white dark:group-hover:text-primary-100 lg:text-xl">
          {title}
        </h3>
        <p className="leading-snug text-text-400">{description}</p>
      </div>
     
    </Link>
  );
}

export default function ResourcesSection() {
  const [page, setPage] = useState(1);
  const [activeType, setActiveType] = useState<'all' | 'blog' | 'video'>('all');

  const resources =
    activeType === 'all'
      ? ALL_RESOURCES
      : ALL_RESOURCES.filter((r) => r.type === activeType);

  const currentResources = resources.slice((page - 1) * 3, page * 3);

  const pages = Math.ceil(resources.length / 3);

  const nextPage = () => {
    if (page < pages) {
      setPage(page + 1);
    }
  };

  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <section className="no-underline-links my-20 px-6">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between">
          <div>
            <span className="dyte-badge">News & Content</span>
            <h2 className="mb-6 text-4xl">Want to learn more?</h2>
          </div>
          <Link
            to="https://avaloniaui.net/blog"
            className="font-jakarta text-sm font-semibold text-primary-500"
          >
            All Blogs <ArrowRightFilled className="ml-1" />
          </Link>
        </div>

        <div className="mb-6 inline-flex gap-1 rounded-lg bg-secondary-700 p-2 font-jakarta text-sm font-semibold dark:bg-secondary-700">
          <button
            className={clsx(
              'rounded-lg px-4 py-2 transition-colors',
              activeType === 'all' &&
                'bg-zinc-700 text-white dark:bg-zinc-200 dark:text-black'
            )}
            onClick={() => setActiveType('all')}
          >
            All
          </button>
          <button
            className={clsx(
              'rounded-lg px-4 py-2 transition-colors',
              activeType === 'blog' &&
                'bg-zinc-700 text-white dark:bg-zinc-200 dark:text-black'
            )}
            onClick={() => setActiveType('blog')}
          >
            Blogs
          </button>
          <button
            className={clsx(
              'rounded-lg px-4 py-2 transition-colors',
              activeType === 'video' &&
                'bg-zinc-700 text-white dark:bg-zinc-200 dark:text-black'
            )}
            onClick={() => setActiveType('video')}
          >
            Videos
          </button>
        </div>

        <div className="relative flex flex-col">
          <div className="no-underline-links grid grid-cols-3 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {currentResources.map((resource, idx) => {
              return <Resource {...resource} key={idx} />;
            })}
          </div>

          <div className="my-10 ml-auto flex items-center justify-center md:my-0">
            <button
              onClick={prevPage}
              className="top-1/2 -left-14 rounded-lg bg-transparent p-1 hover:bg-secondary-800 md:absolute md:-translate-y-1/2"
            >
              <ChevronLeftRegular className="h-6 w-6" />
            </button>

            <button
              onClick={nextPage}
              className="top-1/2 -right-14 rounded-lg bg-transparent p-1 hover:bg-secondary-800 md:absolute md:-translate-y-1/2"
            >
              <ChevronRightRegular className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
