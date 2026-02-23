---
id: index
title: Troubleshooting
sidebar_label: Home
---

import DocsCard from '@site/src/components/global/DocsCard';
import DocsCards from '@site/src/components/global/DocsCards';

<head>
  <title>Troubleshooting</title>
  <meta
    name="description"
    content="Find guidance on diagnosing and resolving common issues in Avalonia apps, including installation, performance, platform-specific behaviour, and UI development."
  />
  <style>{`
    :root {
      --doc-item-container-width: 60rem;
    }
  `}</style>
</head>

Find help diagnosing and resolving common issues when building Avalonia apps. Whether you've run into installation problems, performance bottlenecks, or challenges with styles and theming, you'll find targeted guidance on these pages to get your app back on track.

## General

<DocsCards>
  <DocsCard header="Installation" href="/troubleshooting/installation">
    <p>Common issues encountered when setting up .NET and Avalonia.</p>
  </DocsCard>
  <DocsCard header="App performance issues" href="/troubleshooting/app-performance-issues">
    <p>Steps to improve the runtime performance of your Avalonia app.</p>
  </DocsCard>
</DocsCards>

## Controls

<DocsCards>
  <DocsCard header="GroupBox" href="/troubleshooting/controls/groupbox">
    <p>How to replicate GroupBox functionality using HeaderedContentControl with custom styling.</p>
  </DocsCard>
  <DocsCard header="MediaPlayer" href="/troubleshooting/controls/mediaplayer">
    <p>Common issues with the Avalonia Accelerate MediaPlayer control.</p>
  </DocsCard>
  <DocsCard header="MessageBox" href="/troubleshooting/controls/messagebox">
    <p>Options for displaying message dialogs, including third-party alternatives.</p>
  </DocsCard>
</DocsCards>

## Platform-specific issues

<DocsCards>
  <DocsCard header="macOS" href="/troubleshooting/platform-specific-issues/macos">
    <p>Issues specific to macOS, including app menus and system integration.</p>
  </DocsCard>
  <DocsCard header="Windows" href="/troubleshooting/platform-specific-issues/windows">
    <p>Issues specific to Windows, including packaging, signing, and SmartScreen warnings.</p>
  </DocsCard>
</DocsCards>

## Tools

<DocsCards>
  <DocsCard header="Developer tools" href="/troubleshooting/tools/developer-tools">
    <p>Common issues when using Avalonia DevTools to inspect and debug your app.</p>
  </DocsCard>
</DocsCards>

## UI development

<DocsCards>
  <DocsCard header="Styles" href="/troubleshooting/ui-development/styles">
    <p>Common issues with style selectors, including silent failures and unmatched targets.</p>
  </DocsCard>
  <DocsCard header="Themes" href="/troubleshooting/ui-development/themes">
    <p>Common issues with control themes, including theme lookup and unintended side effects.</p>
  </DocsCard>
</DocsCards>

## XPF

<DocsCards>
  <DocsCard header="Troubleshooting Avalonia XPF" href="/troubleshooting/xpf">
    <p>Issues when using Avalonia XPF for WPF compatibility.</p>
  </DocsCard>
</DocsCards>
