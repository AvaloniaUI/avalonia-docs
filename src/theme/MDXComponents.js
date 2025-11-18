import React from 'react';
// Import the original mapper
import MDXComponents from '@theme-original/MDXComponents';
import Highlight from '@site/src/components/global/Highlight';
import { CardSection, Card } from '../components/global/CardComponents'; 
import HelpNeeded from '../components/global/HelpNeeded'; 
import GitHubSampleLink from '../components/global/GitHubSampleLink';
import MinVersion from '../components/global/MinVersion';
import XpfAd from '../components/global/XpfAdvert';
import Button from '../components/global/Button';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ThemedImage from '@theme/ThemedImage';
import Shortcut from '../components/global/Shortcut';

export default {
  // Re-use the default mapping
  ...MDXComponents,
  // Map the "<Highlight>" tag to our Highlight component
  // `Highlight` will receive all props that were passed to `<Highlight>` in MDX
  Highlight,
  CardSection,
  GitHubSampleLink,
  Card,
  HelpNeeded,
  MinVersion,
  XpfAd,
  Button,
  Tabs,
  TabItem,
  ThemedImage,
  Shortcut
};