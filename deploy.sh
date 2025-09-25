#!/bin/bash
# File to automate deployments to GitHub Pages

# Name of the project/repo to deploy
PROJECT_NAME="strava-app"

# Clean dist folder
rm -rf dist/

# Build the project with a dummy href base
ng build --base-href=/RomezVz/

# Index path within dist
INDEX_PATH="dist/$PROJECT_NAME/browser/index.html"

# Fix the base href in index.html
sed -i 's|<base href="[^"]*"|<base href="/'"$PROJECT_NAME"'/\"|' "$INDEX_PATH"

# Deploy to GitHub Pages
npx angular-cli-ghpages --dir=dist/$PROJECT_NAME/browser

# Final URL of the site
URL="https://romezvz.github.io/$PROJECT_NAME/"

echo ""
echo "✅ Deploy completed in:"
echo "$URL"