---
name: docusaurus-styling
description: Style Docusaurus sites to match Avalonia Customer Portal theme using TailwindCSS, CSS variables, and component swizzling. Use when user requests Docusaurus styling, theming, visual customization, or component modifications. Ensures unified brand experience across documentation and portal.
---

## Overview

This skill provides comprehensive guidance for styling Docusaurus sites to match the Avalonia Customer Portal theme. The primary objective is to ensure visual and behavioral consistency between the Docusaurus documentation site and the Customer Portal, making users feel they're navigating a single, unified system.

## Core Principles

### 1. Theme Matching Priority
**CRITICAL**: All styling decisions must prioritize matching the Customer Portal theme located at:
```
/Users/michaeljames/Documents/GitHub/CustomerPortal/src/Avalonia.Portal.Customer2
```

### 2. Consistency Requirements
- Users should feel they're navigating the same system across both portals
- Visual elements (colors, typography, spacing, shadows) must be identical
- Interactive behaviors (hover states, transitions, animations) should match
- Layout patterns and component structures should align where applicable

### 3. Technology Stack
- Customer Portal uses **TailwindCSS** for styling
- Docusaurus uses Infima for styling, but when this isn't yielding the results we seek, we can use more advanced options. 
  - Preference order: CSS Variables → TailwindCSS utilities → CSS Modules → Swizzling

## Customer Portal Structure Reference

### File Organization
```
📂 CustomerPortal/src/Avalonia.Portal.Customer2/
├── 📂 public/           # Static assets
├── 📂 src/
│   ├── 📂 components/
│   │   ├── 📂 common/   # Reusable components (breadcrumbs, etc.)
│   │   └── 📂 ui/       # UI primitives (buttons, modals, etc.)
│   ├── 📂 contexts/
│   │   ├── SidebarContext/  # Sidebar state management
│   │   └── ThemeContext/    # Dark/light mode handling
│   ├── 📂 hooks/        # Custom React hooks
│   └── 📂 pages/        # Page components
└── ...
```

### Key Components to Reference
1. **Layout Components**: Header, Sidebar, Footer
2. **UI Primitives**: Buttons, Cards, Modals, Inputs
3. **Common Elements**: Breadcrumbs, Navigation, Search
4. **Theme System**: Dark/light mode implementation
5. **Typography**: Heading styles, body text, code blocks

## Styling Approach Workflow

### Step 1: Analyze Customer Portal
Before implementing any Docusaurus styling:

1. **Examine the Customer Portal component**
   ```bash
   view /Users/michaeljames/Documents/GitHub/CustomerPortal/src/Avalonia.Portal.Customer2/src/components/[component-name]
   ```

2. **Extract key styling attributes**:
   - Color palette (primary, secondary, accent, neutrals)
   - Typography (font families, sizes, weights, line heights)
   - Spacing scale (margins, padding)
   - Border radius values
   - Shadow definitions
   - Transition/animation properties

3. **Note TailwindCSS classes used** for reference

### Step 2: Choose Styling Method

#### Method A: Global CSS Variables (Preferred for theme-wide changes)
```css
/* src/css/custom.css */
:root {
  /* Extract from Customer Portal theme */
  --ifm-color-primary: #[match-customer-portal];
  --ifm-color-primary-dark: #[match-customer-portal];
  --ifm-color-primary-darker: #[match-customer-portal];
  --ifm-color-primary-darkest: #[match-customer-portal];
  --ifm-color-primary-light: #[match-customer-portal];
  --ifm-color-primary-lighter: #[match-customer-portal];
  --ifm-color-primary-lightest: #[match-customer-portal];
  
  /* Typography matching */
  --ifm-font-family-base: [match-customer-portal];
  --ifm-font-size-base: [match-customer-portal];
  --ifm-line-height-base: [match-customer-portal];
  
  /* Spacing */
  --ifm-spacing-horizontal: [match-customer-portal];
  --ifm-spacing-vertical: [match-customer-portal];
  
  /* Borders and Shadows */
  --ifm-global-radius: [match-customer-portal];
  --ifm-global-shadow-lw: [match-customer-portal];
  --ifm-global-shadow-md: [match-customer-portal];
  --ifm-global-shadow-tl: [match-customer-portal];
}

/* Dark mode variables */
[data-theme='dark'] {
  --ifm-color-primary: #[match-customer-portal-dark];
  /* ... additional dark mode overrides */
}
```

