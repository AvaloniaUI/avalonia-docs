---
id: drawing-graphics
title: Drawing graphics
description: Overview of the Avalonia 2D graphics system including shapes, geometries, and animations.
doc-type: overview
---

Avalonia provides a 2D graphics system with resolution-independent rendering, shape primitives, and animation support.

## Graphics

Avalonia introduces an extensive, scalable, and flexible set of graphics features that have the following benefits:

* Resolution-independent and device-independent graphics. The basic unit of measurement in the Avalonia graphics system is the device-independent pixel, which is 1/96th of an inch, regardless of actual screen resolution, and provides the foundation for resolution-independent and device-independent rendering. Each device-independent pixel automatically scales to match the dots-per-inch (dpi) setting of the system it renders on.
* Improved precision. The Avalonia coordinate system is measured with double-precision floating-point numbers rather than single-precision. Transformations and opacity values are also expressed as double-precision.
* Advanced graphics and animation support. Avalonia simplifies graphics programming by managing animation scenes for you; there is no need to worry about scene processing, rendering loops, and bilinear interpolation. Additionally, Avalonia provides hit-testing support and full alpha-compositing support.
* Skia. By default Avalonia uses the [Skia rendering engine](https://skia.org/), the same rendering engine that powers Google Chrome and Chrome OS, Android, Mozilla Firefox and Firefox OS, and many other products.

## 2D shapes and geometries

Avalonia provides a library of common vector-drawn 2D shapes such as `Ellipse`, `Line`, `Path`, `Polygon` and `Rectangle`.

```xml
<Canvas Background="Yellow" Width="300" Height="400">
    <Rectangle Fill="Blue" Width="63" Height="41" Canvas.Left="40" Canvas.Top="31">
        <Rectangle.OpacityMask>
            <LinearGradientBrush StartPoint="0%,0%" EndPoint="100%,100%">
                <LinearGradientBrush.GradientStops>
                    <GradientStop Offset="0" Color="Black"/>
                    <GradientStop Offset="1" Color="Transparent"/>
                </LinearGradientBrush.GradientStops>
            </LinearGradientBrush>
        </Rectangle.OpacityMask>     
    </Rectangle>
    <Ellipse Fill="Green" Width="58" Height="58" Canvas.Left="88" Canvas.Top="100"/>
    <Path Fill="Orange" Data="M 0,0 c 0,0 50,0 50,-50 c 0,0 50,0 50,50 h -50 v 50 l -50,-50 Z" Canvas.Left="30" Canvas.Top="250"/>
    <Path Fill="OrangeRed" Canvas.Left="180" Canvas.Top="250">
        <Path.Data>
            <PathGeometry>
                <PathFigure StartPoint="0,0" IsClosed="True">
                    <QuadraticBezierSegment Point1="50,0" Point2="50,-50" />
                    <QuadraticBezierSegment Point1="100,-50" Point2="100,0" />
                    <LineSegment Point="50,0" />
                    <LineSegment Point="50,50" />
                </PathFigure>
            </PathGeometry>
        </Path.Data>
    </Path>
    <Line StartPoint="120,185" EndPoint="30,115" Stroke="Red" StrokeThickness="2"/>
    <Polygon Points="75,0 120,120 0,45 150,45 30,120" Stroke="DarkBlue" StrokeThickness="1" Fill="Violet" Canvas.Left="150" Canvas.Top="31"/>
    <Polyline Points="0,0 65,0 78,-26 91,39 104,-39 117,13 130,0 195,0" Stroke="Brown" Canvas.Left="30" Canvas.Top="350"/>
</Canvas>
```

Hover over each shape to identify it:

<div style={{margin: '24px 0', display: 'flex', justifyContent: 'center'}}>
<svg width="300" height="400" viewBox="0 0 300 400" xmlns="http://www.w3.org/2000/svg" style={{borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(128,128,128,0.15)'}}>
  <style>{`
    .dg-shape { transition: opacity 0.2s ease; cursor: pointer; }
    .dg-shapes:hover .dg-shape { opacity: 0.3; }
    .dg-shapes:hover .dg-shape:hover { opacity: 1; }
    .dg-label {
      opacity: 0;
      transition: opacity 0.15s ease;
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
      font-size: 11px;
      font-weight: 600;
      fill: white;
      paint-order: stroke;
      stroke: rgba(0,0,0,0.75);
      stroke-width: 3.5px;
      stroke-linejoin: round;
      pointer-events: none;
    }
    .dg-shape:hover .dg-label { opacity: 1; }
  `}</style>
  <defs>
    <linearGradient id="dg-opmask" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="white" stopOpacity="1"/>
      <stop offset="100%" stopColor="white" stopOpacity="0"/>
    </linearGradient>
    <mask id="dg-rmask">
      <rect x="40" y="31" width="63" height="41" fill="url(#dg-opmask)"/>
    </mask>
  </defs>
  {/* Canvas background */}
  <rect width="300" height="400" fill="#FFFF00"/>
  <g className="dg-shapes">
    {/* Rectangle with OpacityMask */}
    <g className="dg-shape">
      <rect x="40" y="31" width="63" height="41" fill="blue" mask="url(#dg-rmask)"/>
      <text className="dg-label" x="71" y="24" textAnchor="middle">Rectangle</text>
    </g>
    {/* Ellipse */}
    <g className="dg-shape">
      <ellipse cx="117" cy="129" rx="29" ry="29" fill="green"/>
      <text className="dg-label" x="117" y="172" textAnchor="middle">Ellipse</text>
    </g>
    {/* Line */}
    <g className="dg-shape">
      <line x1="120" y1="185" x2="30" y2="115" stroke="red" strokeWidth="2"/>
      {/* Invisible wider hit area for easier hovering */}
      <line x1="120" y1="185" x2="30" y2="115" stroke="transparent" strokeWidth="14"/>
      <text className="dg-label" x="82" y="140" textAnchor="middle">Line</text>
    </g>
    {/* Polygon */}
    <g className="dg-shape">
      <polygon points="75,0 120,120 0,45 150,45 30,120" transform="translate(150,31)" fill="violet" stroke="darkblue" strokeWidth="1"/>
      <text className="dg-label" x="225" y="25" textAnchor="middle">Polygon</text>
    </g>
    {/* Path (mini-language) */}
    <g className="dg-shape">
      <path d="M 0,0 c 0,0 50,0 50,-50 c 0,0 50,0 50,50 h -50 v 50 l -50,-50 Z" transform="translate(30,250)" fill="orange"/>
      <text className="dg-label" x="80" y="242" textAnchor="middle">Path</text>
    </g>
    {/* Path (PathGeometry) */}
    <g className="dg-shape">
      <path d="M 0,0 Q 50,0 50,-50 Q 100,-50 100,0 L 50,0 L 50,50 Z" transform="translate(180,250)" fill="orangered"/>
      <text className="dg-label" x="230" y="242" textAnchor="middle">Path</text>
    </g>
    {/* Polyline */}
    <g className="dg-shape">
      <polyline points="0,0 65,0 78,-26 91,39 104,-39 117,13 130,0 195,0" transform="translate(30,350)" fill="none" stroke="brown" strokeWidth="1"/>
      {/* Invisible wider hit area */}
      <polyline points="0,0 65,0 78,-26 91,39 104,-39 117,13 130,0 195,0" transform="translate(30,350)" fill="none" stroke="transparent" strokeWidth="14"/>
      <text className="dg-label" x="127" y="340" textAnchor="middle">Polyline</text>
    </g>
  </g>
</svg>
</div>

## Add animations

Avalonia UI has animation support lets you make controls grow, shake, spin, and fade, to create interesting page transitions, and more. Avalonia uses a CSS-like animation system which supports [transitions](/docs/graphics-animation/control-transitions) and [keyframe animations](/docs/graphics-animation/keyframe-animations).

## See also

- [Shapes and Geometries](shapes-and-geometries): Shape controls and geometry types.
- [Brushes](brushes): Brush types for fills and strokes.
- [Animations](animations): Overview of animation types.
