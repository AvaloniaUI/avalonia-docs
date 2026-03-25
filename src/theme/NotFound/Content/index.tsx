import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import Translate from '@docusaurus/Translate';
import type {Props} from '@theme/NotFound/Content';

const NAV_SECTIONS = [
  {label: 'Guides', href: '/docs/welcome', description: 'Concepts, tutorials and how-to guides'},
  {label: 'Controls', href: '/controls', description: 'Built-in control reference'},
  {label: 'Tools', href: '/tools', description: 'Developer tooling and extensions'},
  {label: 'APIs', href: '/api', description: 'Full API reference'},
  {label: 'Avalonia XPF', href: '/xpf', description: 'WPF compatibility layer'},
  {label: 'Troubleshooting', href: '/troubleshooting', description: 'Common issues and fixes'},
];

export default function NotFoundContent({className}: Props): ReactNode {
  return (
    <main className={clsx('container margin-vert--xl', className)}>
      <div className="row">
        <div className="col col--6 col--offset-3">
          <h1>
            <Translate
              id="theme.NotFound.title"
              description="The title of the 404 page">
              Page not found
            </Translate>
          </h1>
          <p>
            <Translate
              id="theme.NotFound.p1"
              description="The first paragraph of the 404 page">
              We could not find what you were looking for.
            </Translate>
          </p>
          <img src='https://media.giphy.com/media/PibODdY9C5xiKzmRhW/giphy.gif'/>
          <h2 style={{
            fontSize: '0.625rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--ifm-color-secondary-darkest)',
            marginTop: '2rem',
            marginBottom: '1rem',
          }}>
            Browse the docs
          </h2>
          <ul style={{listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
            {NAV_SECTIONS.map(({label, href, description}) => (
              <li key={href}>
                <a
                  href={href}
                  style={{textDecoration: 'none', display: 'block', padding: '0.5rem 0.75rem', borderRadius: '6px', border: '1px solid var(--ifm-toc-border-color)', transition: 'border-color 0.15s ease, background 0.15s ease'}}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'var(--ifm-link-color)';
                    e.currentTarget.style.background = 'var(--ifm-hover-overlay)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--ifm-toc-border-color)';
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <span style={{display: 'block', fontWeight: 600, fontSize: '0.875rem', color: 'var(--ifm-heading-color)'}}>{label}</span>
                  <span style={{display: 'block', fontSize: '0.75rem', color: 'var(--ifm-color-secondary-darkest)', marginTop: '2px'}}>{description}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
