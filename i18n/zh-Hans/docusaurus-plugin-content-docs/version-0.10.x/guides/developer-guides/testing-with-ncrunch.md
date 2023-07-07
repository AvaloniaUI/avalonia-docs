---
id: testing-with-ncrunch
title: Testing with NCrunch
---

When you enable [NCrunch](https://www.ncrunch.net) on your solution the build will most likely fail with an error along the lines of `The name 'InitializeComponent' does not exist in the current context`. This is because the `*.axaml` files are not included in the NCrunch workspace directory because (currently) NCrunch does not know to include those files.

To resolve this, in the NCrunch configuration of the project that uses Avalonia change the _Additional files to include_ setting and add `Views\*.axaml`. This will ensure the `*.axaml` files are copied to the workspace and that the `InitializeComponent` method is generated.

After adding that setting you can use NCrunch normally.