---
id: control-template-walkthrough
title: Control template walkthrough
---

This walkthrough builds a complete control template from scratch, explaining each component. By the end, you will understand how to re-template any Avalonia control.

## Prerequisites

- An Avalonia project with a `Window` where you can add styles and controls.
- Familiarity with [styles](styles) and [XAML](../fundamentals/avalonia-xaml.md) basics.

## What is a control template?

A control template defines the visual structure of a control. Every Avalonia control has a default template provided by the theme. You can replace this template entirely to change how a control looks while preserving its behavior.

## Step 1: Create a basic button template

Start with a minimal button template that just renders the content:

```xml
<Window.Styles>
    <Style Selector="Button.custom">
        <Setter Property="Template">
            <ControlTemplate>
                <Border Background="{TemplateBinding Background}"
                        BorderBrush="{TemplateBinding BorderBrush}"
                        BorderThickness="{TemplateBinding BorderThickness}"
                        CornerRadius="{TemplateBinding CornerRadius}"
                        Padding="{TemplateBinding Padding}">
                    <ContentPresenter Content="{TemplateBinding Content}"
                                      ContentTemplate="{TemplateBinding ContentTemplate}"
                                      HorizontalContentAlignment="{TemplateBinding HorizontalContentAlignment}"
                                      VerticalContentAlignment="{TemplateBinding VerticalContentAlignment}" />
                </Border>
            </ControlTemplate>
        </Setter>
        <Setter Property="Background" Value="#6366F1" />
        <Setter Property="Foreground" Value="White" />
        <Setter Property="BorderThickness" Value="0" />
        <Setter Property="CornerRadius" Value="6" />
        <Setter Property="Padding" Value="16,8" />
        <Setter Property="HorizontalContentAlignment" Value="Center" />
    </Style>
</Window.Styles>

<Button Classes="custom" Content="Click Me" />
```

### Key concepts

- **`ControlTemplate`** defines the visual tree that replaces the control's default appearance.
- **`TemplateBinding`** binds to properties of the templated parent (the Button). This is more efficient than `{Binding RelativeSource={RelativeSource TemplatedParent}}` but only supports `OneWay`.
- **`ContentPresenter`** is responsible for displaying the button's `Content` property. Without it, the button's content would not appear.

## Step 2: Add visual states with pseudo-classes

Avalonia uses pseudo-classes (similar to CSS) instead of WPF's VisualStateManager. Add interactive states:

```xml
<Style Selector="Button.custom">
    <Setter Property="Template">
        <ControlTemplate>
            <Border x:Name="PART_Border"
                    Background="{TemplateBinding Background}"
                    BorderBrush="{TemplateBinding BorderBrush}"
                    BorderThickness="{TemplateBinding BorderThickness}"
                    CornerRadius="{TemplateBinding CornerRadius}"
                    Padding="{TemplateBinding Padding}">
                <ContentPresenter Content="{TemplateBinding Content}"
                                  ContentTemplate="{TemplateBinding ContentTemplate}"
                                  HorizontalContentAlignment="{TemplateBinding HorizontalContentAlignment}"
                                  VerticalContentAlignment="{TemplateBinding VerticalContentAlignment}" />
            </Border>
        </ControlTemplate>
    </Setter>

    <!-- Default state -->
    <Setter Property="Background" Value="#6366F1" />
    <Setter Property="Foreground" Value="White" />
    <Setter Property="BorderThickness" Value="0" />
    <Setter Property="CornerRadius" Value="6" />
    <Setter Property="Padding" Value="16,8" />
    <Setter Property="HorizontalContentAlignment" Value="Center" />
</Style>

<!-- Hover state -->
<Style Selector="Button.custom:pointerover">
    <Setter Property="Background" Value="#818CF8" />
</Style>

<!-- Pressed state -->
<Style Selector="Button.custom:pressed">
    <Setter Property="Background" Value="#4F46E5" />
</Style>

<!-- Disabled state -->
<Style Selector="Button.custom:disabled">
    <Setter Property="Background" Value="#C7D2FE" />
    <Setter Property="Foreground" Value="#9CA3AF" />
</Style>

<!-- Focused state -->
<Style Selector="Button.custom:focus-visible">
    <Setter Property="BorderBrush" Value="White" />
    <Setter Property="BorderThickness" Value="2" />
</Style>
```

### Common pseudo-classes

| Pseudo-class | When active |
|---|---|
| `:pointerover` | Pointer is over the control |
| `:pressed` | Control is being pressed |
| `:disabled` | Control is disabled (`IsEnabled="False"`) |
| `:focus` | Control has keyboard focus |
| `:focus-visible` | Control has keyboard focus from keyboard navigation (not pointer click) |
| `:checked` | ToggleButton/CheckBox/RadioButton is checked |
| `:unchecked` | ToggleButton/CheckBox/RadioButton is unchecked |
| `:selected` | Item is selected (e.g., ListBoxItem) |

## Step 3: Add animations

Smooth transitions between states using the `Transitions` property:

