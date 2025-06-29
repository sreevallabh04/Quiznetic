# Quiznetic - Educational Quiz Application 🎓

A modern, production-ready educational quiz application built with React, TypeScript, and Tailwind CSS. The application provides interactive quizzes for students following the **Telangana State Board curriculum** with **1000+ curated questions** across all subjects and classes.

![Quiznetic Screenshot](https://i.imgur.com/1pJ8xzM.png)

## 🚀 **PRODUCTION READY - No API Dependencies!**

✅ **Complete Static Question Database**  
✅ **1000+ Telangana State Board Questions**  
✅ **Zero External API Dependencies**  
✅ **Recruiter-Safe Codebase**  
✅ **Instant Load Times**  

---

## 🌟 Features

### 📚 **Comprehensive Curriculum Coverage**
- **Classes**: 6, 7, 8, 9, 10
- **Subjects**: Mathematics, Science, Social Studies, Geography (Map Pointing)
- **1000+ Questions** aligned with Telangana State Board syllabus
- **Chapter-wise organization** for structured learning

### 🎯 **Multiple Question Types**
- **Multiple Choice Questions (MCQ)** - Traditional format with 4 options
- **Fill in the Blank** - Test recall and understanding
- **Matching Questions** - Connect related concepts
- **Drag & Drop Ordering** - Sequence and priority questions
- **Dropdown Questions** - Complex multi-part questions
- **Interactive Map Questions** - Geography with real map integration

### 🗺️ **Interactive Geography**
- **Interactive maps** using Leaflet.js
- **State and district identification**
- **River and landmark mapping**
- **Telangana-specific geography focus**

### 🎨 **Modern User Experience**
- **Responsive design** - Works on all devices
- **Smooth animations** with Framer Motion
- **Progress tracking** and scoring
- **Clean, professional UI** with Tailwind CSS
- **Accessibility features** for inclusive learning

---

## 🏗️ **Technical Architecture**

### **Frontend Stack**
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **React Router** for navigation
- **Leaflet** for interactive maps

### **Static Question System**
- **Curated question database** - No API calls required
- **Type-safe question interfaces** - Full TypeScript support
- **Intelligent question shuffling** - Variety in every session
- **Fallback mechanisms** - Graceful error handling
- **Performance optimized** - Instant question loading

---

## 🚀 **Quick Start**

### **Prerequisites**
- Node.js 18+ 
- npm or yarn

### **Installation**
```bash
# Clone the repository
git clone https://github.com/sreevallabh04/Quiznetic.git
cd Quiznetic

# Install dependencies
cd frontend
npm install

# Start development server
npm run dev
```

### **Build for Production**
```bash
# Build the application
npm run build

# Preview production build
npm run preview
```

---

## 📁 **Project Structure**

```
Quiznetic/
├── frontend/
│   ├── src/
│   │   ├── components/          # React components
│   │   │   ├── ui/             # Reusable UI components
│   │   │   ├── layout/         # Layout components
│   │   │   └── ...             # Feature components
│   │   ├── data/               # Static question database
│   │   │   ├── maths/          # Mathematics questions
│   │   │   ├── science/        # Science questions
│   │   │   ├── social/         # Social Studies questions
│   │   │   └── chapterData.ts  # Main data structure
│   │   ├── utils/              # Utility functions
│   │   │   ├── staticQuestions.ts  # Question system
│   │   │   ├── helpers.ts      # Helper functions
│   │   │   └── api.ts          # Type definitions
│   │   ├── pages/              # Page components
│   │   └── types/              # TypeScript types
│   ├── public/                 # Static assets
│   └── package.json
├── API_SETUP.md               # API setup guide (legacy)
└── README.md
```

---

## 🎓 **Educational Content**

### **Mathematics**
- **Class 6**: Numbers, Geometry, Algebra basics
- **Class 7**: Integers, Fractions, Data handling
- **Class 8**: Rational numbers, Linear equations
- **Class 9**: Polynomials, Coordinate geometry
- **Class 10**: Real numbers, Trigonometry, Statistics

### **Science**
- **Class 6**: Basic science concepts, Living organisms
- **Class 7**: Acids and bases, Weather and climate
- **Class 8**: Force and pressure, Light and sound
- **Class 9**: Matter and motion, Natural resources
- **Class 10**: Chemical reactions, Life processes

### **Social Studies**
- **Class 6**: History and geography fundamentals
- **Class 7**: Medieval history, Physical features
- **Class 8**: Modern history, Resources and development
- **Class 9**: Contemporary India, Democratic politics
- **Class 10**: Economic development, Political science

### **Geography (Map Pointing)**
- **Interactive maps** of India and Telangana
- **State capitals** and major cities
- **Rivers, mountains,** and geographical features
- **Districts and administrative divisions**

---

## 🛠️ **Development**

### **Key Components**
- `Quiz.tsx` - Main quiz interface with question rendering
- `ChapterSelection.tsx` - Subject and chapter navigation
- `staticQuestions.ts` - Core question system
- `MapDisplay.tsx` - Interactive map component

### **Adding New Questions**
1. Navigate to `frontend/src/data/[subject]/`
2. Edit the appropriate class file (e.g., `class6.ts`)
3. Add questions following the existing format
4. Questions automatically appear in the app

### **Question Format**
```typescript
{
  id: 1,
  title: "Chapter Title",
  description: "Chapter description",
  questions: [
    {
      question: "What is the capital of Telangana?",
      options: ["Mumbai", "Hyderabad", "Chennai", "Bangalore"],
      correct: "Hyderabad"
    }
  ]
}
```

---

## 🚀 **Deployment**

### **Vercel (Recommended)**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd frontend
vercel --prod
```

### **Netlify**
```bash
# Build the project
npm run build

# Upload dist/ folder to Netlify
```

### **GitHub Pages**
```bash
# Build with base path
npm run build -- --base=/Quiznetic/

# Deploy dist/ folder to gh-pages branch
```

---

## 🔧 **Configuration**

### **Environment Variables**
No environment variables required! The app works completely offline with static data.

### **Customization**
- **Colors**: Edit `tailwind.config.js`
- **Fonts**: Update CSS files
- **Questions**: Modify files in `src/data/`

---

## 📊 **Performance**

- **Build Size**: ~900KB (optimized)
- **Load Time**: < 2 seconds
- **Lighthouse Score**: 95+ (Performance, Accessibility, SEO)
- **Mobile Responsive**: 100%

---

## 🤝 **Contributing**

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 **Acknowledgments**

- **Telangana State Board** for curriculum guidelines
- **React community** for excellent tooling
- **Tailwind CSS** for beautiful styling
- **Leaflet** for interactive maps

---

## 📞 **Contact**

**Developer**: Sreevallabh  
**Email**: [your-email@example.com]  
**GitHub**: [@sreevallabh04](https://github.com/sreevallabh04)  
**Project Link**: [https://github.com/sreevallabh04/Quiznetic](https://github.com/sreevallabh04/Quiznetic)

---

## 🎯 **Recent Updates**

### **v2.0.0 - Production Ready** 🚀
- ✅ Complete removal of API dependencies
- ✅ 1000+ static questions added
- ✅ Enhanced question variety and types
- ✅ Production-ready error handling
- ✅ Optimized performance and build size
- ✅ Comprehensive Telangana State Board coverage

**Status**: ✅ **Production Ready** - Ready for deployment and use!

---

*Built with ❤️ for Telangana students*
