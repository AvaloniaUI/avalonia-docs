---
id: index
title: Avalonia Tools
sidebar_label: Avalonia Tools
doc-type: overview
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

Avalonia is a free, open-source UI framework. You can build and ship cross-platform .NET applications at no cost. The framework is MIT licensed and maintained by a growing team.

Development tooling covers the tasks around the framework itself: diagnosing layout issues, packaging your app for multiple operating systems, and previewing XAML as you write it.

## Accelerate

Avalonia Accelerate is a suite of professional tools built specifically for Avalonia development.

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

Accelerate also includes UI controls such as [TreeDataGrid](/controls/data-display/structured-data/treedatagrid/), [NativeWebView](/controls/web/nativewebview), [VirtualKeyboard](/controls/input/text-input/virtualkeyboard), and more. These components cover use cases from displaying hierarchical data to embedding native web content without bundling Chromium.

## Who gets access

If you work at a company with fewer than five developers and less than $1M USD in annual revenue, the [Community Edition](/tools/community-edition) gives you free access to all Accelerate tools and components. No trial period, no feature gates.

For larger teams and organisations, paid subscriptions are available in Business and Enterprise tiers. Business includes everything most teams need. Enterprise adds specialised components like VirtualKeyboard for kiosk and embedded scenarios.

Subscriptions fund continued development of the open-source framework.

<br />
<div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
  <Button label="Purchase Accelerate" link="https://avaloniaui.net/accelerate" variant="secondary" outline />
  <Button label="Community Edition" link="/tools/community-edition" variant="secondary" outline />
</div>

## See also

- [AI Tools](/tools/ai-tools/)
- [IDE Support](/tools/ide/)
- [FAQ](/tools/faq)
