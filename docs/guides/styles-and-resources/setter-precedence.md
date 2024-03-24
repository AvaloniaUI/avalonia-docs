---
id: setter-precedence
title: Setter Precedence
---

import SetterPrecedenceAnimationWrongScreenshot from '/img/guides/styles-and-resources/setter-precedence-animation-wrong.gif';
import SetterPrecedenceAnimationCorrectScreenshot from '/img/guides/styles-and-resources/setter-precedence-animation-correct.gif';

Avalonia `Setters` are applied in order of `BindingPriority`, then visual tree locality, and finally the `Styles` collection 
order. Precedence applies individually to each `StyledProperty` so that styling can benefit from composition. `DirectProperty` 
and CLR properties cannot be styled and therefore do not participate in this precedence.

## BindingPriority Values

```cs
Animation = -1, // Highest priority
LocalValue = 0,
StyleTrigger,
Template,
Style,
Inherited,
Unset = int.MaxValue, // Lowest priority
```

## How is BindingPriority Assigned Within XAML?

`BindingPriority` cannot be explicitly set in XAML. The following examples demonstrate how `BindingPriority` is 
implicitly assigned across each scenario. This is crucial for designing and troubleshooting styles that work as expected.

### Animation

`Animation` has the highest `BindingPriority` and is applied to `Setter`s within a `Keyframe` and generally throughout the 
Transitions system.

```xml
<Button Background="Green" Content="Bounces from Red to Blue">
    <Button.Styles>
        <Style Selector="Button">
            <Style.Animations>
                <Animation IterationCount="Infinite" Duration="0:0:2">
                    <KeyFrame Cue="0%">
                        <Setter Property="Background" Value="Red" />
                    </KeyFrame>
                    <KeyFrame Cue="100%">
                        <Setter Property="Background" Value="Blue" />
                    </KeyFrame>
                </Animation>
            </Style.Animations>
        </Style>
    </Button.Styles>
</Button>
```

### LocalValue

Assigned when a XAML property is directly set outside of a `ControlTemplate`. Both `Background` `Setter`s below will 
have `LocalValue` priority.

```xml
<Button Background="Orange" />
<Button Background="{DynamicResource ButtonBrush}" />
```

:::tip

Resource markup extensions do not have any effect on priority.

:::

### StyleTrigger

When a `Selector` has conditional activation, the `Setter`'s `BindingPriority` is promoted from `Style` to 
`StyleTrigger`. Two selectors with any conditional activation will have equal priority regardless of the number of 
activators present and the position of the activator within the selector syntax. Avalonia doesn't have CSS's concept 
of Specificity.

```xml
<Style Selector="Button:pointerover /template/ ContentPresenter#PART_ContentPresenter">
    <Setter Property="Background" Value="Orange" />
</Style>
```

:::tip

Style class, pseudo class, child position, and property match selectors are conditional. Control name selectors are not conditional.

:::

### Template

When a property is directly set within a `ControlTemplate`. `BorderThickness`, `Background`, and `Padding` below have `Template` priority.

```xml
<ControlTemplate>
    <Border BorderThickness="2">
        <Button Background="{DynamicResource ButtonBrush}" Padding="{TemplateBinding Padding}" />
    </Border>
</ControlTemplate>
```
### Style

When a `Setter` is defined within a `Style` without conditional activation.

```xml
<Style Selector="Button /template/ ContentPresenter#PART_ContentPresenter">
    <Setter Property="Background" Value="Orange" />
</Style>
```

:::tip

Especially noteworthy is the lower priority than `Template`. Therefore, these selectors cannot be used to override the 
properties mentioned in the `Template` example above.

:::

### Inherited

When a property is not set, it may inherit the property value from its parent. This must be specified during 
property registration or with `OverrideMetadata`.

```cs
public static readonly StyledProperty<bool> UseLayoutRoundingProperty =
    AvaloniaProperty.Register<Layoutable, bool>(
        nameof(UseLayoutRounding),
        defaultValue: true,
        inherits: true);
```

## Visual Tree Locality

`Setter`s with equal `BindingPriority` are then selected by their location in the Visual Tree relative to the `Control`. The 
`Setter` with the fewest nodes required to traverse upwards to locate will take precedence. Inline style `Setter`s have 
the highest precedence for this step.

