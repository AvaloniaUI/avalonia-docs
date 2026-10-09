import React from 'react';
import Link from '@docusaurus/Link';
import { GitHub } from 'react-feather';

interface GitHubSampleLinkProps {
  title: string;
  link?: string;
}

export default function GitHubSampleLink({ title, link }: GitHubSampleLinkProps) {
  return (
    <div className="flex items-center gap-2.5">
      {link && (
        <Link to={link} className="github-sample-link">
          <GitHub />
          <span>Clone the {title} sample</span>
        </Link>
      )}
    </div>
  );
}
