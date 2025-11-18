import React from 'react';
import Link from '@docusaurus/Link';
import { ArrowRightFilled } from '@fluentui/react-icons';
import clsx from 'clsx';
import { ChevronRight, GitHub } from 'react-feather';

export default function GitHubSampleLink({title, link}) {
  return (
    <div className="flex items-center gap-2.5">
      {link && (
        <Link
          to={link}
          className="flex items-center gap-1 rounded-lg py-1 px-3 text-white bg-primary hover:text-white transition-colors"
        >
          <GitHub className="h-4 w-4" />
          <span className="font-semibold">Clone the {title} sample</span>
        </Link>
      )}
    </div>
  );
}