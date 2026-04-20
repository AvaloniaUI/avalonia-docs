#!/usr/bin/env python3
"""
Fix relative page links in markdown files by converting bare slugs to absolute paths.
"""
import re
import os
import glob

# Mapping: bare slug → absolute path
# Only includes slugs that need to be fixed (relative to site root)
SLUG_MAP = {
    # Graphics & Animation
    'drawing-graphics': '/docs/graphics-animation/drawing-graphics',
    'shapes-and-geometries': '/docs/graphics-animation/shapes-and-geometries',
    'animations': '/docs/graphics-animation/animations',
    'keyframe-animations': '/docs/graphics-animation/keyframe-animations',
    'animation-settings': '/docs/graphics-animation/animation-settings',
    'control-transitions': '/docs/graphics-animation/control-transitions',
    'composition-animations': '/docs/graphics-animation/composition-animations',
    'page-transitions': '/docs/graphics-animation/page-transitions',
    'easing-functions': '/docs/graphics-animation/easing-functions',
    'brushes': '/docs/graphics-animation/brushes',
    'gradients': '/docs/graphics-animation/gradients',
    'effects': '/docs/graphics-animation/effects',
    'transforms': '/docs/graphics-animation/transforms',
    'custom-rendering': '/docs/graphics-animation/custom-rendering',
    'image-interpolation': '/docs/graphics-animation/image-interpolation',
    'bitmap-blend-modes': '/docs/graphics-animation/bitmap-blend-modes',

    # Styling
    'styles': '/docs/styling/styles',
    'control-themes': '/docs/styling/control-themes',
    'style-classes': '/docs/styling/style-classes',
    'style-selectors': '/docs/styling/style-selectors',
    'style-selector-syntax': '/docs/styling/style-selector-syntax',
    'pseudoclasses': '/docs/styling/pseudoclasses',
    'style-precedence': '/docs/styling/style-precedence',
    'style-best-practices': '/docs/styling/style-best-practices',
    'sharing-styles': '/docs/styling/sharing-styles',
    'theme-variants': '/docs/styling/theme-variants',
    'typography': '/docs/styling/typography',
    'custom-fonts': '/docs/styling/custom-fonts',
    'control-template-walkthrough': '/docs/styling/control-template-walkthrough',

    # Data Binding
    'data-context': '/docs/data-binding/data-context',
    'compiled-bindings': '/docs/data-binding/compiled-bindings',
    'data-binding-syntax': '/docs/data-binding/data-binding-syntax',
    'how-to-bind-to-an-observable': '/docs/data-binding/how-to-bind-to-an-observable',
    'how-to-bind-to-a-task-result': '/docs/data-binding/how-to-bind-to-a-task-result',
    'built-in-data-binding-converters': '/docs/data-binding/built-in-data-binding-converters',
    'how-to-create-a-custom-data-binding-converter': '/docs/data-binding/how-to-create-a-custom-data-binding-converter',
    'multi-binding': '/docs/data-binding/multi-binding',
    'introduction-to-data-binding': '/docs/data-binding/introduction-to-data-binding',
    'how-to-bind-image-files': '/docs/data-binding/how-to-bind-image-files',

    # Data Templates
    'content-templates': '/docs/data-templates/content-templates',
    'control-content': '/docs/data-templates/control-content',
    'data-template-collection': '/docs/data-templates/data-template-collection',
    'introduction-to-data-templates': '/docs/data-templates/introduction-to-data-templates',
    'creating-data-templates-in-code': '/docs/data-templates/creating-data-templates-in-code',
    'reusing-data-templates': '/docs/data-templates/reusing-data-templates',
    'view-locator': '/docs/data-templates/view-locator',

    # Custom Controls
    'choosing-a-custom-control-type': '/docs/custom-controls/choosing-a-custom-control-type',
    'defining-properties': '/docs/custom-controls/defining-properties',
    'defining-events': '/docs/custom-controls/defining-events',
    'drawing-custom-controls': '/docs/custom-controls/drawing-custom-controls',
    'templated-controls': '/docs/custom-controls/templated-controls',
    'custom-control-class': '/docs/custom-controls/custom-control-class',
    'custom-panel': '/docs/custom-controls/custom-panel',
    'attached-properties': '/docs/custom-controls/attached-properties',

    # Testing
    'headless-nunit': '/docs/testing/headless-nunit',
    'headless-xunit': '/docs/testing/headless-xunit',
    'setting-up-the-headless-platform': '/docs/testing/setting-up-the-headless-platform',
    'ui-testing-with-appium': '/docs/testing/ui-testing-with-appium',

    # Services
    'insets-manager': '/docs/services/insets-manager',
    'input-pane': '/docs/services/input-pane',
    'storage-provider': '/docs/services/storage/storage-provider',
    'storage-item': '/docs/services/storage/storage-item',
    'bookmarks': '/docs/services/storage/bookmarks',
    'file-picker-options': '/docs/services/storage/file-picker-options',
    'clipboard': '/docs/services/clipboard',

    # XAML
    'directives': '/docs/xaml/directives',
    'markup-extensions': '/docs/xaml/markup-extensions',
    'namespaces': '/docs/xaml/namespaces',
    'type-converters': '/docs/xaml/type-converters',

    # Properties
    'metadata-and-callbacks': '/docs/properties/metadata-and-callbacks',
    'property-value-inheritance': '/docs/properties/property-value-inheritance',
    'value-precedence': '/docs/properties/value-precedence',

    # Layout (docs)
    'positioning-controls': '/docs/layout/positioning-controls',
    'choosing-a-layout-panel': '/docs/layout/choosing-a-layout-panel',

    # Events (docs)
    'input-events': '/docs/events/input-events',
    'lifecycle-events': '/docs/events/lifecycle-events',

    # Controls - Layout Panels
    'canvas': '/controls/layout/panels/canvas',
    'dockpanel': '/controls/layout/panels/dockpanel',
    'grid': '/controls/layout/panels/grid',
    'stackpanel': '/controls/layout/panels/stackpanel',
    'relativepanel': '/controls/layout/panels/relativepanel',
    'uniformgrid': '/controls/layout/panels/uniformgrid',
    'wrappanel': '/controls/layout/panels/wrappanel',
    'panel': '/controls/layout/panels/panel',
    'gridsplitter': '/controls/layout/panels/gridsplitter',

    # Controls - Collections
    'carousel': '/controls/data-display/collections/carousel',
    'itemscontrol': '/controls/data-display/collections/itemscontrol',
    'itemsrepeater': '/controls/data-display/collections/itemsrepeater',
    'listbox': '/controls/data-display/collections/listbox',

    # Controls - Display
    'contentcontrol': '/controls/data-display/contentcontrol',
    'transitioningcontentcontrol': '/controls/data-display/transitioningcontentcontrol',
    'label': '/controls/data-display/text-display/label',
    'selectabletextblock': '/controls/data-display/text-display/selectabletextblock',
    'textblock': '/controls/data-display/text-display/textblock',
    'texttrimming': '/controls/data-display/text-display/texttrimming',

    # Controls - Buttons
    'button': '/controls/input/buttons/button',
    'radiobutton': '/controls/input/buttons/radiobutton',
    'repeatbutton': '/controls/input/buttons/repeatbutton',
    'splitbutton': '/controls/input/buttons/splitbutton',
    'togglebutton': '/controls/input/buttons/togglebutton',
    'togglesplitbutton': '/controls/input/buttons/togglesplitbutton',
    'hyperlinkbutton': '/controls/input/buttons/hyperlinkbutton',

    # Controls - Selectors
    'checkbox': '/controls/input/selectors/checkbox',
    'toggleswitch': '/controls/input/selectors/toggleswitch',
    'combobox': '/controls/input/selectors/combobox',
    'slider': '/controls/input/selectors/slider',
    'numericupdown': '/controls/input/selectors/numericupdown',

    # Controls - Text Input
    'autocompletebox': '/controls/input/text-input/autocompletebox',
    'textbox': '/controls/input/text-input/textbox',
    'maskedtextbox': '/controls/input/text-input/maskedtextbox',

    # Controls - Date/Time
    'calendar': '/controls/input/date-and-time/calendar',
    'calendardatepicker': '/controls/input/date-and-time/calendardatepicker',
    'datepicker': '/controls/input/date-and-time/datepicker',
    'timepicker': '/controls/input/date-and-time/timepicker',

    # Controls - Feedback
    'popup': '/controls/feedback/popup',
    'tooltip': '/controls/feedback/tooltip',
    'notification': '/controls/feedback/notification',

    # Controls - Containers
    'expander': '/controls/layout/containers/expander',
    'flyout': '/controls/layout/containers/flyout',
    'splitview': '/controls/layout/containers/splitview',
    'viewbox': '/controls/layout/containers/viewbox',
    'groupbox': '/controls/layout/containers/groupbox',

    # Controls - Media
    'image': '/controls/media/image',

    # Platform guides embedded linux
    'raspberry-pi': '/docs/platform-specific-guides/embedded-linux/raspberry-pi',
    'virtual-keyboard': '/docs/platform-specific-guides/embedded-linux/virtual-keyboard',
}

