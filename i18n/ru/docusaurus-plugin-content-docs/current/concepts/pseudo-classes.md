---
description: CONCEPTS
---

# Pseudo Classes

Pseudo classes in Avalonia, similar to those in CSS, are keywords added to a selector that specify a special state of the selected element(s). They can be used to style controls differently based on certain conditions. For example, a button could be styled differently when it's being pressed, or a TextBox can have a different style when it is disabled.

Avalonia supports a number of built-in pseudo classes, and controls can define their own.

## Usage
To use pseudo classes, you append a colon (:) and the pseudo class to the selector. Here's an example:

```xml
<Button Content="Click Me!">
  <Button.Styles>
    // highlight-start
    <Style Selector="Button:pointerover">
    // highlight-end
      <Setter Property="Background" Value="Red"/>
    </Style>
  </Button.Styles>
</Button>
```

In this example, the button's background will change to red when the pointer is over it, thanks to the `pointerover` pseudo class.

## Built-in Pseudo Classes
Some of the built-in pseudo classes include:

* `:pointerover`: The mouse pointer is over the control.
* `:pressed`: The control is being pressed.
* `:disabled`: The control is disabled.
* `:focus`: The control has input focus.
* `:watermark`: For TextBox control, when it's displaying a watermark.
* `:checked`: For checkable controls, like CheckBox or MenuItem, when it's checked.
* `:indeterminate`: For controls like CheckBox, when it's in the indeterminate state.
* `:valid`: For input controls, when the input is valid.
* `:invalid`: For input controls, when the input is invalid.

You can combine pseudo classes with type selectors and class selectors to create a wide range of effects.

## Custom Pseudo Classes

Controls can define their own pseudo classes for specific behaviors. To define a pseudo class, a control typically creates a static readonly field of type `PseudoClass` and calls `PseudoClasses.Set()` to enable the pseudo class and `PseudoClasses.Remove()` to disable it.

For example, a custom `:custom` pseudo class might be defined as follows:

```cs
public static readonly PseudoClass CustomPseudoClass = PseudoClass.Parse(":custom");

// to enable
PseudoClasses.Set(CustomPseudoClass);

// to disable
PseudoClasses.Remove(CustomPseudoClass);
```

This allows developers to add more expressiveness and control to their styles, tailoring styles to very specific control states.