#### Method B: TailwindCSS Integration (For utility-first approach)
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init
```

```js
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  // Copy theme configuration from Customer Portal
  theme: {
    extend: {
      colors: {
        // Extract from Customer Portal
      },
      fontFamily: {
        // Match Customer Portal
      },
      // ... other theme extensions
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false, // Disable base styles to avoid conflicts
  },
}
```

#### Method C: Component Swizzling (When CSS alone isn't sufficient)

**When to Swizzle:**
- Need to change component structure (DOM)
- Need to add custom React logic
- CSS targeting alone is insufficient
- Want to reuse Customer Portal React components directly

**Swizzling Process:**
1. **Identify the component to swizzle:**
   ```bash
   npm run swizzle @docusaurus/theme-classic -- --list
   ```

2. **Choose swizzling method:**
   - **Wrapping** (safer, preferred): Add functionality around original component
     ```bash
     npm run swizzle @docusaurus/theme-classic [ComponentName] -- --wrap
     ```
   
   - **Ejecting** (more control, harder to maintain): Complete customization
     ```bash
     npm run swizzle @docusaurus/theme-classic [ComponentName] -- --eject
     ```

3. **Check safety level:**
   - Safe: Can swizzle without concern
   - Unsafe: May break on minor version updates
   - Forbidden: Should not be swizzled

### Step 3: Import and Adapt Customer Portal Components

**Priority: Reuse over Rebuild**

```jsx
// src/theme/ComponentName.js
import React from 'react';
// Import from Customer Portal when possible
import { Button } from '@site/../../CustomerPortal/src/Avalonia.Portal.Customer2/src/components/ui/button';
import { Card } from '@site/../../CustomerPortal/src/Avalonia.Portal.Customer2/src/components/ui/card';

export default function ComponentNameWrapper(props) {
  return (
    <>
      {/* Use Customer Portal components directly */}
      <Button variant="primary">Click me</Button>
      <Card>
        {/* Content */}
      </Card>
    </>
  );
}
```

**If direct import isn't feasible**, copy the component structure and styles:
```jsx
// Extract from Customer Portal and adapt
import React from 'react';
import styles from './styles.module.css'; // Mirror Customer Portal styles

export default function AdaptedComponent(props) {
  // Copy implementation from Customer Portal
  // Adapt for Docusaurus context if needed
}
```

### Step 4: Match Dark Mode Behavior

**Critical**: Customer Portal uses `ThemeContext` for dark/light mode. Match this exactly.

```jsx
// src/theme/Root.js
import React from 'react';
import { ThemeProvider } from '@site/../../CustomerPortal/src/Avalonia.Portal.Customer2/src/contexts/ThemeContext';

export default function Root({children}) {
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  );
}
```

Ensure CSS respects dark mode:
```css
[data-theme='dark'] {
  /* Match Customer Portal dark mode exactly */
}
```

## Component-Specific Guidance

### Navigation/Sidebar
**Reference**: Customer Portal `SidebarContext` and sidebar components

**Key matching points**:
- Sidebar width and collapse behavior
- Navigation item styling (hover, active states)
- Icon usage and sizing
- Animation/transition timing

**Swizzle Target**: `DocSidebar`, `NavbarItem`

### Search
**Reference**: Customer Portal search component

**Key matching points**:
- Search input styling
- Results dropdown appearance
- Keyboard navigation behavior
- Loading states

**Swizzle Target**: `SearchBar`

### Cards/Content Containers
**Reference**: Customer Portal card components

**Key matching points**:
- Border radius
- Shadow depth
- Padding/spacing
- Hover effects

**CSS Target**: `.card`, `.markdown`

### Buttons and CTAs
**Reference**: Customer Portal button components (`src/components/ui/`)

**Key matching points**:
- Button variants (primary, secondary, ghost, etc.)
- Size variants
- Hover/active states
- Disabled states
- Icon positioning

### Typography
**Reference**: Customer Portal typography system

**Key matching points**:
- Heading hierarchy (h1-h6)
- Body text styles
- Code/monospace fonts
- Link styling
- List styling

### Code Blocks
**Reference**: Customer Portal code display (if exists)

**Key matching points**:
- Syntax highlighting theme
- Background colors
- Font choice and sizing
- Copy button styling
- Line numbers appearance

## Workflow Checklist

When styling any Docusaurus element:

- [ ] **Identify** the equivalent Customer Portal component
- [ ] **View** the Customer Portal component source code
- [ ] **Extract** all relevant styling (colors, spacing, typography, effects)
- [ ] **Document** TailwindCSS classes used in Customer Portal
- [ ] **Determine** if CSS variables alone suffice, or if swizzling is needed
- [ ] **Implement** the styling using the chosen method
- [ ] **Test** in both light and dark modes
- [ ] **Verify** responsive behavior matches Customer Portal
- [ ] **Check** hover states, focus states, and animations
- [ ] **Compare** side-by-side with Customer Portal for consistency
- [ ] **Document** any deviations and reasons why

## Common Patterns

### Pattern 1: Matching Color Palette
```bash
# First, extract Customer Portal colors
view /Users/michaeljames/Documents/GitHub/CustomerPortal/src/Avalonia.Portal.Customer2/tailwind.config.js
```

Then map to Docusaurus:
```css
:root {
  --ifm-color-primary: var(--customer-portal-primary);
  --ifm-background-color: var(--customer-portal-bg);
  /* ... complete mapping */
}
```


### Pattern 2: Matching Layout Structure
```jsx
// Swizzle DocPage or similar
// Match Customer Portal's layout grid/flex structure
import React from 'react';
import Layout from '@theme-original/Layout';

