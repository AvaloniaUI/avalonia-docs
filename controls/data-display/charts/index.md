---
id: index
title: Chart controls
description: Avalonia Charts is a library of over 80 data visualization controls for dashboards, financial tools, analytics, and more.
doc_type: overview
tags:
  - accelerate
---

Charts provide a library of data visualization controls for building dashboards, analytics, financial tools, scientific reports, and more. Common charting features, such as tooltips, legends, interactivity, etc. are supported out of the box, integrating with Avalonia's theming system to allow deep customization.

:::info
Charts are available as part of [Avalonia Accelerate](https://avaloniaui.net/accelerate) Enterprise.
:::

## Example use cases

Charts are suited for:

- **Business dashboards:** KPI cards, trend lines, bar comparisons, and funnel views for operational data.
- **Financial applications:** Candlestick, OHLC, Heikin-Ashi, and other price-action charts for trading and market analysis.
- **Analytics and reporting:** Heatmaps, scatter plots, histograms, and table charts for exploring and presenting datasets.
- **Scientific and statistical views:** Box plots, violin plots, error bars, and mosaic charts for distributional analysis.
- **Process and hierarchy visualization:** Sankey diagrams, organisation charts, treemaps, and network graphs for relational data.
- **Geographic data:** Choropleth, bubble map, and heatmap overlays for regional comparisons.
- **Progress and status indicators:** Circular gauges, linear gauges, and liquid-fill gauges for real-time monitoring.

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
| [Matrix chart](analytics/matrix-chart) | Displays relationships between two sets of categories in a grid. |
| [Table chart](analytics/table-chart) | Presents data in rows and columns with optional conditional formatting. |
| [Bump chart](analytics/bump-chart) | Tracks rank changes over time using crossed lines. |
| [Slope chart](analytics/slope-chart) | Compares values at two points in time using angled lines. |
| [Pyramid chart](analytics/pyramid-chart) | Stacks segments vertically to show hierarchical or sequential proportions. |
| [Theme river chart](analytics/theme-river-chart) | Displays how category proportions change over time as a flowing stream. |
| [Pictorial bar chart](analytics/pictorial-bar-chart) | Replaces standard bars with icons or shapes sized by value. |

### Cartesian charts

Charts that plot data on horizontal and vertical axes. Use these for trends, comparisons, distributions, and correlations.

| Chart | Description |
| --- | --- |
| [Bar chart](cartesian/bar-chart) | Compares discrete quantities across categories using rectangular bars. |
| [Line chart](cartesian/line-chart) | Connects data points with straight segments to show trends over time. |
| [Area chart](cartesian/area-chart) | Fills the area below a line to emphasize cumulative totals or volume. |
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
| [Radial bar chart](circular/radial-bar-chart) | Displays multiple series as arcs at different radii for circular comparison. |

### Financial charts

Specialized charts for price and market data analysis.

| Chart | Description |
| --- | --- |
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
| [Linear gauge](gauges/linear-gauge-chart) | A horizontal or vertical track with a pointer or fill. |
| [Liquid fill gauge](gauges/liquid-fill-gauge) | Represents a percentage as a rising liquid level inside a shape. |
| [Progress donut](gauges/progress-donut-chart) | A circular arc that fills proportionally to indicate progress. |

### Hierarchy and flow charts

Charts for visualizing relationships, flows, and tree structures.

| Chart | Description |
| --- | --- |
| [Sankey chart](hierarchy/sankey-chart) | Shows flow quantities between nodes using proportional bands. |
| [Alluvial chart](hierarchy/alluvial-chart) | Tracks how items transition between categories across stages. |
| [Treemap chart](hierarchy/treemap-chart) | Represents hierarchical data as nested rectangles sized by value. |
| [Sunburst chart](hierarchy/sunburst-chart) | Displays hierarchy as concentric rings radiating from a center. |
| [Circle packing chart](hierarchy/circle-packing-chart) | Nests circles to represent hierarchical proportions. |
| [Icicle chart](hierarchy/icicle-chart) | Shows hierarchy as stacked rectangular bands from top to bottom. |
| [Dendrogram chart](hierarchy/dendrogram-chart) | A tree diagram used in clustering and classification contexts. |
| [Indented tree chart](hierarchy/indented-tree-chart) | Displays hierarchy as an indented list with expandable nodes. |
| [Radial tree chart](hierarchy/radial-tree-chart) | Arranges a tree hierarchy in a circular layout. |
| [Organization chart](hierarchy/organization-chart) | Visualizes reporting structures and team hierarchies. |
| [Mind map chart](hierarchy/mindmap-chart) | Radiates branches from a central concept for ideation layouts. |
| [Network chart](hierarchy/network-chart) | Plots nodes and edges to show relationships without a fixed hierarchy. |
| [Force-directed graph](hierarchy/force-directed-graph) | Arranges nodes using simulated physical forces to reveal clusters. |
| [Chord diagram](hierarchy/chord-diagram) | Shows pairwise relationships between entities as arcs around a circle. |
| [Arc diagram](hierarchy/arc-diagram-chart) | Displays connections between nodes laid out on a straight axis. |
| [Process flow chart](hierarchy/process-flow-chart) | Represents sequential or branching workflows as a flowchart. |

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
| [Radar chart](radial/radar-chart) | Plots multivariate data as a polygon on a circular grid of axes. |
| [Polar area chart](radial/polar-area-chart) | Divides a circle into equal-angle segments sized by value. |
| [Nightingale Rose chart](radial/nightingale-rose-chart) | A polar area chart where radius, not area, encodes the value. |
| [Radial bar chart](radial/radial-bar-chart) | Displays categories as arcs of varying length around a center point. |
| [Radial line chart](radial/radial-line-chart) | A line chart projected onto a circular axis. |

### Scheduling and timeline charts

Charts for time-based planning, project management, sequential data, etc.

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
| [Box plot chart](statistical/boxplot-chart) | Summarizes a distribution using medians, quartiles, and outliers. |
| [Error bar chart](statistical/error-bar-chart) | Adds error or uncertainty indicators to data points. |
| [Mosaic chart](statistical/mosaic-chart) | Visualizes proportions across two categorical variables as nested rectangles. |
| [Violin plot chart](statistical/violin-plot-chart) | Combines a box plot with a kernel density shape to show distribution. |

## Shared elements

Most chart types share the following configurable elements:

| Element | Description |
| --- | --- |
| [Legend](shared-elements/legend-chart) | Identifies each data series by name and color. |
| [Tooltip](shared-elements/tooltip-chart) | Shows data values on hover or tap. |
| [Crosshairs](shared-elements/crosshairs-chart) | Draws intersecting lines that follow the pointer across the chart. |
| [Data labels](shared-elements/data-labels-chart) | Renders the value of each data point directly on the chart. |
| [Markers](shared-elements/markers-chart) | Adds point symbols at each data value. |
| [Trendline](shared-elements/trendline-chart) | Overlays a regression or moving-average line on a series. |
| [Annotations](shared-elements/annotations-chart) | Places labels, lines, or shapes at specific data coordinates. |
| [Axis customization](shared-elements/axis-customization-chart) | Controls tick marks, labels, gridlines, and scale. |
| [Interactions](shared-elements/interactions-chart) | Configures zoom, pan, and selection behavior. |

## See also

- [Accelerate installation guide](/tools/installing-accelerate)