```xml
<Window>
    <Window.Styles>
        <Style Selector="Button">
            <Setter Property="FontSize" Value="16" />
            <Setter Property="Foreground" Value="Red" />
        </Style>
    </Window.Styles>
    <StackPanel>
        <StackPanel.Styles>
            <Style Selector="Button">
                <Setter Property="FontSize" Value="24" />
            </Style>
        </StackPanel.Styles>

        <Button Content="This Has FontSize=24 with Foreground=Red" />
    </StackPanel>
</Window>
```

## Styles Collection Order

When `BindingPriority` and visual tree locality are both equal, the final decider is the order within the `Styles` 
collection. The last applicable `Setter` will take precedence.

```xml
<StackPanel>
    <StackPanel.Styles>
        <Style Selector="Button.small">
            <Setter Property="FontSize" Value="12" />
        </Style>
        <Style Selector="Button.big">
            <Setter Property="FontSize" Value="24" />
        </Style>
    </StackPanel.Styles>

    <Button Classes="small big" Content="This Has FontSize=24" />
    <Button Classes="big small" Content="This Also Has FontSize=24" />
</StackPanel>
```

:::info

These Buttons specify their Classes in different order, but that has no effect on Setter Precedence.

:::

## BindingPriority Does Not Propagate

Recall the `Animation` example above. If you hover, the animated background is replaced with a static background 
despite `BindingPriority.Animation` having the highest priority. This is because the `Selector` targets the wrong 
`Control`. Examining the `ControlTheme` is necessary to diagnose the cause.

<img src={SetterPrecedenceAnimationWrongScreenshot} alt="" />

```xml title='ControlTheme for Button, Trimmed'
<ControlTheme x:Key="{x:Type Button}" TargetType="Button">
    <Setter Property="Background" Value="{DynamicResource ButtonBackground}"/>
    <Setter Property="Template">
        <ControlTemplate>
            <ContentPresenter x:Name="PART_ContentPresenter"
                              Background="{TemplateBinding Background}"/>
        </ControlTemplate>
    </Setter>

    <Style Selector="^:pointerover /template/ ContentPresenter#PART_ContentPresenter">
        <Setter Property="Background" Value="{DynamicResource ButtonBackgroundPointerOver}"/>
    </Style>
</ControlTheme>
```

The top `Setter` applies the `ButtonBackground` to the `Button` with `Style` priority. The `Background` rendering is 
handled by the `ContentPresenter` which has a `Template` priority. It fetches the `ButtonBackground` which has been 
applied to `Button`.

However, when the `Button` is hovered, the `:pointerover` `Selector` is activated with its `StyleTrigger` 
priority, overrides the `TemplateBinding`, and fetches `ButtonBackgroundPointerOver` instead. This circumvents 
fetching the `Button`'s `Background` that our original `Animation` `Selector` targeted. This is summarized in the following table:

| Background Setters and Styles While Hovered                         | Priority                          | Location        |
|---------------------------------------------------------------------|-----------------------------------|-----------------|
| ~~Background="Green"~~                                              | LocalValue                        | Button          |
| Background="Red"                                                    | Animation (Overrides LocalValue)  | Keyframe        |
| ~~`<ContentPresenter Background="{TemplateBinding Background}"/>`~~ | Template                          | ControlTemplate |
| `^:pointerover /template/ ContentPresenter#PART_ContentPresenter`   | StyleTrigger (Overrides Template) | ControlTheme    |

Instead, we should target the `ContentPresenter` with a `Setter` that has priority of at least `StyleTrigger`. `BindingPriority.Animation` 
fits that. This is an observation that cannot be made without examining the original `ControlTemplate` and emphasizes that relying 
on priority alone is insufficient to effectively style an application.

```xml title='Corrected to override :pointerover priority'
<Button Background="Green" Content="Bounces from Red to Blue">
    <Button.Styles>
        <Style Selector="Button /template/ ContentPresenter#PART_ContentPresenter">
            <Style.Animations>
                <Animation IterationCount="Infinite" Duration="0:0:2">
                    <KeyFrame Cue="0%">
                        <Setter Property="Background" Value="Red" />
                    </KeyFrame>
                    <KeyFrame Cue="100%">
                        <Setter Property="Background" Value="Blue" />
                    </KeyFrame>
                </Animation>
            </Style.Animations>
        </Style>
    </Button.Styles>
</Button>
```

<img src={SetterPrecedenceAnimationCorrectScreenshot} alt="" />
