---
id: index
title: Samples
---

import DocsCard from '@site/src/components/global/DocsCard';
import DocsCards from '@site/src/components/global/DocsCards';

<head>
  <title>Avalonia samples</title>
  <meta
    name="description"
    content="Avalonia has tons of great samples to help you get started!"
  />
  <style>{`
    :root {
      --doc-item-container-width: 60rem;
    }
  `}</style>
</head>

Avalonia has tons of great samples to help you get started!

## Model-View-ViewModel (MVVM)

<DocsCards>

  <DocsCard header="Basic MVVM" href="https://github.com/AvaloniaUI/Avalonia.Samples/tree/main/src/Avalonia.Samples/MVVM/BasicMvvmSample">
    <p>Use the MVVM pattern to receive and process text input by the user.</p>
  </DocsCard>

  <DocsCard header="Binding and converters" href="https://github.com/AvaloniaUI/AvaloniaUI.QuickGuides/tree/main/BindingsAndConverters">
    <p>Convert a date to a string value, and thereby calculate the age of a person.</p>
  </DocsCard>

  <DocsCard header="Value converter" href="https://github.com/AvaloniaUI/Avalonia.Samples/tree/main/src/Avalonia.Samples/MVVM/ValueConversionSample">
    <p>Incorporate a converter inside your binding to calculate a new value for the View.</p>
  </DocsCard>

  <DocsCard header="Commands" href="https://github.com/AvaloniaUI/Avalonia.Samples/tree/main/src/Avalonia.Samples/MVVM/CommandSample">
    <p>How to invoke methods in your ViewModel from your user interface using commands.</p>
  </DocsCard>

  <DocsCard header="Data validation" href="https://github.com/AvaloniaUI/Avalonia.Samples/tree/main/src/Avalonia.Samples/MVVM/ValidationSample">
    <p>Validate properties and display an error message if the values are invalid.</p>
  </DocsCard>

  <DocsCard header="Dialogs" href="https://github.com/AvaloniaUI/Avalonia.Samples/tree/main/src/Avalonia.Samples/ViewInteraction/MvvmDialogSample">
    <p>Show dialogs using ReactiveUI interactions.</p>
  </DocsCard>

  <DocsCard header="Dialog manager" href="https://github.com/AvaloniaUI/Avalonia.Samples/tree/main/src/Avalonia.Samples/ViewInteraction/DialogManagerSample">
    <p>Create a dialog manager service that helps you show dialogs in your app.</p>
  </DocsCard>

</DocsCards>

## Data templates

<DocsCards>

  <DocsCard header="Basic DataTemplate" href=" https://github.com/AvaloniaUI/Avalonia.Samples/tree/main/src/Avalonia.Samples/DataTemplates/BasicDataTemplateSample">
    <p>Use DataTemplates to control how your data is displayed.</p>
  </DocsCard>

  <DocsCard header="FuncDataTemplate" href="https://github.com/AvaloniaUI/Avalonia.Samples/tree/main/src/Avalonia.Samples/DataTemplates/FuncDataTemplateSample">
    <p>Create an advanced DataTemplate in code with a FuncDataTemplate.</p>
  </DocsCard>

  <DocsCard header="IDataTemplate" href="https://github.com/AvaloniaUI/Avalonia.Samples/tree/main/src/Avalonia.Samples/DataTemplates/IDataTemplateSample">
    <p>Implement IDataTemplate in your own class to have full control over your DataTemplates.</p>
  </DocsCard>

</DocsCards>

## Styles and drawing

<DocsCards>

  <DocsCard header="Button customization" href="https://github.com/AvaloniaUI/AvaloniaUI.QuickGuides/tree/main/ButtonCustomize">
    <p>Customize the style of a button by creating reusable styles.</p>
  </DocsCard>

  <DocsCard header="Making lists" href="https://github.com/AvaloniaUI/AvaloniaUI.QuickGuides/tree/main/MakingLists">
    <p>Create lists of data using bindings and the ListBox control.</p>
  </DocsCard>

  <DocsCard header="Native menus" href="https://github.com/AvaloniaUI/AvaloniaUI.QuickGuides/tree/main/NativeMenuOps">
    <p>Use native menus in your Avalonia app on macOS and Linux.</p>
  </DocsCard>

  <DocsCard header="Splash screen" href="https://github.com/AvaloniaUI/AvaloniaUI.QuickGuides/tree/main/SplashScreen">
    <p>Build a custom splash screen that loads before your MainWindow.</p>
  </DocsCard>

  <DocsCard header="Rect painter" href="https://github.com/AvaloniaUI/Avalonia.Samples/tree/main/src/Avalonia.Samples/Drawing/RectPainter">
    <p>Create a custom rendered control that interacts with the mouse to form a simple paint application.</p>
  </DocsCard>

  <DocsCard header="Loading images" href="https://github.com/AvaloniaUI/AvaloniaUI.QuickGuides/tree/main/LoadingImages">
    <p>See how to load images via XAML, bindings and from the internet.</p>
  </DocsCard>

  <DocsCard header="Using fonts" href="https://github.com/AvaloniaUI/AvaloniaUI.QuickGuides/tree/main/GoogleFonts">
    <p>Use custom fonts, such as Google fonts, within your application.</p>
  </DocsCard>

  <DocsCard header="Battle City" href="https://github.com/AvaloniaUI/Avalonia.Samples/tree/main/src/Avalonia.Samples/Drawing/BattleCity">
    <p>A sample 2D game in Avalonia created without writing any rendering code.</p>
  </DocsCard>

