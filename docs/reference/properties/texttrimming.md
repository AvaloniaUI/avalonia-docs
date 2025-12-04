---
index: texttrimming
title: TextTrimming
description: About the TextTrimming property
---

import CharacterEllipsis from '/img/reference/properties/texttrimming/texttrimming-characterellipsis.png';
import LeadingCharacterEllipsis from '/img/reference/properties/texttrimming/texttrimming-leadingcharacterellipsis.png';
import NoTrimming from '/img/reference/properties/texttrimming/texttrimming-none.png';
import PrefixCharacterEllipsis from '/img/reference/properties/texttrimming/texttrimming-prefixcharacterellipsis.png';
import WordEllipsis from '/img/reference/properties/texttrimming/texttrimming-wordellipsis.png';
import TextWrappingWithTextTrimming from '/img/reference/properties/texttrimming/textwrapping-with-texttrimming.png';

# TextTrimming

## Overview

The `TextTrimming` property allows you to control how text is displayed when it exceeds the maximum available space in a control. This property is accessible by text-displaying controls, such as [`TextBlock`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/TextBlock.cs), [`SelectableTextBlock`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/SelectableTextBlock.cs) or [`ContentPresenter`](https://github.com/AvaloniaUI/Avalonia/blob/master/src/Avalonia.Controls/Presenters/ContentPresenter.cs).

Text trimming adds an ellipsis (…) to indicate truncated text, instead of abruptly cutting off the text.

:::note
Avalonia uses the Unicode ellipsis character `U+2026` by default, not three periods.
:::

## Trimming Modes

Avalonia provides five text trimming options:

1. None
2. CharacterEllipsis
3. WordEllipsis
4. PrefixCharacterEllipsis
5. LeadingCharacterEllipsis

### None

No trimming is applied. Text is cut off when it reaches the boundary of the control.

```xml
<TextBlock Text="This is a very long line of text that will get cut off."
           TextTrimming="None"
           Width="200" />
```

<div className="center" style={{maxWidth:400}}>
<img className="center" src={NoTrimming} alt="A screenshot of an IDE, displaying a long line of text in a box that is abruptly cut off." />
</div>

### CharacterEllipsis

Trims text after a character ends. An ellipsis is added where the text is truncated.

Intended for general-purposes trimming, when your UI design requires precise space usage.

```xml
<TextBlock Text="This is a very long line of text that will get cut off."
           TextTrimming="CharacterEllipsis"
           Width="200" />
```

<div className="center" style={{maxWidth:400}}>
<img className="center" src={CharacterEllipsis} alt="A screenshot of an IDE, displaying a long line of text in a box that is cut off after a character, with an ellipsis added." />
</div>

### WordEllipsis

Trims text after a word ends. Whole words are preserved, and an ellipsis is added when this is no longer possible.

Intended to maximize readability by preventing incomplete words from appearing.

```xml
<TextBlock Text="This is a very long line of text that will get cut off."
           TextTrimming="WordEllipsis"
           Width="200" />
```

<div className="center" style={{maxWidth:400}}>
<img className="center" src={WordEllipsis} alt="A screenshot of an IDE, displaying a long line of text in a box that is cut off after a complete word, with an ellipsis added." />
</div>

### PrefixCharacterEllipsis

Trims text in the middle. The beginning and end of the text string are displayed, with an ellipsis separating them.

Default is to show the first eight characters, then an ellipsis, then however many characters are required to fill the available space.

Intended for file paths, URLs, or any other text where both the beginning and end should be displayed.

```xml
<TextBlock Text="C:\Users\Documents\Projects\MyProject\source.cs"
           TextTrimming="PrefixCharacterEllipsis"
           Width="200" />
```

<div className="center" style={{maxWidth:400}}>
<img className="center" src={PrefixCharacterEllipsis} alt="A screenshot of an IDE, displaying a long line of text in a box that is cut off in the middle, with an ellipsis placed between the starting and ending characters." />
</div>

### LeadingCharacterEllipsis

Trims text from the beginning. An ellipsis starts the displayed text, followed by the characters at the end of the text.

Intended for file paths or any other text where only the end is important.

```xml
<TextBlock Text="C:\Users\Documents\Projects\MyProject\source.cs"
           TextTrimming="LeadingCharacterEllipsis"
           Width="200" />
```

<div className="center" style={{maxWidth:400}}>
<img className="center" src={LeadingCharacterEllipsis} alt="A screenshot of an IDE, displaying a long line of text in a box that is cut off at the start, with an ellipsis replacing the starting characters and the ending characters visible." />
</div>

## Example uses

### Combining with MaxWidth

Combine `TextTrimming` with `MaxWidth` to create responsive text displays that maintain a consistent area on your UI.

```xml
<TextBlock Text="{Binding UserName}"
           MaxWidth="300"
           TextTrimming="CharacterEllipsis" />
```

### Combining with TextWrapping

Combine `TextTrimming` and `TextWrapping` to apply trimming to the last visible line when wrapping is enabled.

```xml
<TextBlock Text="{Binding Content}"
           Width="300"
           MaxLines="3"
           TextWrapping="Wrap"
           TextTrimming="WordEllipsis" />
```

<div className="center" style={{maxWidth:400}}>
<img className="center" src={TextWrappingWithTextTrimming} alt="A screenshot of an IDE, displaying a long line of text in a box that wraps within the box for three lines, before being cut off with an ellipsis added." />
</div>

## See also

- [TextBlock](https://docs.avaloniaui.net/docs/reference/controls/textblock)
- [SelectableTextBlock](https://docs.avaloniaui.net/docs/reference/controls/selectable-textblock)
- [TextTrimming API reference](https://reference.avaloniaui.net/api/Avalonia.Media/TextTrimming/)