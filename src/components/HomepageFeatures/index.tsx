import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
  link: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Easy to Learn',
    Svg: require('@site/static/img/playground.svg').default,
    description: (
      <>
        Explore the power of Avalonia with our WASM-powered <a href='https://play.avaloniaui.net/'>XAML playground!</a> It's never been easier to start learning.
      </>
    ),
    link: 'https://play.avaloniaui.net/'
  },
  {
    title: 'Explore our Samples',
    Svg: require('@site/static/img/test-tube.svg').default,
    description: (
      <>
        We have a range of samples to suit all levels of experience. Make sure to <a href='https://github.com/AvaloniaUI/Avalonia.Samples'>clone the repo</a> and try our <a href='https://github.com/AvaloniaUI/AvaloniaUI.QuickGuides'>quick guides.</a>
      </>
    ),
    link: 'https://github.com/AvaloniaUI/Avalonia.Samples'
  },
  {
    title: 'Join the Chat',
    Svg: require('@site/static/img/telegram.svg').default,
    description: (
      <>
        Join our growing community on <a href='https://t.me/Avalonia'>Telegram</a> to get help quickly! 
      </>
    ),
    link: 'https://t.me/Avalonia'
  },
];

function Feature({title, Svg, description, link}: FeatureItem) {
  return (
   
      <div className={clsx('col col--4')}>
        <a href={link}>
          <div className="text--center">
            <Svg className={styles.featureSvg} role="img" />
          </div>
        </a>
        <div className="text--center padding-horiz--md">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </div>

  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
