# 🎓 Quiznetic - Telangana Learning Hub

**A comprehensive educational quiz platform designed specifically for Telangana State Board students with 1000+ curriculum-aligned questions.**

![Production Ready](https://img.shields.io/badge/Production-Ready-green.svg)
![React](https://img.shields.io/badge/React-18.3.1-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue.svg)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-blueviolet.svg)
![Vite](https://img.shields.io/badge/Vite-5.4.2-yellow.svg)

## 🌟 Features

### 📚 **Comprehensive Educational Content**
- **1000+ Questions** across Mathematics, Science, and Social Studies
- **Classes 6-10** complete curriculum coverage
- **Telangana State Board** aligned content
- **Interactive Map Pointing** for geography questions
- **Multiple Question Types**: MCQ, Fill-in-blanks, Matching, Drag & Drop

### 👤 **User Management & Analytics**
- **Clerk Authentication** for secure user management
- **Personal Progress Tracking** with detailed analytics
- **Achievement System** with badges and milestones
- **Cross-Device Sync** for seamless learning experience
- **Comprehensive User Profiles** with performance insights

### 🎯 **Learning Features**
- **Immediate Feedback** on answers with explanations
- **Chapter-wise Organization** for structured learning
- **Progress Visualization** with charts and statistics
- **Study Streaks** to encourage consistent learning
- **Offline Capability** - works without internet connection

### 🔒 **Production Ready**
- **Security Optimized** with proper headers and CSP
- **Performance Optimized** with code splitting and caching
- **Mobile Responsive** design for all devices
- **SEO Optimized** for better discoverability
- **Error Boundaries** for graceful error handling

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm 8+
- Modern web browser
- Clerk account (for user authentication)

### 1. Clone and Install
```bash
git clone https://github.com/your-username/quiznetic.git
cd quiznetic
cd frontend
npm install
```

### 2. Environment Setup
```bash
# Copy environment template
cp ../env.example .env.local

# Edit .env.local with your Clerk credentials
# Get your Clerk publishable key from https://clerk.com
```

### 3. Development
```bash
npm run dev
```

### 4. Production Build
```bash
npm run build
npm run preview
```

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. **Fork this repository** to your GitHub account

2. **Sign up for Vercel** at [vercel.com](https://vercel.com)

3. **Connect GitHub** and import your forked repository

4. **Configure Environment Variables** in Vercel dashboard:
   ```
   VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
   VITE_APP_ENV=production
   NODE_ENV=production
   ```

5. **Deploy** - Vercel will automatically build and deploy your app

**Live URL**: Your app will be available at `https://your-app-name.vercel.app`

### Deploy to Netlify

1. **Build the project**:
   ```bash
   cd frontend
   npm run build
   ```

2. **Upload the `dist` folder** to Netlify

3. **Configure redirects** by creating `_redirects` in the `dist` folder:
   ```
   /*    /index.html   200
   ```

### Deploy to Any Static Host

The built files in `frontend/dist` can be served by any static file host:
- GitHub Pages
- Firebase Hosting
- AWS S3 + CloudFront
- DigitalOcean App Platform

## 📁 Project Structure

```
quiznetic/
├── frontend/
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   │   ├── auth/           # Authentication components
│   │   │   ├── layout/         # Layout components
│   │   │   └── ui/             # UI components
│   │   ├── data/               # Question database
│   │   │   ├── maths/          # Mathematics questions
│   │   │   ├── science/        # Science questions
│   │   │   └── social/         # Social Studies questions
│   │   ├── pages/              # Page components
│   │   ├── types/              # TypeScript type definitions
│   │   └── utils/              # Utility functions
│   ├── public/                 # Static assets
│   └── dist/                   # Production build output
├── vercel.json                 # Vercel deployment configuration
├── env.example                 # Environment variables template
└── README.md                   # This file
```

## 🎯 Educational Content Overview

### Mathematics (Classes 6-10)
- **250+ Questions** covering:
  - Algebra, Geometry, Trigonometry
  - Statistics, Probability
  - Number Systems, Real Numbers
  - Coordinate Geometry

### Science (Classes 6-10)
- **350+ Questions** covering:
  - Physics: Motion, Light, Sound, Electricity
  - Chemistry: Acids, Bases, Metals, Carbon
  - Biology: Life Processes, Reproduction, Heredity

### Social Studies (Classes 6-10)
- **400+ Questions** covering:
  - History: Ancient, Medieval, Modern India
  - Geography: Earth, Climate, Resources
  - Political Science: Democracy, Government
  - Economics: Development, Money, Globalization

## 👥 User Guide

### For Students
1. **Sign Up** using email or social login
2. **Select Class** (6-10) and subject
3. **Choose Chapter** and start quiz
4. **Track Progress** in your profile
5. **Earn Achievements** by consistent learning

### For Teachers
- **Monitor Student Progress** through analytics
- **Use in Classroom** for interactive learning
- **Assign Practice** chapter-wise
- **Track Class Performance** trends

### For Parents
- **Track Child's Progress** through shared dashboard
- **Encourage Daily Practice** with streak tracking
- **Monitor Weak Areas** for additional support

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_CLERK_PUBLISHABLE_KEY` | Clerk authentication key | Required |
| `VITE_APP_ENV` | Environment (development/production) | development |
| `VITE_ENABLE_ANALYTICS` | Enable user analytics | true |
| `VITE_ENABLE_DEBUG` | Enable debug mode | false |

### Feature Flags

```typescript
// Disable API questions (use static questions only)
VITE_ENABLE_API_QUESTIONS="false"

// Enable user analytics and progress tracking
VITE_ENABLE_ANALYTICS="true"

// Disable debug logging in production
VITE_ENABLE_DEBUG="false"
```

## 🛠️ Development

### Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run type-check       # Run TypeScript type checking

# Building
npm run build           # Production build with type checking
npm run build:prod      # Production build with optimizations
npm run preview         # Preview production build locally

# Code Quality
npm run lint            # Run ESLint
npm run lint:fix        # Fix ESLint errors automatically

# Utilities
npm run clean           # Clean build cache
npm run analyze         # Analyze bundle size
```

### Adding New Questions

1. Navigate to `src/data/{subject}/class{X}.ts`
2. Add questions following the existing format:
   ```typescript
   {
     id: 'unique-id',
     question: 'Question text',
     options: ['A', 'B', 'C', 'D'],
     correctAnswer: 0, // Index of correct option
     explanation: 'Why this is correct',
     difficulty: 'easy' | 'medium' | 'hard'
   }
   ```

### Customizing UI

- **Colors**: Update `tailwind.config.js`
- **Components**: Modify files in `src/components/`
- **Layouts**: Update `src/components/layout/`

## 🔒 Security

- **Environment Variables**: Sensitive data kept in environment variables
- **Authentication**: Secure user authentication via Clerk
- **CSP Headers**: Content Security Policy implemented
- **XSS Protection**: Input sanitization and validation
- **HTTPS**: All production deployments use HTTPS

## 📊 Performance

- **Bundle Size**: Optimized chunks under 500KB
- **Load Time**: < 2s first load, < 1s subsequent loads
- **Lighthouse Score**: 95+ for Performance, Accessibility, SEO
- **Offline Support**: Service worker for offline functionality

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -m 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Issues**: [GitHub Issues](https://github.com/your-username/quiznetic/issues)
- **Documentation**: This README and inline code comments
- **Email**: support@quiznetic.com (if applicable)

## 🙏 Acknowledgments

- **Telangana State Board** for curriculum guidelines
- **Educational Community** for feedback and suggestions
- **Open Source Contributors** for the amazing tools and libraries

---

**Built with ❤️ for Telangana students**

*Making quality education accessible to all government school students*
