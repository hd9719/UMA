# Render.com Build Script
# This script runs during deployment on Render

echo "Installing dependencies..."
npm install

echo "Initializing database..."
npm run init-db

echo "Build complete!"