```xml
<Style Selector="Button.custom">
    <!-- ...template and setters from above... -->
    <Setter Property="Transitions">
        <Transitions>
            <BrushTransition Property="Background" Duration="0:0:0.15" />
            <BrushTransition Property="BorderBrush" Duration="0:0:0.15" />
            <ThicknessTransition Property="BorderThickness" Duration="0:0:0.15" />
        </Transitions>
    </Setter>
</Style>
```

Now the background color fades smoothly between hover, pressed, and normal states.

## Step 4: Use template parts

For more complex templates, name internal elements with the `PART_` convention. The control's code-behind can locate and interact with these parts:

```xml
<ControlTemplate>
    <Grid>
        <Border x:Name="PART_Background"
                Background="{TemplateBinding Background}"
                CornerRadius="{TemplateBinding CornerRadius}" />

        <Border x:Name="PART_Highlight"
                Background="White" Opacity="0"
                CornerRadius="{TemplateBinding CornerRadius}" />

        <ContentPresenter x:Name="PART_ContentPresenter"
                          Content="{TemplateBinding Content}"
                          Margin="{TemplateBinding Padding}"
                          HorizontalContentAlignment="{TemplateBinding HorizontalContentAlignment}"
                          VerticalContentAlignment="{TemplateBinding VerticalContentAlignment}" />
    </Grid>
</ControlTemplate>
```

You can then target these parts in pseudo-class styles:

```xml
<Style Selector="Button.custom:pointerover /template/ Border#PART_Highlight">
    <Setter Property="Opacity" Value="0.1" />
</Style>

<Style Selector="Button.custom:pressed /template/ Border#PART_Highlight">
    <Setter Property="Opacity" Value="0.2" />
</Style>
```

The `/template/` selector navigates into the control's template visual tree. `#PART_Highlight` selects by name.

## Step 5: Putting it all together

Here is the complete template for a polished custom button:

```xml
<Window.Styles>
    <Style Selector="Button.pill">
        <Setter Property="Background" Value="#6366F1" />
        <Setter Property="Foreground" Value="White" />
        <Setter Property="BorderThickness" Value="0" />
        <Setter Property="CornerRadius" Value="999" />
        <Setter Property="Padding" Value="20,10" />
        <Setter Property="HorizontalContentAlignment" Value="Center" />
        <Setter Property="Cursor" Value="Hand" />
        <Setter Property="Transitions">
            <Transitions>
                <BrushTransition Property="Background" Duration="0:0:0.2" />
                <TransformOperationsTransition Property="RenderTransform" Duration="0:0:0.1" />
            </Transitions>
        </Setter>
        <Setter Property="RenderTransform" Value="scale(1)" />
        <Setter Property="Template">
            <ControlTemplate>
                <Border Background="{TemplateBinding Background}"
                        CornerRadius="{TemplateBinding CornerRadius}"
                        Padding="{TemplateBinding Padding}"
                        BoxShadow="0 2 4 0 #20000000">
                    <ContentPresenter Content="{TemplateBinding Content}"
                                      ContentTemplate="{TemplateBinding ContentTemplate}"
                                      HorizontalContentAlignment="{TemplateBinding HorizontalContentAlignment}"
                                      VerticalContentAlignment="{TemplateBinding VerticalContentAlignment}" />
                </Border>
            </ControlTemplate>
        </Setter>
    </Style>

    <Style Selector="Button.pill:pointerover">
        <Setter Property="Background" Value="#818CF8" />
    </Style>

    <Style Selector="Button.pill:pressed">
        <Setter Property="Background" Value="#4F46E5" />
        <Setter Property="RenderTransform" Value="scale(0.97)" />
    </Style>

    <Style Selector="Button.pill:disabled">
        <Setter Property="Background" Value="#E5E7EB" />
        <Setter Property="Foreground" Value="#9CA3AF" />
    </Style>
</Window.Styles>

<StackPanel Spacing="12" Margin="20">
    <Button Classes="pill" Content="Primary Action" />
    <Button Classes="pill" Content="Disabled" IsEnabled="False" />
</StackPanel>
```

## Verify the result

Run your application. You should see a pill-shaped button with a purple background. Hover over the button to confirm the background color lightens, press it to see it darken and scale down slightly, and verify the disabled button appears greyed out. If the transitions are working, color changes animate smoothly rather than switching instantly.

## Tips for custom templates

- Always bind `Padding`, `Background`, `BorderBrush`, `BorderThickness`, and `CornerRadius` with `TemplateBinding` so the template respects property values set from outside.
- Use `ContentPresenter` for content controls and `ItemsPresenter` for items controls.
- Prefer pseudo-class selectors over triggers for state management.
- Name template parts with the `PART_` prefix for clarity and code-behind access.
- Use `Transitions` for smooth state changes instead of discrete setters.
- Test with both light and dark themes to ensure your template works across theme variants.

## See also

- [Control themes](control-themes): How themes use templates for all controls.
- [Style selectors](style-selectors): Selector syntax for targeting controls and states.
- [Pseudo-classes](pseudoclasses): All available pseudo-classes.
