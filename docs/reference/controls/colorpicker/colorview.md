---
description: REFERENCE - Built-in Controls
---

# ColorView

Presents a color for user editing using a spectrum, palette and component sliders.

## Common Properties

| Property | Description |
|----------|-------------|
| `Color` | Gets or sets the currently selected color in the RGB color model. For control authors, use `HsvColor` instead to avoid loss of precision and color drifting. |
| `ColorModel` | Gets or sets the active color model used by the sliders. This property is only applicable to the components tab. The spectrum tab must always be in HSV and the palette tab contains only pre-defined colors. |
| `ColorSpectrumComponents` | Gets or sets the two HSV color components displayed by the spectrum. |
| `ColorSpectrumShape` | Gets or sets the displayed shape of the spectrum. |
| `HexInputAlphaPosition` | Gets or sets the position of the alpha component in the hexadecimal input box relative to all other color components. |
| `HsvColor` | Gets or sets the currently selected color in the HSV color model. This should be used in all cases instead of the `Color` property. Internally, the `ColorSpectrum` uses the HSV color model and using this property will avoid loss of precision and color drifting. |
| `IsAccentColorsVisible` | Gets or sets a value indicating whether accent colors are visible along with the preview color. |
| `IsAlphaEnabled` | Gets or sets a value indicating whether the alpha component is enabled. When disabled (set to false) the alpha component will be fixed to maximum and editing controls disabled. |
| `IsAlphaVisible` | Gets or sets a value indicating whether the alpha component editing controls (Slider(s) and TextBox) are visible. When hidden, the existing alpha component value is maintained. Note that `IsComponentTextInputVisible` also controls the alpha component TextBox visibility. |
| `IsColorComponentsVisible` | Gets or sets a value indicating whether the color components tab/panel/page (subview) is visible. |
| `IsColorModelVisible` | Gets or sets a value indicating whether the active color model indicator/selector is visible. |
| `IsColorPaletteVisible` | Gets or sets a value indicating whether the color palette tab/panel/page (subview) is visible. |
| `IsColorPreviewVisible` | Gets or sets a value indicating whether the color preview is visible. Note that accent color visibility is controlled separately by `IsAccentColorsVisible`. |
| `IsColorSpectrumVisible` | Gets or sets a value indicating whether the color spectrum tab/panel/page (subview) is visible. |
| `IsColorSpectrumSliderVisible` | Gets or sets a value indicating whether the color spectrum's third component slider is visible. |
| `IsComponentSliderVisible` | Gets or sets a value indicating whether color component sliders are visible. All color components are controlled by this property but alpha can also be controlled with `IsAlphaVisible`. |
| `IsComponentTextInputVisible` | Gets or sets a value indicating whether color component text inputs are visible. All color components are controlled by this property but alpha can also be controlled with `IsAlphaVisible`. |
| `IsHexInputVisible` | Gets or sets a value indicating whether the hexadecimal color value text input is visible. |
| `MaxHue` | Gets or sets the maximum value of the Hue component in the range from 0..359. This property must be greater than `MinHue`. |
| `MaxSaturation` | Gets or sets the maximum value of the Saturation component in the range from 0..100. This property must be greater than `MinSaturation`. |
| `MaxValue` | Gets or sets the maximum value of the Value component in the range from 0..100. This property must be greater than `MinValue`. |
| `MinHue` | Gets or sets the minimum value of the Hue component in the range from 0..359. This property must be less than `MaxHue`. |
| `MinSaturation` | Gets or sets the minimum value of the Saturation component in the range from 0..100. This property must be less than `MaxSaturation`. |
| `MinValue` | Gets or sets the minimum value of the Value component in the range from 0..100. This property must be less than `MaxValue`. |
| `PaletteColors` | Gets or sets the collection of individual colors in the palette. This is not commonly set manually. Instead, it should be set automatically by providing an `IColorPalette` to the `Palette` property. |
| `PaletteColumnCount` | Gets or sets the number of colors in each row (section) of the color palette. Within a standard palette, rows are shades and columns are colors. This is not commonly set manually. Instead, it should be set automatically by providing an `IColorPalette` to the `Palette` property. |
| `Palette` | Gets or sets the color palette. This will automatically set both `PaletteColors` and `PaletteColumnCount` overwriting any existing values. |
| `SelectedIndex` | Gets or sets the index of the selected tab/panel/page (subview). When using the default control theme, this property is designed to be used with the `ColorViewTab` enum. The `ColorViewTab` enum defines the index values of each of the three standard tabs. Use like `SelectedIndex = (int)ColorViewTab.Palette`. |

:::note
The properties for visibility use the naming pattern "IsThingVisible" rather than "ShowThing" because some elements of the UI have the ability to control both enabled and visible status separately. Naming also matches `Control` in this case.
:::

## Pseudoclasses

None

## Template Parts

| Name | Type | Description |
|------|----- |-------------|
| `PART_HexTextBox` | TextBox | Provides an input or output for hexadecimal color notation that can be parsed by the control. |
| `PART_TabControl` | TabControl | The main control used to navigate through the spectrum, palette and components tab/panel/page (subviews). This template part is optional and is only required for some validation scenarios of the `SelectedIndex`. |
