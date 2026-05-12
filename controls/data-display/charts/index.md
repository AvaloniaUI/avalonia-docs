---
id: index
title: Chart controls
description: Avalonia Charts is a library of over 70 data visualization controls and patterns for dashboards, finance, analytics, and more.
doc-type: overview
tags:
  - avalonia pro
  - avalonia charts
---

Charts provide a library of data visualization controls and documented composition patterns for building dashboards, analytics, financial tools, scientific reports, and more. Common charting features, such as tooltips, legends, and interactivity, are supported out of the box and integrate with Avalonia's theming system.

:::info
Charts are available with [Avalonia Pro](https://avaloniaui.net/pricing).
:::

## Installation and licensing

Install the `Avalonia.Controls.Charts` package in your Avalonia project. All chart types are in this package and use the `https://avaloniaui.net/controls/charts` XML namespace.

```xml
<UserControl xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             xmlns:charts="https://avaloniaui.net/controls/charts">
    <StackPanel Spacing="16">
        <charts:CartesianChart Title="Revenue" Height="300" />
        <charts:SankeyChart Title="User flow" Height="300" />
    </StackPanel>
</UserControl>
```

Add your license key to the executable project:

```xml
<ItemGroup>
  <AvaloniaUILicenseKey Include="YOUR_LICENSE_KEY" />
</ItemGroup>
```

Use the single Charts package and XML namespace for all chart types.

## Example use cases

Charts are suited for:

- **Business dashboards:** KPI cards, trend lines, bar comparisons, and funnel views for operational data.
- **Financial applications:** Candlestick, OHLC, Heikin-Ashi, and other price-action charts for trading and market analysis.
- **Analytics and reporting:** Heatmaps, scatter plots, histograms, and table charts for exploring and presenting datasets.
- **Scientific and statistical views:** Box plots, violin plots, error bars, and mosaic charts for distributional analysis.
- **Process and hierarchy visualization:** Sankey diagrams, organization charts, treemaps, and network graphs for relational data.
- **Geographic data:** Choropleth, bubble map, and heatmap overlays for regional comparisons.
- **Progress and status indicators:** Circular gauges, linear gauges, and liquid-fill gauges for real-time monitoring.

## Data sources

Cartesian series can bind to object collections through `ItemsSource`, `CategoryPath`, and `ValuePath`. For simple numeric series, `ItemsSource` can also be a direct `IList<double>`, `IList<int>`, `IList<float>`, `IList<decimal>`, or `IList<Point>`. Direct numeric lists use the item index as the category value.

Series skip non-finite numeric values such as `NaN` and infinity when computing bounds and rendering continuous data.

Cartesian series use `EmptyPointMode` to control how null or non-finite points are handled in the rendered series. Supported values are `Zero`, `Gap`, `Average`, and `Interpolate`. The default is `Zero`.

## Common chart properties

Most chart controls share these properties through `ChartBase`.

| Property | Description | Default |
| :--- | :--- | :--- |
| `Title` | Text displayed above the chart. | `null` |
| `Palette` | Optional chart palette used to generate series or item colors. | `null` |
| `LabelForeground` | Brush used for chart-level labels when a more specific label brush is not set. | `null` |
| `PlotAreaContent` | Optional control arranged over the effective plot area. | `null` |

Some chart types also expose additional chart-level styling surfaces when the visual surface exists on that chart.

| Property | Description | Default |
| :--- | :--- | :--- |
| `AxisBrush` | Brush used for axis lines, ticks, radial axes, or equivalent scale guides. | `null` |
| `GridLineBrush` | Brush used for chart-level grid lines. | `null` |
| `PlotAreaBackground` | Brush used for the data plot rectangle only, not the whole chart background. | `null` |

## Common series properties

Most series share these properties through `ChartSeries`. Individual chart pages list additional properties for their specific series type.

| Property | Description | Default |
| :--- | :--- | :--- |
| `Title` | Series name shown in legends and generated tooltip content. | `null` |
| `ItemsSource` | Data collection used by the series. | `null` |
| `ValuePath` | Property path used for the primary numeric value. | `null` |
| `Fill` | Brush used for filled series surfaces or item interiors. | `null` |
| `Stroke` | Brush used for series outlines, lines, or item borders. | `null` |
| `StrokeThickness` | Base stroke thickness. Some default themes set a type-specific value. | `1.0` |
| `PointBrushPath` | Optional property path that resolves an `IBrush` per data item. Supported series use it for individual points, markers, segments, or slices. | `null` |

## Animation

Charts and series share an animation pipeline.

| Property | Description | Default |
| :--- | :--- | :--- |
| `IsAnimationEnabled` | Enables chart entry animations. | `true` |
| `AnimationDuration` | Duration of the chart entry animation. | `00:00:01` |
| `Easing` | Easing function applied to chart animation progress. | `CubicEaseOut` |
| `AnimationDelay` | Series-level delay before the series animation starts. | `00:00:00` |
| `AnimationProgress` | Series-level animation progress from `0.0` to `1.0`. | `1.0` |

## Extensibility

Custom Cartesian series derive from `CartesianSeries` and implement `RenderSeries(in SeriesRenderContext context)`. The render context provides the chart instance, plot area, category map, viewport bounds, and resolved brushes needed by the series drawing logic. Series can override `CreateLegendItem` to customize their legend marker and can expose data through `GetDataPoints()` or related range and polar data-point structs for bounds, tooltips, and interactions. When upgrading an existing custom Cartesian series, move any older `TryRenderSelf(...)` rendering logic into `RenderSeries(in SeriesRenderContext context)`.

Financial overlays can render in `FinancialChart` by implementing `IFinancialChartOverlaySeries`. See [Financial chart](financial/financial-chart) for overlay-specific behavior.

## Chart categories

### Analytics and KPI charts

Charts for summarizing metrics, identifying patterns, and presenting findings.

| Chart | Description |
| --- | --- |
| [KPI card](analytics/kpi-card) | Displays a key metric alongside a trend indicator and a sparkline. |
| [Heatmap chart](analytics/heatmap-chart) | Shows a matrix of values as a color-coded grid. |
| [Funnel chart](analytics/funnel-chart) | Visualizes a sequential process where volume decreases at each stage. |
| [Waffle chart](analytics/waffle-chart) | Represents a percentage as filled cells in a grid. |
| [Word cloud chart](analytics/word-cloud-chart) | Sizes words by frequency to show prominence in a dataset. |
| [Bullet chart](analytics/bullet-chart) | Compares a primary value to a target and qualitative ranges in a compact layout. |
| [Calendar heatmap chart](analytics/calendar-heatmap-chart) | Shows daily activity intensity in a week-by-week calendar grid. |
| [Matrix chart](analytics/matrix-chart) | Displays relationships between two sets of categories in a grid. |
| [Table chart](analytics/table-chart) | Presents data in rows and columns with optional conditional formatting. |
| [Bump chart](analytics/bump-chart) | Tracks rank changes over time using crossed lines. |
| [Slope chart](analytics/slope-chart) | Compares values at two points in time using angled lines. |
| [Pyramid chart](analytics/pyramid-chart) | Stacks segments vertically to show hierarchical or sequential proportions. |
| [Theme river chart](analytics/theme-river-chart) | Builds a theme-river-style layout with stacked area series and a centered spacer offset. |
| [Pictorial bar chart](analytics/pictorial-bar-chart) | Replaces standard bars with icons or shapes sized by value. |

### Bubble and packed charts

Charts that encode magnitude with marker size and often omit traditional axes or grids.

| Chart | Description |
| --- | --- |
| [Bubble chart](bubble/bubble-chart) | Plots X and Y values and uses bubble size for a third measure. |
| [Bubble cloud chart](bubble/bubble-cloud-chart) | Arranges sized bubbles in an organic, clustered layout without axes. |
| [Packed bubble chart](bubble/packed-bubble-chart) | Packs category bubbles tightly into a compact space for part-to-whole comparison. |

### Cartesian charts

Charts that plot data on horizontal and vertical axes. Use these for trends, comparisons, distributions, and correlations.

| Chart | Description |
| --- | --- |
| [Bar chart](cartesian/bar-chart) | Compares discrete quantities across categories using rectangular bars. |
| [Line chart](cartesian/line-chart) | Connects data points with straight segments to show trends over time. |
| [Area chart](cartesian/area-chart) | Fills the area below a line to emphasize cumulative totals or volume. |
| [Combo chart](cartesian/combo-chart) | Combines multiple Cartesian series types on one plot, with optional secondary Y-axis support. |
| [Scatter chart](cartesian/scatter-chart) | Plots individual data points to reveal correlations between two variables. |
| [Spline chart](cartesian/spline-chart) | Connects data points with curved lines to show gradual changes in time-dependent data. |
| [Step line chart](cartesian/step-line-chart) | Connects points with horizontal and vertical steps for discrete state changes. |
| [Stacked bar chart](cartesian/stacked-bar-chart) | Shows part-to-whole relationships across categories using stacked bars. |
| [Stacked area chart](cartesian/stacked-area-chart) | Shows cumulative totals over time using stacked filled areas. |
| [Range area chart](cartesian/range-area-chart) | Displays high-low ranges as a filled band between two values. |
| [Waterfall chart](cartesian/waterfall-chart) | Shows how an initial value changes through a series of positive and negative contributions. |
| [Histogram chart](cartesian/histogram-chart) | Groups continuous values into bins to show frequency distribution. |
| [Pareto chart](cartesian/pareto-chart) | Combines bars and a cumulative line to identify significant factors. |

### Circular charts

Charts that represent data as segments of a circle.

| Chart | Description |
| --- | --- |
| [Pie chart](circular/pie-chart) | Divides a circle into proportional slices to show part-to-whole relationships. |
| [Donut chart](circular/donut-chart) | A pie chart with a hollow center, often used to display a total in the middle. |
| [Semi-donut chart](circular/semi-donut-chart) | A half-circle donut for compact part-to-whole views. |

### Comparison charts

Charts for before-and-after analysis, back-to-back comparison, and proportional allocation.

| Chart | Description |
| --- | --- |
| [Diverging bar chart](comparison/diverging-bar-chart) | Extends bars left and right from a centered baseline. |
| [Dumbbell chart](comparison/dumbbell-chart) | Connects two values per category with a line and markers. |
| [Mekko chart](comparison/mekko-chart) | Combines variable-width columns with stacked segments to show size and composition. |
| [Mirror bar chart](comparison/mirror-bar-chart) | Places two bar series back to back around a center line. |
| [Parliament chart](comparison/parliament-chart) | Displays seat distribution in a hemicycle layout. |
| [Population pyramid chart](comparison/population-pyramid-chart) | Shows two opposing population distributions by ordered bands. |
| [Tornado chart](comparison/tornado-chart) | Draws bidirectional horizontal bars for sensitivity or ranked comparisons. |
| [Venn diagram chart](comparison/venn-diagram-chart) | Visualizes set overlap and intersection values. |

### Engineering and scientific charts

Charts for technical surfaces, multivariate scientific views, and specialized coordinate systems.

| Chart | Description |
| --- | --- |
| [Carpet plot chart](engineering/carpet-plot-chart) | Maps two independent variables and one dependent variable onto a skewed grid. |
| [Hexbin chart](engineering/hexbin-chart) | Aggregates dense 2D point clouds into hexagonal density bins. |
| [Smith chart](engineering/smith-chart) | Visualizes complex impedance or admittance data on a normalized radio frequency grid. |
| [Ternary chart](engineering/ternary-chart) | Plots three-part compositions that sum to a constant. |
| [Wind rose chart](engineering/wind-rose-chart) | Shows directional frequency distributions as stacked polar sectors. |

### Financial charts

Specialized charts for price and market data analysis.

| Chart | Description |
| --- | --- |
| [Financial chart](financial/financial-chart) | Hosts financial series such as candlestick and OHLC on shared price axes. |
| [Candlestick chart](financial/candlestick-chart) | Shows open, high, low, and close prices per period as candle shapes. |
| [OHLC chart](financial/ohlc-chart) | Displays OHLC price data as vertical bars with tick marks. |
| [Heikin-Ashi chart](financial/heikin-ashi-chart) | A smoothed candlestick variant that filters out short-term noise. |
| [Hilo chart](financial/hilo-chart) | Plots only the high and low values per period as a vertical line. |
| [Kagi chart](financial/kagi-chart) | Filters small price moves to show significant direction changes. |
| [Renko chart](financial/renko-chart) | Plots price movement as fixed-size bricks, ignoring time. |
| [Point and figure chart](financial/point-and-figure-chart) | Uses columns of X and O symbols to track supply and demand. |

### Gauges

Visual displays of a single value relative to a range. Common in monitoring dashboards and real-time status panels.

| Chart | Description |
| --- | --- |
| [Circular gauge](gauges/circular-gauge-chart) | A dial-style gauge with a needle or arc indicator. |
| [Gauge chart](gauges/gauge-chart) | Displays a single value on a semi-circular dial with optional needle. |
| [Linear gauge](gauges/linear-gauge-chart) | A horizontal or vertical track with a pointer or fill. |
| [Gradient ring chart](gauges/gradient-ring-chart) | Draws multiple concentric progress rings against a shared maximum. |
| [Liquid fill gauge](gauges/liquid-fill-gauge) | Represents a percentage as a rising liquid level inside a shape. |
| [Progress donut](gauges/progress-donut-chart) | A circular arc that fills proportionally to indicate progress. |

### Hierarchy and flow charts

Charts for visualizing relationships, flows, and tree structures.

| Chart | Description |
| --- | --- |
| [Flow chart](hierarchy/flow-chart) | Visualizes workflows, decision trees, and system maps using nodes and directed edges. |
| [Sankey chart](hierarchy/sankey-chart) | Shows flow quantities between nodes using proportional bands. |
| [Alluvial chart](hierarchy/alluvial-chart) | Tracks how items transition between categories across stages. |
| [Treemap chart](hierarchy/treemap-chart) | Represents hierarchical data as nested rectangles sized by value. |
| [Sunburst chart](hierarchy/sunburst-chart) | Displays hierarchy as concentric rings radiating from a center. |
| [Circle packing chart](hierarchy/circle-packing-chart) | Nests circles to represent hierarchical proportions. |
| [Flame graph](hierarchy/flame-graph) | Shows hierarchical stacks of cost or duration data from bottom to top. |
| [Icicle chart](hierarchy/icicle-chart) | Shows hierarchy as stacked rectangular bands from top to bottom. |
| [Dendrogram chart](hierarchy/dendrogram-chart) | A tree diagram used in clustering and classification contexts. |
| [Indented tree chart](hierarchy/indented-tree-chart) | Displays hierarchy as an indented list with expandable nodes. |
| [Radial tree chart](hierarchy/radial-tree-chart) | Arranges a tree hierarchy in a circular layout. |
| [Organization chart](hierarchy/organization-chart) | Visualizes reporting structures and team hierarchies. |
| [Mind map chart](hierarchy/mindmap-chart) | Builds an ideation layout on top of `FlowChart` with diverging nodes and links. |
| [Network chart](hierarchy/network-chart) | Plots nodes and edges to show relationships without a fixed hierarchy. |
| [Force-directed graph](hierarchy/force-directed-graph) | Arranges nodes using simulated physical forces to reveal clusters. |
| [Chord diagram](hierarchy/chord-diagram) | Shows pairwise relationships between entities as arcs around a circle. |
| [Arc diagram](hierarchy/arc-diagram-chart) | Displays connections between nodes laid out on a straight axis. |
| [Process flow chart](hierarchy/process-flow-chart) | Uses `FlowChart` to represent sequential or branching workflows. |

### Maps

Charts that overlay data onto geographic or custom spatial layouts.

| Chart | Description |
| --- | --- |
| [Choropleth map](maps/choropleth-map-chart) | Colors map regions by a numeric value to show geographic distribution. |
| [Bubble map](maps/bubble-map-chart) | Places sized circles on a map to represent values at specific locations. |
| [Heatmap](maps/heatmap-map-chart) | Applies a color gradient over a map to show intensity or density. |
| [Shape map](maps/shape-map-chart) | Renders custom regions as a data-driven map. |
| [Seat map](maps/seat-map-chart) | Displays venue or floor-plan layouts with interactive seat selection. |

### Radial charts

Charts that use a circular coordinate system rather than Cartesian axes.

| Chart | Description |
| --- | --- |
| [Polar chart](radial/polar-chart) | Plots arbitrary angle and radius values in a polar coordinate system. |
| [Radar chart](radial/radar-chart) | Plots multivariate data as a polygon on a circular grid of axes. |
| [Polar area chart](radial/polar-area-chart) | Divides a circle into equal-angle segments sized by value. |
| [Nightingale Rose chart](radial/nightingale-rose-chart) | A polar area chart where radius, not area, encodes the value. |
| [Radial bar chart](radial/radial-bar-chart) | Displays categories as arcs of varying length around a center point. |
| [Radial line chart](radial/radial-line-chart) | A line chart projected onto a circular axis. |

### Scheduling and timeline charts

Charts for time-based planning, project management, and sequential data.

| Chart | Description |
| --- | --- |
| [Gantt chart](scheduling/gantt-chart) | Shows tasks and their durations across a horizontal time axis. |
| [Timeline chart](scheduling/timeline-chart) | Displays events in chronological order along a linear axis. |
| [Swimlane chart](scheduling/swimlane-chart) | Organizes tasks into parallel rows to show ownership or phase. |
| [Spiral timeline chart](scheduling/spiral-timeline-chart) | Arranges time-based data along a spiral for cyclical patterns. |
| [Sparkline chart](scheduling/sparkline-chart) | An inline miniature chart for showing trends within a small space. |

### Statistical charts

Charts for distributional and comparative statistical analysis.

| Chart | Description |
| --- | --- |
| [Beeswarm plot chart](statistical/beeswarm-plot-chart) | Displays individual observations as non-overlapping dots within each category. |
| [Box plot chart](statistical/boxplot-chart) | Summarizes a distribution using medians, quartiles, and outliers. |
| [Contour plot chart](statistical/contour-plot-chart) | Displays 2D scalar fields as contour lines and optional filled bands. |
| [Density plot chart](statistical/density-plot-chart) | Uses kernel density estimation to render a smooth distribution curve. |
| [Error bar chart](statistical/error-bar-chart) | Adds error or uncertainty indicators to data points. |
| [Mosaic chart](statistical/mosaic-chart) | Visualizes proportions across two categorical variables as nested rectangles. |
| [Parallel coordinates chart](statistical/parallel-coordinates-chart) | Compares multivariate records as lines across parallel axes. |
| [Ridgeline chart](statistical/ridgeline-chart) | Stacks multiple overlapping distributions for shape comparison. |
| [Strip plot chart](statistical/strip-plot-chart) | Displays individual observations per category with jitter and optional mean lines. |
| [Violin plot chart](statistical/violin-plot-chart) | Combines a box plot with a kernel density shape to show distribution. |

## Shared elements

Most chart types share the following configurable elements:

| Element | Description |
| --- | --- |
| [Legend](shared-elements/legend-chart) | Identifies each data series by name and color. |
| [Tooltip](shared-elements/tooltip-chart) | Shows data values on hover or tap. |
| [Crosshairs](shared-elements/crosshairs-chart) | Draws intersecting lines that follow the pointer across the chart. |
| [Data labels](shared-elements/data-labels-chart) | Renders the value of each data point directly on the chart. |
| [Chart export](shared-elements/export-chart) | Saves a chart view to a PNG or JPEG file, PNG stream, or save dialog. |
| [Markers](shared-elements/markers-chart) | Adds point symbols at each data value. |
| [Trendline](shared-elements/trendline-chart) | Overlays a regression or moving-average line on a series. |
| [Annotations](shared-elements/annotations-chart) | Places labels, lines, or shapes at specific data coordinates. |
| [Axis customization](shared-elements/axis-customization-chart) | Controls tick marks, labels, gridlines, and scale. |
| [Interactions](shared-elements/interactions-chart) | Configures zoom, pan, selection, hover highlighting, and trackball behavior. |

## See also

- [Avalonia Pro pricing and access](https://avaloniaui.net/pricing)
