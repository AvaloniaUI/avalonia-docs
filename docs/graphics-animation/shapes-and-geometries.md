---
id: shapes-and-geometries
title: Shapes and geometries
description: Shape controls and geometry types for drawing 2D vector graphics in Avalonia.
doc-type: reference
---

Avalonia provides shape controls for drawing common 2D vector graphics and a geometry system for defining complex outlines used in paths, clipping, and hit testing.

## Shape controls

Shape controls are visual elements you place directly in your XAML layout. They participate in layout and can receive pointer events.

### Rectangle

```xml
<Rectangle Width="100" Height="60"
           Fill="SteelBlue" Stroke="DarkBlue" StrokeThickness="2" />
```

| Property | Description |
|---|---|
| `RadiusX`, `RadiusY` | Corner rounding radius for rounded rectangles. |

```xml
<Rectangle Width="100" Height="60" Fill="Coral"
           RadiusX="10" RadiusY="10" />
```

### Ellipse

```xml
<Ellipse Width="100" Height="80"
         Fill="MediumPurple" Stroke="Indigo" StrokeThickness="2" />
```

A circle is an `Ellipse` with equal `Width` and `Height`.

### Line

```xml
<Line StartPoint="0,0" EndPoint="200,100"
      Stroke="Red" StrokeThickness="2" />
```

### Polyline

Draws connected line segments without closing the shape:

```xml
<Polyline Points="0,0 50,50 100,0 150,50 200,0"
          Stroke="Green" StrokeThickness="2" />
```

### Polygon

Like `Polyline` but the shape is automatically closed:

```xml
<Polygon Points="50,0 100,100 0,100"
         Fill="Gold" Stroke="DarkGoldenRod" StrokeThickness="1" />
```

Both `Polyline` and `Polygon` support a `FillRule` property that controls how self-intersecting shapes are filled:

- `EvenOdd` (default): Alternates fill for overlapping regions, creating holes.
- `NonZero`: Fills all enclosed regions regardless of overlap.

```xml
<Polygon Points="50,0 61,35 98,35 68,57 79,91 50,70 21,91 32,57 2,35 39,35"
         Fill="Orange" FillRule="EvenOdd" />
```

### Path

The most versatile shape control. Uses a `Geometry` to define its outline:

```xml
<!-- Using mini-language -->
<Path Data="M 10,10 L 100,10 L 100,100 Z"
      Fill="LightBlue" Stroke="Navy" StrokeThickness="1" />

<!-- Using PathGeometry -->
<Path Fill="Orange">
    <Path.Data>
        <PathGeometry>
            <PathFigure StartPoint="0,0" IsClosed="True">
                <LineSegment Point="100,0" />
                <LineSegment Point="100,100" />
            </PathFigure>
        </PathGeometry>
    </Path.Data>
</Path>
```

## Common shape properties

All shapes inherit from `Shape` and share these properties:

| Property | Description |
|---|---|
| `Fill` | The brush that paints the interior. |
| `Stroke` | The brush that paints the outline. |
| `StrokeThickness` | The thickness of the outline in device-independent pixels. |
| `StrokeDashArray` | A collection of `double` values defining a dashed line pattern. |
| `StrokeDashOffset` | The offset into the dash pattern to start drawing. |
| `StrokeLineCap` | The cap style for line endpoints: `Flat`, `Round`, or `Square`. |
| `StrokeJoin` | The join style at corners: `Miter`, `Bevel`, or `Round`. |
| `StrokeMiterLimit` | The ratio limit at which a miter join is beveled. When the miter length divided by stroke thickness exceeds this value, the join switches from a sharp miter to a bevel. Default is `10`. Only applies when `StrokeJoin` is `Miter`. |
| `Stretch` | How the shape fills its allocated space: `None`, `Fill`, `Uniform`, `UniformToFill`. |

### Dashed lines

```xml
<Line StartPoint="0,0" EndPoint="200,0"
      Stroke="Black" StrokeThickness="2"
      StrokeDashArray="5,3" />

<Rectangle Width="150" Height="80" Fill="Transparent"
           Stroke="Gray" StrokeThickness="1"
           StrokeDashArray="4,2,1,2" />
```

## Geometry types

Geometries define mathematical descriptions of 2D shapes. They are lighter than shape controls and are used by `Path.Data`, `Clip`, and `OpacityMask`.

### RectangleGeometry

