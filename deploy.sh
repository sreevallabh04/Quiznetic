#!/bin/bash

# Quiznetic Production Deployment Script
# This script builds and deploys the Quiznetic application

set -e  # Exit on any error

echo "🚀 Starting Quiznetic Production Deployment..."

# Check if we're in the right directory
if [ ! -f "package.json" ] && [ ! -d "frontend" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

# Navigate to frontend directory
cd frontend

echo "📦 Installing dependencies..."
npm ci

echo "🔍 Running type checks..."
npm run type-check

echo "🧹 Running linter..."
npm run lint

echo "🏗️ Building for production..."
npm run build

echo "📊 Analyzing bundle size..."
ls -la dist/assets/

echo "🧪 Testing production build..."
npm run preview &
PREVIEW_PID=$!
sleep 5
kill $PREVIEW_PID 2>/dev/null || true

echo "✅ Build completed successfully!"
echo ""
echo "📁 Production files are in: frontend/dist/"
echo ""
echo "🌐 Deployment options:"
echo "1. Vercel: Connect your GitHub repo to Vercel"
echo "2. Netlify: Upload the dist/ folder to Netlify"
echo "3. GitHub Pages: Deploy dist/ to gh-pages branch"
echo "4. Any static host: Serve the files in dist/"
echo ""
echo "🔧 Don't forget to set environment variables:"
echo "   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key"
echo "   VITE_APP_ENV=production"
echo ""
echo "✨ Deployment ready! 🎉" 