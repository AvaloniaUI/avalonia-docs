---
id: user-controls
title: User controls
description: Compose existing controls into a reusable UserControl.
doc-type: how-to
---

A user control combines multiple existing controls into a single, reusable unit.

Creating a user control is similar to creating a new `Window` in an app. You add `<UserControl>` tags in XAML, then place child controls within the tags. Optionally, give the user control some custom logic in the code-behind file.

In general, user controls are the quickest way to customize a UI element for reuse in an application. Some common use cases are a settings panel or a more info card, which must work the same way wherever they appear in a single app.

If you need a general-purpose control that can be re-styled for use across different apps, a [templated control](/docs/custom-controls/templated-controls) may be more appropriate.

## Creating a user control

This example is a `UserCard` that composes a `Border`, a circular avatar, and two text blocks into a reusable profile card.

<XamlPreview>

```xml
<UserControl xmlns="https://github.com/avaloniaui"
             xmlns:vm="using:UserCardSample">
  <UserControl.DataContext>
    <vm:User/>
  </UserControl.DataContext>
  <Border Background="#2D2D30"
          CornerRadius="8"
          Padding="16" Width="260">
    <StackPanel Orientation="Horizontal"
                Spacing="12">
      <Border Width="48" Height="48"
              CornerRadius="24"
              Background="#6366F1">
        <TextBlock Text="{Binding Initials}"
                   Foreground="White"
                   FontSize="18" FontWeight="SemiBold"
                   HorizontalAlignment="Center"
                   VerticalAlignment="Center" />
      </Border>
      <StackPanel VerticalAlignment="Center">
        <TextBlock Text="{Binding DisplayName}"
                   Foreground="White"
                   FontWeight="SemiBold" />
        <TextBlock Text="{Binding Email}"
                   Foreground="#B0B0B0"
                   FontSize="12" />
      </StackPanel>
    </StackPanel>
  </Border>
</UserControl>
```

```csharp
using System.Linq;

namespace UserCardSample;

public class User
{
    public string DisplayName { get; set; } = "Ray Sin";
    public string Email { get; set; } = "ray.sin@example.com";

    // A read-only property, computed from DisplayName, that drives the avatar.
    public string Initials =>
        string.Concat(DisplayName.Split(' ').Select(word => word[0]));
}
```

</XamlPreview>

Notes:

- The `UserControl` is the root element, just as `Window` is the root of a window.
- The child controls are ordinary built-in controls. Composing them is all that is required to build a user control.
- Binding to the `DataContext` keeps the control reusable: assign a different `User` and the card updates accordingly.

## Adding code-behind

In a real project, the control lives in a XAML file paired with a code-behind file of the same name. The `x:Class` attribute links the two, and the constructor calls `InitializeComponent` to load the XAML at runtime.

```xml title="UserCard.axaml"
<UserControl xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             // highlight-next-line
             x:Class="MyApp.Controls.UserCard">
  <!-- layout from the example above -->
</UserControl>
```

```csharp title="UserCard.axaml.cs"
using Avalonia.Controls;

namespace MyApp.Controls;

public partial class UserCard : UserControl
{
    public UserCard()
    {
        // highlight-next-line
        InitializeComponent();
    }
}
```

- The class is `partial` so the build tooling can generate the companion code that wires up named controls and loads the XAML.
- The fully qualified name in `x:Class` must match the class namespace and name exactly.
- `InitializeComponent` is required. Without it, the control's XAML is never loaded and nothing renders.

Code-behind is also where you handle events. Reference a handler from XAML, then implement it in the code-behind class:

```xml
<Button Content="Refresh" Click="OnRefreshClick" />
```

```csharp
private void OnRefreshClick(object? sender, RoutedEventArgs e)
{
    // Handle the click, e.g. reload the user data.
}
```

For more on code-behind, see [Code-behind](/docs/fundamentals/code-behind).

## Using your user control

To place the control in another view, add an XML namespace that maps to the CLR namespace where the control lives, then reference it by its class name.

```xml title="MainWindow.axaml"
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        // highlight-next-line
        xmlns:controls="using:MyApp.Controls"
        x:Class="MyApp.MainWindow">
  // highlight-next-line
  <controls:UserCard />
</Window>
```

The `controls` prefix is arbitrary. Its purpose is to map `MyApp.Controls` so the XAML parser can resolve `UserCard`.

## Exposing properties

Binding to the `DataContext` works well when a control displays inherited data. To make a control configurable directly from XAML — the way built-in controls expose `Content`, `Text`, or `Background` — give it its own [styled properties](/docs/custom-controls/defining-properties#registering-a-styled-property).

The following `LabeledValue` control registers `Label` and `Value` properties, then binds its child `TextBlock`s to them. Naming the root element (`x:Name="root"`) lets the template reference the control's own properties.

```xml title="LabeledValue.axaml"
<UserControl xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             x:Class="MyApp.Controls.LabeledValue"
             // highlight-next-line
             x:Name="root">
  <StackPanel>
    <TextBlock Text="{Binding Label, ElementName=root}" FontWeight="SemiBold" />
    <TextBlock Text="{Binding Value, ElementName=root}" />
  </StackPanel>
</UserControl>
```

```csharp title="LabeledValue.axaml.cs"
using Avalonia;
using Avalonia.Controls;

namespace MyApp.Controls;

public partial class LabeledValue : UserControl
{
    public static readonly StyledProperty<string> LabelProperty =
        AvaloniaProperty.Register<LabeledValue, string>(nameof(Label));

    public static readonly StyledProperty<string> ValueProperty =
        AvaloniaProperty.Register<LabeledValue, string>(nameof(Value));

    public string Label
    {
        get => GetValue(LabelProperty);
        set => SetValue(LabelProperty, value);
    }

    public string Value
    {
        get => GetValue(ValueProperty);
        set => SetValue(ValueProperty, value);
    }

    public LabeledValue()
    {
        InitializeComponent();
    }
}
```

The consumer now sets the properties like any other control:

```xml
<controls:LabeledValue Label="Email" Value="ada@example.com" />
```

:::caution Do not set DataContext = this
It can be tempting to write `DataContext = this` so that `{Binding Label}` resolves against the control. Avoid this. It overrides the `DataContext` that the control would otherwise inherit from its parent, breaking bindings such as `<controls:LabeledValue Value="{Binding SelectedEmail}" />`, which would then resolve against the control instead of the parent's view model.

Bind to the control's own properties with `ElementName=root` (or the shorthand `{Binding #root.Label}`) instead, and let the `DataContext` flow from the parent.
:::

For the full range of property types, including direct and attached properties, see [Defining properties](/docs/custom-controls/defining-properties).

## See also

- [Defining properties](/docs/custom-controls/defining-properties): Add styled, direct, and attached properties to a custom control.
- [Defining events](/docs/custom-controls/defining-events): Add routed events to a custom control.
- [Code-behind](/docs/fundamentals/code-behind): Access controls, set properties, and handle events from a code-behind file.
- [Templated controls](/docs/custom-controls/templated-controls): The alternative approach for a lookless, restylable control.
- [Creating custom controls](/docs/custom-controls): Overview of the custom control types.
- [Custom control sample project](https://github.com/AvaloniaUI/AvaloniaUI.QuickGuides/tree/main/CustomControl): A user control you can clone and run.