```xml
<Path Fill="LightCoral">
    <Path.Data>
        <RectangleGeometry Rect="0,0,100,60" />
    </Path.Data>
</Path>
```

### EllipseGeometry

```xml
<Path Fill="LightGreen">
    <Path.Data>
        <EllipseGeometry Center="50,40" RadiusX="50" RadiusY="40" />
    </Path.Data>
</Path>
```

### LineGeometry

```xml
<Path Stroke="Red" StrokeThickness="2">
    <Path.Data>
        <LineGeometry StartPoint="0,0" EndPoint="100,50" />
    </Path.Data>
</Path>
```

### PathGeometry

The most flexible geometry, composed of figures and segments:

```xml
<PathGeometry>
    <PathFigure StartPoint="10,50" IsClosed="True" IsFilled="True">
        <LineSegment Point="100,50" />
        <ArcSegment Point="100,150" Size="50,50"
                    SweepDirection="Clockwise" />
        <LineSegment Point="10,150" />
    </PathFigure>
</PathGeometry>
```

### Segment types

| Segment | Description |
|---|---|
| `LineSegment` | Draws a straight line to a point. |
| `ArcSegment` | Draws an elliptical arc. |
| `BezierSegment` | Draws a cubic Bezier curve (two control points). |
| `QuadraticBezierSegment` | Draws a quadratic Bezier curve (one control point). |
| `PolyLineSegment` | Draws a series of connected lines. |
| `PolyBezierSegment` | Draws a series of connected cubic Bezier curves. Each set of three points defines a control point, a second control point, and an endpoint. |

### CombinedGeometry

Combines two geometries using a set operation:

```xml
<Path Fill="CornflowerBlue">
    <Path.Data>
        <CombinedGeometry GeometryCombineMode="Exclude">
            <CombinedGeometry.Geometry1>
                <EllipseGeometry Center="50,50" RadiusX="50" RadiusY="50" />
            </CombinedGeometry.Geometry1>
            <CombinedGeometry.Geometry2>
                <EllipseGeometry Center="80,50" RadiusX="50" RadiusY="50" />
            </CombinedGeometry.Geometry2>
        </CombinedGeometry>
    </Path.Data>
</Path>
```

| CombineMode | Result |
|---|---|
| `Union` | Area covered by either geometry. |
| `Intersect` | Area covered by both geometries. |
| `Exclude` | Area in the first geometry but not in the second. |
| `Xor` | Area covered by one geometry but not both. |

### GeometryGroup

Combines multiple geometries into a single geometry:

```xml
<Path Fill="Salmon" Stroke="DarkRed" StrokeThickness="1">
    <Path.Data>
        <GeometryGroup FillRule="EvenOdd">
            <EllipseGeometry Center="50,50" RadiusX="50" RadiusY="50" />
            <EllipseGeometry Center="50,50" RadiusX="25" RadiusY="25" />
        </GeometryGroup>
    </Path.Data>
</Path>
```

The `FillRule` determines how overlapping areas are filled:
- `EvenOdd`: Alternates fill for overlapping regions (creates holes).
- `NonZero`: Fills all enclosed regions.

## Path mini-language

The `Data` property of `Path` accepts SVG-style path data as a string. This compact syntax is efficient for complex shapes.

### Commands

| Command | Parameters | Description |
|---|---|---|
| `M` / `m` | `x,y` | Move to point (absolute / relative) |
| `L` / `l` | `x,y` | Line to point |
| `H` / `h` | `x` | Horizontal line |
| `V` / `v` | `y` | Vertical line |
| `C` / `c` | `x1,y1 x2,y2 x,y` | Cubic Bezier curve |
| `S` / `s` | `x2,y2 x,y` | Smooth cubic Bezier |
| `Q` / `q` | `x1,y1 x,y` | Quadratic Bezier curve |
| `T` / `t` | `x,y` | Smooth quadratic Bezier |
| `A` / `a` | `rx,ry rotation large-arc sweep x,y` | Elliptical arc |
| `Z` / `z` | | Close path |

Uppercase commands use absolute coordinates, lowercase use relative coordinates.

### Examples

