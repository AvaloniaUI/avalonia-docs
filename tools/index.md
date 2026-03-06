---
id: index
title: Avalonia Tools
sidebar_label: Avalonia Tools
---

import DocsCard from '@site/src/components/global/DocsCard';
import DocsCards from '@site/src/components/global/DocsCards';

<head>
  <title>Avalonia Tools</title>
  <meta
    name="description"
    content="Professional developer tools for Avalonia. Debug visually, package effortlessly, and build faster with Avalonia Accelerate."
  />
  <style>{`
    :root {
      --doc-item-container-width: 60rem;
    }
  `}</style>
</head>

Avalonia is a free, open-source UI framework. You can build and ship cross-platform .NET applications without paying a penny, and that will always be the case. The framework is MIT licensed, maintained by a growing team, and trusted by thousands of developers worldwide.

But building great software is about more than the framework. It's about the experience of building with it: how quickly you can diagnose a layout issue, how painlessly you can package your app for three operating systems, how confidently you can hand a polished build to your users. That's where tooling makes the difference.

## Accelerate

Avalonia Accelerate is a suite of professional tools designed to remove friction from your development workflow. Every tool has been built from the ground up specifically for Avalonia, not adapted from something else, not bolted on as an afterthought.

<DocsCards>
<DocsCard header="Dev Tools" href="/tools/developer-tools/installation" img="/icons/feature-accelerate-devtools-icon.png">
  <p>Inspect and diagnose your Avalonia apps visually. Edit properties in real time, profile performance, and debug layouts without guesswork.</p>
</DocsCard>

<DocsCard header="Parcel" href="/tools/parcel/setup" img="/icons/feature-accelerate-parcel-icon.png">
  <p>Package your apps for Windows, macOS, and Linux in a single tool. Code signing, notarisation, and installers handled for you.</p>
</DocsCard>

<DocsCard header="Avalonia for Visual Studio" href="/tools/visual-studio-extension" img="/icons/feature-accelerate-vs-ext-icon.png">
  <p>A purpose-built Visual Studio extension with XAML previewing, code completion, and a drag-and-drop designer.</p>
</DocsCard>
</DocsCards>

Accelerate also includes advanced UI controls such as [TreeDataGrid](/controls/data-display/structured-data/treedatagrid/), [NativeWebView](/controls/web/nativewebview), [VirtualKeyboard](/controls/input/text-input/virtualkeyboard), and more. These are production-ready components that solve real problems, from displaying hierarchical data to embedding native web content without bundling Chromium.

## Who gets access

If you work at a company with fewer than five developers and less than $1M USD in annual revenue, the [Community Edition](/tools/community-edition) gives you free access to all Accelerate tools and components. No trial period, no feature gates.

For larger teams and organisations, paid subscriptions are available in Business and Enterprise tiers. Business includes everything most teams need. Enterprise adds specialised components like VirtualKeyboard for kiosk and embedded scenarios.

Your subscription directly funds development of the open-source framework. Every licence sold means more engineers working on Avalonia's core, better documentation, and faster releases for everyone.

<br />
<div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
  <Button label="Purchase Accelerate" link="https://avaloniaui.net/accelerate" variant="secondary" outline />
  <Button label="Community Edition" link="/tools/community-edition" variant="secondary" outline />
</div>

## See also

- [AI Tools](/tools/ai-tools/)
- [IDE Support](/tools/ide/)
- [FAQ](/tools/faq)
