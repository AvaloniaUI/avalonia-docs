# Avalonia Visual Studio Extension - Settings

Multiple options are provided to allow you to configure the way the editor and previewer behave.

These can be accessed by selecting **Options** from the **Tools** menu inside Visual Studio.

![Options dialog](../../../static/img/vs-extension/visual-studio-avalonia-options.png)

|  Setting              | Description | Options       |
|-----------------------|-------------|---------------|
| Default Document View | What is displayed when a document is opened | Split (Default) - Both the code and the previewer<br />Design - Just the previewer<br /> Source - Just the source code |
| Split Orientation     | Whether to split the orientation horizontally or vertically | Horizontal (Default) - The editor and previewer are displayed side by side<br />Vertical - The editor and previewer are displayed one above the other |
| Swapped               | Whether the default position of the editor and previewer should be inverted when opening a document in 'Split' mode | True if checked |
| Default Zoom level    | How to size the content in the  | 100% (Default)<br />Various percentages<br />Fit to Width - Allow the preview to take the full width of the available space<br />Fit All - Fill the entire previewer |
| Minimum Log Verbosity | The minimum LogLevel for information output by the extension | Trace<br />Debug<br />Information (Default)<>Warning<br />Error<br />Critical<br />None |
