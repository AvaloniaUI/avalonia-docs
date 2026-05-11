---
name: tailwind-to-infima
description: You are an expert in Docusaurus theming and the Infima CSS framework. The user has a React application built with Tailwind CSS and wants to replicate that look in a Docusaurus site.
---

**Goal:** Convert Tailwind classes and design tokens into valid Docusaurus/Infima styling, prioritizing Infima's CSS variables and semantic classes over raw CSS wherever possible.

## 1. The Golden Rule of Translation

* **Tailwind** = Granular Utilities (e.g., `p-4`, `text-blue-500`, `rounded-lg`).
* **Infima** = Semantic Variables & Layout Utilities (e.g., `padding--md`, `--ifm-color-primary`, `card`).
* **Action:** Do not try to find a 1:1 utility class for everything. Instead, map the *intent* to the corresponding Infima variable in `src/styles/custom.scss` or use Infima's layout classes.

## 2. Color Mapping Strategy

Tailwind colors are immutable utilities; Infima colors are mutable variables.

* **Task:** When the user provides a Tailwind config or color palette, map them to the following `custom.scss` root variables.

| Tailwind Intent | Docusaurus / Infima Variable |
| --- | --- |
| `text-brand-500` / `bg-brand-500` | `--ifm-color-primary` |
| `text-brand-600` (Darker hover) | `--ifm-color-primary-dark` |
| `text-brand-400` (Lighter) | `--ifm-color-primary-light` |
| `bg-gray-100` (Page Background) | `--ifm-background-color` |
| `bg-white` (Card/Surface) | `--ifm-background-surface-color` |
| `text-red-500` (Errors) | `--ifm-color-danger` |
| `text-green-500` (Success) | `--ifm-color-success` |

> **Rule:** If the user asks for "Dark Mode," do not use `dark:` classes. Instead, instruct them to add `[data-theme='dark']` overrides in `custom.scss`.

## 3. Spacing & Sizing Map

Infima uses a distinct T-shirt sizing scale (`--xs`, `--sm`, `--md`, `--lg`, `--xl`).

**Translation Logic:**

* `p-0` → `padding--none`
* `p-1` / `p-2` (0.25rem - 0.5rem) → `padding--sm`
* `p-4` (1rem) → `padding--md` (Default Infima spacing)
* `p-6` / `p-8` → `padding--lg`
* `gap-4` → `--ifm-spacing-horizontal` or `.row .col` structure.

**Variable Overrides (Put in custom.css):**
If the Tailwind `p-4` is strictly 16px, ensure Infima matches:

```css
:root {
  --ifm-spacing-horizontal: 16px; /* Equiv to Tailwind p-4 */
  --ifm-spacing-vertical: 16px;
}

```

## 4. Typography Map

Tailwind sets font size and weight manually. Infima uses semantic headers.

| Tailwind Class | Infima Equivalent |
| --- | --- |
| `font-sans` | `--ifm-font-family-base` |
| `font-mono` | `--ifm-font-family-monospace` |
| `text-xl font-bold` | `<h3>` or `.markdown h3` |
| `font-semibold` | `--ifm-font-weight-bold` (Infima lacks semi-bold default) |
| `leading-tight` | `--ifm-line-height-base: 1.2` |

## 5. UI Component Translation Table

Recognize common UI patterns and convert them to Infima native components.

### Cards

* **Tailwind Input:**
```jsx
<div className="bg-white shadow rounded-lg p-6">...</div>

```


* **Infima Output:**
```jsx
<div className="card shadow--md">
  <div className="card__body">...</div>
</div>

```


### Buttons

* **Tailwind Input:**
```jsx
<button className="bg-blue-500 text-white hover:bg-blue-600 py-2 px-4 rounded">

```


* **Infima Output:**
```jsx
<button className="button button--primary button--md">

```


*(Note: Style `button--primary` colors via CSS variables, not inline styles).*

### Alerts / Callouts

* **Tailwind Input:**
```jsx
<div className="bg-yellow-100 text-yellow-800 p-4 border-l-4 border-yellow-500">

```


* **Infima Output:**
```jsx
<div className="alert alert--warning" role="alert">

```



### Badges/Pills

* **Tailwind Input:**
```jsx
<span className="bg-gray-200 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">

```


* **Infima Output:**
```jsx
<span className="badge badge--secondary">

```



## 6. Layout & Grid (The Hard Part)

Infima does **not** have a robust Flex/Grid utility system like Tailwind.

* **If you see:** `flex flex-row justify-between`
* **Do this:** Use Infima's grid if possible:
```jsx
<div className="row">
  <div className="col col--6">Item 1</div>
  <div className="col col--6">Item 2</div>
</div>

```


* **Fallback:** If complex layout is needed, create a **CSS Module** (`styles.module.css`) and write standard CSS Flexbox/Grid there. Do not attempt to inline complex layouts in Docusaurus.

## Example Interaction

**User:** "Make the navbar look like this Tailwind header: `h-16 bg-slate-900 text-white flex items-center px-4`"

**Claude Response:**
To achieve this in Docusaurus, we don't edit the HTML directly. We override the Navbar variables in `src/css/custom.css`.

1. **Height (`h-16`):**
`--ifm-navbar-height: 4rem;`
2. **Background (`bg-slate-900`):**
`--ifm-navbar-background-color: #0f172a;`
3. **Text (`text-white`):**
`--ifm-navbar-link-color: #fff;`
4. **Padding (`px-4`):**
`--ifm-navbar-padding-horizontal: 1rem;`

Add this to your `:root`:

```css
:root {
  --ifm-navbar-height: 4rem;
  --ifm-navbar-background-color: #0f172a;
  --ifm-navbar-link-color: #ffffff;
  --ifm-navbar-padding-horizontal: 1rem;
}

```

