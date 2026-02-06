#!/bin/bash

echo "LinkedIn Growth & Career Agent - Deployment Script"
echo "=================================================="

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "Error: .env.local file not found"
    echo "Please create .env.local with required environment variables"
    exit 1
fi

# Build the application
echo "Building application..."
npm run build

if [ $? -ne 0 ]; then
    echo "Build failed. Please fix errors and try again."
    exit 1
fi

echo ""
echo "Build successful!"
echo ""
echo "Choose deployment method:"
echo "1. Start with npm (production mode)"
echo "2. Start with PM2 (process manager)"
echo "3. Build Docker image"
echo ""
read -p "Enter choice (1-3): " choice

case $choice in
    1)
        echo "Starting with npm..."
        npm start
        ;;
    2)
        echo "Starting with PM2..."
        if ! command -v pm2 &> /dev/null; then
            echo "PM2 not found. Installing..."
            npm install -g pm2
        fi
        pm2 start ecosystem.config.js
        pm2 save
        echo ""
        echo "Application started with PM2"
        echo "View logs: pm2 logs linkedin-growth-agent"
        echo "Stop app: pm2 stop linkedin-growth-agent"
        ;;
    3)
        echo "Building Docker image..."
        docker build -t linkedin-growth-agent .
        echo ""
        echo "Docker image built successfully"
        echo "Run with: docker run -d -p 3333:3333 --env-file .env.local --name linkedin-growth-agent linkedin-growth-agent"
        ;;
    *)
        echo "Invalid choice"
        exit 1
        ;;
esac
