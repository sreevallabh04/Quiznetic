# 🚀 Quiznetic Deployment Guide

This guide will help you deploy Quiznetic to production successfully.

## 📋 Prerequisites

- Node.js 16+ and npm 8+
- Git repository (GitHub, GitLab, etc.)
- Clerk account for authentication
- Deployment platform account (Vercel, Netlify, etc.)

## 🔧 Environment Setup

### 1. Clerk Authentication Setup

1. **Create Clerk Account**: Visit [clerk.com](https://clerk.com) and sign up
2. **Create Application**: Create a new application in Clerk dashboard
3. **Get Publishable Key**: Copy your publishable key (starts with `pk_test_` or `pk_live_`)
4. **Configure Settings**: Set up sign-in/sign-up methods as needed

### 2. Environment Variables

Create environment variables for your deployment platform:

```bash
# Required
VITE_CLERK_PUBLISHABLE_KEY="pk_test_your_key_here"
VITE_APP_ENV="production"
NODE_ENV="production"

# Optional
VITE_APP_NAME="Quiznetic - Telangana Learning Hub"
VITE_APP_VERSION="1.0.0"
VITE_ENABLE_ANALYTICS="true"
VITE_ENABLE_DEBUG="false"
```

## 🌐 Deployment Platforms

### Option 1: Vercel (Recommended)

**Why Vercel?**
- Automatic builds from Git
- Global CDN
- Zero configuration
- Built-in security headers

**Steps:**

1. **Connect Repository**
   - Sign up at [vercel.com](https://vercel.com)
   - Import your GitHub repository (https://github.com/sreevallabh04/quiznetic)
   - Select "Vite" as framework preset

2. **Configure Build Settings**
   ```
   Framework Preset: Vite
   Build Command: cd frontend && npm ci && npm run build
   Output Directory: frontend/dist
   Install Command: cd frontend && npm ci
   ```

3. **Add Environment Variables**
   - Go to Project Settings > Environment Variables
   - Add all required variables from above
   - Deploy

4. **Custom Domain** (Optional)
   - Project Settings > Domains
   - Add your custom domain
   - Follow DNS configuration instructions

**Live in 2 minutes!** ✨

### Option 2: Netlify

**Steps:**

1. **Build Locally**
   ```bash
   cd frontend
   npm ci
   npm run build
   ```

2. **Deploy to Netlify**
   - Drag and drop `frontend/dist` folder to netlify.com
   - Or connect Git repository for automatic deploys

3. **Configure Redirects**
   Create `frontend/public/_redirects`:
   ```
   /*    /index.html   200
   ```

4. **Environment Variables**
   - Site Settings > Environment Variables
   - Add required variables

### Option 3: GitHub Pages

**Steps:**

1. **Setup GitHub Actions**
   Create `.github/workflows/deploy.yml`:
   ```yaml
   name: Deploy to GitHub Pages
   
   on:
     push:
       branches: [ main ]
   
   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v2
         - name: Setup Node.js
           uses: actions/setup-node@v2
           with:
             node-version: '18'
         - name: Install and Build
           run: |
             cd frontend
             npm ci
             npm run build
         - name: Deploy
           uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./frontend/dist
   ```

2. **Configure Repository**
   - Settings > Pages
   - Source: GitHub Actions
   - Add environment variables to repository secrets

### Option 4: Firebase Hosting

**Steps:**

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Initialize Firebase**
   ```bash
   firebase login
   firebase init hosting
   ```

3. **Configure firebase.json**
   ```json
   {
     "hosting": {
       "public": "frontend/dist",
       "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
       "rewrites": [
         {
           "source": "**",
           "destination": "/index.html"
         }
       ]
     }
   }
   ```

4. **Deploy**
   ```bash
   cd frontend && npm run build
   firebase deploy
   ```

## 📊 Post-Deployment Checklist

### ✅ Functionality Test
- [ ] Home page loads correctly
- [ ] User can sign up/sign in
- [ ] All subjects and classes are accessible
- [ ] Quiz functionality works
- [ ] Maps display correctly (geography questions)
- [ ] User profile and analytics work
- [ ] Responsive design on mobile devices

### ✅ Performance Test
- [ ] Page load time < 3 seconds
- [ ] No console errors
- [ ] All assets load correctly
- [ ] Quiz performance is smooth

### ✅ Security Check
- [ ] HTTPS is enabled
- [ ] No sensitive data in console
- [ ] Environment variables are set correctly
- [ ] No API keys exposed in client code

## 🔧 Troubleshooting

### Common Issues

**Build Fails**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Environment Variables Not Working**
- Ensure variables start with `VITE_`
- Check spelling and case sensitivity
- Restart your deployment after adding variables

**Clerk Authentication Issues**
- Verify publishable key is correct
- Check Clerk dashboard settings
- Ensure domain is added to allowed origins

**Routing Issues (404 on refresh)**
- Configure redirects for SPA routing
- Ensure `/*` routes to `/index.html`

**Map Not Loading**
- Check browser console for errors
- Verify map components are loaded
- Test on different devices/browsers

### Performance Optimization

**Bundle Size Too Large**
```bash
# Analyze bundle
npm run analyze

# Check for unused dependencies
npx depcheck
```

**Slow Loading**
- Enable CDN caching
- Optimize images
- Use lazy loading for routes

## 📈 Monitoring & Analytics

### Recommended Tools

1. **Vercel Analytics** (if using Vercel)
2. **Google Analytics** for user tracking
3. **Sentry** for error monitoring
4. **Lighthouse** for performance monitoring

### Setup Google Analytics (Optional)

1. Create GA4 property
2. Add tracking ID to environment variables:
   ```
   VITE_GA_TRACKING_ID="G-XXXXXXXXXX"
   ```
3. The app will automatically track page views

## 🔄 Continuous Deployment

### Automatic Deployments

Most platforms support automatic deployments:

1. **Connect Git Repository**
2. **Configure Build Settings**
3. **Push to Main Branch** = Automatic Deployment

### Manual Deployment Script

Use the provided `deploy.sh` script:

```bash
chmod +x deploy.sh
./deploy.sh
```

## 🆘 Support

**Need help?**
- Check GitHub Issues: https://github.com/sreevallabh04/quiznetic/issues
- Review deployment logs
- Test locally first: `npm run preview`
- Verify environment variables
- Contact developer: sreevallabh.kakarala@gmail.com

## 🎉 Success!

Once deployed, your Quiznetic app will be:
- ✅ Accessible worldwide
- ✅ Fast and reliable
- ✅ Secure and scalable
- ✅ Ready for thousands of students

**Example URLs:**
- Vercel: `https://quiznetic.vercel.app`
- Netlify: `https://quiznetic.netlify.app`
- Custom: `https://yourschool.edu/quiznetic`

## 👨‍💻 About the Developer

This educational platform was created by **Sreevallabh Kakarala**, a passionate developer dedicated to making quality education accessible to all students.

- 📧 **Email**: sreevallabh.kakarala@gmail.com
- 🐱 **GitHub**: [@sreevallabh04](https://github.com/sreevallabh04)
- 🌐 **Portfolio**: [sreevallabh.dev](https://sreevallabh.dev)

## 👨‍💻 About the Developer

This educational platform was created by **Sreevallabh Kakarala**, a passionate developer dedicated to making quality education accessible to all students.

- 📧 **Email**: sreevallabh.kakarala@gmail.com
- 🐱 **GitHub**: [@sreevallabh04](https://github.com/sreevallabh04)
- 🌐 **Portfolio**: [sreevallabh.dev](https://sreevallabh.dev)

---

*Happy teaching and learning! 🎓*

**Built with ❤️ by Sreevallabh Kakarala for Telangana students**

**Built with ❤️ by Sreevallabh Kakarala for Telangana students** 