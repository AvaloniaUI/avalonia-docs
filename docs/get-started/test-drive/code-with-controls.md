---
id: code-with-controls
title: Code With Controls
---

In this section, you will implement the core logic to update the Fahrenheit temperature based on the Celsius input.

## Control Names

Avalonia creates objects for each control defined in the XAML hierarchy. Your code can access these controls at runtime, 
but should be named for easy access.

To add control names, follow this procedure:

- Stop the app if it is running.
- Locate the `TextBox` for Celsius.
- Add the `Name` attribute like this:

```xml
<TextBox ... Name="Celsius"/>
```

- Repeat the above for the Fahrenheit input:

```xml
<TextBox ... Name="Fahrenheit"/>
```

## Get Control Values in Code-Behind 

To access the `Text` value of the `celsius` input, follow this procedure:

- Switch to the **MainWindow.axaml.cs** code-behind file.
- Locate the `Button_OnClick` event handler.
- Alter the `Debug` statement to display the text property of the `Celsius` input, like this:

```csharp
Debug.WriteLine($"Click! Celsius={Celsius.Text}");
```

- Run the app again (in debug mode) to confirm that you can see the value in the Celsius appear in the debug window.

## Set Control Values in Code-Behind 

To use the simple formula that converts Celsius temperature to Fahrenheit, you will first need to ensure that the 
Celsius input text converts to a number. The formula is then:

```
Tf = Tc * (9/5) + 32
```

To add the conversion formula, follow this procedure:

- Locate the `Button_OnClick` event handler.
- Validate the Celsius input text as a number.
- Use the conversion formula.
- Update the `Text` in the Fahrenheit input.
- Run the app to check your work.

One implementation of the above is as follows:

```csharp
private void Button_OnClick(object? sender, RoutedEventArgs e)
{
    if (double.TryParse(Celsius.Text, out double C))
    {
        var F = C * (9d / 5d) + 32;
        Fahrenheit.Text = F.ToString("0.0");
    }
    else
    {
        Celsius.Text = "0";
        Fahrenheit.Text = "0";
    }
}
```

You can check your work using the following conversion table:

| Celsius | Fahrenheit |
|---------|------------|
| -10     | 14.0       |
| 0       | 32.0       |
| 10      | 50.0       |
| 21      | 69.8       |
| 25      | 77.0       |
| 32      | 89.6       |

### Exercises

You have now used an event handler to get and set control properties at runtime. Try some of these exercises:

- Stop showing the gridlines (easy).
- Stop the user from changing the text in the Fahrenheit input by setting the `IsReadOnly` attribute (easy).
- Calculate the conversion as the user types into the Celsius input using the `TextChanged` event (moderate).

:::info
For full information about the complete range of Avalonia built-in controls, events and attributes, see the controls reference section [here](../../reference/controls/).
:::
