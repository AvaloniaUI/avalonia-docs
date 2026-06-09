---
id: charts-mcp
title: Charts MCP
sidebar_label: Charts MCP
doc-type: how-to
description: "Set up the Charts MCP server so AI assistants can generate Avalonia chart previews and code."
keywords:
  - mcp
  - model context protocol
  - ai assistant
  - charts
  - avalonia charts
  - copilot
  - claude
  - cursor
  - windsurf
  - gemini
  - ai tools
tags:
  - mcp
  - ai
  - avalonia charts
  - avalonia pro
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The Charts model context protocol (MCP) server lets AI assistants create and render Avalonia Charts from natural language requests. Your assistant can choose a chart type, provide JSON data, customize common options such as size, theme, labels, and palette, then receive a rendered PNG preview with C# and XAML snippets.

Charts MCP runs as a local stdio MCP server. It creates controls from `Avalonia.Controls.Charts` and renders them through Avalonia Headless and Skia. Use it for chart generation, chart exploration, and code scaffolding.

:::note
Charts MCP does not attach to a running Avalonia application or inspect the visual tree. For live application inspection, use the [DevTools MCP](/tools/developer-tools/mcp).
:::

For a general introduction to MCP, see [AI Tools](/tools/ai-tools/).

## Prerequisites

Before setting up the MCP server, ensure you have:

