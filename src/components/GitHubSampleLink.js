import React from 'react';
import Link from '@docusaurus/Link';
import clsx from 'clsx';

export default function GitHubSampleLink({title, link}) {
  return (
    <Link
    to={link}
    style={{
      borderWidth: '1px',
    }}
    className="github-sample-card bg-slate-400"
  >
    <div className="p-6 !pb-0">
      <h3 className="mb-1 flex items-center gap-3 font-jakarta group-hover:text-white">
      <img
        src="/static/resources/github-white.svg"
        width="30"
        height="30"
      />
        <div>
        {title} - Sample on GitHub
        </div>
      </h3>
    </div>
    
  </Link>
  );
}