export default function LayoutWrapper(props) {
  return (
    <Layout {...props}>
      {/* Apply Customer Portal layout classes/structure */}
      <div className="customer-portal-layout-structure">
        {props.children}
      </div>
    </Layout>
  );
}
```

## Maintenance Guidelines

### Version Updates
When updating Docusaurus:
1. Review swizzled components for breaking changes
2. Re-verify styling consistency with Customer Portal
3. Test all customizations thoroughly

### Synchronization
When Customer Portal updates:
1. Review changes to referenced components
2. Update Docusaurus styling to match
3. Test cross-portal consistency

### Documentation
Maintain a style guide documenting:
- All CSS variable mappings
- Swizzled components and why
- Deviations from Customer Portal (with justification)
- Update history

## Troubleshooting

### Issue: Styles not applying
**Solution**: Check CSS specificity and Infima overrides
```css
/* Use more specific selectors or !important sparingly */
.docs-wrapper .custom-class {
  /* Your styles */
}
```

### Issue: Component structure differs too much
**Solution**: Eject and rebuild based on Customer Portal structure
```bash
npm run swizzle @docusaurus/theme-classic [Component] -- --eject
# Then heavily modify based on Customer Portal
```

### Issue: Dark mode inconsistency
**Solution**: Ensure both portals use same theme detection and variables
```jsx
// Sync theme context between portals
// May need to create shared theme package
```

### Issue: TailwindCSS conflicts with Infima
**Solution**: Disable Tailwind preflight and namespace if needed
```js
// tailwind.config.js
module.exports = {
  corePlugins: {
    preflight: false,
  },
  prefix: 'tw-', // Optional: prefix Tailwind classes
}
```

## Critical Reminders

1. **Always check Customer Portal first** before implementing any styling
2. **Reuse Customer Portal components** whenever possible
3. **Match exactly**, don't approximate - users should feel unified experience
4. **Test both themes** (light and dark) thoroughly
5. **Document all customizations** for future maintenance
6. **Prefer wrapping over ejecting** when swizzling
7. **Keep swizzled components minimal** to ease upgrades
8. **Verify responsive behavior** matches across portals

## Quick Reference Commands

```bash
# View Customer Portal component
view /Users/michaeljames/Documents/GitHub/CustomerPortal/src/Avalonia.Portal.Customer2/src/components/[path]

# List swizzleable components
npm run swizzle @docusaurus/theme-classic -- --list

# Wrap a component (safer)
npm run swizzle @docusaurus/theme-classic [Component] -- --wrap

# Eject a component (full control)
npm run swizzle @docusaurus/theme-classic [Component] -- --eject

# Start dev server after changes
npm start
```

## Invocation Trigger

This skill should be invoked whenever:
- User requests edits to Docusaurus styling
- User asks to customize Docusaurus appearance
- User mentions theming or visual consistency
- User references the Customer Portal in context of Docusaurus
- User wants to add or modify Docusaurus components

The goal is seamless, automatic application of Customer Portal styling principles to all Docusaurus customization work.