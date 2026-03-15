---
id: richtexteditor
title: RichTextEditor issues
description: Troubleshoot common RichTextEditor problems.
doc-type: troubleshooting
sidebar_label: RichTextEditor
tags:
  - accelerate
---

:::info
This control is available as part of [Avalonia Accelerate](https://avaloniaui.net/accelerate) Enterprise.
:::

## Document is null

Ensure you have set the `FlowDocument` to be accessed by the editor.

```csharp
if (editor.Document == null)
{
    editor.Document = new FlowDocument();
}
```

## Undo does not work

Ensure you have created an `UndoManager` in your code-behind.

```csharp
editor.Document.TextDocument.UndoManager = new UndoManager();
```

## Edits do not appear in the editor

Try wrapping multiple operations as a batch edit.

```csharp
doc.BeginChange();
try
{
    // Your edits
}
finally
{
    doc.EndChange();
}
```

## I need help with something else

## See also

- [RichTextEditor control](/controls/input/text-input/richtexteditor)