---
id: index
title: Controls
sidebar_label: Home
hide_table_of_contents: true
---

import DocsCard from '@site/src/components/global/DocsCard';
import DocsCards from '@site/src/components/global/DocsCards';

<head>
  <title>Avalonia documentation: Controls library</title>
  <meta
    name="description"
    content="Avalonia comes with lots of high-quality UI controls, including buttons, lists, tabs and more, to quickly and easily build your app's user interface."
  />
  <style>{`
    :root {
      --doc-item-container-width: 60rem;
    }
  `}</style>
</head>

Avalonia apps are made of high-level building blocks called controls, which allow you to quickly construct the UI for your app. Avalonia comes with lots of controls, including buttons, lists, tabs and more. These pages explain the essential functionalities of Avalonia controls. For detailed information, see the [API Reference](/api).


<DocsCards>
<DocsCard header="Border" href="/controls/layout/containers/border" icon="/icons/border-icon@2x.png">
  <p>A decorator that draws a border and background around its child content.</p>
</DocsCard>

<DocsCard header="Button" href="/controls/input/buttons/button" icon="/icons/button-icon@2x.png">
  <p>Buttons let your users take action. They're an essential way to interact with and navigate an app.</p>
</DocsCard>

<DocsCard header="Calendar" href="/controls/input/date-and-time/calendar" icon="/icons/calendar-icon@2x.png">
  <p>A full calendar view that lets users browse and select dates visually.</p>
</DocsCard>

<DocsCard header="Checkbox" href="/controls/input/selectors/checkbox" icon="/icons/checkbox-icon@2x.png">
  <p>Use a checkbox for binary user decisions, such as feature toggles, survey questions or task lists.</p>
</DocsCard>

<DocsCard header="ComboBox" href="/controls/input/selectors/combobox" icon="/icons/combobox-icon@2x.png">
  <p>ComboBox shows a selected item and displays a list of options when clicked.</p>
</DocsCard>

<DocsCard header="Date Picker" href="/controls/input/date-and-time/datepicker" icon="/icons/datepicker-icon@2x.png">
  <p>Date pickers present a compact interface for users to select dates.</p>
</DocsCard>

<DocsCard header="Grid" href="/controls/layout/panels/grid" icon="/icons/grid-icon@2x.png">
  <p>The grid is a powerful layout control that arranges other controls in columns and rows.</p>
</DocsCard>

<DocsCard header="Image" href="/controls/media/image" icon="/icons/image-icon@2x.png">
  <p>Display images and decide how they interact with other UI elements.</p>
</DocsCard>

<DocsCard header="Label" href="/controls/data-display/text-display/label" icon="/icons/label-icon@2x.png">
  <p>A text label that provides access key support for its target control.</p>
</DocsCard>

<DocsCard header="ListBox" href="/controls/data-display/collections/listbox" icon="/icons/listbox-icon@2x.png">
  <p>Lists display rows of information, such as contacts, languages or music genres.</p>
</DocsCard>

<DocsCard header="Markdown" href="/controls/data-display/text-display/markdown" icon="/icons/markdownrenderer-icon@2x.png">
  <p>Render and display Markdown-formatted text content directly in your app.</p>
</DocsCard>

<DocsCard header="Media Player" href="/controls/media/mediaplayercontrol" icon="/icons/mediaplayer-icon@2x.png">
  <p>A full-featured media player control for playing audio and video content.</p>
</DocsCard>

<DocsCard header="Menu" href="/controls/menus/menu" icon="/icons/menu-icon@2x.png">
  <p>Use menus to organize user options and improve ease of navigation.</p>
</DocsCard>

<DocsCard header="On-Screen Keyboard" href="/controls/input/text-input/virtualkeyboard" icon="/icons/onscreenkeyboard-icon@2x.png">
  <p>A virtual keyboard for touch-based text input on devices without physical keyboards.</p>
</DocsCard>

<DocsCard header="Panel" href="/controls/layout/panels/panel" icon="/icons/panel-icon@2x.png">
  <p>The base class for all panel elements used to position and arrange child controls.</p>
</DocsCard>

<DocsCard header="Radio Button" href="/controls/input/buttons/radiobutton" icon="/icons/radiobutton-icon@2x.png">
  <p>Radio buttons allow you to present a set of mutually exclusive options.</p>
</DocsCard>

<DocsCard header="Rectangle" href="/docs/graphics-animation/drawing-graphics" icon="/icons/rectangle-icon@2x.png">
  <p>A basic shape primitive for drawing rectangles and squares in your UI.</p>
</DocsCard>

<DocsCard header="ScrollViewer" href="/controls/layout/containers/scrollviewer" icon="/icons/scrollviewer-icon@2x.png">
  <p>A container that provides scrollable content when its child exceeds the available space.</p>
</DocsCard>

<DocsCard header="Slider" href="/controls/input/selectors/slider" icon="/icons/slider-icon@2x.png">
  <p>Sliders let users select a numerical value by moving a knob along a track.</p>
</DocsCard>

<DocsCard header="SplitView" href="/controls/layout/containers/splitview" icon="/icons/splitview-icon@2x.png">
  <p>A container with a collapsible pane and a content area, ideal for navigation layouts.</p>
</DocsCard>

<DocsCard header="StackPanel" href="/controls/layout/panels/stackpanel" icon="/icons/stackpanel-icon@2x.png">
  <p>Arranges child controls in a single line, stacked horizontally or vertically.</p>
</DocsCard>

<DocsCard header="Tab Control" href="/controls/navigation/tabcontrol" icon="/icons/tabcontrol-icon@2x.png">
  <p>Tabs enable tabbed navigation, a standard navigation pattern in modern apps.</p>
</DocsCard>

<DocsCard header="TextBlock" href="/controls/data-display/text-display/textblock" icon="/icons/textblock-icon@2x.png">
  <p>A lightweight control for displaying small amounts of read-only text.</p>
</DocsCard>

<DocsCard header="TextBox" href="/controls/input/text-input/textbox" icon="/icons/textbox-icon@2x.png">
  <p>Text boxes create an area for text input, a staple of almost any type of app.</p>
</DocsCard>

<DocsCard header="Toggle Switch" href="/controls/input/buttons/togglebutton" icon="/icons/toggleswitch-icon@2x.png">
  <p>Toggle switches let users flip between on and off states for binary options like settings.</p>
</DocsCard>

<DocsCard header="TreeView" href="/controls/data-display/structured-data/treeview" icon="/icons/treeview-icon@2x.png">
  <p>Displays hierarchical data in an expandable tree structure.</p>
</DocsCard>

<DocsCard header="UniformGrid" href="/controls/layout/panels/uniformgrid" icon="/icons/uniformgrid-icon@2x.png">
  <p>A grid panel that automatically sizes all cells to be equal, creating a uniform layout.</p>
</DocsCard>

<DocsCard header="WebView" href="/controls/web/nativewebview" icon="/icons/webview-icon@2x.png">
  <p>Embed web content directly into your app using a native browser engine.</p>
</DocsCard>

</DocsCards>
