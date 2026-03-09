---
id: contentcontrol
title: ContentControl
description: A base control that displays a single piece of content, which can be a string, a control, or a data-bound object rendered through a data template.
doc-type: reference
---

import ControlContentStudentScreenshot from '/img/controls/contentcontrol/contentcontrol-student.png';

[`ContentControl`](/api/avalonia/controls/contentcontrol) is a control that displays a single piece of content. The content can be a string, a control, or a data-bound object rendered through a `DataTemplate`. Many common Avalonia controls, including `Button`, `Window`, and `UserControl`, inherit from `ContentControl`, so understanding how it works is fundamental to building Avalonia applications.

## Common properties

You will probably use these properties most often:

| Property | Description |
|---|---|
| `Content` | The content to display in the control. |
| `ContentTemplate` | A `DataTemplate` used to render the `Content` object. |
| `HorizontalContentAlignment` | Controls how the content is aligned horizontally within the control. |
| `VerticalContentAlignment` | Controls how the content is aligned vertically within the control. |

## Displaying content

At its simplest, a `ContentControl` displays the data you assign to its [`Content`](/api/avalonia/controls/contentcontrol/content) property.

For example:

```xml
<ContentControl Content="Hello World!"/>
```

This displays the string "Hello World!". Because `Content` is the control's default (content) property, you can also write:

```xml
<ContentControl>Hello World!</ContentControl>
```

### Hosting a child control

If you assign a control to a `ContentControl`, it renders that control directly:

```xml
<ContentControl>
  <Button>Click Me!</Button>
</ContentControl>
```

A `ContentControl` can hold only one direct child. If you need to display multiple elements, wrap them in a layout panel such as a `StackPanel` or `Grid`:

```xml
<ContentControl>
  <StackPanel>
    <TextBlock Text="Line one" />
    <TextBlock Text="Line two" />
  </StackPanel>
</ContentControl>
```

### Displaying content with templates

`ContentControl` becomes especially useful when you combine it with data binding and data templates. By setting the `ContentTemplate` property, you control how a bound data object is rendered visually. For example, given the following view models:

```csharp
namespace Example
{
    public class MainWindowViewModel : ViewModelBase
    {
        object content = new Student("Jane", "Deer");

        public object Content
        {
            get => content;
            set => this.RaiseAndSetIfChanged(ref content, value);
        }
    }

    public class Student
    {
        public Student(string firstName, string lastName)
        {
            FirstName = firstName;
            LastName = lastName;
        }

        public string FirstName { get; }
        public string LastName { get; }
    }
}
```

> Note: The following examples assume an instance of `MainWindowViewModel` is assigned to the window's `DataContext`. See [the section on `DataContext`](/docs/data-binding/data-context) for more information.

You can display the student's first and last name in a `ContentControl` using the `ContentTemplate` property:

```xml
<Window xmlns="https://github.com/avaloniaui">
  <ContentControl Content="{Binding Content}">
    <ContentControl.ContentTemplate>
      <DataTemplate>
        <Grid ColumnDefinitions="Auto,Auto" RowDefinitions="Auto,Auto">
          <TextBlock Grid.Row="0" Grid.Column="0">First Name:</TextBlock>
          <TextBlock Grid.Row="0" Grid.Column="1" Text="{Binding FirstName}"/>
          <TextBlock Grid.Row="1" Grid.Column="0">Last Name:</TextBlock>
          <TextBlock Grid.Row="1" Grid.Column="1" Text="{Binding LastName}"/>
        </Grid>
      </DataTemplate>
    </ContentControl.ContentTemplate>
  </ContentControl>
</Window>
```

<img className="center" src={ControlContentStudentScreenshot} alt="Student first and last name" />

For more information, see the [data templates](/docs/data-templates/introduction-to-data-templates) page.

### Switching content dynamically

Because `Content` is a bindable property, you can swap what a `ContentControl` displays at runtime. This pattern is commonly used for view-based navigation, where you bind a view model to `Content` and use data templates (or a `ViewLocator`) to resolve the appropriate view:

```xml
<ContentControl Content="{Binding CurrentPage}">
  <ContentControl.DataTemplates>
    <DataTemplate DataType="vm:HomeViewModel">
      <views:HomeView />
    </DataTemplate>
    <DataTemplate DataType="vm:SettingsViewModel">
      <views:SettingsView />
    </DataTemplate>
  </ContentControl.DataTemplates>
</ContentControl>
```

When your view model changes `CurrentPage` from a `HomeViewModel` to a `SettingsViewModel`, the `ContentControl` automatically renders the matching view.

If you want an animated transition when the content changes, consider using [`TransitioningContentControl`](transitioningcontentcontrol) instead.

## See also

- [ContentControl API reference](/api/avalonia/controls/contentcontrol)
- [`ContentControl.cs` source code on GitHub](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/ContentControl.cs)
- [Data templates](/docs/data-templates/introduction-to-data-templates)
- [`TransitioningContentControl`](transitioningcontentcontrol)
- [Data binding](/docs/data-binding/data-context)