```xml
<!-- Triangle -->
<Path Data="M 50,0 L 100,100 L 0,100 Z" Fill="Gold" />

<!-- Rounded rectangle path -->
<Path Data="M 10,0 H 90 A 10,10 0 0 1 100,10 V 50 A 10,10 0 0 1 90,60 H 10 A 10,10 0 0 1 0,50 V 10 A 10,10 0 0 1 10,0 Z"
      Fill="LightSkyBlue" />

<!-- Heart shape -->
<Path Data="M 50,30 A 20,20 0 0 1 90,30 A 20,20 0 0 1 50,80 A 20,20 0 0 1 10,30 A 20,20 0 0 1 50,30 Z"
      Fill="Red" />

<!-- Star -->
<Path Data="M 50,0 L 61,35 L 98,35 L 68,57 L 79,91 L 50,70 L 21,91 L 32,57 L 2,35 L 39,35 Z"
      Fill="Orange" />
```

## Building geometry from code

Use `StreamGeometryContext` to build geometry programmatically. Call `StreamGeometry.Open()` to get a context, then use its drawing methods to define figures:

```csharp
var geometry = new StreamGeometry();

using (var ctx = geometry.Open())
{
    ctx.BeginFigure(new Point(10, 50), isFilled: true);
    ctx.LineTo(new Point(100, 50));
    ctx.ArcTo(
        new Point(100, 150),
        new Size(50, 50),
        rotationAngle: 0,
        isLargeArc: false,
        SweepDirection.Clockwise);
    ctx.LineTo(new Point(10, 150));
    ctx.EndFigure(isClosed: true);
}
```

### StreamGeometryContext methods

| Method | Description |
|---|---|
| `BeginFigure(Point, bool isFilled = true)` | Starts a new figure at the specified point. Set `isFilled` to `false` for an open, unfilled path. |
| `LineTo(Point, bool isStroked = true)` | Draws a straight line to a point. |
| `ArcTo(Point, Size, double, bool, SweepDirection, bool isStroked = true)` | Draws an elliptical arc to a point. |
| `CubicBezierTo(Point, Point, Point, bool isStroked = true)` | Draws a cubic Bezier curve using two control points and an endpoint. |
| `QuadraticBezierTo(Point, Point, bool isStroked = true)` | Draws a quadratic Bezier curve using one control point and an endpoint. |
| `EndFigure(bool isClosed)` | Ends the current figure. Set `isClosed` to `true` to close the shape. |

Set `isStroked` to `false` on any segment to skip drawing the outline for that segment while still including it in the geometry shape. This is useful for creating partially stroked paths.

```csharp
using (var ctx = geometry.Open())
{
    ctx.BeginFigure(new Point(0, 0), isFilled: false);
    ctx.LineTo(new Point(50, 0));              // Stroked
    ctx.LineTo(new Point(100, 0), isStroked: false); // Gap (not stroked)
    ctx.LineTo(new Point(150, 0));             // Stroked
    ctx.EndFigure(isClosed: false);
}
```

## Geometry methods

All `Geometry` objects expose methods for hit testing and transformation:

| Method | Description |
|---|---|
| `FillContains(Point)` | Returns `true` if the point is inside the filled area of the geometry. |
| `StrokeContains(Pen, Point)` | Returns `true` if the point lies on the stroke of the geometry using the specified pen. |
| `GetWidenedGeometry(Pen)` | Returns a new geometry representing the area that would be covered by stroking this geometry with the specified pen. Useful for creating outlined shapes. |
| `GetFlattenedPathGeometry()` | Returns a simplified `PathGeometry` with curves approximated by line segments. |

```csharp
var ellipse = new EllipseGeometry { Center = new Point(50, 50), RadiusX = 40, RadiusY = 40 };
var pen = new Pen(Brushes.Black, 10);

// Get the outline of the stroked ellipse as a geometry
var outlined = ellipse.GetWidenedGeometry(pen);
```

## Using geometries as resources

Define geometries as resources for reuse across your application:

```xml
<Application.Resources>
    <StreamGeometry x:Key="CheckmarkIcon">M 4,8.5 L 8,12.5 L 16,4</StreamGeometry>
    <StreamGeometry x:Key="CloseIcon">M 4,4 L 16,16 M 16,4 L 4,16</StreamGeometry>
</Application.Resources>

<Path Data="{StaticResource CheckmarkIcon}" Stroke="Green" StrokeThickness="2" />
```

`StreamGeometry` is a lightweight, immutable geometry optimized for performance. Use it for icon paths and other static shapes.

## See also

- [Drawing Graphics](drawing-graphics): Overview of the Avalonia graphics system.
- [Brushes](brushes): Fill and stroke brushes.
- [Effects](effects): Box shadows, clipping, and opacity masks.
- [Adding Icons](/docs/graphics-animation/adding-icons): Using icon fonts and vector icons.
