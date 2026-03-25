---
name: docs-style-lint
description: Reviews and lints Avalonia documentation pages against house style rules, content boundaries, anti-marketing standards, accessibility, and SEO. Use when reviewing, editing, or writing documentation to ensure consistency with established patterns. Checks structure, voice, terminology, formatting, linking, tone, Diataxis compliance, image accessibility, meta descriptions, and jargon simplification.
---

# Avalonia Docs Style Lint

Review documentation pages against Avalonia's house style rules derived from corpus analysis of professional .NET framework documentation, adapted for Avalonia's Docusaurus-based site.

## Diataxis as invisible discipline

Diataxis is an editorial QA layer, not a navigation structure. The visible site structure follows product domains and user journeys (Getting Started, Controls, Styling, Layout, Binding, MVVM). Each page declares a `doc-type` in frontmatter, and that type constrains what content is allowed and forbidden. This prevents the "duplication swamp" where every page re-explains everything. If `doc-type` is present, use it. If absent, infer the type and flag BOUND-005.

Diataxis defines exactly four canonical types (tutorial, how-to, reference, explanation) derived from two dimensions: action/cognition and acquisition/application. The Avalonia docs also use four project-specific types (overview, troubleshooting, release-notes, migration) that are specializations of the canonical four, not additional Diataxis categories.

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
| overview | Introduces a topic area, orients and links (lightweight explanation) |
| explanation | Explains model, behavior, or architecture in depth (answers "why?") |
| reference | Precise syntax/semantics definitions, API-like (describes the machinery) |
| troubleshooting | Problem-first with remediation (problem-scoped how-to) |
| migration | Upgrade/breaking-change guidance (version-scoped how-to) |
| release-notes | Version change summaries (version-scoped reference) |

If the page has a `doc-type` frontmatter field, use that value. If `doc-type` is absent, infer the type from the signals above and flag **BOUND-005**.

**Diataxis compass** (use when surface signals are ambiguous):

1. Does this content inform **action** (doing) or **cognition** (thinking)?
2. Does it serve **acquisition** (study/learning) or **application** (work/goals)?

| | Acquisition (study) | Application (work) |
|---|---|---|
| **Action** (doing) | tutorial | how-to |
| **Cognition** (thinking) | explanation | reference |

### Step 2: Run structural checks

Apply rules from [house-rules.yaml](references/house-rules.yaml) that match the page type scope.

**Blocker-level checks (must pass):**

1. **STR-001**: Exactly one H1 heading (Docusaurus renders frontmatter `title` as H1, so an explicit `#` heading in the body is not required; count the frontmatter title as the H1)
2. **STR-003**: Tutorials have `## Prerequisites` before first procedure
3. **MIC-003**: All fenced code blocks specify a language tag
4. **LINK-001**: No generic link labels (`click here`, `here`, `this link`)
5. **QUAL-001**: Tutorials include an outcome verification section
6. **MIC-006**: No em dashes or en dashes anywhere in the text

**Major-level checks (should pass; justify exceptions):**

7. **STR-002**: Headings use sentence case (>= 80% for new/edited pages)
8. **STR-005**: Page ends with `## See also` or `## Related content` or similar navigation handoff
9. **VOI-001**: Task pages use direct `you`/`your` address
10. **VOI-002**: Minimal `we`/`our`/`us` usage (< 1 per 1,000 words). **Exception**: tutorials use `we` to establish the instructor-learner bond (per Diataxis). VOI-002 does not apply to tutorials.
11. **MIC-001**: UI labels and menu paths in **bold**
12. **MIC-002**: Code identifiers and API literals in `backticks`
13. **MIC-004**: Admonitions use approved Docusaurus types only: `:::note`, `:::tip`, `:::info`, `:::caution`, `:::danger`
14. **TERM-002**: Use `control` not `widget` for UI components

**Minor-level checks (style drift warnings):**

15. **VOI-003**: Intensifiers (`simply`, `obviously`, `just`) are rare (< 1 per 1,000 words)
16. **MIC-005**: Keyboard shortcuts use `<kbd>` tags with platform-native symbols (e.g., `<kbd>⌘</kbd> <kbd>S</kbd>` not plain text "Cmd+S")
17. **STR-009**: Intro before first H2 is <= 150 words
18. **ACC-001**: All images have non-empty alt text (`![description](path)`, not `![](path)`)
19. **SEO-001**: Frontmatter `description` present, 50-160 characters, no marketing buzzwords
20. **SEO-002**: Frontmatter `title` is <= 60 characters
21. **QUAL-003**: On task pages (tutorial, how-to, troubleshooting, migration), average sentence length <= 25 words; flag individual sentences over 40 words
22. **QUAL-004**: ARI (Automated Readability Index) score <= 14 across all prose. Calculate using `4.71 × (characters ÷ words) + 0.5 × (words ÷ sentences) − 21.43`. Strip all fenced code blocks, inline code spans, frontmatter, and admonition markers before counting — measure prose only. Report score to one decimal place with the grade-level label (≤ 8 = high-school, 9–12 = standard adult, 13–14 = college, > 14 = graduate). Scores above 14 are a warning to simplify sentence structure and word choice.

### Step 3: Run anti-marketing checks

Apply tone rules from [house-rules.yaml](references/house-rules.yaml). Documentation must never read like marketing copy.

**Blocker-level:**

1. **TONE-001**: Scan for banned marketing buzzwords (powerful, seamless, elegant, best-in-class, world-class, cutting-edge, game-changing, leverage, unlock, empower, delightful, blazing fast, robust, state-of-the-art, next-generation, revolutionary, groundbreaking, innovative). Context-dependent terms (leverage, unlock, robust, innovative) are flagged as candidates for reviewer judgment. See [terminology-map.yaml](references/terminology-map.yaml) for replacements.
2. **TONE-002**: Flag unsupported superlatives (the fastest, the most, the best, the only, unmatched, unparalleled). Pass only if measurable evidence appears in the same sentence or paragraph.

