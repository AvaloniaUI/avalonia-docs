---
name: api-link-builder
description: Scans the /docs directory for opportunities to cross-link with API reference documentation in /api, and vice versa. Creates bi-directional links between human-written docs and generated API pages. Invoke with /api-link-builder [optional-path-or-topic].
user-invocable: true
---

# API Link Builder

Scan documentation pages and API reference pages to find and create bi-directional cross-links, producing a more integrated experience for users navigating between conceptual docs and API reference.

## Inputs

- `$ARGUMENTS`: Optional. A specific file path, directory, or topic to focus on. If omitted, scan the entire `docs/` directory.
  - Examples: `docs/data-binding`, `docs/app-development/threading.md`, `Button`, `Avalonia.Controls`

## Key resources

- **Xref index**: `.apiref/generated/xref-index.json` contains all API entries with `uid`, `name`, `fullName`, and `href` fields. Use this as the master lookup for mapping type/member names to API page URLs.
- **Docs directory**: `docs/` contains human-written documentation (`.md` and `.mdx` files).
- **API directory**: `api/` contains generated API reference pages (`.mdx` files) with frontmatter including `uid`, `slug`, `namespace`, `apiKind`.
- **Controls directory**: `controls/` contains control-specific documentation.

## Link format conventions

### Links from docs to API

Use relative paths to the local `/api` route (not external `api-docs.avaloniaui.net` URLs):

```markdown
[`Button`](/api/avalonia/controls/button)
[`Dispatcher.InvokeAsync`](/api/avalonia/threading/dispatcher#uid-9073eca221)
```

For inline mentions of types, wrap in backticks and link:

```markdown
The [`TextBox`](/api/avalonia/controls/textbox) control provides...
```

For "See also" sections at the end of doc pages:

```markdown
## See also

- [`Button` API reference](/api/avalonia/controls/button)
- [`ICommand` API reference](/api/avalonia/input/icommand)
```

### Links from API to docs

API pages are generated `.mdx` files. Add a "Documentation" or "Learn more" section that links back to the relevant doc page using a docs-link admonition block. Insert it after the lead description div and before the first content section (Constructors, Properties, Methods, etc.):

```mdx
<div className="apiref-page__docs-links">

:::info Documentation
For conceptual guidance and examples, see:
- [Threading model](/docs/app-development/threading)
- [How to access the UI thread](/docs/how-to/access-ui-thread)
:::

</div>
```

## Workflow

### Step 1: Load the xref index

Read the xref index file at `.apiref/generated/xref-index.json`. Parse it to build a lookup map of:
- Type name to API href (e.g., `Button` -> `/api/avalonia/controls/button`)
- Fully qualified name to API href (e.g., `Avalonia.Controls.Button` -> `/api/avalonia/controls/button`)

Filter to only Class, Struct, Interface, Enum, and Delegate entries (skip individual members, constructors, and method overloads for the initial scan). This keeps the matching focused on top-level types.

```
Read(file_path: .apiref/generated/xref-index.json)
```

Note: This file is large (~107K lines). Read it and parse the JSON `entries` array. Build a dictionary keyed by `name` and `fullName` for quick lookup.

### Step 2: Determine scope

Based on `$ARGUMENTS`:

| Input | Scope |
|---|---|
| No arguments | Scan all `.md` and `.mdx` files under `docs/` |
| Directory path (e.g., `docs/data-binding`) | Scan all files in that directory recursively |
| File path (e.g., `docs/app-development/threading.md`) | Scan that single file |
| Topic keyword (e.g., `Button`, `threading`) | Search for related files in `docs/` and `controls/` using Grep, then scan matches |
| Namespace (e.g., `Avalonia.Controls`) | Find docs referencing types from that namespace |

### Step 3: Scan doc pages for linking opportunities

For each doc file in scope:

1. **Read the file** and identify all Avalonia type and member references:
   - Types already in backticks but not linked (e.g., `` `Button` `` without a hyperlink)
   - Fully qualified type names in prose (e.g., `Avalonia.Controls.Button`)
   - Type names in code blocks (these are informational, do not link inside code blocks)
   - Class/interface/enum names mentioned in explanatory text
   - Types used in XAML examples (e.g., `<Button>`, `<TextBox>`)

2. **Cross-reference with the xref index** to find which mentions have corresponding API pages.

3. **Check existing links** in the file:
   - Already linked to the local `/api/` route? Skip.
   - Linked to external `api-docs.avaloniaui.net`? Flag for migration to local `/api/` route.
   - Not linked at all? Flag as a linking opportunity.

4. **Categorize each opportunity**:

| Category | Action |
|---|---|
| **Unlinked type mention** | Add link to API page on first meaningful mention (not inside code blocks) |
| **External API link** | Migrate to local `/api/` relative path |
| **Missing "See also" entry** | Add API reference link to the See also section |
| **Missing from See also** | If the page discusses a type extensively, add it to See also |

5. **Prioritize opportunities**:
   - **High**: Types that are the primary subject of the doc page (mentioned in title, H1, or first paragraph)
   - **Medium**: Types referenced multiple times in the page body
   - **Low**: Types mentioned once in passing

### Step 4: Scan API pages for back-link opportunities

For each API type page that corresponds to a type referenced in the scanned docs:

1. **Read the API page** frontmatter to get `uid`, `namespace`, `apiKind`, and `slug`.

2. **Search for related doc pages** using the type name and namespace:
   - Grep for the type name across `docs/` and `controls/`
   - Check if there is a dedicated doc page (e.g., `controls/button.md` for `Avalonia.Controls.Button`)
   - Look for how-to guides, tutorials, or explanations that feature this type

3. **Check if back-links already exist** in the API page. Look for:
   - Existing `apiref-page__docs-links` div
   - Any links pointing to `/docs/` or `/controls/`

4. **Identify missing back-links**: If the API page has no documentation links but related docs exist, flag it.

### Step 5: Generate report

Present findings before making changes:

```
## API Link Builder Report

**Scope**: [what was scanned]
**Date**: [today's date]

### Summary
- Doc pages scanned: [N]
- API pages checked: [N]
- New doc-to-API links found: [N]
- New API-to-doc links found: [N]
- External links to migrate: [N]

### Doc-to-API linking opportunities

#### [doc-file-path]
| Type | Current state | Proposed link | Priority |
|---|---|---|---|
| `Button` | Unlinked backtick mention | [`Button`](/api/avalonia/controls/button) | High |
| `ICommand` | External link | Migrate to `/api/avalonia/input/icommand` | Medium |

#### [next-doc-file-path]
...

### API-to-doc back-links

#### [api-page-path]
| Related doc | Relevance |
|---|---|
| /docs/app-development/threading | Primary topic match |
| /docs/how-to/access-ui-thread | How-to guide |

#### [next-api-page-path]
...

### External API links to migrate
| File | Current URL | Proposed local path |
|---|---|---|
| docs/app-development/threading.md | https://api-docs.avaloniaui.net/docs/T_... | /api/avalonia/threading/dispatcher |
```

### Step 6: Apply changes

After presenting the report, proceed with changes:

#### 6.1 Add doc-to-API links

For each doc file with opportunities:

1. **First mention linking**: On the first substantive mention of each type in body text (outside code blocks and headings), convert the backtick mention to a linked backtick mention. Do NOT link:
   - Inside fenced code blocks
   - Inside inline code that is part of a code example
   - Every single mention (only the first in each major section or the first overall)
   - Types that are obvious .NET base types (e.g., `string`, `int`, `object`)

2. **See also section**: If the page has a "See also" or equivalent section, add API reference links for the primary types discussed. If no "See also" section exists and the page discusses API types extensively, add one.