# .md-suffixed versions
SLUG_MAP_WITH_MD = {k + '.md': v for k, v in SLUG_MAP.items()}

# Partial path mappings (links with partial paths)
PARTIAL_PATH_MAP = {
    # From how-to files
    'fundamentals/assets': '/docs/fundamentals/assets',
    'styling/custom-fonts': '/docs/styling/custom-fonts',
    'styling/custom-fonts#font-uri-format': '/docs/styling/custom-fonts#font-uri-format',
    'graphics-animation/page-transitions.md': '/docs/graphics-animation/page-transitions',
    'graphics-animation/page-transitions': '/docs/graphics-animation/page-transitions',
    'graphics-animation/text-options': '/docs/graphics-animation/text-options',
    'services/clipboard': '/docs/services/clipboard',
    'data-binding/binding-to-commands.md': '/docs/data-binding/binding-to-commands',
    'data-binding/binding-to-commands': '/docs/data-binding/binding-to-commands',
    'input-interaction/commanding.md': '/docs/input-interaction/commanding',
    'input-interaction/hotkeys.md': '/docs/input-interaction/hotkeys',
    'app-development/dependency-injection.md': '/docs/app-development/dependency-injection',
    'data-binding/data-validation.md': '/docs/data-binding/data-validation',
    'data-binding/inotifypropertychanged.md': '/docs/data-binding/inotifypropertychanged',
    'fundamentals/the-mvvm-pattern.md': '/docs/fundamentals/the-mvvm-pattern',
    'data-binding/how-to-bind-tabs': '/docs/data-binding/how-to-bind-tabs',
    'data-binding/introduction-to-data-binding': '/docs/data-binding/introduction-to-data-binding',
    'navigation-how-to': '/docs/how-to/navigation-how-to',
    'data-display/collections/listbox': '/controls/data-display/collections/listbox',
    'text-input/autocompletebox': '/controls/input/text-input/autocompletebox',
    'buttons/radiobutton': '/controls/input/buttons/radiobutton',
    'buttons/radiobutton.md': '/controls/input/buttons/radiobutton',
    'selectors/checkbox.md': '/controls/input/selectors/checkbox',
    'togglebutton.md': '/controls/input/buttons/togglebutton',
    'button.md': '/controls/input/buttons/button',
    'slider.md': '/controls/input/selectors/slider',
    'numericupdown.md': '/controls/input/selectors/numericupdown',
    'toggleswitch.md': '/controls/input/selectors/toggleswitch',
    'autocompletebox.md': '/controls/input/text-input/autocompletebox',
    'maskedtextbox.md': '/controls/input/text-input/maskedtextbox',
    'groupbox.md': '/controls/layout/containers/groupbox',
    'splitview.md': '/controls/layout/containers/splitview',
    'calendar.md': '/controls/input/date-and-time/calendar',
    'calendardatepicker.md': '/controls/input/date-and-time/calendardatepicker',
    'timepicker.md': '/controls/input/date-and-time/timepicker',
    'datepicker.md': '/controls/input/date-and-time/datepicker',
    'grid.md': '/controls/layout/panels/grid',
    'content-templates.md': '/docs/data-templates/content-templates',
    'data-template-collection.md': '/docs/data-templates/data-template-collection',
    'introduction-to-data-templates.md': '/docs/data-templates/introduction-to-data-templates',
    'control-content.md': '/docs/data-templates/control-content',
    'collections/carousel': '/controls/data-display/collections/carousel',
    'user-input/routed-events': '/docs/input-interaction/routed-events',
    'pull-gesture-recognizer': '/reference/gestures/pull-gesture-recognizer',
    'scroll-gesture-recognizer': '/reference/gestures/scroll-gesture-recognizer',
    'pinch-gesture-recognizer': '/reference/gestures/pinch-gesture-recognizer',
    'pull-gesture-recognizer.md': '/reference/gestures/pull-gesture-recognizer',
    'scroll-gesture-recognizer.md': '/reference/gestures/scroll-gesture-recognizer',

    # absolute links missing /docs/ prefix
    'docs/fundamentals/assets': '/docs/fundamentals/assets',
    'docs/webview/webview-environment': '/reference/webview/webview-environment',
    'docs/webview/webauthenticationbroker': '/reference/webview/webauthenticationbroker',
    'docs/app-development/rendering-markdown': '/docs/app-development/rendering-markdown',
    'docs/media/media-playback': '/docs/media/media-playback',
    'docs/media/mediasource': '/reference/media-player/mediasource',
    'docs/media/mediaplayer': '/reference/media-player/mediaplayer',
    'docs/guides/developer-guides/developer-tools': '/tools/legacy-developer-tools',

    # From reference/services/input-pane.md
    'controls/detailed-reference/autocompletebox.md': '/controls/input/text-input/autocompletebox',
    'controls/detailed-reference/textbox.md': '/controls/input/text-input/textbox',

    # From reference/services/launcher.md
    'storage/storage-provider': '/docs/services/storage/storage-provider',

    # From docs/custom-controls/attached-properties.md and others
    'layout': '/docs/layout/layout',

    # From docs/migration/wpf/
    'cheat-sheet': '/docs/migration/wpf/cheat-sheet',
    'data-templates': '/docs/data-templates/introduction-to-data-templates',
    'events': '/docs/events/index',
    'properties': '/docs/properties/index',
    'styling': '/docs/styling/styles',

    # From docs/services
    'storage-provider': '/docs/services/storage/storage-provider',
    'storage-item': '/docs/services/storage/storage-item',

    # From docs/properties
    'properties/value-precedence': '/docs/properties/value-precedence',
    'properties/property-value-inheritance': '/docs/properties/property-value-inheritance',

    # From docs/styling
    'custom-controls': '/docs/custom-controls/index',
    'fundamentals/avalonia-xaml.md': '/docs/fundamentals/avalonia-xaml',

    # From concepts/index.md
    'concepts/ui-concepts/assets': '/concepts/ui-concepts/assets',
    'ui-concepts/assets': '/concepts/ui-concepts/assets',

    # From docs/get-started
    'tools/community-edition': '/tools/ide/index',
    'starter-tutorial/index.mdx': '/docs/get-started/starter-tutorial/index',
    'adding-some-layout': '/docs/get-started/starter-tutorial/adding-some-layout',
    'migration/wpf/index.md': '/docs/migration/wpf/index',

    # From concepts/ui-concepts/controls/control-trees.md
    'layout': '/docs/layout/layout',

    # From docs/welcome.md
    'avalonia12-breaking-changes': '/docs/avalonia12-breaking-changes',
    'get-started/create-your-first-project': '/docs/get-started/create-your-first-project',
    'get-started/install-avalonia': '/docs/get-started/install-avalonia',
    'get-started/set-up-your-ide': '/docs/get-started/set-up-your-ide',
    'get-started/starter-tutorial/index.mdx': '/docs/get-started/starter-tutorial/index',
    'migration/wpf/cheat-sheet': '/docs/migration/wpf/cheat-sheet',
    'samples-tutorials/index.md': '/docs/samples-tutorials/index',
    'styling/styles': '/docs/styling/styles',
    'supported-platforms': '/docs/supported-platforms',
    'fundamentals/avalonia-xaml': '/docs/fundamentals/avalonia-xaml',

    # Platform guides
    'embedded-linux': '/docs/platform-specific-guides/embedded-linux/embedded-linux',
    'deployment/webassembly.mdx': '/docs/deployment/webassembly',

    # XPF
    'getting-started': '/xpf/getting-started',
    'getting-started.md': '/xpf/getting-started',
    'customizing-initialization.md': '/xpf/configuration/customizing-initialization',
    'performance.md': '/xpf/performance',
    'version-info/versioning.md': '/xpf/version-info/versioning',

    # App development
    'app-development/resource-dictionary': '/docs/app-development/resource-dictionary',

    # custom-controls
    'custom-controls/control-trees': '/docs/custom-controls/control-trees',
    'custom-controls': '/docs/custom-controls/index',

    # Reference
    'reference/markdown/codehighlighter': '/reference/markdown/codehighlighter',
    'reference/markdown/imageloader': '/reference/markdown/imageloader',
    'reference/markdown/markdown-styling': '/reference/markdown/markdown-styling',
    'reference/media-player/mediaplayer': '/reference/media-player/mediaplayer',
    'reference/media-player/mediasource': '/reference/media-player/mediasource',
    'reference/text/texttrimming': '/controls/data-display/text-display/texttrimming',
    'reference/webview/webauthenticationbroker': '/reference/webview/webauthenticationbroker',
    'reference/webview/webview-environment': '/reference/webview/webview-environment',
}

