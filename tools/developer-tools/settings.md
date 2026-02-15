---
id: settings
title: Developer tools settings
sidebar_label: Settings
---

Settings page can be accessed from the Tray Icon menu (on Windows and Linux) or macOS global menu.
Or, alternatively, when app is already connected, settings page is available on the left navigation bar.

| Category | Setting | Description | Default Value |
|----------|---------|-------------|---------------|
| **Appearance** |
| | Theme Variant | Controls the application's color theme | Dark |
| | Exit On Last Window Close | Determines if the application should exit when the last window is closed | true |
| | Skip Welcome Window | Bypasses the welcome screen on application startup | false |
| | Enable Protocol Monitor | Shows diagnostic communication protocol monitoring window | false |
| **Elements Tree** |
| | Aggregate Templates | Combines template visual children into a single tree node for cleaner visualization, collapsed by default | true |
| | InlinePseudoclasses | By default, only visible element pseudoclasses are right-aligned in the tree, and the rest is hidden in the overlay button. This settings allows to inline all pseudoclasses regardless of their visibility. | false |
| | Contextual Properties | Only shows properties relevant to the current context/state of the selected element. For example, `Grid.Row` property only visible on direct `Grid` children | true |
| | Include CLR Properties | Displays .NET CLR properties in addition to Avalonia-specific properties, excluding duplicates | false |
| **Overlay** |
| | Show ToolTip Info | Displays tooltips with control information on hovered element | true |
| | Visualize Margin & Padding | Highlights margin, padding and border areas of hovered element | true |
| | Show Rulers | Displays measurement rulers for precise element positioning | true |
| | Show Extension Lines | Shows guide lines between hovered element and ruler | true |
| **Events** |
| | Default Routed Events | List of events to track by default in the events tool | `Button.ClickEvent`, `InputElement.KeyDownEvent`, `InputElement.KeyUpEvent`, `InputElement.TextInputEvent`, `InputElement.PointerReleasedEvent`, `InputElement.PointerPressedEvent` |
| **Metrics** |
| | Observable meters polling interval (ms) | How frequently observable meters are polled for new values. Lower values provide more frequent updates but may impact the connected app's performance. | 1000ms |
| | Measurements frame interval (ms) | How frequently metrics measurements are captured and updated in the visualization. | 250ms |
| | Aggregate frame measurements | When enabled, combines multiple measurements within the same frame: averages time-based metrics and uses latest values for counters and gauges. When disabled, keeps all raw measurements. | true |
| | Measurements history duration (s) | Defines how long in the past measurements are kept and displayed. | 60s |
| **Protocol** |
| | HTTP port | Defines HTTP port used to listen for app connections. Requires restart on change. Needs to be in-sync with `DeveloperToolsOptions.Protocol` set-up in the target app. | 29414 |