**Major-level:**

3. **TONE-003**: Flag promotional framing. Pages should describe what a feature does, not why the reader should be excited about it.
4. **TONE-004**: Flag vague future promises. Any future-tense claim must include a version number, issue link, or timeline.

### Step 4: Run terminology checks

Cross-reference against [terminology-map.yaml](references/terminology-map.yaml):

- Verify canonical terms are used (not forbidden synonyms)
- Check first-use acronym expansion (TERM-001)
- Verify `must` vs `should` usage matches intent (TERM-003)
- Check for forbidden marketing terms and suggest replacements
- **TERM-004**: On introductory pages (tutorials, overviews), verify that Avalonia-specific jargon (visual tree, logical tree, data template, control theme, style selector, binding expression, value converter, content presenter, items presenter, template part, pseudo-class) is explained inline or linked on first use. See `framework_jargon` in [terminology-map.yaml](references/terminology-map.yaml) for definitions and link targets.

### Step 5: Run content boundary checks

Apply content boundary rules using the page's declared (or inferred) doc-type and the `forbidden_content` and `content_boundaries` fields in [page-templates.yaml](references/page-templates.yaml).

1. **BOUND-001**: Verify the page serves a single Diataxis responsibility. Flag if content substantially overlaps another doc-type.
2. **BOUND-002**: Check the page does not contain content listed in its template's `forbidden_content`. Forbidden content should be linked to the appropriate page type, not duplicated.
3. **BOUND-003**: If the page lists more than 3 properties or API members of a single type inline, flag it and recommend linking to the reference page instead.
4. **BOUND-004**: For explanation pages, flag any numbered procedural sequence longer than 3 steps. Recommend linking to a how-to or tutorial instead.
5. **BOUND-005**: Verify frontmatter includes a `doc-type` field with a valid value (`tutorial`, `how-to`, `explanation`, `overview`, `reference`, `troubleshooting`, `release-notes`, `migration`).

### Step 6: Run template compliance

Compare page structure against the expected archetype from [page-templates.yaml](references/page-templates.yaml):

- Check required sections are present and in order
- Flag missing optional sections that would improve the page
- Verify ordering rules (e.g., prerequisites before procedure)

### Step 7: Check banned phrases

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
| Em dash (—) | Comma, colon, parentheses, or separate sentence |
| En dash (–) | Hyphen or "to" for ranges |
| "Powerful" | State the specific capability |
| "Seamless" | Describe the integration concretely |
| "Cutting-edge" / "State-of-the-art" | Remove, or name the technology |
| "Leverage" | "Use" or "apply" |
| "Unlock" | "Enable" or "allow" |
| "Robust" | Describe the specific reliability characteristic |
| "Game-changing" / "Revolutionary" | Describe the concrete improvement |

### Step 8: Run inclusive language checks

Apply inclusive language rules from [house-rules.yaml](references/house-rules.yaml).

**Major-level:**

1. **INC-001**: Scan for gendered pronouns used generically (`he`/`she`/`him`/`her`/`his`/`hers` referring to an unspecified person or the reader) and gendered nouns (`guys` as a group address, `mankind`, `manmade`, `man-hours`). Suggest `they`/`them`/`their`, `everyone`, `humankind`, `human-made`, `person-hours`. Flag singular pronoun uses as candidates — distinguish generic use from a named individual (manual review).
2. **INC-002**: Scan for legacy technical terms with exclusionary connotations: `blacklist`/`whitelist` → `blocklist`/`allowlist`; `master`/`slave` in role contexts → `primary`/`replica`; `sanity check` → `verify` or `check`; `dummy` as placeholder data → `placeholder`/`sample`/`stub`. Context-sensitive uses (e.g. `master` in a git command literal, established API names like `MasterDetail`) require human review before flagging.

### Step 9: Generate report

Output a structured lint report:

```
## Style Lint Report: [filename]

**Page type**: [detected type]
**doc-type frontmatter**: [present/absent]
**Score**: [PASS / FAIL with score]

### Blockers (must fix)
- [rule-id]: [description of issue] (line X)

### Major issues (should fix)
- [rule-id]: [description] (line X)

### Minor issues (consider fixing)
- [rule-id]: [description] (line X)

### Anti-marketing compliance
- [TONE rule findings or "Clean"]

### Content boundary compliance
- [BOUND rule findings or "Clean"]
- Declared doc-type: [type]
- Forbidden content detected: [none / list]
- Single responsibility: [pass / concern]

### Inclusive language
- INC-001 (gender-neutral language): [pass / N findings]
- INC-002 (inclusive terminology): [pass / N findings]

### Readability
- QUAL-004 (ARI score): [X.X — grade label (pass / warning: above 14)]

### Accessibility & SEO
- ACC-001 (image alt text): [pass / N findings]
- SEO-001 (meta description): [pass / missing / too short / too long / contains buzzwords]
- SEO-002 (title length): [pass / X characters (over 60)]

### Template compliance
- Required sections: [present/missing list]
- Section order: [correct/issues]

### Suggested fixes
For each flagged issue, provide a structured fix suggestion:

- **[rule-id]** (line X):
  - Original: `[exact text from the page]`
  - Suggested: `[corrected text]`
  - Explanation: [why the change is needed]

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
Avalonia docs use simple frontmatter with `doc-type` and `description` fields:
```yaml
---
id: page-id
title: Page Title
description: A concise summary for search engines and social cards (50-160 characters).
doc-type: how-to
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
