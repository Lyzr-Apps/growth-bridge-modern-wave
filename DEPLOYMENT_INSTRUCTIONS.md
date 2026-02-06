# LinkedIn Growth & Career Agent - Deployment Instructions

## Quick Deployment (Docker - RECOMMENDED)

### Prerequisites
- Docker and Docker Compose installed
- `.env.local` file with required environment variables

### Deploy in 3 Commands

```bash
# 1. Build the Docker image
docker-compose build

# 2. Start the application
docker-compose up -d

# 3. Access the application
# Open http://localhost:3333
```

### Stop the Application
```bash
docker-compose down
```

### View Logs
```bash
docker-compose logs -f
```

---

## Alternative Deployment Options

### Option 1: Standalone Docker Build

```bash
# Build the image
docker build -t linkedin-growth-agent .

# Run the container
docker run -d \
  -p 3333:3333 \
  --env-file .env.local \
  --name linkedin-growth-agent \
  linkedin-growth-agent

# View logs
docker logs -f linkedin-growth-agent

# Stop the container
docker stop linkedin-growth-agent
docker rm linkedin-growth-agent
```

### Option 2: Node.js Production Build

```bash
# Build the application
npm run build

# Start in production mode
npm start

# Application runs on http://localhost:3333
```

### Option 3: PM2 Process Manager

```bash
# Install PM2 globally
npm install -g pm2

# Build the application
npm run build

# Start with PM2
pm2 start npm --name "linkedin-growth-agent" -- start

# View logs
pm2 logs linkedin-growth-agent

# Stop the application
pm2 stop linkedin-growth-agent

# Restart
pm2 restart linkedin-growth-agent
```

---

## Environment Variables

Ensure your `.env.local` file contains:

```bash
# Lyzr API Configuration
LYZR_API_KEY=your_lyzr_api_key_here
NEXT_PUBLIC_LYZR_API_KEY=your_lyzr_api_key_here

# Optional: Custom port (default: 3333)
PORT=3333
```

---

## Cloud Deployment

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard:
# LYZR_API_KEY
# NEXT_PUBLIC_LYZR_API_KEY
```

### Deploy to Railway

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Initialize project
railway init

# Deploy
railway up

# Set environment variables in Railway dashboard
```

### Deploy to AWS/GCP/Azure

Use the Docker image:
1. Build: `docker build -t linkedin-growth-agent .`
2. Tag for your registry: `docker tag linkedin-growth-agent your-registry/linkedin-growth-agent:latest`
3. Push: `docker push your-registry/linkedin-growth-agent:latest`
4. Deploy using your cloud provider's container service

---

## Production Checklist

- [ ] `.env.local` configured with valid API keys
- [ ] Build completes successfully (`npm run build`)
- [ ] All 6 agents operational (test in UI)
- [ ] Port 3333 is available or configured differently
- [ ] SSL certificate configured (for HTTPS)
- [ ] Domain name configured (optional)
- [ ] Firewall rules allow traffic on port 3333
- [ ] Resource limits configured (CPU/Memory)
- [ ] Monitoring/logging configured
- [ ] Backup strategy in place

---

## Application Features

Once deployed, users can access:

1. **CV Analysis** - Upload CV, analyze vs LinkedIn profile
2. **CV Updater** - Update CV with AI, download PDF
3. **Content Generator** - Create LinkedIn posts (3 variations)
4. **Quality Assurance** - Review content quality
5. **LinkedIn Achievement Poster** - Create and publish achievement posts
6. **Complete Optimization** - Full multi-agent workflow

---

## Troubleshooting

### Build Fails
- Ensure Node.js v20 is being used
- Run `rm -rf node_modules package-lock.json && npm install`
- Check for TypeScript errors: `npm run build`

### Container Won't Start
- Check logs: `docker logs linkedin-growth-agent`
- Verify `.env.local` exists and is valid
- Ensure port 3333 is not in use: `lsof -i :3333`

### Application Not Accessible
- Check if container is running: `docker ps`
- Verify port mapping: `docker port linkedin-growth-agent`
- Check firewall rules

### Agents Not Responding
- Verify `LYZR_API_KEY` is set correctly
- Check agent IDs in `/app/nextjs-project/app/page.tsx` lines 39-46
- Test agent connectivity via Lyzr dashboard

---

## Support

For issues or questions:
- Check `DEPLOYMENT_READY.md` for feature documentation
- Review `PROJECT_STATUS.md` for technical details
- Verify all 6 agents are operational in Lyzr platform
