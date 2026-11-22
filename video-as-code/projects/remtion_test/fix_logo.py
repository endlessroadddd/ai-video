import re

# Read full path d
with open('public/logo-path-d.txt', 'r', encoding='utf-8') as f:
    full_d = f.read().strip()

# Read current Composition.tsx
with open('src/Composition.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the incomplete path d with the full one
# Pattern: d="..." inside LogoMark component
new_content = re.sub(
    r'(const LogoMark.*?<path\s+fill="white"\s+d=")([^"]*)(".*?\);)',
    lambda m: m.group(1) + full_d + m.group(3),
    content,
    flags=re.DOTALL
)

if new_content == content:
    print('Pattern not matched, trying alternate approach')
    # Try simpler replacement: find d="M97.2954..." and replace everything inside quotes
    new_content = re.sub(
        r'd="M97\.2954[^"]*"',
        'd="' + full_d + '"',
        content
    )

with open('src/Composition.tsx', 'w', encoding='utf-8') as f:
    f.write(new_content)

print('Done. Full d length:', len(full_d))
