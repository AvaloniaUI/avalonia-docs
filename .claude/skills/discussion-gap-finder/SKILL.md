---
name: discussion-gap-finder
description: Analyzes GitHub discussion links to identify documentation gaps. Fetches the discussion, reviews questions and answers, searches existing docs for coverage, and recommends next steps (create new content, adjust existing content, or no action needed). Invoke with /discussion-gap-finder <github-discussion-url>.
user-invocable: true
---

# Discussion Gap Finder

Analyze a GitHub discussion to determine whether the Avalonia documentation adequately covers the topic raised. Produce a clear recommendation with actionable next steps.

## Inputs

- `$ARGUMENTS`: A GitHub discussion URL (e.g., `https://github.com/AvaloniaUI/Avalonia/discussions/12345`)

## Workflow

### Step 1: Fetch the discussion

Use WebFetch to navigate to the GitHub discussion URL and extract all content. Pass the discussion URL directly and request full extraction of all questions, comments, replies, code samples, and metadata.

```
WebFetch(url: $ARGUMENTS, prompt: "Extract the full discussion content including:
1. The discussion title
2. The original question/body (complete text, do not summarize)
3. The category and any labels
4. ALL comments and replies with author usernames, in full (do not summarize)
5. Whether any comment is marked as the accepted answer
6. Any code samples included in questions or answers (reproduce them exactly)
7. Upvote count if visible")
```

Record:
- **Discussion title**
- **Original question** (the body)
- **Category and labels**
- **All comments and replies**, noting which (if any) is marked as the accepted answer
- **Core topic(s)**: Identify the 1-3 primary technical topics the user is asking about

### Step 2: Classify the user's question

Determine what type of documentation would address the question:

| Question pattern | Doc type needed |
|---|---|
| "How do I...?" | how-to guide |
| "What is...?" / "Why does...?" | explanation or overview |
| "What are the properties/methods of...?" | reference |
| Step-by-step learning request | tutorial |
| "It doesn't work" / error messages | troubleshooting |
| "How to upgrade from...?" | migration guide |

Also note:
- **Complexity level**: Is this a beginner, intermediate, or advanced topic?
- **Specificity**: Is the question about a general concept or a very specific edge case?

### Step 3: Search existing documentation

Search the docs directory thoroughly for coverage of the identified topics.

1. **Keyword search**: Use Grep to search for key terms from the discussion across all `.md` and `.mdx` files in the `docs/` directory.

2. **Structural search**: Use Glob to find files in relevant directories that might cover the topic by name/path.

3. **Sidebar check**: Check `sidebars.js` or sidebar configuration to see if there is a logical place where this topic should live.

4. **Read candidate pages**: For each potentially relevant doc page found, read it and assess:
   - Does it cover the specific question asked?
   - Is the coverage sufficient, or only a brief mention?
   - Is the information accurate and up to date?
   - Would a user with this question find this page via navigation or search?

Record all relevant pages found with a brief note on their coverage level:
- **Full coverage**: The page directly and thoroughly answers the question
- **Partial coverage**: The page touches on the topic but lacks detail or specificity
- **Tangential**: The page is related but does not address the specific question
- **Missing**: No documentation found for this topic

### Step 4: Evaluate answer quality in the discussion

Review the responses in the discussion:

- Was an accepted answer provided?
- Did a maintainer or knowledgeable community member provide a solution?
- Does the answer contain code samples, workarounds, or explanations that should be in the docs?
- Does the answer reference documentation? If so, was the user able to find it themselves?
- Does the answer correct a misconception that suggests the docs are misleading?

### Step 5: Make a recommendation

Based on the analysis, classify the finding into one of these categories:

#### Category A: Create new content
Use when the topic has no meaningful documentation coverage and the question represents a legitimate user need (not an extreme edge case).

Specify:
- **Recommended doc type** (how-to, explanation, reference, tutorial, troubleshooting)
- **Suggested title**
- **Suggested location** in the docs directory structure
- **Key points to cover** (derived from the discussion Q&A)
- **Priority** (high: common question with no docs; medium: useful but niche; low: edge case)

