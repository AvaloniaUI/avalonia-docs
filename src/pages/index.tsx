import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HeroSection from '../components/page/homepage/HeroSection';
import CommunitySection from '../components/page/homepage/CommunitySection';
import HelpSection from '../components/page/homepage/HelpSection';
import HomeFooter from '../components/page/homepage/HomeFooter';
import HeroQuickLinks from '../components/page/homepage/HeroQuickLinks';
import QuickStartSection from '../components/page/homepage/QuickStartSection';

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Welcome to the Avalonia documentation site! Here you'll find guides and resources to help you get started with Avalonia, a cross-platform .NET UI framework. Whether you're a beginner or an experienced developer, our documentation provides everything you need to build stunning applications with Avalonia UI."
      noFooter>
      <div style={{ backgroundColor: 'var(--homepage-bg)' }}>
        <HeroSection/>
        <HeroQuickLinks />
        <QuickStartSection />
        <HelpSection />
        <CommunitySection />
        <HomeFooter/>
      </div>

      <style>{`
        :root {
          --homepage-bg: #F3F1F0;
        }
        html[data-theme='dark'] {
          --homepage-bg: #05051E;
        }
      `}</style>
    </Layout>
  );
}
