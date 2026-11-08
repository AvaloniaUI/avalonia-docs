---
id: colorpicker
title: ColorPicker
---

import ColorPaletteFluent from '/img/controls/colorpicker/color-palette-fluent.png';
import ColorPaletteFlat from '/img/controls/colorpicker/color-palette-flat.png';
import ColorPaletteFlatHalf from '/img/controls/colorpicker/color-palette-flat-half.png';
import ColorPaletteMaterial from '/img/controls/colorpicker/color-palette-material.png';
import ColorPaletteMaterialHalf from '/img/controls/colorpicker/color-palette-material-half.png';
import ColorPaletteSixteen from '/img/controls/colorpicker/color-palette-sixteen.png';

`ColorPicker` provides a customizable, general-purpose control for selecting colors in an RGB or HSV color space. This implementation is designed as a primitive control for you to build your own color picker, rather than a predefined ready-to-use color picker.

`ColorPicker` includes a family of related components. Each primitive component can be used on its own, or mixed and matched with the others to compose a custom color picker.

## Color picker components

 - **[`ColorSpectrum`](/api/avalonia/controls/primitives/colorspectrum) (primitive):** Two-dimensional spectrum for color selection.
 - **[`ColorSlider`](/api/avalonia/controls/primitives/colorslider) (primitive):** Slider with a background that represents a single color component.
 - **[`ColorPreviewer`](/api/avalonia/controls/primitives/colorpreviewer) (primitive):** Shows a preview color with optional accent colors.
 - **[`ColorView`](/api/avalonia/controls/colorview):** Presents a color for user editing using a spectrum, palette and component sliders.
 - **[`ColorPicker`](/api/avalonia/controls/colorpicker):** Presents a color for user editing using a spectrum, palette and component sliders within a dropdown. Editing is available when the dropdown flyout is open. Otherwise, only the preview color is shown.

## When to use

This control is intended to act as a direct color selection interface with options for developer customization. Typically, it is configured either as a canvas-type `ColorView` control or a company `ColorPicker` dropdown.

For apps with more special-purpose needs, each control and primitive component can be independently customized to create a new color picker, without needing to work with complex rendering and color logic.

You usage options for this control are:

1. Use `ColorView` or `ColorPicker` as-is, directly in your app.
2. Customize `ColorView` or `ColorPicker` using the included properties. (e.g., To disable component sliders, show different palettes, hide tabs, etc.)
3. Create a new color picker using novel combinations of the provided primitive components.
4. Re-template the components to create a brand-new, fully customized color picker.

## How to implement `ColorPicker` in your app

Avalonia is used in some resource-constrained environments, such as embedded devices. For this and other reasons, certain larger controls, such as `ColorPicker`, are not included with the main Avalonia NuGet packages.

To add `ColorPicker` to your app:

1. Add the `Avalonia.Controls.ColorPicker` package to your project.
2. In `App.axaml`, add control themes and styles for the color picker controls:
   - Fluent theme: `<StyleInclude Source="avares://Avalonia.Controls.ColorPicker/Themes/Fluent/Fluent.xaml" />`
   - Simple theme: `<StyleInclude Source="avares://Avalonia.Controls.ColorPicker/Themes/Simple/Simple.xaml" />`

:::note
This step is not required for some theme packages, such as FluentAvalonia, which include all controls by default.
:::

## Color palettes

The following predefined color palettes are provided with `Avalonia.Controls.ColorPicker`, which implement the `IColorPalette` interface. Instances of these palettes may be set to the `Palette` property of a `ColorView` or `ColorPicker`.

<table>
  <tr>
    <th>Palette</th>
    <th>Value and description</th>
  </tr>
  <tr>
    <td>
      <Image light={ColorPaletteFluent} alt="Fluent Color Palette" position="center" maxWidth={400} cornerRadius="true"/>
    </td>
    <td>[`FluentColorPalette`](https://github.com/AvaloniaUI/Avalonia/blob/main/src/Avalonia.Controls.ColorPicker/ColorPalettes/FluentColorPalette.cs)<br /><br />Contains the Fluent color palette found in Windows 10 and later. This is the default color palette.</td>
  </tr>
  <tr>
    <td>
      <Image light={ColorPaletteFlat} alt="Flat UI Color Palette" position="center" maxWidth={400} cornerRadius="true"/>
    </td>
    <td>[`FlatColorPalette`](https://github.com/AvaloniaUI/Avalonia/blob/main/src/Avalonia.Controls.ColorPicker/ColorPalettes/FlatColorPalette.cs)<br /><br />Contains the full [Flat UI color palette](https://github.com/designmodo/Flat-UI).</td>
  </tr>
  <tr>
    <td>
      <Image light={ColorPaletteFlatHalf} alt="Flat UI Half Color Palette" position="center" maxWidth={400} cornerRadius="true"/>
    </td>
    <td>[`FlatHalfColorPalette`](https://github.com/AvaloniaUI/Avalonia/blob/main/src/Avalonia.Controls.ColorPicker/ColorPalettes/FlatHalfColorPalette.cs)<br /><br />Contains half of the [Flat UI color palette](https://github.com/designmodo/Flat-UI), intended for better usability on mobile devices.</td>
  </tr>
  <tr>
    <td>
      <Image light={ColorPaletteMaterial} alt="Material Color Palette" position="center" maxWidth={400} cornerRadius="true"/>
    </td>
    <td>[`MaterialColorPalette`](https://github.com/AvaloniaUI/Avalonia/blob/main/src/Avalonia.Controls.ColorPicker/ColorPalettes/MaterialColorPalette.cs)<br /><br />Contains most of the [Material design color palette](https://material.io/design/color/the-color-system.html#tools-for-picking-colors). The A100-A700 shades of each color, as well as black and white, are excluded.</td>
  </tr>
  <tr>
    <td>
      <Image light={ColorPaletteMaterialHalf} alt="Material Half Color Palette" position="center" maxWidth={400} cornerRadius="true"/>
    </td>
    <td>[`MaterialHalfColorPalette`](https://github.com/AvaloniaUI/Avalonia/blob/main/src/Avalonia.Controls.ColorPicker/ColorPalettes/MaterialHalfColorPalette.cs)<br /><br />Contains half of the [Material design color palette](https://material.io/design/color/the-color-system.html#tools-for-picking-colors), intended for better usability on mobile devices.</td>
  </tr>
  <tr>
    <td>
      <Image light={ColorPaletteSixteen} alt="Sixteen Color Palette" position="center" maxWidth={400} cornerRadius="true"/>
    </td>
    <td>[`SixteenColorPalette`](https://github.com/AvaloniaUI/Avalonia/blob/main/src/Avalonia.Controls.ColorPicker/ColorPalettes/SixteenColorPalette.cs)<br /><br />Contains the standard [sixteen color palette](https://en.wikipedia.org/wiki/Web_colors#HTML_color_names) from the HTML 4.01 specification.</td>
  </tr>
</table>

## See also

- [`ColorView` control](/controls/input/selectors/colorview)
- [ColorPicker API reference](/api/avalonia/controls/colorpicker)
- [`ColorPicker.cs` source code on GitHub](https://github.com/AvaloniaUI/Avalonia/blob/main/src/Avalonia.Controls.ColorPicker/ColorPicker/ColorPicker.cs)
- [Color palettes source code on GitHub](https://github.com/AvaloniaUI/Avalonia/tree/main/src/Avalonia.Controls.ColorPicker/ColorPalettes)