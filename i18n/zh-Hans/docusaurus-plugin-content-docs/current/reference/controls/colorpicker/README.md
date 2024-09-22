---
description: REFERENCE - Built-in Controls
---

import ColorPaletteFluent from '/img/reference/controls/colorpicker/color-palette-fluent.png';
import ColorPaletteFlat from '/img/reference/controls/colorpicker/color-palette-flat.png';
import ColorPaletteFlatHalf from '/img/reference/controls/colorpicker/color-palette-flat-half.png';
import ColorPaletteMaterial from '/img/reference/controls/colorpicker/color-palette-material.png';
import ColorPaletteMaterialHalf from '/img/reference/controls/colorpicker/color-palette-material-half.png';
import ColorPaletteSixteen from '/img/reference/controls/colorpicker/color-palette-sixteen.png';

# ColorPicker 取色器

`ColorPicker` 提供了一个高度可定制的通用控件，用户可以使用它在 RGB 或 HSV 色彩空间中选择颜色。这种实现不仅提供了开发者可以用来构建自己的取色器的基本控件，也提供了一个现成的取色器。

`ColorPicker` 包括一系列控件（组件）：

* `ColorSpectrum`（基本组件）：用于颜色选择的二维色谱。
* `ColorSlider`（基本组件）：背景显示单一颜色组件的滑块。
* `ColorPreviewer`（基本组件）：显示预览颜色和可选的重点颜色。
* `ColorView`：使用色谱、调色板和组件滑块展示供用户编辑的颜色。
* `ColorPicker`：在下拉菜单中使用色谱、调色板和组件滑块展示供用户编辑的颜色。当下拉菜单展开时可进行编辑；否则，只显示预览颜色。

每个基本组件都可以单独使用，也可以与其他组件混合搭配。这允许进行其他取色器无法实现的高自定义组合。例如，您可以快速地将 `ColorSpectrum`、`ColorSlider` 和 `ColorPreviewer` 基本组件绑定在一起，创建一个全新设计的自定义取色器。

## 这是合适的控件吗？

这个控件旨在直接用于以用户友好、开发者可定制的方式选择颜色。这可以通过使用画布类型的 `ColorView` 控件或紧凑型的 `ColorPicker` 下拉菜单来完成。

对于有更特殊需求的应用，每个控件和基本组件都可以独立定制，创建新的取色器，而无需重新实现所有高级渲染和颜色逻辑。这对于匹配特定应用的设计和可用性需求非常有用。

使用这个控件的开发者可能：
1. 在他们的应用中直接使用 `ColorView` 或 `ColorPicker`。
2. 使用控件内部属性自定义 `ColorView` 或 `ColorPicker`。这些属性允许对控件进行重大更改，例如禁用组件滑块，显示不同的调色板或隐藏除色谱标签页之外的所有内容。
3. 使用现有的基本组件满足特定应用的设计和可用性需求，创建一个新的取色器。
4. 重新模板化现有组件，创建一个全新的、完全定制的取色器。

## 在您的应用程序中使用

Avalonia 在一些资源受限的环境中使用，例如嵌入式设备。因此根据种种原因，像 `ColorPicker` 这样的较大控件没有包含在主要的 Avalonia UI NuGet 包中。这意味着需要额外的步骤将 `ColorPicker` 添加到您的应用中：

1. 将 `Avalonia.Controls.ColorPicker` nuget 添加到您的项目中。这必须与您的 Avalonia 其他包的版本匹配。
2. 通过在 `App.axaml` 中添加控件主题和样式，为所有取色器控件添加：
   * `<StyleInclude Source="avares://Avalonia.Controls.ColorPicker/Themes/Fluent/Fluent.xaml" />` 用于 Fluent 主题 **或**
   * `<StyleInclude Source="avares://Avalonia.Controls.ColorPicker/Themes/Simple/Simple.xaml" />` 用于 Simple 主题

:::note
如果使用的是如 FluentAvalonia 这样的主题包，这一步不是必需的，因为它默认包含了所有控件。
:::

## 背景

这个控件起源于 UWP（后来的 WinUI）中的一个重新样式化的版本，使用为 Windows 社区工具包实现的基本设计。WinUI 的 `ColorPicker` 不适合小屏幕尺寸，而且控件的整体设计和可用性对用户和开发者来说都有待提高。

尽管具备了所有这些功能，WinUI 控件仍然没有达到预期的好。它无法在不付出大量努力的情况下重新模板化和自定义（部分原因是各个组件之间高度相互依赖）。它还使用了许多模板部件和 code-behind。Avalonia UI 版本的控件（完全重写）试图解决所有这些问题，并成为主要的 XAML 取色器设计。

