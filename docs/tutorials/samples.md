---
id: samples
title: Samples
---

import SampleCardsGrid from '@site/src/components/global/SampleCardsGrid';

## Model-View-ViewModel (MVVM)

<SampleCardsGrid
  samples={[
    {
      title: 'Basic MVVM',
      description: 'This sample will show you how you can use the MVVM-pattern to receive and process text input by the user.',
      tags: ['XAML', 'C#', 'MVVM'],
      url: 'https://github.com/AvaloniaUI/Avalonia.Samples/tree/main/src/Avalonia.Samples/MVVM/BasicMvvmSample'
    },
     {
      title: 'Binding & Converters',
      description: 'This sample will show you how you can use use bindings and converters to convert a Date to a string value (calculating the age of a person).',
      tags: ['XAML', 'C#', 'MVVM', 'Converter'],
      url: 'https://github.com/AvaloniaUI/AvaloniaUI.QuickGuides/tree/main/BindingsAndConverters'
    },
    {
      title: 'Commands',
      description: 'This sample will show you how you can use Commands to invoke methods in your ViewModel from your user interface.',
      tags: ['XAML', 'C#', 'MVVM'],
      url: 'https://github.com/AvaloniaUI/Avalonia.Samples/tree/main/src/Avalonia.Samples/MVVM/CommandSample'
    },
    {
      title: 'ValueConverter',
      description: 'In this sample you will learn how you can use a Converter inside your Binding in order to calculate a new value for the View.',
      tags: ['XAML', 'C#', 'MVVM', 'Converter'],
      url: 'https://github.com/AvaloniaUI/Avalonia.Samples/tree/main/src/Avalonia.Samples/MVVM/ValueConversionSample'
    },
    {
      title: 'Data Validation',
      description: 'This sample you will learn how to validate properties and display an error message to the user, if the entered values are invalid.',
      tags: ['XAML', 'C#', 'MVVM'],
      url: 'https://github.com/AvaloniaUI/Avalonia.Samples/tree/main/src/Avalonia.Samples/MVVM/ValidationSample'
    },   
    {
      title: 'Dialogs',
      description: 'This sample will show you how to use Reactive UI Interactions to show [dialogs] in your MVVM application',
      tags: ['XAML', 'C#', 'MVVM', 'RxUI'],
      url: 'https://github.com/AvaloniaUI/Avalonia.Samples/tree/main/src/Avalonia.Samples/ViewInteraction/MvvmDialogSample'
    }, 
    {
      title: 'Dialog Manager',
      description: 'This sample will show you how to write a service (we will call it dialog manager) that will help you to show dialogs in your MVVM application',
      tags: ['XAML', 'C#', 'MVVM'],
      url: 'https://github.com/AvaloniaUI/Avalonia.Samples/tree/main/src/Avalonia.Samples/ViewInteraction/DialogManagerSample'
    }, 
  ]}
/>

## DataTemplates

  <SampleCardsGrid
  samples={[    
    {
      title: 'Basic DataTemplate',
      description: 'This sample will show you how you can use DataTemplates to control how your data is displayed.',
      tags: ['XAML', 'C#', 'DataTemplate'],
      url: 'https://github.com/AvaloniaUI/Avalonia.Samples/tree/main/src/Avalonia.Samples/DataTemplates/BasicDataTemplateSample'
    },
    {
      title: 'FuncDataTemplate',
      description: 'This sample will show you how to use a FuncDataTemplate to create an advanced DataTemplate in code.',
      tags: ['XAML', 'C#', 'DataTemplate'],
      url: 'https://github.com/AvaloniaUI/Avalonia.Samples/tree/main/src/Avalonia.Samples/DataTemplates/FuncDataTemplateSample'
    },
    {
      title: 'IDataTemplate',
      description: 'This sample will show you how to implement IDataTemplate in your own class to have full control over your DataTemplates.',
      tags: ['XAML', 'C#', 'DataTemplate'],
      url: 'https://github.com/AvaloniaUI/Avalonia.Samples/tree/main/src/Avalonia.Samples/DataTemplates/IDataTemplateSample'
    },
  ]}
/>

## Controls, Styles & Drawing

  <SampleCardsGrid
  samples={[    
    {
      title: 'Customized Button',
      description: 'This sample will show you how to customize the style of a button by creating reusable styles.',
      tags: ['XAML', 'C#', 'Style'],
      url: 'https://github.com/AvaloniaUI/AvaloniaUI.QuickGuides/tree/main/ButtonCustomize'
    },
     {
      title: 'Making Lists',
      description: 'This sample will show you how to create lists of data using Bindings and a ListBox control',
      tags: ['XAML', 'C#', 'Lists'],
      url: 'https://github.com/AvaloniaUI/AvaloniaUI.QuickGuides/tree/main/MakingLists'
    },
     {
      title: 'Native Menus',
      description: 'This sample will show you how to use native menus on macOS and Linux.',
      tags: ['XAML', 'C#', 'Menus'],
      url: 'https://github.com/AvaloniaUI/AvaloniaUI.QuickGuides/tree/main/NativeMenuOps'
    },  
     {
      title: 'Splash Screen',
      description: 'This sample will show you how to create a custom Splash Screen that loads before your MainWindow',
      tags: ['XAML', 'C#', 'Splash'],
      url: 'https://github.com/AvaloniaUI/AvaloniaUI.QuickGuides/tree/main/SplashScreen'
    },
   {
      title: 'Rect Painter',
      description: 'This sample will show you how to create a custom rendered control which interacts with the mouse, to form a simple paint application.',
      tags: ['XAML', 'C#', 'Drawing'],
      url: 'https://github.com/AvaloniaUI/Avalonia.Samples/tree/main/src/Avalonia.Samples/Drawing/RectPainter'
    },
    {
      title: 'Image Loading',
      description: 'This sample will show you how to load images via XAML, Bindings and from the internet.',
      tags: ['XAML', 'C#', 'Images'],
      url: 'https://github.com/AvaloniaUI/AvaloniaUI.QuickGuides/tree/main/LoadingImages'
    },
     {
      title: 'Using Google Fonts',
      description: 'This sample will show you how to use Google fonts within your application',
      tags: ['XAML', 'C#', 'Font'],
      url: 'https://github.com/AvaloniaUI/AvaloniaUI.QuickGuides/tree/main/GoogleFonts'
    },
    {
      title: 'BattleCity',
      description: 'The purpose of the sample is to demonstrate that how to create a 2D game in Avalonia without writing any rendering code.',
      tags: ['XAML', 'C#', 'Drawing'],
      url: 'https://github.com/AvaloniaUI/Avalonia.Samples/tree/main/src/Avalonia.Samples/Drawing/BattleCity'
    },
  ]}
