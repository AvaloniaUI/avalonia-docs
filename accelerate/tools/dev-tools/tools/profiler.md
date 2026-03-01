# Application Profiler Tool

While [metrics](./metrics.md) primarily contain a single dimension of information, suitable for displaying as a chart, profilers capture richer data per each recording. After a recording is completed, `Developer Tools` aggregates the results and displays them as a table.

## Recording a Profile

Click the **Record** button to start a profiling session. The application continues running normally while data is collected in the background. Click **Record** again to stop — results are then aggregated and displayed across separate tabs, one for each profiler type.

For best results, try to isolate the interaction you want to measure. For example, open a specific view or trigger a UI action while recording, so the data isn't diluted by unrelated activity.

## Style Matching

When a control is created or added to the visual tree, Avalonia evaluates all active style selectors to determine which ones apply. This profiler aggregates those match attempts by selector.

Columns:
- **Selector** — the style selector being evaluated (e.g., `TextBlock.h1`, `Button:pointerover > ContentPresenter`)
- **Elapsed** — total time spent evaluating this selector across all match attempts
- **Fast Reject Count** — how many times the selector was quickly ruled out without full evaluation. A fast reject occurs when a control can be excluded by a simple static check, such as a mismatched type or control name. Importantly, a fast-rejected control will not be re-evaluated later when activators change — for example, a `TextBox` will never be re-evaluated for `Button:pointerover`, because it was already rejected on type
- **Match Attempts** — total number of times this selector was tested against a control
- **Matches** — how many attempts resulted in a successful match

A high number of match attempts with very few matches can indicate an overly broad selector. Consider targeting a concrete control type rather than a base class to reduce unnecessary matching during control creation.

## Style Activators

Unlike Style Matching (which measures initial selector resolution), this profiler measures how often selectors are re-evaluated at runtime. This happens when conditional selectors — those with activators like `:pointerover`, `:focus`, `:pressed` — toggle on and off as the user interacts with the application.

Columns:
- **Selector** — the style selector being re-evaluated
- **Elapsed** — total time spent on re-evaluations
- **Evaluations** — total number of times the selector's activator was re-evaluated
- **Active Evaluations** — how many evaluations resulted in the style becoming active
- **Activator** — type of activator responsible (e.g., pseudo-class, property match)

If a selector shows a very high number of evaluations, it may be toggling more often than expected. Narrowing the scope of such selectors can help.

## Resource Lookup

Every time a control, style, or binding resolves a resource by key (e.g., a brush, thickness, or template), Avalonia walks the resource hierarchy until it finds a match. This profiler aggregates those lookups by key.

Columns:
- **Key** — the resource key being looked up
- **Elapsed** — total time spent resolving this key across all lookups
- **Total Lookups** — how many times this key was requested
- **Successful** — how many lookups found a matching resource
- **Theme Variant** — the theme variant (Light/Dark) active during the lookup

A key with many total lookups but few successful ones likely indicates a missing or misspelled resource definition. You can use the [Resources Tool](./resources.md) to inspect available resources at each scope.