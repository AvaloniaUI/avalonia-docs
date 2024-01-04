import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import { GitHubIcon, Icons, LinkedInIcon, TwitterIcon, YouTubeIcon } from '@site/src/icons';

const projects = [
    {
      name: 'Avalonia UI',
      href: 'https://github.com/avaloniaui/avalonia',
    },
    {
      name: 'Avalonia UI for Visual Studio',
      href: 'https://github.com/avaloniaui/avaloniavs',
    },
    {
      name: 'Avalonia UI for Rider',
      href: 'https://github.com/ForNeVeR/AvaloniaRider',
    },
    {
      name: '.NET Templates',
      href: 'https://github.com/avaloniaui/avalonia-dotnet-templates',
    },
  ];

const services = [
    {
      name: 'Avalonia XPF',
      href: 'https://www.avaloniaui.net/xpf',
    },
    {
      name: 'Developer Support',
      href: 'https://www.avaloniaui.net/support',
    },
    {
      name: 'Software Development',
      href: 'https://www.avaloniaui.net/Services',
    },
  ];

  const resources = [
    {
      name: 'Blog',
      href: 'https://avaloniaui.net/Blog',
    },
    {
      name: 'Samples',
      href: 'https://github.com/AvaloniaUI/Avalonia.Samples',
    },
    {
      name: 'FAQs',
      href: 'https://avaloniaui.net/FAQ',
    },
    {
       name: 'Showcase',
       href: 'https://avaloniaui.net/Showcase',
    },
    {
        name: 'Press Kit',
        href: 'https://drive.google.com/uc?id=1laynvVMvQn123I45q4EjexHpDBZcx6rk&export=download',
     },
     {
        name: 'Contact Us',
        href: 'https://avaloniaui.net/ContactUs',
     },
  ];

  const other = [
    {
      name: 'About Us',
      href: 'https://avaloniaui.net/about',
    },
    {
      name: 'Careers',
      href: 'https://avaloniaui.net/Careers',
    },
    {
      name: 'MVPs',
      href: 'https://avaloniaui.net/MVPs',
    },
    {
       name: 'Privacy Policy',
       href: 'https://avaloniaui.net/Privacy',
    },
    {
        name: 'Terms of Service',
        href: 'https://avaloniaui.net/TOS',
     },
     {
        name: 'Telegram Community Chat',
        href: 'https://t.me/Avalonia',
     },
  ];



  function Links({ name, links }) {
    return (
      <div>
        <h3 className="font-jakarta text-base font-semibold uppercase text-gray-300">
          {name}
        </h3>
        <div className="flex flex-col gap-3">
          {links.map(({ name, href }) => (
            <Link
              href={href}
              className="text-base text-gray-400 hover:text-primary-100 hover:no-underline"
            >
              {name}
            </Link>
          ))}
        </div>
      </div>
    );
  }


  export default function Footer() {
    return (
      <footer className="bg-darkblue">
        <div className="mx-auto flex w-full max-w-[1080px] flex-col px-6 py-12">
          <div className="mb-12 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <img src="/logo/avalonia.svg" alt="Avalonia" className="h-9 w-fit lg:h-12" />
          </div>
  
          <div className="grid grid-cols-2 gap-6 gap-y-12 md:justify-between lg:flex lg:flex-wrap">
            <Links name="Projects" links={projects} />
            <Links name="Services" links={services} />
            <Links name="Resources" links={resources} />
            <Links name="Other" links={other} />
          </div>
  
          <hr className="my-12 !bg-gray-300" />
  
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-0">
           
            <div className="flex flex-wrap gap-2 text-sm text-gray-200">
              <Link
                href="https://avaloniaui.net/Privacy"
                className="text-inherit hover:text-black hover:underline"
              >
                Privacy Policy
              </Link>
              &bull;
              <Link
                href="https://avaloniaui.net/Tos"
                className="text-inherit hover:text-black hover:underline"
              >
                Terms of Use
              </Link>
              &bull;
              <span className="text-inherit">
                &copy; {new Date().getFullYear()} AvaloniaUI OÜ (14839404).
              </span>
            </div>
  
            <div className="flex items-center gap-4">
              <Link
                href="https://github.com/avaloniaui"
                aria-label="Avalonia's GitHub Organization"
              >
                <GitHubIcon className="h-7 w-7 text-zinc-400 hover:text-primary" />
              </Link>
              <Link
                href="https://linkedin.com/company/avaloniaui"
                aria-label="LinkedIn"
              >
                <LinkedInIcon className="h-7 w-7 text-zinc-400 hover:text-primary" />
              </Link>
              <Link href="https://twitter.com/avaloniaui" aria-label="Twitter">
                <TwitterIcon className="h-7 w-7 text-zinc-400 hover:text-primary" />
              </Link>
              <Link
                href="https://www.youtube.com/channel/UC54i4ILpN7JKUhP6liNYxkA"
                aria-label="Avalonia's YouTube Channel"
              >
                <YouTubeIcon className="h-7 w-7 text-zinc-400 hover:text-primary" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    );
  }