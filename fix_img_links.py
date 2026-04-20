#!/usr/bin/env python3
"""
Script to replace <img src={Var} ...> patterns with <Image light={Var} ...> components.
"""
import re
import os
import glob

def fix_img_tags(content):
    """Replace <img src={...}> with <Image light={...}> format."""

    # Pattern 1: <p><img src={Var} className="..." alt="..." /></p>
    def p_img_with_class_and_alt(m):
        var = m.group(1)
        alt = m.group(2)
        return f'<Image light={{{var}}} alt="{alt}" position="center" maxWidth={{400}} cornerRadius="true"/>'

    content = re.sub(
        r'<p><img src=\{(\w+)\}\s+className="[^"]*"\s+alt="([^"]*)"\s*/></p>',
        p_img_with_class_and_alt,
        content
    )

    # Pattern 2: <p><img src={Var} className="..." /></p> (no alt)
    def p_img_with_class_no_alt(m):
        var = m.group(1)
        return f'<Image light={{{var}}} position="center" maxWidth={{400}} cornerRadius="true"/>'

    content = re.sub(
        r'<p><img src=\{(\w+)\}\s+className="[^"]*"\s*/></p>',
        p_img_with_class_no_alt,
        content
    )

    # Pattern 3: standalone <img src={Var} alt="..." /> (double quotes, optional width, optional space before />)
    # NOT inside a table cell (no preceding |)
    def img_with_alt(m):
        var = m.group(1)
        alt = m.group(2)
        return f'<Image light={{{var}}} alt="{alt}" position="center" maxWidth={{400}} cornerRadius="true"/>'

    # Standalone images (not in table cells) - double-quoted alt
    content = re.sub(
        r'^(<img src=\{(\w+)\}\s+alt="([^"]*)"\s*(?:width="\d+"\s*)?/>)',
        lambda m: f'<Image light={{{m.group(2)}}} alt="{m.group(3)}" position="center" maxWidth={{400}} cornerRadius="true"/>',
        content,
        flags=re.MULTILINE
    )

    # Standalone images - single-quoted alt
    content = re.sub(
        r'^(<img src=\{(\w+)\}\s+alt=\'([^\']*)\'\s*(?:width=\'\d+\'\s*)?/>)',
        lambda m: f'<Image light={{{m.group(2)}}} alt="{m.group(3)}" position="center" maxWidth={{400}} cornerRadius="true"/>',
        content,
        flags=re.MULTILINE
    )

    # Standalone images with empty double-quoted alt
    content = re.sub(
        r'^(<img src=\{(\w+)\}\s+alt=""\s*(?:width="\d+"\s*)?/>)',
        lambda m: f'<Image light={{{m.group(2)}}} position="center" maxWidth={{400}} cornerRadius="true"/>',
        content,
        flags=re.MULTILINE
    )

    # Remaining: <img src={Var} alt="..." /> (any position, no preceding table pipe)
    content = re.sub(
        r'(?<!\|)<img src=\{(\w+)\}\s+alt="([^"]*)"\s*(?:width="\d+"\s*)?/>(?!\s*\|)',
        lambda m: f'<Image light={{{m.group(1)}}} alt="{m.group(2)}" position="center" maxWidth={{400}} cornerRadius="true"/>',
        content
    )

    # Remaining single-quote alt
    content = re.sub(
        r'(?<!\|)<img src=\{(\w+)\}\s+alt=\'([^\']*)\'\s*(?:width="\d+"\s*)?/>(?!\s*\|)',
        lambda m: f'<Image light={{{m.group(1)}}} alt="{m.group(2)}" position="center" maxWidth={{400}} cornerRadius="true"/>',
        content
    )

    return content

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        original = f.read()

    updated = fix_img_tags(original)

    if updated != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(updated)
        return True
    return False

def main():
    base = '/Users/yiuluke/Documents/GitHub/avalonia-docs'
    patterns = ['**/*.md', '**/*.mdx']

    changed = []
    for pattern in patterns:
        for filepath in glob.glob(os.path.join(base, pattern), recursive=True):
            if 'node_modules' in filepath or 'fix_img_links.py' in filepath:
                continue
            if process_file(filepath):
                changed.append(filepath.replace(base + '/', ''))

    print(f"Modified {len(changed)} files:")
    for f in sorted(changed):
        print(f"  {f}")

if __name__ == '__main__':
    main()
