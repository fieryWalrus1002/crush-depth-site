#!/bin/bash

echo "💣 STARTING DEPLOYMENT..."

# 1. Remove the Development Shortcut
rm content

# 2. Create a real folder
mkdir content

# 3. Copy the REAL files in
echo "Copying files from workspace..."
cp -r ../crush-depth/content/* content/

# 4. Send to GitHub
echo "Sending to GitHub..."
npx quartz sync --no-pull

# 5. Clean up and Restore Shortcut
echo "Cleaning up..."
rm -rf content

# Point the shortcut directly to the inner content folder
ln -s ../crush-depth/content content

echo "DONE! Site updated."