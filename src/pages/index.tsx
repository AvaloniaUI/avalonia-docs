import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HeroSection from '../components/page/homepage/HeroSection';
import HomepageFeatures from '@site/src/components/page/homepage/HomepageFeatures';
import CommunitySection from '../components/page/homepage/CommunitySection';
import GuidesAndSamplesSection from '../components/page/homepage/GuidesAndSamples';
import HelpSection from '../components/page/homepage/HelpSection';
import HomeFooter from '../components/page/homepage/HomeFooter';
import ResourcesSection from '../components/page/homepage/ResourcesSection';
import CTASection from '../components/page/homepage/CallToActionSection';
import HelloBar from '../components/page/homepage/HelloBar';
import HeroQuickLinks from '../components/page/homepage/HeroQuickLinks';

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Welcome to the Avalonia documentation site! Here you'll find guides and resources to help you get started with Avalonia, a cross-platform .NET UI framework. Whether you're a beginner or an experienced developer, our documentation provides everything you need to build stunning applications with Avalonia UI."
      noFooter>
      <HeroSection/>

      <HeroQuickLinks />

      <GuidesAndSamplesSection/>
      
      <div className="z-0">
        <HelpSection className="-mb-48" />
      </div>

      <CommunitySection />
      <HomeFooter/>
    </Layout>
  );
}

