import re

with open('public/logo-mark-white.svg', 'r', encoding='utf-8') as f:
    content = f.read()

match = re.search(r'<path fill="white" d="([^"]+)"', content)
if match:
    with open('public/logo-path-d.txt', 'w', encoding='utf-8') as out:
        out.write(match.group(1))
    print('Extracted', len(match.group(1)), 'chars')
else:
    print('No match found')
