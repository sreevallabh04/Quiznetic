# Quiznetic - Educational Quiz Application

A modern educational quiz application built with React, TypeScript, and Tailwind CSS. The application provides interactive quizzes for students following the Telangana state board curriculum.

![Quiznetic Screenshot](https://i.imgur.com/1pJ8xzM.png)

## 🚀 Features

- **Multiple Question Types**: Multiple choice, fill-in-the-blank, matching, drag-and-drop ordering, and dropdown questions
- **Interactive Maps**: Map-based questions with interactive map displays using Leaflet
- **Subject Coverage**: Mathematics, Science, and Social Studies for classes 6-10
- **AI-Powered Questions**: Uses Google Gemini API for dynamic question generation
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Progress Tracking**: Track quiz progress and scores
- **Modern UI**: Beautiful, intuitive interface with smooth animations
- **Secure Authentication**: Client-side authentication with localStorage management

## 🛠 Technology Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **AI Integration**: Google Gemini 1.5 Flash API for question generation
- **Maps**: Leaflet for interactive map displays
- **Routing**: React Router DOM
- **UI Components**: Framer Motion, Lucide React
- **Notifications**: React Toastify
- **Build Tool**: Vite

## 📦 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Google Gemini API keys

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/sreevallabh04/Quiznetic.git
cd Quiznetic
```

2. **Install dependencies:**
```bash
cd frontend
npm install
```

3. **Set up environment variables:**
Create a `.env` file in the `frontend` directory with your Gemini API keys:
```env
VITE_GEMINI_API_KEY_1=your_first_api_key_here
VITE_GEMINI_API_KEY_2=your_second_api_key_here
VITE_GEMINI_API_KEY_3=your_third_api_key_here
VITE_GEMINI_API_KEY_4=your_fourth_api_key_here
VITE_GEMINI_API_KEY_5=your_fifth_api_key_here
VITE_GEMINI_API_KEY_6=your_sixth_api_key_here
VITE_GEMINI_API_KEY_7=your_seventh_api_key_here
VITE_GEMINI_API_KEY_8=your_eighth_api_key_here
```

4. **Start the development server:**
```bash
npm run dev
```

5. **Open your browser and navigate to `http://localhost:5173`**

## 🔧 API Configuration

The application uses Google Gemini 1.5 Flash API for generating dynamic questions. The system includes:

- **Multiple API Key Support**: Load balancing across 8 API keys
- **Intelligent Key Rotation**: Automatic rotation when rate limits are hit
- **Retry Logic**: Exponential backoff with intelligent error handling
- **Key Blacklisting**: Temporary blacklisting of failed keys
- **Error Recovery**: Graceful handling of API failures

### Recent Updates

- **✅ Fixed**: Updated from deprecated `gemini-pro` to `gemini-1.5-flash` model
- **✅ Resolved**: 400 Bad Request errors caused by deprecated model usage
- **✅ Enhanced**: Improved error handling and API key management

## 📁 Project Structure

```
Quiznetic/
├── frontend/               # React frontend application
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── home/       # Home page components
│   │   │   ├── landing/    # Landing page components
│   │   │   ├── layout/     # Layout components (Header, Footer)
│   │   │   └── ui/         # Reusable UI components
│   │   ├── data/           # Static question data by subject
│   │   │   ├── maths/      # Mathematics questions (classes 6-10)
│   │   │   ├── science/    # Science questions (classes 6-10)
│   │   │   └── social/     # Social studies questions (classes 6-10)
│   │   ├── pages/          # Page components
│   │   ├── types/          # TypeScript type definitions
│   │   ├── utils/          # Utility functions and API logic
│   │   └── main.tsx        # Application entry point
│   ├── public/             # Static assets
│   ├── .env                # Environment variables (not in repo)
│   ├── .env.example        # Environment variables template
│   └── package.json        # Dependencies and scripts
├── .gitignore              # Git ignore patterns
└── README.md               # Project documentation
```

## 🎯 Question Types

### 1. Multiple Choice Questions
Traditional multiple choice with 4 options, including map-based questions with interactive displays.

### 2. Fill-in-the-Blank
Questions with blank spaces that students fill with correct answers.

### 3. Matching Questions
Match items from two columns (e.g., terms with definitions).

### 4. Drag-and-Drop Ordering
Arrange items in the correct chronological or logical order.

### 5. Dropdown Questions
Select correct options from dropdown menus within sentences.

## 🗺 Map Integration

- **Interactive Geography**: Leaflet-powered interactive maps
- **Auto-Detection**: Automatic map generation for geography questions
- **Multi-Entity Support**: Countries, states, cities, rivers, mountains, etc.
- **Visual Feedback**: Highlighting and markers for better learning

## 🔐 Security Features

- **Environment Variables**: All API keys stored securely in `.env` files
- **Git Security**: API keys excluded from version control
- **Client-side Auth**: Simple authentication using localStorage
- **Input Validation**: Comprehensive validation for all user inputs

## 🚀 Development

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build optimized production bundle
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality

### Code Quality

- **TypeScript**: Full type safety throughout the application
- **ESLint**: Code linting with modern standards
- **Component Architecture**: Modular, reusable component design
- **Error Boundaries**: Graceful error handling in React components

## 📱 Deployment

### Production Build

1. **Build the application:**
```bash
npm run build
```

2. **Deploy the `dist` folder** to your hosting service (Vercel, Netlify, etc.)

### Environment Setup

- Ensure all `VITE_GEMINI_API_KEY_*` environment variables are set in production
- Configure build settings for TypeScript and Vite
- Set up proper domain and SSL certificates

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes with proper TypeScript types
4. Add tests if applicable
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## 📝 Recent Changes

### v1.2.0 (Latest)
- **Fixed**: Updated to Gemini 1.5 Flash API model
- **Resolved**: 400 Bad Request errors from deprecated model
- **Enhanced**: API key rotation and error handling
- **Improved**: Environment variable management
- **Security**: Removed hardcoded API keys from codebase

### v1.1.0
- **Added**: Multiple question types support
- **Enhanced**: Interactive map functionality
- **Improved**: UI/UX with Tailwind CSS
- **Added**: Progress tracking and scoring

## 🔗 Links

- **Live Demo**: [Quiznetic](https://quiznetic.vercel.app) *(if deployed)*
- **Repository**: [GitHub](https://github.com/sreevallabh04/Quiznetic)
- **Issues**: [Bug Reports & Feature Requests](https://github.com/sreevallabh04/Quiznetic/issues)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 💡 Support

For support, questions, or feature requests:

1. **GitHub Issues**: [Create an issue](https://github.com/sreevallabh04/Quiznetic/issues)
2. **Documentation**: Check this README and code comments
3. **Community**: Contribute to discussions in the repository

---

**Built with ❤️ for educational excellence in Telangana**
