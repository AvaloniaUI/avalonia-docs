---
id: contentcontrol
title: ContentControl
---

import ControlContentStudentScreenshot from '/img/reference/controls/contentcontrol/contentcontrol-student.png';

## Common Properties

| Property  | Description                           |
| --------- | ------------------------------------- |
| `Content` | The content to display in the control |

## Reference

[ContentControl](http://reference.avaloniaui.net/api/Avalonia.Controls/ContentControl/)

## Source code

[ContentControl.cs](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/ContentControl.cs)

## Display content

At its simplest, a `ContentControl` displays the data assigned to its [`Content`](http://reference.avaloniaui.net/api/Avalonia.Controls/ContentControl/4B02A756) property.

For example:

```xml
<ContentControl Content="Hello World!"/>
```

Will display the string "Hello World!". The `Content` property is the control's default property and so the above example can also be written as:

```xml
<ContentControl>Hello World!</ContentControl>
```

If you assign a control to a `ContentControl` then it will display the control, for example:

```xml
<ContentControl>
  <Button>Click Me!</Button>
</ContentControl>
```

### Display content with templates

So far so uninteresting. Where `ContentControl` becomes useful is in tandem with data binding and data templates. By setting the `ContentTemplate` property one can specify how the data in the `Content` property is displayed. For example given the following view models:

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

> Note: The following examples assume an instance of `MainWindowViewModel` is assigned to the Window's `DataContext`. See [the section on `DataContext`](../../basics/data/data-binding/data-context) for more information.

We can display the student's first and last name in a `ContentControl` using the `ContentTemplate` property:

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

For more information see the [data templates](../../basics/data/data-templates.md) section.
