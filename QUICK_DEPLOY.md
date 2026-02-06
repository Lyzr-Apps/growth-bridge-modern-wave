# Quick Deployment Guide

## Fastest Deployment Method (Docker)

### 1. Build and Run with Docker Compose (ONE COMMAND)

```bash
docker-compose up -d
```

Application will be available at http://localhost:3333

### 2. Build and Run with Docker (TWO COMMANDS)

```bash
# Build
docker build -t linkedin-growth-agent .

# Run
docker run -d -p 3333:3333 --env-file .env.local --name linkedin-growth-agent linkedin-growth-agent
```

### 3. Run with Node.js Production Mode (TWO COMMANDS)

```bash
# Build (already done - skip if .next folder exists)
npm run build

# Start
npm start
```

Application runs on http://localhost:3333

---

## Deployment Script (Interactive)

```bash
./deploy.sh
```

This script will:
1. Check for .env.local
2. Build the application
3. Let you choose deployment method (npm/PM2/Docker)

---

## Stop the Application

**Docker Compose:**
```bash
docker-compose down
```

**Docker:**
```bash
docker stop linkedin-growth-agent
docker rm linkedin-growth-agent
```

**Node.js:**
Press Ctrl+C

**PM2:**
```bash
pm2 stop linkedin-growth-agent
```

---

## Deployment Status

- Build: READY (production build completed)
- Docker: READY (Dockerfile configured)
- Environment: READY (.env.local configured)
- Agents: OPERATIONAL (all 6 agents active)

---

## Access the Application

Once deployed, navigate to:
- Local: http://localhost:3333
- Production: http://your-domain.com:3333

Available features:
1. CV Analysis - Analyze CV vs LinkedIn profile
2. CV Updater - Update CV with AI and download PDF
3. Content Generator - Create 3 LinkedIn post variations
4. Quality Assurance - Review content quality
5. LinkedIn Achievement Poster - Create and publish posts
6. Complete Optimization - Full multi-agent workflow
