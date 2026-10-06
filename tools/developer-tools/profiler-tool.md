---
id: profiler-tool
title: Application profiler tool
description: Record a profile in Avalonia Developer Tools to measure style matching, style activator re-evaluations, and resource lookups in your app.
sidebar_label: Profiler tool
doc-type: reference
---

While [metrics](/tools/developer-tools/metrics-tool) primarily contain a single dimension of information, suitable for displaying as a chart, profilers capture richer data. After a recording is completed, the Developer Tools aggregate the results and display them as a table.

## Recording a profile

1. Click the **Record** button to start a profiling session.
2. The application continues running normally while data is collected in the background.
3. Click **Record** again to stop.
4. Results are aggregated and displayed across separate tabs, one for each profiler type.

For best results, try to isolate the interaction you want to measure. For example, open a specific view or trigger a UI action while recording, so the data isn't diluted by unrelated activity.

## Style matching

When a control is created or added to the visual tree, Avalonia evaluates all active style selectors to determine which ones apply. The **Style Matching** profiler aggregates match attempts.

Columns:
- **Selector:** The style selector being evaluated (e.g., `TextBlock.h1`, `Button:pointerover > ContentPresenter`).
- **Elapsed:** Total time spent evaluating this selector across all match attempts.
- **Fast Reject Count:** How many times the selector was quickly ruled out without full evaluation. A fast reject occurs when a control can be excluded by a simple static check, e.g., a `TextBox` is fast-rejected for `Button:pointerover`. It is not re-evaluated later when activators change.
- **Match Attempts:** Total number of times this selector was tested against a control.
- **Matches:** How many attempts resulted in a successful match.

A high number of match attempts with very few matches can indicate an overly broad selector. Consider targeting a concrete control type rather than a base class to reduce unnecessary matching during control creation.

## Style activators

Unlike style matching (which measures initial selector resolution), this profiler measures how often selectors are re-evaluated at runtime. This happens when conditional selectors (those with activators like `:pointerover`, `:focus`, `:pressed`) toggle on and off as the user interacts with the application.

Columns:
- **Selector**: the style selector being re-evaluated
- **Elapsed**: total time spent on re-evaluations
- **Evaluations**: total number of times the selector's activator was re-evaluated
- **Active Evaluations**: how many evaluations resulted in the style becoming active
- **Activator**: type of activator responsible (e.g., pseudo-class, property match)

If a selector shows a very high number of evaluations, it may be toggling more often than expected. Narrowing the scope of such selectors can help.

## Resource lookup

Every time a control, style, or binding resolves a resource by key (e.g., a brush, thickness, or template), Avalonia walks the resource hierarchy until it finds a match. This profiler aggregates those lookups by key.

Columns:
- **Key**: the resource key being looked up
- **Elapsed**: total time spent resolving this key across all lookups
- **Total Lookups**: how many times this key was requested
- **Successful**: how many lookups found a matching resource
- **Theme Variant**: the theme variant (Light/Dark) active during the lookup

A key with many total lookups but few successful ones likely indicates a missing or misspelled resource definition. You can use the [Resources tool](/tools/developer-tools/resources-tool) to inspect available resources at each scope.

## See also

- [Metrics tool](/tools/developer-tools/metrics-tool)
- [Resources tool](/tools/developer-tools/resources-tool)
