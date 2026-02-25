---
id: index
title: Concepts
sidebar_label: Home
hide_table_of_contents: true
---

import DocsCard from '@site/src/components/global/DocsCard';
import DocsCards from '@site/src/components/global/DocsCards';

<head>
  <title>Avalonia documentation: Concepts</title>
  <meta
    name="description"
    content="Learn background, theory and other abstract concepts used by Avalonia."
  />
  <style>{`
    :root {
      --doc-item-container-width: 60rem;
    }
  `}</style>
</head>

This section contains pages that will help you understand more abstract concepts used by Avalonia. This is background and theory information, supported by code samples you can work through where relevant.

## Essentials

<DocsCards>

  <DocsCard header="Avalonia XAML" href="/concepts/core-concepts/avalonia-xaml">
    <p>Learn about Avalonia XAML, the XML-based markup language used to define the user interface with Avalonia.</p>
  </DocsCard>

  <DocsCard header="Main window" href="/concepts/core-concepts/main-window">
    <p>The main window is where most of your UI is displayed to users.</p>
  </DocsCard>

  <DocsCard header="Top level" href="/concepts/core-concepts/top-level">
    <p>The top level is the visual root, which handles layout, styling and rendering for other controls.</p>
  </DocsCard>

  <DocsCard header="Cross-platform architecture" href="/concepts/architecture/cross-platform-architecture">
    <p>How cross-platform app architecture works in the Avalonia framework.</p>
  </DocsCard>

  <DocsCard header="MVVM pattern" href="/concepts/architecture/the-mvvm-pattern">
    <p>An overview of the Model-View-ViewModel (MVVM) pattern, a common app structure that makes use of data binding to move data between parts.</p>
  </DocsCard>

  <DocsCard header="Introduction to data binding" href="/concepts/data-concepts/data-binding/introduction-to-data-binding">
    <p>How to use data binding to move data from application objects to UI controls, and change data in response to user input.</p>
  </DocsCard>

</DocsCards>

## Advanced topics

<DocsCards>

  <DocsCard header="Data templates" href="/concepts/data-concepts/data-templates/introduction-to-data-templates">
    <p>Use data templates to specify how data of a particular type should be presented.</p>
  </DocsCard>

  <DocsCard header="Compiled bindings" href="/concepts/data-concepts/data-binding/compiled-bindings">
    <p>Avalonia uses compiled bindings by default to improve the performance of your app.</p>
  </DocsCard>

  <DocsCard header="Assets" href="/concepts/ui-concepts/assets">
    <p>How to include assets such as images in your app.</p>
  </DocsCard>

  <DocsCard header="Layout" href="/concepts/ui-concepts/layout">
    <p>Understand the principles behind Avalonia's layout system, which allows you to arrange controls on your UI.</p>
  </DocsCard>

  <DocsCard header="Styles" href="/concepts/ui-concepts/styling/styles">
    <p>Learn about Avalonia's styling system for customizing controls.</p>
  </DocsCard>

  <DocsCard header="Pointer devices" href="/concepts/ui-concepts/user-input/pointer">
    <p>Avalonia uses the abstract concept of a "pointer device" to represent input from devices such as mouse, touchpad or pen.</p>
  </DocsCard>

</DocsCards>