从 WinUI 学到的主要改进包括：
* `ColorPicker` 实现为下拉式（与所有其他“选择器”匹配）。还有一个 `ColorView` 控件，供那些想要画布类型控件的人使用（类似于 WinUI）。
* Avalonia 控件试图在 XAML 控件主题中尽可能多地实现功能，将 code-behind 保持在绝对最低限度。这显著增加了组合能力，使应用开发者能够自定义这些控件的每个部分（甚至在大多数情况下还包括原始组件）。
* 像 `ColorSlider` 和 `ColorSpectrum` 这样的原始组件是完全独立的，可以单独使用，使应用开发者能够创建自定义的取色器实现。
* 在 Avalonia 本身中添加了一个新的 `HsvColor` 结构（与 `Color` 和 `HslColor` 并列），现在在所有取色器控件中使用。这简化了 code-behind，还使得在原始组件和控件之间的颜色属性绑定成为可能。现在，取色器控件在内部使用 HSV 色彩空间工作。
* `HsvColor` 与 `ColorSlider` 比 WinUI 版本相比更加强大（并且使得易于重新模板化）。
* 添加了许多新属性（比 WinUI 更多），用于控制 `ColorView` 各部分的可见性。每个标签页可以单独隐藏，大多数单独的子部分也可以隐藏。这允许在不需要重新模板化或使用复杂的样式选择器的情况下进行大量的设计定制。
* 使用 `IColorPalette` 接口（与 Windows 社区工具包相同）添加了调色板。WinUI 版本的这个控件不支持调色板。
* 新的属性如 `SelectedIndex` 和 `ColorModel` 允许自定义取色器并将其置于预定义状态。例如，WinUI 的 ColorPicker 总是默认为 RGB，这在代码或 XAML 中无法更改。该新实现没有这样的限制。

## 控制与原始组件

| 控制 | 链接 |
|---------|------|
| `ColorPicker` | |
| `ColorView` | 请参阅专门的 [`ColorView`](colorview.md) 页面。 |
| `ColorSpectrum` | |
| `ColorSlider` | |
| `ColorPreviewer` | |

## 调色板

提供了几种预定义的调色板，实现了 `IColorPalette` 接口。这些调色板的实例可以设置到 `ColorView` 或 `ColorPicker` 的 `Palette` 属性。

<table>
  <tr>
    <th>调色板</th>
    <th>描述</th>
  </tr>
  <tr>
    <td>
      <img src={ColorPaletteFluent} alt="Fluent 调色板" width="300" />
    </td>
    <td>包含 Windows 10 及以后版本中的 Fluent 调色板。这是默认的调色板。</td>
  </tr>
  <tr>
    <td>
      <img src={ColorPaletteFlat} alt="Flat UI 调色板" width="300" />
    </td>
    <td>包含完整的 <a href="https://github.com/designmodo/Flat-UI">Flat UI 调色板</a>。</td>
  </tr>
  <tr>
    <td>
      <img src={ColorPaletteFlatHalf} alt="Flat UI 半调色板" width="300" />
    </td>
    <td>为了提高移动设备上的可用性，包含了 <a href="https://github.com/designmodo/Flat-UI">Flat UI 调色板</a>的一半。</td>
  </tr>
  <tr>
    <td>
      <img src={ColorPaletteMaterial} alt="Material 调色板" width="300" />
    </td>
    <td>包含大部分的 <a href="https://material.io/design/color/the-color-system.html#tools-for-picking-colors">Material 风格调色板</a>。为了使调色板均匀且矩形，进行了以下修改：1. 每种颜色的 A100-A700 阴影被排除。这些阴影不是所有颜色都有（例如棕色/灰色）。2. 黑色/白色是独立的颜色，也被排除。</td>
  </tr>
  <tr>
    <td>
      <img src={ColorPaletteMaterialHalf} alt="Material 半调色板" width="300" />
    </td>
    <td>为了提高移动设备上的可用性，包含了上述 <a href="https://material.io/design/color/the-color-system.html#tools-for-picking-colors">Material 风格调色板</a>的一半。</td>
  </tr>
  <tr>
    <td>
      <img src={ColorPaletteSixteen} alt="十六色调色板" width="300" />
    </td>
    <td>包含 HTML 4.01 规范中的标准 <a href="https://en.wikipedia.org/wiki/Web_colors#HTML_color_names">十六色调色板</a>。</td>
  </tr>
</table>
