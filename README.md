<p align="center">
  <img alt="Avalonia UI logo" src="static/img/purple-border-gradient-icon.png" width="75px" />
  <h1 align="center">Avalonia UI Documentation</h1>
</p>

The repository holds the code and markdown source files for the Avalonia UI documentation website, which is accessible at [docs.avaloniaui.net](https://docs.avaloniaui.net)

## Index
- [Index](#index)
- [Feedback](#feedback)
- [Documentation Issues](#documentation-issues)
- [Contributing](#contributing)
  - [Workflow](#workflow)
  - [Conventions](#conventions)
- [Local setup](#local-setup)
  - [Requirements](#requirements)
  - [Setup](#setup)
  - [Starting](#starting)
- [Thanks 💜](#thanks-)

## Feedback
We welcome your valuable feedback on the documentation! Please feel free to join our [Community on Telegram](https://t.me/Avalonia) and send us a message. We would be delighted to hear from you and assist you with any queries or concerns you may have. 

## Documentation Issues
If you come across any issues with the documentation or have a feature request related explicitly to it, we encourage you to create a new [GitHub issue](https://github.com/AvaloniaUI/avalonia-docs/issues/new). Before creating a new issue, we kindly request that you check for existing issues to avoid duplication. 

## Contributing
To contribute to Avalonia UI documentation, you need to fork this repository and submit a pull request for the Markdown and/or image changes that you're proposing.

### Workflow
The two suggested workflows are:

- For small changes, use the "Edit this page" button on each page to edit the Markdown file directly on GitHub.
- If you plan to make significant changes or preview the changes locally, clone the repo to your system to and follow the installation and local development steps in [Local setup](#local-setup).

### Conventions

- The front matter for every markdown file should include the `id` and a `title`. `id` will be used to reference the file in `sidebar.js` or `version-x.x.x-sidebars.json` for a specific version.
  ```yaml
  ---
  id: platform-support
  title: Supported Platforms
  ---
  ```

- Use `kebab-case` for file and folder names.
  For example:
  - `/docs/getting-started/ide-extensions.md`
  - `/docs/how-to/use-google-fonts.md`

- Images are important to bring the product to life and clarify the written content. For images you're adding to the repo, store them in the `img` subfolder inside `static` folder. For every topic there needs to be a folder inside `\static\img\` section, for example: `static\img\how-to\use-google-fonts\download-font.png`.
  
  When you link to an image, the path and filename are case-sensitive. The convention is `kebab-case`. `import` should be used to help detect broken images and placed near the top of the document for easier maintenance.

  > Example code for adding an image in markdown file:
  ```markdown
  import ButtonGroup from '/img/button-group.png';
  <img className="screenshot-full" src={ButtonGroup} alt="Button group" />
  ```
  
  Do not include quotes around the `src`'s attribute value.  

## Local setup

### Requirements

- **Node version >= 18**

### Setup

```bash
npm install
```

### Starting 

```bash
npx docusaurus start
npx docusaurus start --locale zh-Hans
npx docusaurus start --locale ru
```

## Thanks 💜

Thanks for all your contributions and efforts towards improving the Avalonia UI documentation. We thank you being part of our ✨ community ✨!
