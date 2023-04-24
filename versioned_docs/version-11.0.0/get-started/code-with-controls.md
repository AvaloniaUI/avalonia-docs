---
description: GET STARTED
---

# ⚡ Code With Controls

The action you will implement here is to update the Fahrenheit temperature control, using the value of the Centigrade control, and a simple formula, whenever the button is clicked.

## Control Names

When _Avalonia UI_ creates the main window at runtime, it also creates objects for each of the controls defined in the window. Your code can access the controls at runtime, but to access them, it will need some control names.

To add some control names, follow this procedure:

* [ ] Stop the app if it is running.
* [ ] Locate the input for Centigrade.&#x20;
* [ ] Add the name attribute like this:

```xml
<TextBox ... Name="centigrade"/>
```

* [ ] Repeat the above for the Fahrenheit input:

```xml
<TextBox ... Name="fahrenheit"/>
```

## Code-behind (Get)

To demonstrate access to the text value of the Centigrade input, follow this procedure:

* [ ] Switch to the [**MainWindow.axaml.cs**](#user-content-fn-1)[^1] code-behind file.&#x20;
* [ ] Locate the `ButtonClicked` event handler.
* [ ] Alter the `Debug` statement to display the text property of the Centigrade input, like this:

```csharp
Debug.WriteLine($"Click! Centigrade={centigrade.Text}");
```

You will see the _Avalonia UI_ Intellisense prompt with the name of the Centigrade control as you type:

![](./img/image%20(55).png)

* [ ] Run the app to confirm that you can see the value in the Centigrade appear in the debug window.

![](./img/image%20(63).png)

## Code-behind (Set)

To use the simple formula that converts Centigrade temperature to Fahrenheit, you will first need to ensure that the Centigrade input text converts to a number. The formula is then:

$$
T_{F} = T_{c} * (9/5) + 32
$$

To add the conversion formula, follow this procedure:

* [ ] Locate the `ButtonClicked` event handler.
* [ ] Alter the code in the event handler to check that the Centigrade input text converts to a number.
* [ ] Alter the code to include the conversion formula.
* [ ] Update the text in the Fahrenheit input to the result of the conversion formula.
* [ ] Run the app to check your work.

One implementation of the above is as follows:

```csharp
if (Double.TryParse(centigrade.Text, out double C))
{
    var F = C * (9d / 5d) + 32;
    fahrenheit.Text = F.ToString("0.0");
}
else
{
    centigrade.Text = "0";
    fahrenheit.Text = "0";
}
```

&#x20;You can check your work using the following conversion table:

| Centigrade | Farenheit |
| ---------- | --------- |
| -10        | 14.0      |
| 0          | 32.0      |
| 10         | 50.0      |
| 21         | 69.8      |
| 25         | 77.0      |
| 32         | 89.6      |

### Exercises

You have now used an event handler to get and set control properties at runtime. You could now try some of these exercises:

Stop showing the gridlines (easy).

Stop the user changing the text in the Fahrenheit input by setting the `ReadOnly` attribute (easy).

Calculate the conversion as the user types into the Centigrade input (moderate).

Prevent the user typing invalid characters in the Centigrade input (harder).&#x20;

:::info
For full information about the complete range of _Avalonia UI_ built-in controls, events and attributes, see the controls reference section [here](../reference/controls/).
:::


