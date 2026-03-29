#!/usr/bin/env python3

import os
import re
from pathlib import Path

GA4_CODE = '''<script async src="https://www.googletagmanager.com/gtag/js?id=G-WRGP1Q45MN"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag("js",new Date());gtag("config","G-WRGP1Q45MN");</script>
'''

def add_ga4_to_file(filepath):
    """Add GA4 tracking code to HTML file if not already present."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check if gtag already exists
    if 'gtag' in content:
        return False
    
    # Find </head> and insert GA4 code before it
    if '</head>' in content:
        content = content.replace('</head>', f'{GA4_CODE}</head>')
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    
    return False

def main():
    # Find all HTML files
    html_files = list(Path('.').rglob('*.html'))
    
    added_count = 0
    for filepath in html_files:
        # Skip .git directory
        if '.git' in str(filepath):
            continue
        
        if add_ga4_to_file(filepath):
            print(f"✅ Added GA4 to: {filepath}")
            added_count += 1
    
    print(f"\n✅ Complete! Added GA4 to {added_count} files.")

if __name__ == '__main__':
    main()
