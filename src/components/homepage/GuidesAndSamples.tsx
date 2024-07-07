import React from 'react';
import Link from '@docusaurus/Link';
import {
  ArrowRightFilled,
} from '@fluentui/react-icons';
import clsx from 'clsx';
import { ChevronRight, GitHub } from 'react-feather';

interface Guide {
  title: string;
  text: string;
  link: string;
}

const guides: Guide[] = [
  {
    title: 'Building Cross-Platform Applications',
    text: 'Introduces Avalonia and outlines how to architect a cross-platform application to maximize code re-use.',
    link: '/docs/guides/building-cross-platform-applications/',
  },
  {
    title: 'Data Binding',
    text: 'Learn how to implement data binding and MVVM',
    link: '/docs/basics/data/data-binding/',
  },
  {
    title: 'Improving Performance',
    text: 'Key considerations to maximise your apps performance',
    link: '/docs/guides/development-guides/improving-performance',
  },
];

interface Sample {
  title: string;
  source: string;
}

const samples: Sample[] = [
  {
    title: 'Model, View, ViewModel (MVVM)',
    source: 'https://github.com/AvaloniaUI/Avalonia.Samples/tree/main/src/Avalonia.Samples/MVVM',
  },
  {
    title: 'Custom Rating Control',
    source: 'https://github.com/AvaloniaUI/Avalonia.Samples/tree/main/src/Avalonia.Samples/CustomControls/RatingControlSample',
  },
  {
    title: 'Avalonia Solitaire',
    source: 'https://github.com/AvaloniaUI/Solitaire',
  },
];

function Guide({ title, text, link }: (typeof guides)[0]) {
  return (
    <Link
      to={link}
      className="group flex cursor-pointer items-start gap-2 rounded-lg border-2 border-transparent p-3 text-inherit transition-colors hover:border-primary-100 hover:text-primary-100"
    >

      <div className="flex flex-col">
        <h4 className="mb-1 font-semibold">{title}</h4>
        <p className="mb-0 text-sm text-text-400">{text}</p>
      </div>

      <ChevronRight className="ml-auto h-5 w-5 self-center opacity-0 transition-opacity group-hover:opacity-100" />
    </Link>
  );
}

function Sample({ title, source }: Sample) {
  return (
    <div className="group flex cursor-pointer items-center justify-between rounded-lg border-2 border-transparent p-3 text-text-400/60 transition-colors hover:border-primary hover:text-primary">
      <div className="flex flex-col">
        <h4 className="mb-1 text-black group-hover:text-primary-100 dark:text-white">
          {title}
        </h4>
      </div>

      <div className="flex items-center gap-2.5">
        {source && (
          <Link
            to={source}
            className="flex items-center gap-1 rounded-lg py-1 px-3 text-inherit transition-colors group-hover:bg-primary-100 group-hover:text-white"
          >
            <GitHub className="h-4 w-4" />
            <span className="font-semibold">Clone</span>
          </Link>
        )}
      </div>
    </div>
  );
}

export default function GuidesAndSamples() {
  return (
    <section className="no-underline-links my-10 mx-auto flex w-full max-w-5xl flex-col gap-10 p-4 py-0 md:flex-row md:gap-0">
      <div className="flex-1">
        <div className="mb-8 flex items-center justify-between">
          <h3 className="m-0">Popular how to guides</h3>

          <Link to="/docs/guides" className="font-outfit text-sm font-semibold">
            View more guides <ArrowRightFilled className="ml-1" />
          </Link>
        </div>

        <div className="flex flex-col gap-4">
          {guides.map((guide) => (
            <Guide {...guide} key={guide.title} />
          ))}
        </div>
      </div>

      <div
        className={clsx(
          'mx-8 block flex-shrink-0 bg-gradient-to-b from-transparent via-secondary-700 to-transparent',
          'hidden w-px md:block'
        )}
      />

      <div className="w-full md:max-w-sm">
        <div className="mb-8 flex items-center justify-between">
          <h3 className="m-0">Popular sample apps</h3>

          <Link
            to="https://github.com/AvaloniaUI/Avalonia.Samples"
            className="font-outfit text-sm font-semibold"
          >
            All apps <ArrowRightFilled className="ml-1" />
          </Link>
        </div>

        <div className="flex flex-col gap-4">
          {samples.map((sample) => (
            <Sample {...sample} key={sample.title} />
          ))}
        </div>
      </div>
    </section>
  );
}