- **.NET SDK installed.** The server is distributed as a .NET tool.
- **Valid Avalonia Pro license with Charts.** Charts are included with [Avalonia Pro](https://avaloniaui.net/pricing). Not included with Community, Plus, and legacy Accelerate subscriptions.
- **A NuGet source that contains the Charts MCP packages.** The `dotnet tool install` command only works if `Avalonia.Controls.Charts.Mcp` and its matching runtime packages, such as `Avalonia.Controls.Charts.Mcp.osx-arm64`, are available from one of your configured NuGet sources.
- **An MCP-capable editor or assistant.** VS Code, Visual Studio, Rider, Cursor, Windsurf, Claude Code, Claude Desktop, and Gemini CLI can be configured with MCP servers.

## Install the server

1. Configure a NuGet package source that contains `Avalonia.Controls.Charts.Mcp` and its matching runtime packages.
2. Install the Charts MCP server as a global .NET tool by running `dotnet tool install`.

```bash
dotnet tool install --global Avalonia.Controls.Charts.Mcp
```

3. If `dotnet` reports that the package cannot be found, confirm that the required package source is configured and enabled. Check your NuGet sources by running this command.

```bash
dotnet nuget list source
```

4. The Charts MCP server is accessed by running the following command. Most editors do this automatically once configured.

```bash
mcp-server-charts
```

:::tip
If the command line cannot find `mcp-server-charts` after installation, check that the .NET global tools directory is on your `PATH`. On macOS and Linux, it is usually `~/.dotnet/tools`. On Windows, it is usually `%USERPROFILE%\.dotnet\tools`.
:::

Chart rendering requires a valid Avalonia Pro license with Charts in the MCP server process. Set `AVALONIA_LICENSE_KEY` in your environment, or add `"env": { "AVALONIA_LICENSE_KEY": "your-license-key" }` to your MCP client configuration if the editor does not inherit shell variables. Do not commit the key.

## Run from source

If you are working from a source checkout instead of an installed tool:

1. Build the MCP project.

```bash
dotnet build /absolute/path/to/Avalonia.Controls.Charts/src/Avalonia.Controls.Charts.Mcp/Avalonia.Controls.Charts.Mcp.csproj
```

2. Configure your MCP client to run:

```bash
dotnet run --project /absolute/path/to/Avalonia.Controls.Charts/src/Avalonia.Controls.Charts.Mcp/Avalonia.Controls.Charts.Mcp.csproj
```

:::note
Running from source is intended for contributors and local validation. Chart generation requires a valid Avalonia Pro (or higher) license. If chart rendering fails with a chart initialization or licensing error, verify the Charts license setup for your build or package.
:::

## Set up the MCP server in your editor

The examples below use the global .NET tool command. If you are [running from source](#run-from-source), replace `"command": "mcp-server-charts"` with:

```json
"command": "dotnet",
"args": [
    "run",
    "--project",
    "/absolute/path/to/Avalonia.Controls.Charts/src/Avalonia.Controls.Charts.Mcp/Avalonia.Controls.Charts.Mcp.csproj"
]
```

<Tabs groupId="editor">
<TabItem value="vscode" label="VS Code">

#### Option A: Command palette

1. Open the command palette (`Ctrl+Shift+P` / `Cmd+Shift+P`).
2. Run **MCP: Add Server**.
3. Select **stdio** as the server type.
4. Enter `mcp-server-charts` as the command.
5. Set the server name to `avalonia_charts`.
6. Choose whether to install the server for this workspace or globally.

#### Option B: Manual configuration

Add the following to `.vscode/mcp.json` in your workspace root:

```json title=".vscode/mcp.json"
{
    "servers": {
        "avalonia_charts": {
            "type": "stdio",
            "command": "mcp-server-charts"
        }
    }
}
```

</TabItem>
<TabItem value="visual-studio" label="Visual Studio">

Visual Studio 2022 (17.x and later) supports MCP servers through `mcp.json` configuration files.

Create or edit `.mcp.json` in your solution directory:

```json title=".mcp.json"
{
    "servers": {
        "avalonia_charts": {
            "type": "stdio",
            "command": "mcp-server-charts"
        }
    }
}
```

:::tip
Visual Studio also reads `.vscode/mcp.json`. If you already configured Charts MCP for VS Code in the same solution, Visual Studio can discover that configuration automatically.
:::

</TabItem>
<TabItem value="rider" label="Rider">

JetBrains Rider supports MCP servers through the AI Assistant plugin.

1. Open **Settings** → **Tools** → **AI Assistant** → **Model Context Protocol (MCP)**.
2. Click **Add**.
3. Select **STDIO**.
4. Paste the following JSON configuration:

```json
{
    "mcpServers": {
        "avalonia_charts": {
            "command": "mcp-server-charts"
        }
    }
}
```

5. Click **OK**, then **Apply**.

</TabItem>
<TabItem value="cursor" label="Cursor">

Add the following to `.cursor/mcp.json` in your project directory, or to `~/.cursor/mcp.json` for global configuration:

```json title=".cursor/mcp.json"
{
    "mcpServers": {
        "avalonia_charts": {
            "command": "mcp-server-charts"
        }
    }
}
```

</TabItem>
<TabItem value="windsurf" label="Windsurf">

Add the following to `~/.codeium/windsurf/mcp_config.json`:

```json title="~/.codeium/windsurf/mcp_config.json"
{
    "mcpServers": {
        "avalonia_charts": {
            "command": "mcp-server-charts"
        }
    }
}
```

</TabItem>
<TabItem value="claude-code" label="Claude Code">

Run this command in your terminal:

```bash
claude mcp add --transport stdio --scope user avalonia_charts -- mcp-server-charts
```

To verify it was added:

```bash
claude mcp list
```

</TabItem>
<TabItem value="claude-desktop" label="Claude Desktop">

1. Open **Settings** → **Developer** and click **Edit Config**.
2. Add the Charts MCP server to `claude_desktop_config.json`:

```json
{
    "mcpServers": {
        "avalonia_charts": {
            "command": "mcp-server-charts"
        }
    }
}
```

3. Save the file.
4. Restart Claude Desktop.

:::note
Claude Desktop does not inherit environment variables from your shell profile. If the server needs environment variables, add an `env` block to this configuration.
:::

</TabItem>
<TabItem value="gemini-cli" label="Gemini CLI">

Add the following to `~/.gemini/settings.json` or the project-level `.gemini/settings.json`:

```json title="~/.gemini/settings.json"
{
    "mcpServers": {
        "avalonia_charts": {
            "command": "mcp-server-charts"
        }
    }
}
```

</TabItem>
</Tabs>

## Verify the connection

After configuring the MCP server, verify it is working:

1. **Check the server is running.** Open your editor's MCP panel or status indicator. (In VS Code, this is **MCP: List Servers** from the command palette.) Confirm `avalonia_charts` appears as a connected server.
2. **Test with a prompt.** Ask your AI assistant:

```text
List the available Avalonia chart tools and show me the data format for a bar chart.
```

You can also test chart rendering with:

```text
Create a dark themed Avalonia bar chart titled Quarterly Revenue with Q1=125, Q2=148, Q3=171, and Q4=193. Use a blue and green palette.
```

## Usage examples

Describe the chart you want in natural language. The AI assistant calls the MCP tools automatically.

### Generating a chart preview

```text
Create a line chart comparing monthly signups from January through June. Use the default light theme and include the generated Avalonia code.
```

### Choosing a chart type

```text
Read the Avalonia Charts catalog resource and recommend a chart for showing stage-by-stage sales conversions.
```

### Using a specific tool

```text
Use avalonia_sankey_chart to show product flow from Acquisition to Activation to Retention. Render it at 900x520.
```

### Creating app code

```text
Create an Avalonia combo chart with a bar series for revenue and a line series for margin. Return the generated C# and XAML so I can adapt it to MVVM.
```

### Debugging data formats

```text
Show me the required data format for avalonia_calendar_heatmap, then render a small example.
```

## Available tools

The Charts MCP server exposes 86 chart generation tools and one catalog tool.

### Catalog

| Tool | Description |
|------|-------------|
| `avalonia_list_charts` | Lists all available charts with descriptions and example data formats. |

### Cartesian

| Tool | Description |
|------|-------------|
| `avalonia_line_chart` | Trends and time-series data. |
| `avalonia_area_chart` | Quantitative data with filled areas. |
| `avalonia_bar_chart` | Comparing values across categories. |
| `avalonia_scatter_chart` | Relationships between two variables. |
| `avalonia_combo_chart` | Combined series, such as bar and line together. |

### Circular

| Tool | Description |
|------|-------------|
| `avalonia_pie_chart` | Proportions of a whole. |
| `avalonia_donut_chart` | Proportions with a center hole. |
| `avalonia_progress_donut` | Single-value circular progress. |
| `avalonia_semi_donut` | Semi-circle proportions. |
| `avalonia_nightingale_rose` | Polar area chart, also known as a Coxcomb chart. |
| `avalonia_radial_bar_chart` | Bars arranged in a circle. |
| `avalonia_sunburst_chart` | Hierarchical proportions. |

### Gauge

| Tool | Description |
|------|-------------|
| `avalonia_gauge_chart` | Standard dial gauge. |
| `avalonia_bullet_chart` | Performance compared with target and ranges. |
| `avalonia_circular_gauge` | Circular needle indicator. |
| `avalonia_linear_gauge` | Horizontal or vertical scale indicator. |
| `avalonia_gradient_ring_chart` | Progress or value as a colored ring. |
| `avalonia_liquid_fill_gauge` | Value as a fluid level. |

### Polar

| Tool | Description |
|------|-------------|
| `avalonia_radar_chart` | Multivariate comparisons. |
| `avalonia_polar_chart` | Angular and radial line data. |
| `avalonia_wind_rose_chart` | Directional frequency distributions. |
| `avalonia_smith_chart` | Complex impedance and engineering data. |
| `avalonia_polar_area_chart` | Equal-angle sectors with variable radii. |

### Statistical

| Tool | Description |
|------|-------------|
| `avalonia_violin_plot` | Distribution density and range. |
| `avalonia_boxplot_chart` | Quartiles, median, and outliers. |
| `avalonia_ridgeline_chart` | Multiple distribution comparisons. |
| `avalonia_beeswarm_plot` | Individual point distribution. |
| `avalonia_contour_plot` | Two-dimensional density contours. |
| `avalonia_density_plot` | Kernel density estimation. |
| `avalonia_strip_plot` | Points along a single categorical axis. |

### Comparison and ranking

| Tool | Description |
|------|-------------|
| `avalonia_tornado_chart` | Paired comparison by category. |
| `avalonia_bump_chart` | Changes in rank over time. |
| `avalonia_slope_chart` | Before and after state changes. |
| `avalonia_dumbbell_chart` | Range or gap comparisons. |
| `avalonia_pareto_chart` | Frequency with cumulative percentage. |
| `avalonia_mirror_bar_chart` | Back-to-back horizontal bars. |
| `avalonia_diverging_bar_chart` | Opposing positive and negative values. |
| `avalonia_pyramid_chart` | Hierarchical breakdown. |
| `avalonia_population_pyramid` | Age and demographic structure. |
| `avalonia_funnel_chart` | Sequential process stages. |

### Flow and network

| Tool | Description |
|------|-------------|
| `avalonia_sankey_chart` | Flow between multiple categories. |
| `avalonia_arc_diagram` | Links between ordered nodes. |
| `avalonia_chord_diagram` | Inter-relationships in a circle. |
| `avalonia_alluvial_chart` | Structural changes over steps or time. |
| `avalonia_flow_chart` | General process flow diagrams. |
| `avalonia_network_chart` | Node-link relationships. |
| `avalonia_force_directed_graph` | Physics-based node graph layout. |
| `avalonia_organization_chart` | Traditional hierarchy tree. |

### Proportional and hierarchical

| Tool | Description |
|------|-------------|
| `avalonia_treemap_chart` | Nested rectangles for hierarchies. |
| `avalonia_icicle_chart` | Adjacency diagram hierarchy. |
| `avalonia_circle_packing_chart` | Hierarchy packed into nested circles. |
| `avalonia_dendrogram_chart` | Hierarchical clustering tree. |
| `avalonia_flame_graph` | Stack or profile hierarchy visualization. |
| `avalonia_indented_tree_chart` | Indented hierarchy tree. |
| `avalonia_radial_tree_chart` | Hierarchy arranged radially. |
| `avalonia_waffle_chart` | Grid for percentages. |
| `avalonia_mekko_chart` | Variable-width stacked bars. |
| `avalonia_parliament_chart` | Seat distribution hemicycle. |
| `avalonia_venn_chart` | Set relationships and intersections. |

### Grid and matrix

| Tool | Description |
|------|-------------|
| `avalonia_heatmap_chart` | Value intensity by color grid. |
| `avalonia_matrix_chart` | Correlation or relationship matrix. |
| `avalonia_carpet_plot` | Two independent variables against a dependent variable. |
| `avalonia_hexbin_chart` | Hexagonal bin density for X/Y points. |
| `avalonia_mosaic_chart` | Proportional groups and subgroups. |
| `avalonia_parallel_coordinates_chart` | Multidimensional records across parallel axes. |
| `avalonia_ternary_chart` | Three-part composition plot. |
| `avalonia_calendar_heatmap` | Activity distribution by date. |

### Time and scheduling

| Tool | Description |
|------|-------------|
| `avalonia_gantt_chart` | Project management and task schedules. |
| `avalonia_swimlane_chart` | Workflow tasks grouped by lane. |
| `avalonia_event_timeline` | Chronological time events. |
| `avalonia_spiral_timeline` | Time represented as a spiral. |

### Financial

| Tool | Description |
|------|-------------|
| `avalonia_candlestick_chart` | Financial price movement. |
| `avalonia_ohlc_chart` | Open-high-low-close (OHLC) bars. |
| `avalonia_heikin_ashi_chart` | Smoothed OHLC trend candles. |
| `avalonia_kagi_chart` | Price reversal movement chart. |
| `avalonia_renko_chart` | Fixed-size price movement bricks. |
| `avalonia_point_and_figure_chart` | X/O price movement columns. |

### Map

| Tool | Description |
|------|-------------|
| `avalonia_choropleth_map` | Geographic regions colored by values. |
| `avalonia_shape_map` | Custom multilayer geometric shapes. |

### Dashboard, data, text, and bubble

| Tool | Description |
|------|-------------|
| `avalonia_sparkline_chart` | Compact trend lines. |
| `avalonia_kpi_card` | Metric display with status or change. |
| `avalonia_table_chart` | Tabular data with conditional styling. |
| `avalonia_word_cloud` | Word frequency cloud. |
| `avalonia_bubble_chart` | Bubble chart using X, Y, and size values. |
| `avalonia_packed_bubble_chart` | Non-hierarchical bubble packing. |
| `avalonia_bubble_cloud` | Force-directed bubble cloud layout. |

## Available resources

The server also exposes MCP resources that your assistant can read before calling chart tools. They can help the assistant choose a chart type, check an input shape, or pick a color palette.

| Resource URI | Description |
|--------------|-------------|
| `charts://catalog` | Complete chart catalog grouped by category. |
| `charts://palettes` | Default and suggested palette values. |
| `charts://data-formats` | Data format references, derived from catalog examples. |

## Inputs and outputs

Most chart tools accept a title, a JSON `data` string, optional width and height values, and an optional theme. Some tools expose chart-specific arguments, such as `geoJson`, `nodes` or `innerRadius`.

JSON property names are case-insensitive. For example, `Label`, `label`, and `LABEL` map to the same property.

```json
[
    { "Label": "Q1", "Value": 125 },
    { "Label": "Q2", "Value": 148 },
    { "Label": "Q3", "Value": 171 },
    { "Label": "Q4", "Value": 193 }
]
```

Color palettes are passed as comma-separated color codes:

```text
#2196F3, #4CAF50, #FF9800
```

`theme` accepts `Light` or `Dark`. A successful chart generation response contains a rendered `image/png` preview, generated C# code, and generated XAML if supported.

## Privacy and security

Charts MCP runs locally. Chart data is parsed and rendered in the MCP server process, and the server does not call external LLM providers or read provider API keys.

The MCP client receives the rendered chart image and generated code. Generated snippets can contain labels, values, colors, and other fields from the chart request.

Do not include secrets, credentials, or sensitive personal data in JSON, titles, labels, or descriptions, unless the connected MCP client is approved to receive that data.

## Troubleshooting

### `mcp-server-charts` command not found

The `mcp-server-charts` command must be on your system's `PATH`. If you installed it as a global .NET tool, check that `PATH` is available to your editor. This is usually `~/.dotnet/tools` on macOS and Linux, or `%USERPROFILE%\.dotnet\tools` on Windows.

You can verify the tool is installed by running:

```bash
dotnet tool list -g
```

### MCP server does not appear in the editor

- **Restart your editor.** Most editors require a restart to detect new MCP servers, after the MCP configuration file is added or modified.
- **Check the config file location.** Each editor expects configuration in a specific path. See the [setup instructions for your editor](#set-up-the-mcp-server-in-your-editor).
- **Validate your JSON.** A syntax error in the configuration file can prevent the server from loading.
- **Use an absolute command path.** This may help the editor resolve `mcp-server-charts`.

### Server starts but chart rendering fails

- **Confirm the Avalonia Pro Charts license.** Chart rendering requires a valid license key where the server runs. You can check your subscription and license key at the [Avalonia portal](https://portal.avaloniaui.net/).
- **Check the server logs.** Logs are written under `logs/AvaloniaChartsMcpServer_*.log` in the MCP server output directory. These may indicate startup or rendering failures.
- **Try a smaller chart first.** A simple `avalonia_bar_chart` call can separate setup issues from data format issues.
- **Increase log detail temporarily.** Try setting `AVALONIA_CHARTS_MCP_LOG_LEVEL` to a higher level, then lower or remove it after troubleshooting.

### Format error

- Check palette and color values. Hex colors such as `#2196F3` are safest.
- Avoid empty palette entries in comma-separated palette strings.

## See also

- [AI Tools overview](/tools/ai-tools/)
- [Avalonia Charts](/controls/data-display/charts/)
- [DevTools MCP](/tools/developer-tools/mcp)
- [Build MCP](/tools/ai-tools/build-mcp)
- [Parcel MCP](/tools/parcel/mcp)