3. **Migrate external links**: Replace `https://api-docs.avaloniaui.net/docs/T_Avalonia_...` URLs with the corresponding local `/api/...` paths using the xref index for lookup.

#### 6.2 Add API-to-doc back-links

For each API page that needs back-links:

1. Read the current API page content.
2. Insert a docs-link block after the `apiref-page__lead` div and before the next section. Use this format:

```mdx
<div className="apiref-page__docs-links">

:::info Documentation
For conceptual guidance and examples, see:
- [Page title](/docs/path/to/page)
:::

</div>
```

3. Only add links to pages that provide substantial coverage of the type (not passing mentions).
4. Limit to 3-5 most relevant doc links per API page.
5. Use descriptive link text that tells the user what they will find (e.g., "Threading model" not "Click here").

### Step 7: Verify changes

After applying all changes:

1. **Check all new links resolve**: For each added link, verify the target file exists:
   - For `/api/...` links, check that a corresponding `.mdx` file exists under the `api/` directory
   - For `/docs/...` links, check that a corresponding `.md` or `.mdx` file exists under the `docs/` directory

2. **Check for broken patterns**: Ensure no links were added inside code blocks or XAML examples.

3. **Report final summary**:

```
## Changes applied

- Doc pages modified: [N]
- API pages modified: [N]
- Links added (doc-to-API): [N]
- Links added (API-to-doc): [N]
- External links migrated: [N]
- Broken link targets found: [N] (list any)
```

## Rules and constraints

1. **Never modify code blocks**: Do not add links inside fenced code blocks (` ``` `) or XAML examples.
2. **First-mention linking only**: In body text, only link the first substantive mention of a type per page (or per major section for long pages). Subsequent mentions can remain as plain backtick code.
3. **No self-referential links**: An API page for `Button` should not link to itself.
4. **No marketing language**: Follow the project's anti-marketing rules. Link text should be factual and descriptive.
5. **No em/en dashes**: Follow MIC-006. Use commas, colons, or separate sentences.
6. **Respect generated content**: API pages are generated by `dotnet-apiref`. Place doc-links in a clearly separated block that can survive regeneration. Use the `apiref-page__docs-links` div class for easy identification and preservation.
7. **Prefer quality over quantity**: A few well-placed links are better than linking every type mention. Focus on links that genuinely help users navigate.
8. **Controls directory**: The `controls/` directory may also contain relevant documentation. Include it when searching for back-link targets.
9. **Verify before linking**: Always confirm the target path exists before adding a link. Use Glob to verify file existence.
10. **Preserve existing links**: Do not remove or change existing valid links unless migrating from external to local paths.

## Matching strategy

When matching type names from docs to API entries:

1. **Exact match**: `Button` matches xref entry with `name: "Button"` and `fullName: "Avalonia.Controls.Button"`
2. **Qualified match**: `Avalonia.Controls.Button` matches `fullName` directly
3. **Disambiguation**: If a name matches multiple entries (e.g., `Control` exists in multiple namespaces), use context from the doc page (surrounding text, imports, namespace mentions) to pick the correct one. If ambiguous, prefer `Avalonia.Controls` namespace types as they are most commonly documented.
4. **Skip common conflicts**: Skip linking for extremely common names that could be ambiguous (e.g., `Control`, `Panel`) unless the context clearly indicates the Avalonia type.

## Notes

- The xref index is large. Focus on Class, Interface, Enum, and Delegate `apiKind` entries for the main linking pass.
- Some API pages may not have meaningful doc counterparts. That is expected for internal or less-documented types.
- If `$ARGUMENTS` specifies a topic rather than a path, use Grep to find all related doc pages before scanning.
- After making changes, consider running `/docs-style-lint` on modified doc files to ensure compliance with house style rules.
- This skill is designed to be run incrementally. Running it on a subdirectory or single file is preferred over running on the entire docs tree, to keep changes reviewable.
