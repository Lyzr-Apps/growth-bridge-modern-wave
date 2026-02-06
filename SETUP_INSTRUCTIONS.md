# LinkedIn Growth & Career Agent - Setup Instructions

## Issue Encountered

The application is fully developed with all features implemented:
- ✅ CV Updater Agent with PDF generation
- ✅ LinkedIn Achievement Poster Agent with OAuth integration
- ✅ Complete UI with all sections
- ✅ Response schemas for all agents
- ✅ Workflow configuration

However, there's a current npm installation issue preventing the `jspdf` package from being installed.

## Current Error

```
Module not found: Can't resolve 'jspdf'
```

This occurs because jsPDF is listed in package.json but not installed in node_modules due to an npm/Node.js compatibility issue with minizlib.

## Solution Options

### Option 1: Use Docker (Recommended)

Create a `Dockerfile` with a stable Node environment:

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "start"]
```

Then run:
```bash
docker build -t linkedin-growth-agent .
docker run -p 3333:3333 linkedin-growth-agent
```

### Option 2: Use nvm to switch Node versions

```bash
# Install nvm if not already installed
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Install and use Node 20 LTS
nvm install 20
nvm use 20

# Clean install
rm -rf node_modules package-lock.json
npm install
```

### Option 3: Manual jsPDF Installation

If npm continues to fail, you can manually add jsPDF:

```bash
# Download jsPDF directly
mkdir -p node_modules/jspdf
cd node_modules/jspdf
curl -L https://github.com/parallax/jsPDF/releases/download/v2.5.2/jspdf.umd.min.js -o dist.min.js
```

## Verification

Once dependencies are installed, verify the build:

```bash
npm run build
```

The build should complete successfully without errors.

## Running the Application

```bash
npm run dev
```

Access the application at http://localhost:3333

## Features Available

1. **CV Analysis** - Compare CV with LinkedIn profile
2. **CV Updater** - Update CV with text prompts and download PDF
3. **Content Generator** - Create LinkedIn posts in 3 variations
4. **Quality Assurance** - Review content for quality and SEO
5. **LinkedIn Achievement Poster** - Create and publish achievements to LinkedIn
6. **Complete Optimization** - Full workflow coordination via Growth Manager

## Agent IDs

All agents are already created and configured:

- CV Analysis: `69858230a051b79c1135a076`
- Content Generator: `6985825d382ef8715224cf07`
- Quality Assurance: `698582830ee88347863f0706`
- Growth Manager: `698582abb90162af337b1dfd`
- CV Updater: `69858af22237a2c55706b059`
- LinkedIn Achievement Poster: `69858af2a791e6e318b8deb5`

## Color Scheme

- Primary: Blue (#3B82F6 / rgb(59, 130, 246))
- Background: White
- No emojis - only lucide-react icons
