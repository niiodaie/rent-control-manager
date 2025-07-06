# Deployment Guide - Rent Control Frontend

This guide covers deploying the Rent Control frontend to various platforms with custom domain configuration.

## 🚀 Vercel Deployment (Recommended)

### Prerequisites
- GitHub repository with your code
- Vercel account
- Custom domain (rent-control.net)

### Step 1: Connect Repository
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Select "rent-control-frontend"

### Step 2: Configure Build Settings
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install",
  "framework": "vite"
}
```

### Step 3: Environment Variables
Add these in Vercel dashboard under "Environment Variables":

```bash
# Required
VITE_API_URL=https://your-backend.render.com
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_your-stripe-key

# App Configuration
VITE_APP_NAME=Rent Control
VITE_APP_URL=https://rent-control.net
VITE_APP_DOMAIN=rent-control.net

# Optional
VITE_GOOGLE_ANALYTICS_ID=G-YOUR-GA4-ID
VITE_GOOGLE_ADSENSE_CLIENT=ca-pub-your-adsense-id
```

### Step 4: Custom Domain Setup
1. **In Vercel Dashboard:**
   - Go to Project Settings → Domains
   - Add `rent-control.net`
   - Add `www.rent-control.net` (redirect to main)

2. **DNS Configuration:**
   ```dns
   Type: A
   Name: @
   Value: 76.76.19.61 (Vercel IP)
   
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

3. **SSL Certificate:**
   - Automatically provisioned by Vercel
   - Usually takes 5-10 minutes

### Step 5: Deploy
1. Click "Deploy" in Vercel
2. Wait for build to complete
3. Test at your custom domain

## 🔧 Alternative Platforms

### Netlify
```bash
# Build settings
Build command: npm run build
Publish directory: dist
```

### GitHub Pages
```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages
on:
  push:
    branches: [ main ]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm install
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### AWS S3 + CloudFront
```bash
# Build and upload
npm run build
aws s3 sync dist/ s3://your-bucket-name --delete
aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
```

## 🌐 Domain Configuration

### DNS Records for rent-control.net
```dns
# Primary domain
Type: A
Name: @
Value: [Platform IP]
TTL: 300

# WWW subdomain
Type: CNAME
Name: www
Value: [Platform CNAME]
TTL: 300

# API subdomain (for backend)
Type: CNAME
Name: api
Value: your-backend.render.com
TTL: 300
```

### SSL Certificate Verification
```bash
# Check SSL status
curl -I https://rent-control.net
openssl s_client -connect rent-control.net:443 -servername rent-control.net
```

## 🔒 Security Headers

Ensure these headers are configured (included in vercel.json):

```http
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Content-Security-Policy: [see vercel.json]
```

## 📊 Performance Optimization

### Build Optimization
```bash
# Analyze bundle size
npm run build
npx vite-bundle-analyzer dist

# Optimize images
npm install -D vite-plugin-imagemin
```

### CDN Configuration
- Enable Vercel Edge Network
- Configure caching headers
- Optimize static assets

## 🧪 Testing Deployment

### Pre-deployment Checklist
- [ ] All environment variables configured
- [ ] Build completes without errors
- [ ] All routes work correctly
- [ ] Mobile responsiveness verified
- [ ] SSL certificate active
- [ ] Performance metrics acceptable

### Post-deployment Testing
```bash
# Test main functionality
curl -I https://rent-control.net
curl -I https://rent-control.net/login
curl -I https://rent-control.net/pricing

# Test API connectivity
curl https://rent-control.net/api/health
```

## 🔄 CI/CD Pipeline

### GitHub Actions (Recommended)
```yaml
name: Deploy to Vercel
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test
      
      - name: Build project
        run: npm run build
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

## 🚨 Troubleshooting

### Common Issues

1. **Build Failures**
   ```bash
   # Clear cache and reinstall
   rm -rf node_modules package-lock.json
   npm install
   npm run build
   ```

2. **Environment Variables Not Loading**
   - Ensure variables start with `VITE_`
   - Check Vercel dashboard configuration
   - Redeploy after adding variables

3. **Routing Issues**
   - Verify `vercel.json` rewrites configuration
   - Check for conflicting routes

4. **SSL Certificate Issues**
   - Wait 24-48 hours for DNS propagation
   - Verify DNS records are correct
   - Contact platform support if needed

### Debug Commands
```bash
# Check DNS propagation
dig rent-control.net
nslookup rent-control.net

# Test SSL
curl -vI https://rent-control.net

# Check build locally
npm run build && npm run preview
```

## 📞 Support

If you encounter issues:
1. Check platform status pages
2. Review deployment logs
3. Contact platform support
4. Join our Discord for community help

---

**Happy Deploying!** 🚀

