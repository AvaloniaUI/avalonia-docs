/**
 * This file wraps the original MDXComponents so we don't need to modify the original code.
 *
 * Reason for modifying:
 * - Add a custom table component
 */

import MDXComponentsOriginal from '@theme-original/MDXComponents';
// CUSTOM CODE
import MDXTable from './Table';
import Highlight from '@site/src/components/global/Highlight';
import { CardSection, Card } from '../../components/global/CardComponents'; 
import HelpNeeded from '../../components/global/HelpNeeded'; 
import GitHubSampleLink from '../../components/global/GitHubSampleLink';
import MinVersion from '../../components/global/MinVersion';
import XpfAd from '../../components/global/XpfAdvert';
import Button from '../../components/global/Button';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ThemedImage from '@theme/ThemedImage';
import Shortcut from '../../components/global/Shortcut';
// CUSTOM CODE END
import type { MDXComponentsObject } from '@theme/MDXComponents';


const MDXComponents: MDXComponentsObject = {
  ...MDXComponentsOriginal,
  // CUSTOM CODE
  table: MDXTable,
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
  // CUSTOM CODE END
};
export default MDXComponents;
