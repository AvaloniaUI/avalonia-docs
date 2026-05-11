---
id: binding-debugging
title: Binding debugging
description: Debug data binding errors in Avalonia using trace-level logging and diagnostic output.
doc-type: how-to
---

When a data binding does not produce the expected result, Avalonia provides tools and techniques to diagnose the problem.

## Binding error logging

Avalonia logs binding errors to the trace output. In a debug build, these messages appear in the IDE Output window or the console. A typical binding error looks like:

```text
[Binding] Error in binding to 'Avalonia.Controls.TextBlock'.'Text': 'Could not find a matching property accessor for 'UserNam' on 'MyApp.ViewModels.MainViewModel'
```

This message tells you:
- The target control and property (`TextBlock.Text`)
- What went wrong (property `UserNam` not found, likely a typo for `UserName`)
- The source type being searched (`MainViewModel`)

### Enabling verbose binding logging

To see all binding activity (not just errors), configure the logging level at startup:

```csharp
public static AppBuilder BuildAvaloniaApp()
    => AppBuilder.Configure<App>()
        .UsePlatformDetect()
        .LogToTrace(LogEventLevel.Warning)
        // Add binding-specific verbose logging:
        .LogToTrace(LogEventLevel.Verbose, LogArea.Binding);
```

This produces output for every binding resolution, value change, and fallback applied.

## Common binding problems

### Property not found

**Symptom**: The control shows nothing or a fallback value. The log shows "Could not find a matching property accessor."

**Causes**:
- Typo in the binding path
- The DataContext is not the type you expect
- The property is not public

**Fix**: Verify the property name and check the DataContext with DevTools (see below).

### DataContext is null

**Symptom**: All bindings on a control produce no value.

**Causes**:
- The DataContext was never set
- The DataContext was set on the wrong element
- A parent control has `DataContext="{Binding SomeProperty}"` where `SomeProperty` is null

**Fix**: Use DevTools to inspect the DataContext at the control level.

### Binding mode mismatch

**Symptom**: Changes in the UI do not propagate to the view model (or vice versa).

**Causes**:
- The default binding mode for the property is `OneWay`, but you need `TwoWay`
- The source property does not raise `PropertyChanged`

**Fix**: Set `Mode=TwoWay` explicitly, and verify the view model implements `INotifyPropertyChanged`.

```xml
<TextBox Text="{Binding Name, Mode=TwoWay}" />
```

### Compiled binding type mismatch

**Symptom**: Build error mentioning "Cannot resolve property" or "Binding path is not valid for type."

**Causes**:
- The `x:DataType` does not match the actual DataContext type
- The property does not exist on the declared data type

**Fix**: Verify `x:DataType` matches your view model. Use `ReflectionBinding` to bypass compile-time checking if needed:

```xml
<TextBlock Text="{ReflectionBinding DynamicProperty}" />
```

### Converter returning UnsetValue

**Symptom**: The binding applies the FallbackValue instead of the converted result.

**Cause**: Your `IValueConverter.Convert` method returns `AvaloniaProperty.UnsetValue` or `BindingOperations.DoNothing`.

**Fix**: Return an actual value or `null` (which triggers `TargetNullValue` instead).

## Using Avalonia DevTools

Press **F12** in a debug build to open the Avalonia DevTools. The DevTools provide several views for debugging bindings:

### Properties tab

Select any control in the tree and examine its properties. For each property, DevTools shows:
- The current value
- The value source (Local, Style, Binding, and similar)
- Whether a binding is active

Look for properties showing their default value when you expect a bound value. This indicates the binding failed.

### Logical tree tab

Navigate the logical tree to find controls and verify their DataContext. Select a control and check the `DataContext` property to confirm it is the expected view model instance.

## Debugging bindings in code

### Observing binding values

Use `GetObservable` to watch a property's value changes in real time:

```csharp
myTextBlock.GetObservable(TextBlock.TextProperty).Subscribe(value =>
{
    Debug.WriteLine($"TextBlock.Text changed to: {value}");
});
```

### Checking the binding source

```csharp
// Check what DataContext a control has
Debug.WriteLine($"DataContext type: {myControl.DataContext?.GetType().Name}");
Debug.WriteLine($"DataContext value: {myControl.DataContext}");
```

### Using FallbackValue for diagnostics

Temporarily add a `FallbackValue` to identify whether the binding path is failing:

```xml
<TextBlock Text="{Binding UserName, FallbackValue='BINDING FAILED'}" />
```

If you see "BINDING FAILED" in the UI, the binding path is wrong or the DataContext is null.

## Compiled bindings diagnostics

Compiled bindings are validated at compile time when `x:CompileBindings="True"` is set. If a binding path is invalid, you get a build error instead of a silent runtime failure.

To enable compiled bindings project-wide, add to your `.csproj`:

```xml
<AvaloniaUseCompiledBindingsByDefault>true</AvaloniaUseCompiledBindingsByDefault>
```

When compiled bindings encounter a property that cannot be resolved at compile time, you have two options:
1. Fix the `x:DataType` declaration to match the actual data type
2. Use `ReflectionBinding` for dynamic properties that cannot be statically resolved

## Diagnostic checklist

When a binding does not work:

1. Check the Output window for binding error messages
2. Open DevTools (F12) and verify the control's DataContext
3. Verify the property name matches exactly (case-sensitive)
4. Verify the property is `public` with a `get` accessor
5. For `TwoWay` bindings, verify the property has a `set` accessor and the source implements `INotifyPropertyChanged`
6. Check that the DataContext is set before the binding is evaluated
7. Add `FallbackValue` to confirm whether the path resolution is the problem
8. For compiled bindings, verify `x:DataType` matches the actual runtime type

## See also

- [Data Binding Syntax](/docs/data-binding/data-binding-syntax): Binding parameters including FallbackValue and TargetNullValue.
- [Compiled Bindings](/docs/data-binding/compiled-bindings): Compile-time binding validation.
- [Data Context](/docs/data-binding/data-context): How DataContext flows through the control tree.
