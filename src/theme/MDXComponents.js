import React from 'react';
// Import the original mapper
import MDXComponents from '@theme-original/MDXComponents';
import Highlight from '@site/src/components/Highlight';
import { CardSection, Card } from '../components/CardComponents'; 
import HelpNeeded from '../components/HelpNeeded'; 
import GitHubSampleLink from '../components/GitHubSampleLink';
import MinVersion from '../components/MinVersion';
import XpfAd from '../components/XpfAdvert';
import Button from '../components/Button';
import Image from '../components/Image';
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
  Shortcut,
  Image
};