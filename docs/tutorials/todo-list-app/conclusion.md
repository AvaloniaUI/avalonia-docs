---
description: TUTORIALS - To Do List App
---

import ToDoFinalArchitectureDiagram from '/img/gitbook-import/assets/image (2) (3).png';

# Conclusion

On this page you will learn why the app was implemented in the way that it has been, and recommended some further reading.

## Application Solution Architecture

This tutorial has used an application solution architecture that uses the MVVM pattern, and swaps the content of the main window to navigate between pages; while keeping the 'top level' view model in memory to provide application state. The pages (views) are composed in _Avalonia UI_ user controls.

<img className="center" src={ToDoFinalArchitectureDiagram} alt=""/>

This tutorial application is targeted at the _Windows_ platform where the main window exists - so it may appear to be an over complex approach.

However on other target platforms, there is no main window. An application has to be arranged as a series of views.

:::info
To learn more about targeting applications for iOS (Apple) platforms, see [here](../../guides/platforms/ios/).
:::

:::info
To learn more about targeting applications for Android mobile devices, see [here](../../guides/platforms/android/).
:::

## Further Reading

For a full list of the _Avalonia UI_ tutorials, see [here](..).
