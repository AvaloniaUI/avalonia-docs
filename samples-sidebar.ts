import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {

  documentationSidebar: [
    {
      type: 'category',
      label: 'Samples',
      collapsible: false,
      link: {type: 'doc', id: 'index'},
      items: [
      {
        type: 'category',
        label: 'MVVM',
        collapsed: true,
        items: [
          {
            type: 'link',
            label: 'Basic MVVM',
            href: 'https://github.com/AvaloniaUI/Avalonia.Samples/tree/main/src/Avalonia.Samples/MVVM/BasicMvvmSample',
          },
          {
            type: 'link',
            label: 'Binding and converters',
            href: 'https://github.com/AvaloniaUI/AvaloniaUI.QuickGuides/tree/main/BindingsAndConverters',
          },
          {
            type: 'link',
            label: 'Value converter',
            href: 'https://github.com/AvaloniaUI/Avalonia.Samples/tree/main/src/Avalonia.Samples/MVVM/ValueConversionSample',
          },
          {
            type: 'link',
            label: 'Commands',
            href: 'https://github.com/AvaloniaUI/Avalonia.Samples/tree/main/src/Avalonia.Samples/MVVM/CommandSample',
          },
          {
            type: 'link',
            label: 'Data validation',
            href: 'https://github.com/AvaloniaUI/Avalonia.Samples/tree/main/src/Avalonia.Samples/MVVM/ValidationSample',
          },
          {
            type: 'link',
            label: 'Dialogs',
            href: 'https://github.com/AvaloniaUI/Avalonia.Samples/tree/main/src/Avalonia.Samples/ViewInteraction/MvvmDialogSample',
          },
          {
            type: 'link',
            label: 'Dialog manager',
            href: 'https://github.com/AvaloniaUI/Avalonia.Samples/tree/main/src/Avalonia.Samples/ViewInteraction/DialogManagerSample',
          },
        ]
      },
      {
        type: 'category',
        label: 'Data templates',
        collapsed: true,
        items: [
          {
            type: 'link',
            label: 'Basic DataTemplate',
            href: 'https://github.com/AvaloniaUI/Avalonia.Samples/tree/main/src/Avalonia.Samples/DataTemplates/BasicDataTemplateSample',
          },
          {
            type: 'link',
            label: 'FuncDataTemplate',
            href: 'https://github.com/AvaloniaUI/Avalonia.Samples/tree/main/src/Avalonia.Samples/DataTemplates/FuncDataTemplateSample',
          },
          {
            type: 'link',
            label: 'IDataTemplate',
            href: 'https://github.com/AvaloniaUI/Avalonia.Samples/tree/main/src/Avalonia.Samples/DataTemplates/IDataTemplateSample',
          },
        ]
      },
      {
        type: 'category',
        label: 'Styles and drawing',
        collapsed: true,
        items: [
          {
            type: 'link',
            label: 'Button customization',
            href: 'https://github.com/AvaloniaUI/AvaloniaUI.QuickGuides/tree/main/ButtonCustomize',
          },
          {
            type: 'link',
            label: 'Making lists',
            href: 'https://github.com/AvaloniaUI/AvaloniaUI.QuickGuides/tree/main/MakingLists',
          },
          {
            type: 'link',
            label: 'Native menus',
            href: 'https://github.com/AvaloniaUI/AvaloniaUI.QuickGuides/tree/main/NativeMenuOps',
          },
          {
            type: 'link',
            label: 'Splash screen',
            href: 'https://github.com/AvaloniaUI/AvaloniaUI.QuickGuides/tree/main/SplashScreen',
          },
          {
            type: 'link',
            label: 'Rect painter',
            href: 'https://github.com/AvaloniaUI/Avalonia.Samples/tree/main/src/Avalonia.Samples/Drawing/RectPainter',
          },
          {
            type: 'link',
            label: 'Loading images',
            href: 'https://github.com/AvaloniaUI/AvaloniaUI.QuickGuides/tree/main/LoadingImages',
          },
          {
            type: 'link',
            label: 'Using fonts',
            href: 'https://github.com/AvaloniaUI/AvaloniaUI.QuickGuides/tree/main/GoogleFonts',
          },
          {
            type: 'link',
            label: 'Battle City',
            href: 'https://github.com/AvaloniaUI/Avalonia.Samples/tree/main/src/Avalonia.Samples/Drawing/BattleCity',
          },
        ]
      },
      {
        type: 'category',
        label: 'Custom controls',
        collapsed: true,
        items: [
          {
            type: 'link',
            label: 'Rating control',
            href: 'https://github.com/AvaloniaUI/Avalonia.Samples/tree/main/src/Avalonia.Samples/CustomControls/RatingControlSample',
          },
          {
            type: 'link',
            label: 'Snowflake control',
            href: 'https://github.com/AvaloniaUI/Avalonia.Samples/tree/main/src/Avalonia.Samples/CustomControls/SnowflakesControlSample',
          },
        ]
      },
      {
        type: 'category',
        label: 'Testing',
        collapsed: true,
        items: [
          {
            type: 'link',
            label: 'Headless testing with XUnit',
            href: 'https://github.com/AvaloniaUI/Avalonia.Samples/tree/main/src/Avalonia.Samples/Testing/TestableApp.Headless.XUnit',
          },
          {
            type: 'link',
            label: 'Headless testing with NUnit',
            href: 'https://github.com/AvaloniaUI/Avalonia.Samples/tree/main/src/Avalonia.Samples/Testing/TestableApp.Headless.NUnit',
          },
          {
            type: 'link',
            label: 'Testing with Appium',
            href: 'https://github.com/AvaloniaUI/Avalonia.Samples/tree/main/src/Avalonia.Samples/Testing/TestableApp.Appium',
          },
        ]
      },
      {
        type: 'category',
        label: 'Other',
        collapsed: true,
        items: [
          {
            type: 'link',
            label: 'Clipboard operations',
            href: 'https://github.com/AvaloniaUI/AvaloniaUI.QuickGuides/tree/main/ClipboardOps',
          },
          {
            type: 'link',
            label: 'Drag-and-drop operations',
            href: 'https://github.com/AvaloniaUI/AvaloniaUI.QuickGuides/tree/main/DragDropOps',
          },
          {
            type: 'link',
            label: 'Native file operations',
            href: 'https://github.com/AvaloniaUI/AvaloniaUI.QuickGuides/tree/main/FileOps',
          },
          {
            type: 'link',
            label: 'IoC file operations',
            href: 'https://github.com/AvaloniaUI/AvaloniaUI.QuickGuides/tree/main/IoCFileOps',
          },
          {
            type: 'link',
            label: 'Localization',
            href: 'https://github.com/AvaloniaUI/AvaloniaUI.QuickGuides/tree/main/Localization',
          },
          {
            type: 'link',
            label: 'Basic view locator',
            href: 'https://github.com/AvaloniaUI/Avalonia.Samples/tree/main/src/Avalonia.Samples/Routing/BasicViewLocatorSample',
          },
          {
            type: 'link',
            label: 'Native AOT',
            href: 'https://github.com/AvaloniaUI/AvaloniaUI.QuickGuides/tree/main/NativeAot',
          },
        ]
      },
     ],
    },
  ],
};

export default sidebars;
