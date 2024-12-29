import React from 'react';
import Link from '@docusaurus/Link';

import { Linkedin, Twitter } from 'react-feather';
import { BlueSkyIcon, DiscordIcon, LinkedIn2Icon, LinkedInIcon, TelegramIcon } from '@site/src/icons';

const githubUsernames = [
  'grokys',
  'kekekeks',
  'maxkatz6',
  'Gillibald',
  'jmacato',
  'jkoritzinsky',
  'wieslawsoltes',
  'MrJul',
  'timunie',
  'Mikolaytis',
  'ncarrillo-zz',
  'Deadpikle',
];

export default function CommunitySection() {
  return (
    <section className="no-underline-links">
      <div className="mx-auto flex w-full flex-col items-center justify-center community-bg px-4 py-16 pt-64 text-white dark:from-zinc-200/90 dark:to-white dark:text-zinc-700">
        <h2 className="text-3xl  text-darkblue dark:text-white">
          Join the <span className="text-primary">community</span>
        </h2>
        <p className="mb-10  text-darkblue dark:text-gray-200">
          Join us and be welcomed into our supportive and vibrant community.
        </p>
        <div className="mx-auto mb-16 flex flex-wrap -space-x-1.5">
          {githubUsernames.map((username) => (
            <img
              key={username}
              src={`https://github.com/${username}.png?size=60`}
              alt={`User ${username}`}
              loading="lazy"
              className="h-6 w-6 rounded-full border-2 border-solid border-white transition hover:-translate-y-2 hover:scale-150 lg:h-12 lg:w-12"
            />
          ))}
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-2 text-sm font-semibold lg:flex-row lg:gap-8">
          <Link
            className="flex w-full items-center justify-center gap-2 rounded-sm border border-solid border-primary bg-primary/10 px-2 py-2 text-primary lg:w-auto"
            href="https://t.me/Avalonia"
          >
            <TelegramIcon className="h-6 w-6" /> Telegram &rarr;
          </Link>
          <Link
            className="flex w-full items-center justify-center gap-2 rounded-sm border border-solid border-primary bg-primary/10 px-2 py-2 text-primary lg:w-auto"
            href="https://bsky.app/profile/avaloniaui.net"
          >
            <BlueSkyIcon className="h-5 w-5" /> Bluesky &rarr;
          </Link>
          <Link
            className="flex w-full items-center justify-center gap-2 rounded-sm border border-solid border-primary bg-primary/10 px-2 py-2 text-primary lg:w-auto"
            href="https://www.linkedin.com/company/avaloniaui"
          >
            <LinkedIn2Icon className="h-5 w-5" /> LinkedIn &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}