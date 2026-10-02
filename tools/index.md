---
id: index
title: Avalonia Tools
sidebar_label: Avalonia Tools
description: Developer tools for Avalonia. Visual debugging, cross-platform packaging, and XAML editing in Visual Studio.
doc-type: overview
---

import DocsCard from '@site/src/components/global/DocsCard';
import DocsCards from '@site/src/components/global/DocsCards';

<head>
  <title>Avalonia Tools</title>
  <meta
    name="description"
    content="Professional developer tools for Avalonia. Debug visually, package effortlessly, and build faster."
  />
  <style>{`
    :root {
      --doc-item-container-width: 60rem;
    }
  `}</style>
</head>

Avalonia's development tooling supplements the free, open-source core framework, by facilitating tasks around the framework itself: diagnosing layout issues, packaging your app for multiple operating systems, and previewing XAML as you write it.

## Avalonia Plus

Avalonia Plus is a suite of professional tools built specifically for Avalonia development.

<DocsCards>
<DocsCard header="Dev Tools" href="/tools/developer-tools/installation" img="/icons/feature-devtools-icon.png">
  <p>Inspect and diagnose your Avalonia apps visually. Edit properties in real time, profile performance, and debug layouts.</p>
</DocsCard>

<DocsCard header="Parcel" href="/tools/parcel/setup" img="/icons/feature-parcel-icon.png">
  <p>Package your apps for Windows, macOS, and Linux in a single tool. Handle code signing, notarization, and installers.</p>
</DocsCard>

<DocsCard header="Avalonia for Visual Studio" href="/tools/visual-studio-extension" img="/icons/feature-vs-ext-icon.png">
  <p>Purpose-built Visual Studio extension with XAML previewing, code completion, and a drag-and-drop designer.</p>
</DocsCard>
</DocsCards>

## Avalonia Pro

Avalonia Pro includes all professional tools in Avalonia Plus, and additionally includes premium UI controls such as [Charts](/controls/data-display/charts/), [TreeDataGrid](/controls/data-display/structured-data/treedatagrid/), [RichTextEditor](/controls/input/text-input/richtexteditor/), [PdfViewer](/controls/data-display/pdfviewer/), and [VirtualKeyboard](/controls/input/text-input/virtualkeyboard).

## Who gets access

For non-commercial use, the [Community license](https://avaloniaui.net/pricing) gives you free access to Avalonia Plus tools and components.

For larger teams and organizations, paid subscriptions are available. See the [pricing page](https://avaloniaui.net/pricing) for details.

Subscriptions fund continued development of the open-source framework.

<br />
<div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
  <Button label="Purchase Avalonia Enterprise" link="https://avaloniaui.net/pricing" variant="secondary" outline />
</div>

## See also

- [AI Tools](/tools/ai-tools/)
- [IDE Support](/tools/ide/)
- [FAQ](/tools/faq)
