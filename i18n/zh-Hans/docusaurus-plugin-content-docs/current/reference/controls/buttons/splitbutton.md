# 分裂按钮

`SplitButton` 作为 [`Button`](./button) 的扩展，具有可以单独按下的主要和次要部分。主要部分的行为与普通的 `Button` 相同，而次要部分会打开一个 [`Flyout`](../flyouts)，其中包含额外的操作。

import SplitButtonClosedScreenshot from '/img/reference/controls/buttons/splitbutton-closed.png';
import SplitButtonOpenedScreenshot from '/img/reference/controls/buttons/splitbutton-opened.png';
import SplitButtonPaletteFlyoutScreenshot from '/img/reference/controls/buttons/splitbutton-palette-flyout.png';
import SplitButtonExportButtonScreenshot from '/img/reference/controls/buttons/splitbutton-export.png';

## 这是否是正确的控件？

`SplitButton` 应该只由类似的操作组成。从根本上讲，此控件用于将常用操作分组，其中一个操作明显优先于其他操作。最常见的操作应该作为默认操作显示在 `SplitButton` 的主要部分中。较不常见的操作应添加到 `Flyout` 中，在按下次要（下拉）部分时显示。

:::info
用户选择的操作应在按下主要部分或 `Flyout` 中的次要操作时立即调用。所有按下的操作，无论是主要还是次要的，都是立即生效的。
:::

## 常见属性

| 属性       | 描述                                                     |
| ---------- | -------------------------------------------------------- |
| `Content`  | 在主要部分显示的内容                                     |
| `Flyout`   | 次要部分被点击时显示的 `Flyout`                         |
| `Command`  | 主按钮点击时要调用的命令                                 |

## 伪类

| 伪类         | 描述                                                                                                                                                                     |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `:pressed`   | 当通过键盘输入（例如空格或回车）按下整个 `SplitButton` 时设置。在这种状态下，不区分主要部分还是次要部分。                                                                  |
| `:flyout-open` | 当 `Flyout` 打开时设置。                                                                                                                                                 |

## API 参考

[SplitButton](http://reference.avaloniaui.net/api/Avalonia.Controls/SplitButton/)

## 源代码

[SplitButton.cs](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/SplitButton/SplitButton.cs)

## 示例

### 基本示例

```xml
<SplitButton Content="内容" >
    <SplitButton.Flyout>
        <MenuFlyout Placement="Bottom">
            <MenuItem Header="项目1">
                <MenuItem Header="子项1" />
                <MenuItem Header="子项2" />
                <MenuItem Header="子项3" />
            </MenuItem>
            <MenuItem Header="项目2"
                      InputGesture="Ctrl+A" />
            <MenuItem Header="项目3" />
        </MenuFlyout>
    </SplitButton.Flyout>
</SplitButton>
```

<img src={SplitButtonClosedScreenshot} alt="" />

_SplitButton (Flyout closed)_

<img src={SplitButtonOpenedScreenshot} alt="" />

_SplitButton（Flyout已打开）_

### 颜色选择示例

`SplitButton` 的一个常见用例是在编辑器中为文本着色。按下 `SplitButton` 的主要部分将将当前颜色应用于所选文本。按下次要部分将打开 `Flyout`，允许指定并应用另一种颜色。再次注意，当在 `Flyout` 中指定另一种颜色时，所选文本的颜色将立即更改，并且当前颜色也将更新。

```xml
<!-- 我们已定义以下 DataTemplate -->
<DataTemplate DataType="Color">
  <Border CornerRadius="4" Width="20" Height="20" BorderBrush="Gray" BorderThickness="1" >
    <Border.Background>
      <SolidColorBrush Color="{Binding}" />
    </Border.Background>
  </Border>
</DataTemplate>
```

```xml
<!-- SelectedColor、ChangeColorCommand 和 AvailableColors 是我们 ViewModel 的属性 -->
<SplitButton Content="{Binding SelectedColor}" 
             Command="{Binding ChangeColorCommand}">
  <SplitButton.Flyout>
    <Flyout Placement="Bottom">
      <ListBox ItemsSource="{Binding AvailableColors}" 
               SelectedItem="{Binding SelectedColor}" 
               Height="200" Width="200" >
        <ListBox.ItemsPanel>
          <ItemsPanelTemplate>
            <WrapPanel />
          </ItemsPanelTemplate>
        </ListBox.ItemsPanel>
      </ListBox>
    </Flyout>
  </SplitButton.Flyout>
</SplitButton>
```

<img src={SplitButtonPaletteFlyoutScreenshot} alt=""/>

_用于颜色选择的 SplitButton 示例_

### 导出按钮示例

`SplitButton` 的另一个常见用例可能是导出按钮。按下主要部分时，将使用默认设置导出数据。但是，如果按下次要部分，可以指定其他导出选项，例如‘导出为 PNG’、‘导出为 JPG’等。

```xml
<SplitButton Content="导出为PDF"
             Command="{Binding ExportCommand}"
             CommandParameter=".pdf">
    <SplitButton.Flyout>
        <MenuFlyout Placement="RightEdgeAlignedTop">
            <MenuItem Header="导出为PNG"
                      Command="{Binding ExportCommand}"
                      CommandParameter=".png" />
            <MenuItem Header="导出为JPG"
                      Command="{Binding ExportCommand}"
                      CommandParameter=".jpg" />
        </MenuFlyout>
    </SplitButton.Flyout>
</SplitButton>
```

<img src={SplitButtonExportButtonScreenshot} alt="" />

_带有不同导出选项的 SplitButton 示例_