#### Category B: Adjust existing content
Use when documentation exists but is incomplete, unclear, misleading, or hard to find.

Specify:
- **File(s) to modify** (exact paths)
- **What to add or change** (specific sections, examples, clarifications)
- **Why the current content falls short** (missing detail, unclear wording, buried information, missing cross-links)
- **Priority** (high: actively misleading or missing critical info; medium: could be clearer; low: minor improvement)

#### Category C: Improve discoverability
Use when the documentation exists and is adequate, but the user clearly could not find it.

Specify:
- **Existing page(s)** that answer the question
- **Discoverability issues** (poor title, missing from sidebar, no cross-links from related pages, missing keywords for search)
- **Suggested improvements** (rename, add cross-links, add to sidebar, improve SEO metadata)

#### Category D: No action needed
Use when:
- The documentation adequately covers the topic AND is reasonably discoverable
- The question stems from the user not reading available docs
- The question is about an extreme edge case not worth documenting
- The question is about third-party tools/libraries outside Avalonia's doc scope

Specify:
- **Existing page(s)** that answer the question (with paths)
- **Why no action is needed**

### Step 6: Generate report

Output a structured report:

```
## Discussion Gap Analysis

**Discussion**: [title](url)
**Category**: [category name]
**Date analyzed**: [today's date]

### Discussion summary
[2-3 sentence summary of what the user asked and what answers were provided]

### Core topics
- [topic 1]
- [topic 2]

### Documentation coverage

| Topic | Coverage | Relevant page(s) |
|---|---|---|
| [topic] | Full / Partial / Tangential / Missing | [file path or "None"] |

### Recommendation: [Category A/B/C/D] - [short label]

[Details specific to the category, as specified in Step 5]

### Suggested action items
- [ ] [Specific actionable task 1]
- [ ] [Specific actionable task 2]
- [ ] [Specific actionable task 3]
```

### Step 7: Execute changes

After presenting the report, immediately proceed with the recommended changes (do not wait for the user to confirm):

- **For new content (Category A)**: Draft the new page following the appropriate template from the docs-style-lint skill's page-templates.yaml.

- **For content adjustments (Category B)**: Make the edits to existing files.

- **For discoverability improvements (Category C)**: Make the suggested changes (sidebar updates, cross-links, metadata).

- **For no action (Category D)**: No changes needed. Optionally suggest a response to post in the discussion pointing the user to the relevant docs. Skip Steps 8 and 9.

### Step 8: Lint all modified files

After making changes, invoke the `docs-style-lint` skill on **every** new or modified file:

```
/docs-style-lint [path-to-file]
```

Collect all lint findings across all files before proceeding.

### Step 9: Auto-fix lint issues

After linting, automatically fix every issue found:

1. **Blockers**: Fix immediately. These are non-negotiable (e.g., missing code block language tags, em/en dashes, generic link labels, duplicate H1 headings).
2. **Major issues**: Fix all of them (e.g., missing backticks on identifiers, sentence case headings, missing `doc-type` frontmatter, terminology violations).
3. **Minor issues**: Fix them if the fix is straightforward (e.g., long intro, missing alt text, title length, intensifier words).

Apply fixes directly using the Edit tool. Do not ask the user whether to fix them.

After fixing, re-run `/docs-style-lint` on each fixed file to confirm all issues are resolved. Repeat until every file passes clean (no blockers, no major issues).

## Notes

- When parsing the GitHub URL, handle both `github.com` and variations (trailing slashes, query parameters, etc.)
- If WebFetch fails to retrieve the discussion, report the error clearly and ask the user to provide the discussion content manually
- Focus on actionable recommendations, not just analysis
- When multiple topics are raised in a single discussion, assess each independently
- Consider the discussion's upvotes/reactions as a signal of how many users face this issue
- If the discussion references a specific Avalonia version, note whether the docs cover that version
