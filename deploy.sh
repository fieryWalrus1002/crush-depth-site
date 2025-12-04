#!/bin/bash

echo "💣 STARTING DEPLOYMENT..."

# 1. Remove the Development Shortcut
rm content

# 2. Copy the REAL files in
echo "Copying files from workspace..."
cp -r ../crush-depth content

# 3. Send to GitHub
echo "Sending to GitHub..."
npx quartz sync --no-pull

# 4. Clean up and Restore Shortcut
echo "Cleaning up..."
rm -rf content
ln -s ../crush-depth content

echo "DONE! Site updated."