ALL_MAPS = {**SLUG_MAP, **SLUG_MAP_WITH_MD, **PARTIAL_PATH_MAP}

def fix_relative_links(content, filepath):
    """Replace relative markdown links with absolute paths."""
    changes = []

    def replace_link(m):
        pre = m.group(1)   # ](
        link = m.group(2)  # the link itself
        anchor = m.group(3) or ''  # optional #anchor

        # Skip if already absolute (starts with /, http, mailto, etc.)
        if link.startswith('/') or link.startswith('http') or link.startswith('#') or link.startswith('mailto'):
            return m.group(0)

        # Check full link (with anchor) against map
        full_link = link + anchor
        if full_link in ALL_MAPS:
            new_link = ALL_MAPS[full_link]
            changes.append(f'  {link}{anchor} → {new_link}')
            return f'{pre}{new_link})'

        # Check link (without anchor) against map
        if link in ALL_MAPS:
            new_path = ALL_MAPS[link]
            result = f'{pre}{new_path}{anchor})'
            changes.append(f'  {link}{anchor} → {new_path}{anchor}')
            return result

        return m.group(0)

    # Pattern: ](link#anchor) or ](link)
    # Match markdown links: ]( ... )
    new_content = re.sub(
        r'(\]\()([^)#\s]+)(#[^)\s]*)?(?=\))\)',
        replace_link,
        content
    )

    return new_content, changes

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        original = f.read()

    updated, changes = fix_relative_links(original, filepath)

    if updated != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(updated)
        return changes
    return []

def main():
    base = '/Users/yiuluke/Documents/GitHub/avalonia-docs'
    patterns = ['**/*.md', '**/*.mdx']

    total_changes = 0
    for pattern in patterns:
        for filepath in glob.glob(os.path.join(base, pattern), recursive=True):
            if 'node_modules' in filepath or 'fix_' in os.path.basename(filepath):
                continue
            changes = process_file(filepath)
            if changes:
                rel_path = filepath.replace(base + '/', '')
                print(f"{rel_path}:")
                for c in changes:
                    print(c)
                total_changes += len(changes)

    print(f"\nTotal: {total_changes} links fixed")

if __name__ == '__main__':
    main()
