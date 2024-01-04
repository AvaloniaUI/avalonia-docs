import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HeroSection from '../components/homepage/HeroSection';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import CommunitySection from '../components/homepage/CommunitySection';
import GuidesAndSamplesSection from '../components/homepage/GuidesAndSamples';
import HelpSection from '../components/homepage/HelpSection';
import HomeFooter from '../components/homepage/HomeFooter';
import ResourcesSection from '../components/homepage/ResourcesSection';
import CTASection from '../components/homepage/CallToActionSection';


export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Learn to build with Avalonia"
      noFooter>

      <div>
        <div className="w-full bg-gradient-to-r from-purple-500 to-purple-700 p-4 text-center font-medium text-white">
          Support the future of Avalonia by {' '}
          <Link
            to="https://github.com/sponsors/AvaloniaUI"
            className="text-white underline hover:text-white"
          >
            sponsoring.
          </Link>
        </div>
      </div>
      <HeroSection/>
      <GuidesAndSamplesSection/>
      
      <CTASection/>

      <ResourcesSection/>

      <div className="z-0">
        <HelpSection className="-mb-48" />
      </div>

      <CommunitySection />
      <HomeFooter/>
    </Layout>
  );
}
