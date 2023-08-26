---
id: code-with-controls
title: Code With Controls
---

import Highlight from '@site/src/components/Highlight';

The action you will implement here is to update the Fahrenheit temperature control, using the value of the `celsius` control, and a simple formula, whenever the button is clicked.

## Control Names

When Avalonia creates the main window at runtime, it also creates objects for each of the controls defined in the window. Your code can access the controls at runtime, but to access them, it will need some control names.

To add some control names, follow this procedure:

- Stop the app if it is running.
- Locate the `TextBox` for Celsius.
- Add the name attribute like this:

```xml
<TextBox ... Name="celsius"/>
```

- Repeat the above for the Fahrenheit input:

```xml
<TextBox ... Name="fahrenheit"/>
```

## Get Control Values in Code-behind 

To demonstrate access to the text value of the `celsius` input, follow this procedure:

- Switch to the **MainWindow.axaml.cs** code-behind file.
- Locate the `ButtonClicked` event handler.
- Alter the `Debug` statement to display the text property of the `celsius` input, like this:

```csharp
Debug.WriteLine($"Click! Celsius={celsius.Text}");
```

- Run the app to confirm that you can see the value in the Celsius appear in the debug window.

## Set Control Values in Code-behind 

To use the simple formula that converts Celsius temperature to Fahrenheit, you will first need to ensure that the Celsius input text converts to a number. The formula is then:

```
Tf = Tc * (9/5) + 32
```

To add the conversion formula, follow this procedure:

- Locate the `ButtonClicked` event handler.
- Alter the code in the event handler to check that the Celsius input text converts to a number.
- Alter the code to include the conversion formula.
- Update the text in the Fahrenheit input to the result of the conversion formula.
- Run the app to check your work.

One implementation of the above is as follows:

```csharp
if (Double.TryParse(celsius.Text, out double C))
{
    var F = C * (9d / 5d) + 32;
    fahrenheit.Text = F.ToString("0.0");
}
else
{
    celsius.Text = "0";
    fahrenheit.Text = "0";
}
```

You can check your work using the following conversion table:

| Celsius | Farenheit |
| ---------- | --------- |
| -10        | 14.0      |
| 0          | 32.0      |
| 10         | 50.0      |
| 21         | 69.8      |
| 25         | 77.0      |
| 32         | 89.6      |

### Exercises

- You have now used an event handler to get and set control properties at runtime. You could now try some of these exercises:
- Stop showing the gridlines (easy).
- Stop the user changing the text in the Fahrenheit input by setting the `IsReadOnly` attribute (easy).
- Calculate the conversion as the user types into the Celsius input (moderate).

:::info
For full information about the complete range of Avalonia built-in controls, events and attributes, see the controls reference section [here](../../reference/controls/).
:::
