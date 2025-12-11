---
id: converting-data
title: Converting data
description: How to use code-behind to execute a response when the button is clicked. Part 6 of 7 the Avalonia starter tutorial.
---

# Converting data

To complete our temperature converter app, we need to give it the ability to take a numerical input and convert it into a different number using a specified formula.

## Naming your controls

To differentiate controls in your app, you can assign names to them. We’re going to do that for the `TextBox` controls.

1. Stop the app if it is running.
2. In the file **MainWindow.axaml**, locate the Celsius text box: `<TextBox Grid.Row="0" Grid.Column="1" Margin="0 5" Text="0"/>`
3. Add the `Name` attribute to the `<TextBox>` tag, like so:

```xml
<TextBox Grid.Row="0" Grid.Column="1" Margin="0 5" Text="0" Name="Celsius"/>
```

4. Locate the Fahrenheit text box: `<TextBox Grid.Row="1" Grid.Column="1" Margin="0 5" Text="0"/>`
5. Add the `Name` attribute to the `<TextBox>` tag, like so:

```xml
<TextBox Grid.Row="1" Grid.Column="1" Margin="0 5" Text="0" Name="Fahrenheit"/>
```

## Getting input values

Next, we need the app to be able to access values entered into the `Celsius` text box.

1. In the code-behind file **MainWindow.axaml.cs**, locate the `Button_OnClick` event handler that you [created earlier](/docs/get-started/starter-tutorial/establishing-events-and-responses).
2. Change the `Debug` statement to display the text entered into the `Celsius` text box, like so:

```cs
Debug.WriteLine($"Click! Celsius={Celsius.Text}");
```

3. Run the app again, in [debug mode if required by your IDE](/docs/get-started/starter-tutorial/establishing-events-and-responses).
4. Click the **Calculate** button a few times.
5. Change the number in the `Celsius` text box and click **Calculate** a few more times.
6. Check the debug output. Confirm that the input values of the `Celsius` text box are being printed.

## Implementing the conversion formula

The final step is to program the app to apply the mathematical formula that converts a Celsius value to Fahrenheit, then print the calculated output in the Fahrenheit text box.

In case you aren’t familiar with the Celsius-Fahrenheit conversion formula, it is:

> Fahrenheit = Celsius * (9/5) + 32

Here’s how we implement this logic in our C# code-behind.

1. In the code-behind file **MainWindow.axaml.cs**, locate the `Button_OnClick` event handler you [created earlier](/docs/get-started/starter-tutorial/establishing-events-and-responses).
2. Delete the `Debug` statement.
3. (Optional) You can also delete the statement `using System.Diagnostics;` from the top of the file. It is no longer needed.
4. Within the `Button_OnClick` event handler, add this code to validate the Celsius input is a number:

```cs
if (double.TryParse(Celsius.Text, out double C))
```

5. Within the `if` conditional clause, add this code to apply the conversion formula:

```cs
{
    var F = C * (9d / 5d) + 32;
```

6. Add this code to print the output as text to the Fahrenheit text box, then close the conditional clause:

```cs
    Fahrenheit.Text = F.ToString("0.0");
}
```

7. Add an `else` conditional clause to reset the text boxes to 0 in case of invalid input:

```cs
else
{
    Celsius.Text = "0";
    Fahrenheit.Text = "0";
}
```

8. Your completed event handler should look like this:

```cs
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

## Checking your work

1. Run your **GetStartedApp**.
2. Input the following numbers into the Celsius box, then click **Calculate**. Confirm the app returns the correct Fahrenheit values:

| **Celsius** | **Fahrenheit** |
| --- | --- |
| -10 | 14.0 |
| 0 | 32.0 |
| 10 | 50.0 |
| 21 | 69.8 |
| 32.0 | 89.6 |

3. Input something into the Fahrenheit box without altering the Celsius box. Confirm the app reverts the text in the Fahrenheit box to the formula output of the given Celsius value.
4. Input “abc” into the Celsius box. Confirm the app resets both text boxes to 0.

:::note
Does it seem odd you that the app has the option to input numbers into the Fahrenheit box, but won’t convert them to Celsius? Not to worry—we’re going to make that box read-only in the exercises, coming up next.
:::

Congratulations! You have created a temperature converter app using Avalonia. More importantly, you now have a solid foundation in the basics of the Avalonia framework.

You can get to work developing your own apps now, if you wish.

Or, to test your knowledge on three short exercises, proceed to the last page of this tutorial.