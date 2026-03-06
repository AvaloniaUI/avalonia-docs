---
id: index
title: Avalonia XPF
sidebar_label: Avalonia XPF
---

<head>
  <title>Avalonia documentation: XPF</title>
  <meta
    name="description"
    content="Avalonia XPF runs your existing WPF applications on macOS, Linux, iOS, Android, and WebAssembly with minimal code changes."
  />
</head>

import TierBadge from '@site/src/components/global/TierBadge';

You built your WPF application over years. It works. Your team knows the codebase. Your customers depend on it. Now someone is asking for macOS support, or Linux, or the web.

A full rewrite is not a few sprints. It is months at a minimum, often years. Every screen, every edge case, every workaround your team forgot about has to be rediscovered and rebuilt. If your application depends on third-party control suites like DevExpress, Telerik, or Syncfusion, the cost multiplies: those integrations do not carry over, and replacing them means evaluating new vendors, learning new APIs, and losing functionality you already shipped. Meanwhile, your team is split between two codebases that do the same thing. Every feature ships twice. Every fix ships twice. The longer it takes, the further behind you fall on the product work that actually matters.

Avalonia XPF is a different path. It replaces the rendering layer underneath WPF with Avalonia's cross-platform engine while keeping the API and binary compatibility your code depends on. Your XAML, your view models, your third-party controls from vendors like Telerik, DevExpress, Infragistics, Actipro, and Syncfusion all continue to work. You are not rewriting your application. You are running it somewhere new.

## How it works

XPF swaps out WPF's low-level rendering component (MilCore) with Avalonia's rendering engine. Everything above that layer stays the same. Your application sees the same WPF APIs it always has, but those APIs now work on macOS, Linux, and beyond.

This means:

- **No code changes for most applications.** If it compiles against WPF today, it will most likely compile against XPF.
- **Third-party controls keep working.** XPF maintains binary compatibility, so controls from major vendors run without modification.
- **You ship one codebase.** No fork, no parallel rewrite, no drift between platforms.

## Hybrid XPF

XPF is not an all-or-nothing commitment. With [Hybrid XPF](/xpf/interop/using-xpf-in-avalonia), you can mix Avalonia controls and WPF controls in the same application. This means you can start with XPF to get cross-platform today, then gradually replace WPF views with native Avalonia views at your own pace. Over time, XPF becomes a stepping stone to a full Avalonia migration, with no big-bang rewrite and no point where the application stops working.

It works the other way too. If you are already building with Avalonia, Hybrid XPF gives you access to over 700 existing WPF controls from vendors like Telerik, DevExpress, Infragistics, Actipro, and Syncfusion without waiting for native Avalonia ports.

## Platform support

| Platform | Internal | Business | Enterprise |
|---|---|---|---|
| [Windows](/docs/supported-platforms#windows) | <TierBadge tier={1} /> | <TierBadge tier={1} /> | <TierBadge tier={1} /> <TierBadge tier={2} /> <TierBadge tier={3} /> |
| [macOS](/docs/supported-platforms#macos) | <TierBadge tier={1} /> | <TierBadge tier={1} /> | <TierBadge tier={1} /> <TierBadge tier={2} /> <TierBadge tier={3} /> |
| [Desktop Linux](/docs/supported-platforms#desktop-linux) | <TierBadge tier={1} /> | <TierBadge tier={1} /> | <TierBadge tier={1} /> <TierBadge tier={2} /> <TierBadge tier={3} /> |
| [Embedded Linux](/docs/supported-platforms#embedded-linux) | | Paid add-on | <TierBadge tier={1} /> <TierBadge tier={2} /> <TierBadge tier={3} /> |
| [iOS](/xpf/platforms/mobile-and-browser) | | | <TierBadge tier={1} /> <TierBadge tier={2} /> <TierBadge tier={3} /> |
| [Android](/xpf/platforms/mobile-and-browser) | | | <TierBadge tier={1} /> <TierBadge tier={2} /> <TierBadge tier={3} /> |
| [WebAssembly](/xpf/platforms/mobile-and-browser) | | | <TierBadge tier={1} /> |

All tiers support Avalonia's [Tier 1 platforms](/docs/supported-platforms). Enterprise licenses include Tier 2 support and can arrange Tier 3 coverage on a case-by-case basis.

## Licensing

XPF is a commercial product with three tiers: **Internal**, **Business**, and **Enterprise**. All licenses are perpetual, meaning your applications continue to work regardless of license status.

| | Internal | Business | Enterprise |
|---|---|---|---|
| macOS, Desktop Linux | Yes | Yes | Yes |
| Mix and Match Avalonia Controls | | Yes | Yes |
| Cross-platform System.Drawing | | Yes | Yes |
| Embedded Linux | | Paid add-on | Yes |
| iOS, Android, WebAssembly | | | Yes |
| SLA | 10 working days | 5 working days | 3 working days |

Every license includes:

- A fully supported **30-day free trial**
- A permanent license to build with XPF
- 12 months of updates and engineering support

Enterprise trials are available by contacting sales. For pricing, see the [Avalonia website](https://avaloniaui.net/xpf?utm_source=docs&utm_medium=referral&utm_content=xpf-index#pricing).

## Get started

The [getting started guide](getting-started) walks you through running your WPF application on a new platform. Most teams are up and running in minutes, not months.
