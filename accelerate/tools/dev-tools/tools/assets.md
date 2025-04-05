# Application Assets Tool

`Developer Tools` reads list of all Avalonia Resources embedded in the running process.

This tool also includes embedded assets from the dependencies, commonly third party themes or icon libraries these are available as Avalonia Resources.

![Assets Page](../../../../static/img/dev-tools/assets-page.png)

## Asset context menu

In the context menu of an asset, it's possible to copy absolute asset Uri which then can be referenced from XAML code or export asset to the file system.

![alt text](../../../../static/img/dev-tools/assets-context-menu.png)

## Asset preview

Grid listing has limited information about resources, without reading them into memory first due to performance concerns.

Several asset formats are supported to be previewed: raster images, fonts and text.
Preview window can be opened by double clicking or opened via context menu. The tool will download them from the app process, and display.

Depending on the asset media type, additional information can be displayed such as bitmap format and pixel (decoded) size.

:::note
Any asset larger than 100mb cannot be previewed, and currently it's not configurable.
:::

![Image Asset preview example](../../../../static/img/dev-tools/assets-image.png)

![Font Asset preview example](../../../../static/img/dev-tools/assets-font.png)