/>

## Custom Controls

  <SampleCardsGrid
  samples={[    
   {
      title: 'Custom Rating Control ',
      description: 'This sample will show you how to create a custom control. The goal is to create a rating control, where the user can vote via clicking one of several stars.',
      tags: ['XAML', 'C#', 'Custom Controls'],
      url: 'https://github.com/AvaloniaUI/Avalonia.Samples/tree/main/src/Avalonia.Samples/CustomControls/RatingControlSample'
    },    
    {
      title: 'Custom Snowflakes Control',
      description: 'This sample will show you how to create a custom control that overrides OnRender in order to have advanced render capabilities.',
      tags: ['XAML', 'C#', 'Custom Controls'],
      url: 'https://github.com/AvaloniaUI/Avalonia.Samples/tree/main/src/Avalonia.Samples/CustomControls/SnowflakesControlSample'
    },    
  ]}
/>

## Miscellaneous

  <SampleCardsGrid
  samples={[    
  {
      title: 'Clipboard Operations',
      description: 'This sample demonstrates how to interact with the devices clipboard and copy and paste text.',
      tags: ['XAML', 'C#', 'Clipboard'],
      url: 'https://github.com/AvaloniaUI/AvaloniaUI.QuickGuides/tree/main/ClipboardOps'
    },  
     {
      title: 'Drag and Drop Operations',
      description: 'This sample demonstrates how to implement dragging and dropping within your Avalonia application.',
      tags: ['XAML', 'C#', 'Drag-and-Drop'],
      url: 'https://github.com/AvaloniaUI/AvaloniaUI.QuickGuides/tree/main/DragDropOps'
    },  
    {
      title: 'Native File Dialogs',
      description: 'This sample demonstrates how to use the native Save As and Open File dialogs.',
      tags: ['XAML', 'C#', 'Dialogs'],
      url: 'https://github.com/AvaloniaUI/AvaloniaUI.QuickGuides/tree/main/FileOps'
    },  
     {
      title: 'Basic Localization',
      description: 'This sample demonstrates how to localize your Avalonia application.',
      tags: ['XAML', 'C#', 'Localization'],
      url: 'https://github.com/AvaloniaUI/AvaloniaUI.QuickGuides/tree/main/Localization'
    },  
     {
      title: 'Basic Inversion of Control',
      description: 'This sample demonstrates how to use the native Save As and Open File dialogs with IoC.',
      tags: ['XAML', 'C#', 'Dialogs', 'IoC'],
      url: 'https://github.com/AvaloniaUI/AvaloniaUI.QuickGuides/tree/main/IoCFileOps'
    },  
   {
      title: 'Basic ViewLocator',
      description: 'This sample will show you how to use a ViewLocator in order to change the contents of your UI.',
      tags: ['XAML', 'C#', 'Navigation'],
      url: 'https://github.com/AvaloniaUI/Avalonia.Samples/tree/main/src/Avalonia.Samples/Routing/BasicViewLocatorSample'
    },    
    {
      title: 'Native AOT',
      description: 'This sample will show you how to setup your application for building with Native AOT',
      tags: ['XAML', 'C#', 'Native AOT'],
      url: 'https://github.com/AvaloniaUI/AvaloniaUI.QuickGuides/tree/main/NativeAot'
    },   
     
  ]}
/>


## Automated UI Testing

  <SampleCardsGrid
  samples={[    
   {
      title: 'Headless Testing with XUnit',
      description: 'This sample will show you how the headless platform in Avalonia provides the capability to run Avalonia applications without a visible graphical user interface',
      tags: ['XAML', 'C#', 'Testing', 'XUnit'],
      url: 'https://github.com/AvaloniaUI/Avalonia.Samples/tree/main/src/Avalonia.Samples/Testing/TestableApp.Headless.XUnit'
    },    
    {
      title: 'Headless Testing with NUnit',
      description: 'This sample will show you how the headless platform in Avalonia provides the capability to run Avalonia applications without a visible graphical user interface',
      tags: ['XAML', 'C#', 'Testing', 'NUnit'],
      url: 'https://github.com/AvaloniaUI/Avalonia.Samples/tree/main/src/Avalonia.Samples/Testing/TestableApp.Headless.NUnit'
    },   
     {
      title: 'Testing with Appium',
      description: 'Automated tests for UI interactions, such as button clicks, text input, and screen navigation.',
      tags: ['XAML', 'C#', 'Testing', 'Appium'],
      url: 'https://github.com/AvaloniaUI/Avalonia.Samples/tree/main/src/Avalonia.Samples/Testing/TestableApp.Appium'
    },   
  ]}
/>
