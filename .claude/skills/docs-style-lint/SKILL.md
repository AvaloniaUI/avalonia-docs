---
name: docs-style-lint
description: Reviews and lints Avalonia documentation pages against house style rules. Use when reviewing, editing, or writing documentation to ensure consistency with established patterns. Checks structure, voice, terminology, formatting, and linking.
---

# Avalonia Docs Style Lint

Review documentation pages against Avalonia's house style rules derived from corpus analysis of professional .NET framework documentation, adapted for Avalonia's Docusaurus-based site.

## When to use

- Reviewing a documentation page before publishing
- Writing new documentation content
- Editing or improving existing pages
- Auditing a section for style consistency

## Inputs

- `$ARGUMENTS`: Path to the file(s) to lint, or "all" to scan changed files

## Workflow

### Step 1: Identify page type

Read the target file and classify it as one of the page archetypes defined in [page-templates.yaml](references/page-templates.yaml):

| Type | Signal |
|------|--------|
| tutorial | Title contains "Tutorial:" or file is under `get-started/`, step-by-step build |
| how-to | Title starts with "How to" or file focuses on a single bounded task |
| overview | Introduces a topic area, orients and links |
| conceptual | Explains model, behavior, or architecture in depth |
| reference | Precise syntax/semantics definitions, API-like |
| troubleshooting | Problem-first with remediation |
| migration | Upgrade/breaking-change guidance |
| release-notes | Version change summaries |

### Step 2: Run structural checks

Apply rules from [house-rules.yaml](references/house-rules.yaml) that match the page type scope.

**Blocker-level checks (must pass):**

1. **STR-001**: Exactly one H1 heading (Docusaurus renders frontmatter `title` as H1, so an explicit `#` heading in the body is not required — count the frontmatter title as the H1)
2. **STR-003**: Tutorials have `## Prerequisites` before first procedure
3. **MIC-003**: All fenced code blocks specify a language tag
4. **LINK-001**: No generic link labels (`click here`, `here`, `this link`)
5. **QUAL-001**: Tutorials include an outcome verification section

**Major-level checks (should pass; justify exceptions):**

6. **STR-002**: Headings use sentence case (>= 80% for new/edited pages)
7. **STR-005**: Page ends with `## See also` or `## Related content` or similar navigation handoff
8. **VOI-001**: Task pages use direct `you`/`your` address
9. **VOI-002**: Minimal `we`/`our`/`us` usage (< 1 per 1,000 words)
10. **MIC-001**: UI labels and menu paths in **bold**
11. **MIC-002**: Code identifiers and API literals in `backticks`
12. **MIC-004**: Admonitions use approved Docusaurus types only: `:::note`, `:::tip`, `:::info`, `:::caution`, `:::danger`
13. **TERM-002**: Use `control` not `widget` for UI components

**Minor-level checks (style drift warnings):**

14. **VOI-003**: Intensifiers (`simply`, `obviously`, `just`) are rare (< 1 per 1,000 words)
15. **MIC-005**: Keyboard shortcuts use `<kbd>` tags with platform-native symbols (e.g., `<kbd>⌘</kbd> <kbd>S</kbd>` not plain text "Cmd+S")
16. **STR-009**: Intro before first H2 is <= 150 words

### Step 3: Run terminology checks

Cross-reference against [terminology-map.yaml](references/terminology-map.yaml):

- Verify canonical terms are used (not forbidden synonyms)
- Check first-use acronym expansion (TERM-001)
- Verify `must` vs `should` usage matches intent (TERM-003)

### Step 4: Run template compliance

Compare page structure against the expected archetype from [page-templates.yaml](references/page-templates.yaml):

- Check required sections are present and in order
- Flag missing optional sections that would improve the page
- Verify ordering rules (e.g., prerequisites before procedure)

### Step 5: Check banned phrases

Flag any use of:

| Banned | Replacement |
|--------|-------------|
| "Simply" / "Just" | Remove or rewrite without |
| "Obviously" / "Clearly" | Remove |
| "Easy" / "Straightforward" | Remove |
| "As you know" | Remove |
| "Etc." | List items or use "and similar" |
| "Various" / "Several" | Give count or list |
| "In order to" | "To" |
| "It should be noted that" | State fact directly |
| "Refer to the documentation" | Link to specific page |

### Step 6: Generate report

Output a structured lint report:

```
## Style Lint Report: [filename]

**Page type**: [detected type]
**Score**: [PASS / FAIL with score]

### Blockers (must fix)
- [rule-id]: [description of issue] (line X)

### Major issues (should fix)
- [rule-id]: [description] (line X)

### Minor issues (consider fixing)
- [rule-id]: [description] (line X)

### Template compliance
- Required sections: [present/missing list]
- Section order: [correct/issues]

### Summary
[1-2 sentence overall assessment with priority fixes]
```

## Severity definitions

- **Blocker**: Must fix before publishing. Page cannot ship with these issues.
- **Major**: Should fix; document exceptions if skipped. These affect consistency and readability.
- **Minor**: Style drift warning. Fix opportunistically.

## Avalonia-specific conventions

These override or extend the base rules for Avalonia's Docusaurus site:

### Frontmatter
Avalonia docs use simple frontmatter:
```yaml
---
id: page-id
title: Page Title
---
```

### Admonitions
Use Docusaurus syntax, not Microsoft `> [!NOTE]` syntax:
```markdown
:::note
Content here.
:::

:::tip
Content here.
:::

:::info
Content here.
:::

:::caution
Content here.
:::

:::danger
Content here.
:::
```

### Code blocks
- XAML uses `xml` language tag (Avalonia AXAML is XML-based)
- C# uses `csharp` language tag
- F# uses `fsharp` language tag
- Always include a language tag on fenced code blocks

### Terminology
- Use "Avalonia" not "Avalonia UI" in body text (except for trademark/legal contexts)
- Use "AXAML" when referring to Avalonia's XAML file extension specifically
- Use "XAML" when referring to the markup language itself
- Use `control` for UI components (never `widget`)
- Use `StyledProperty` / `DirectProperty` / `AttachedProperty` for Avalonia property types
- Use `AvaloniaProperty` as the base property type
- Use "view model" (two words) not "viewmodel"

### Cross-linking
- Use relative paths: `[Data binding](../data-binding/introduction-to-data-binding.md)`
- No xref links (those are Microsoft docs specific)
- Verify link targets exist in the repository

### Italics for defined terms
On first use of a new term, italicize it:
```markdown
A *styled property* is a property backed by Avalonia's property system.
```