</DocsCards>

## Custom controls

<DocsCards>

  <DocsCard header="Rating control" href="https://github.com/AvaloniaUI/Avalonia.Samples/tree/main/src/Avalonia.Samples/CustomControls/RatingControlSample">
    <p>Create a rating control for users to vote by clicking one of several stars.</p>
  </DocsCard>

  <DocsCard header="Snowflake control" href="https://github.com/AvaloniaUI/Avalonia.Samples/tree/main/src/Avalonia.Samples/CustomControls/SnowflakesControlSample">
    <p>Create a custom control that overrides OnRender to use more advanced rendering instead.</p>
  </DocsCard>

</DocsCards>

## Testing

<DocsCards>

  <DocsCard header="Headless testing wtih XUnit" href="https://github.com/AvaloniaUI/Avalonia.Samples/tree/main/src/Avalonia.Samples/Testing/TestableApp.Headless.XUnit">
    <p>Test your app without a visible graphic user interface using Avalonia's headless platform with XUnit.</p>
  </DocsCard>

  <DocsCard header="Headless testing with NUnit" href="https://github.com/AvaloniaUI/Avalonia.Samples/tree/main/src/Avalonia.Samples/Testing/TestableApp.Headless.NUnit">
    <p>Test your app without a visible graphic user interface using Avalonia's headless platform with NUnit.</p>
  </DocsCard>

  <DocsCard header="Testing with Appium" href="https://github.com/AvaloniaUI/Avalonia.Samples/tree/main/src/Avalonia.Samples/Testing/TestableApp.Appium">
    <p>Automated tests for UI interactions, such as button clicks, text input, and screen navigation.</p>
  </DocsCard>

</DocsCards>

## Other

<DocsCards>

  <DocsCard header="Clipboard operations" href="https://github.com/AvaloniaUI/AvaloniaUI.QuickGuides/tree/main/ClipboardOps">
    <p>Interact with the device's clipboard to copy and paste text.</p>
  </DocsCard>

  <DocsCard header="Drag-and-drop operations" href="https://github.com/AvaloniaUI/AvaloniaUI.QuickGuides/tree/main/DragDropOps">
    <p>Implement dragging and dropping in an Avalonia app.</p>
  </DocsCard>

  <DocsCard header="Native file operations" href="https://github.com/AvaloniaUI/AvaloniaUI.QuickGuides/tree/main/FileOps">
    <p>Using native 'Save as' and 'Open file' dialogs.</p>
  </DocsCard>

  <DocsCard header="IoC file operations" href="https://github.com/AvaloniaUI/AvaloniaUI.QuickGuides/tree/main/IoCFileOps">
    <p>Using native 'Save as' and 'Open file' dialogs with inversion of control (IoC).</p>
  </DocsCard>

  <DocsCard header="Localization" href="https://github.com/AvaloniaUI/AvaloniaUI.QuickGuides/tree/main/Localization">
    <p>An example of how to localize an Avalonia app.</p>
  </DocsCard>

  <DocsCard header="Basic view locator" href="https://github.com/AvaloniaUI/Avalonia.Samples/tree/main/src/Avalonia.Samples/Routing/BasicViewLocatorSample">
    <p>Change the contents of your UI using a view locator.</p>
  </DocsCard>

  <DocsCard header="Native AOT" href="https://github.com/AvaloniaUI/AvaloniaUI.QuickGuides/tree/main/NativeAot">
    <p>Set up your app to build with native ahead-of-time (AOT).</p>
  </DocsCard>

</DocsCards>