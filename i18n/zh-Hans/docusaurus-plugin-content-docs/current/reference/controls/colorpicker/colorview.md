---
description: REFERENCE - Built-in Controls
---

# 选色视图

提供一个颜色选择界面，用户可以通过光谱、调色板和组件滑块进行颜色编辑。

## 常见属性

| 属性 | 描述 |
|------|-----|
| `Color` | 获取或设置当前选中的 RGB 色彩模型中的颜色。对于控件作者，建议使用 `HsvColor` 以避免精度损失和颜色漂移。 |
| `ColorModel` | 获取或设置滑块使用的活动色彩模型。该属性仅适用于组件标签页。光谱标签页必须始终使用 HSV 模型，调色板标签页只包含预定义颜色。 |
| `ColorSpectrumComponents` | 获取或设置光谱显示的两个 HSV 色彩组件。 |
| `ColorSpectrumShape` | 获取或设置光谱的显示形状。 |
| `HexInputAlphaPosition` | 获取或设置十六进制输入框中透明度组件相对于所有其他颜色组件的位置。 |
| `HsvColor` | 获取或设置当前选中的 HSV 色彩模型中的颜色。应在所有情况下使用此属性，而不是 `Color` 属性。内部，`ColorSpectrum` 使用 HSV 色彩模型，使用此属性可以避免精度损失和颜色漂移。 |
| `IsAccentColorsVisible` | 获取或设置一个值，指示是否显示重点颜色和预览颜色。 |
| `IsAlphaEnabled` | 获取或设置一个值，指示是否启用透明度组件。当禁用（设置为 false）时，透明度组件将固定为最大值，编辑控件被禁用。 |
| `IsAlphaVisible` | 获取或设置一个值，指示是否显示透明度组件的编辑控件（滑块和文本框）。隐藏时，现有的透明度值将被保持。注意，`IsComponentTextInputVisible` 也控制透明度组件文本框的可见性。 |
| `IsColorComponentsVisible` | 获取或设置一个值，指示是否显示颜色组件标签页/面板/页面（子视图）。 |
| `IsColorModelVisible` | 获取或设置一个值，指示是否显示活动色彩模型指示器/选择器。 |
| `IsColorPaletteVisible` | 获取或设置一个值，指示是否显示调色板标签页/面板/页面（子视图）。 |
| `IsColorPreviewVisible` | 获取或设置一个值，指示是否显示颜色预览。注意，重点颜色的可见性由 `IsAccentColorsVisible` 另外控制。 |
| `IsColorSpectrumVisible` | 获取或设置一个值，指示是否显示颜色光谱标签页/面板/页面（子视图）。 |
| `IsColorSpectrumSliderVisible` | 获取或设置一个值，指示是否显示颜色光谱的第三组件滑块。 |
| `IsComponentSliderVisible` | 获取或设置一个值，指示是否显示颜色组件滑块。所有颜色组件都由此属性控制，但透明度也可以通过 `IsAlphaVisible` 控制。 |
| `IsComponentTextInputVisible` | 获取或设置一个值，指示是否显示颜色组件文本输入。所有颜色组件都由此属性控制，但透明度也可以通过 `IsAlphaVisible` 控制。 |
| `IsHexInputVisible` | 获取或设置一个值，指示是否显示十六进制颜色值文本输入。 |
| `MaxHue` | 获取或设置色调组件的最大值，范围从 0 到 359。此属性必须大于 `MinHue`。 |
| `MaxSaturation` | 获取或设置饱和度组件的最大值，范围从 0 到 100。此属性必须大于 `MinSaturation`。 |
| `MaxValue` | 获取或设置明度组件的最大值，范围从 0 到 100。此属性必须大于 `MinValue`。 |
| `MinHue` | 获取或设置色调组件的最小值，范围从 0 到 359。此属性必须小于 `MaxHue`。 |
| `MinSaturation` | 获取或设置饱和度组件的最小值，范围从 0 到 100。此属性必须小于 `MaxSaturation`。 |
| `MinValue` | 获取或设置明度组件的最小值，范围从 0 到 100。此属性必须小于 `MaxValue`。 |
| `PaletteColors` | 获取或设置调色板中的单独颜色集合。通常不手动设置此属性。而应通过提供一个 `IColorPalette` 自动设置给 `Palette` 属性。 |
| `PaletteColumnCount` | 获取或设置调色板每行的颜色数（部分）。在标准调色板中，行是色调，列是颜色。通常不手动设置此属性。而应通过提供一个 `IColorPalette` 自动设置给 `Palette` 属性。 |
| `Palette` | 获取或设置调色板。这将自动设置 `PaletteColors` 和 `PaletteColumnCount`，覆盖任何现有值。 |
| `SelectedIndex` | 获取或设置选中的标签页/面板/页面（子视图）的索引。在使用默认控件主题时，此属性设计用于与 `ColorViewTab` 枚举一起使用。`ColorViewTab` 枚举定义了每个三个标准标签页的索引值。使用方式如 `SelectedIndex = (int)ColorViewTab.Palette`。 |

:::note
关于可见性的属性需使用 "IsThingVisible" 而不是 "ShowThing" 命名模式，是因为某些 UI 元素具有分别控制启用状态和可见状态的能力。命名也与 `Control` 一致。
:::

## 伪类

无

## 模板部分

| 名称 | 类型 | 描述 |
|------|----- |-----|
| `PART_HexTextBox` | TextBox | 提供一个输入或输出，用于解析控件可以识别的十六进制颜色表示法。 |
| `PART_TabControl` | TabControl | 用于通过光谱、调色板和组件标签页/面板/页面（子视图）导航的主控件。这个模板部分是可选的，仅在某些验证场景中需要 `SelectedIndex`。 |

