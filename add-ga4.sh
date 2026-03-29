#!/bin/bash

# GA4 tracking code to insert
GA4_CODE='<script async src="https://www.googletagmanager.com/gtag/js?id=G-WRGP1Q45MN"></script>\n<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag("js",new Date());gtag("config","G-WRGP1Q45MN");</script>'

# Find all HTML files without GA4 tag
for file in $(find . -name "*.html" -type f ! -path "./.git/*"); do
    # Check if file already has gtag
    if ! grep -q "gtag" "$file"; then
        echo "Adding GA4 to: $file"
        # Insert GA4 code before </head>
        sed -i "s|</head>|$GA4_CODE\n</head>|" "$file"
    fi
done

echo "Done!"
