#!/bin/bash
# Fix nested anchor tags in all TSX files

for file in client/src/pages/*.tsx; do
  echo "Processing $file..."
  # Replace <Link><a> patterns with <Link><span>
  sed -i 's/<Link \([^>]*\)><a className="\([^"]*\)">\([^<]*\)<\/a><\/Link>/<Link \1><span className="\2 cursor-pointer">\3<\/span><\/Link>/g' "$file"
done

echo "Done!"
