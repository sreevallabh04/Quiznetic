# Quiznetic - Educational Quiz Application

A modern educational quiz application built with React, TypeScript, and Tailwind CSS. The application provides interactive quizzes for students following the Telangana state board curriculum.

![Quiznetic Screenshot](https://i.imgur.com/1pJ8xzM.png)

## Features

- **Multiple Question Types**: Multiple choice, fill-in-the-blank, matching, drag-and-drop ordering, and dropdown questions
- **Interactive Maps**: Map-based questions with interactive map displays
- **Subject Coverage**: Mathematics, Science, and Social Studies for classes 6-10
- **Real-time Question Generation**: Uses Gemini AI API to generate dynamic questions
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Progress Tracking**: Track quiz progress and scores
- **Modern UI**: Beautiful, intuitive interface with smooth animations

## Technology Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **AI Integration**: Google Gemini API for question generation
- **Routing**: React Router DOM
- **UI Components**: Framer Motion, Lucide React
- **Notifications**: React Toastify
- **Build Tool**: Vite

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Quiznetic
```

2. Install dependencies:
```bash
cd frontend
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## API Configuration

The application uses Google Gemini API for generating dynamic questions. The API keys are configured in `frontend/src/utils/api.ts`. The system includes intelligent key rotation and retry logic to handle rate limits and API failures.

### API Key Management

- Multiple API keys are supported for load balancing
- Automatic key rotation when rate limits are hit
- Intelligent retry logic with exponential backoff
- Key blacklisting for failed keys

## Project Structure

```
Quiznetic/
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── home/       # Home page components
│   │   │   ├── landing/    # Landing page components
│   │   │   ├── layout/     # Layout components
│   │   │   └── ui/         # Reusable UI components
│   │   ├── data/           # Static question data
│   │   │   ├── maths/      # Mathematics questions
│   │   │   ├── science/    # Science questions
│   │   │   └── social/     # Social studies questions
│   │   ├── pages/          # Page components
│   │   ├── types/          # TypeScript type definitions
│   │   ├── utils/          # Utility functions and API
│   │   └── main.tsx        # Application entry point
│   ├── public/             # Static assets
│   └── package.json        # Dependencies and scripts
└── README.md               # Project documentation
```

## Features in Detail

### Question Types

1. **Multiple Choice Questions**: Traditional multiple choice with 4 options
2. **Fill-in-the-Blank**: Questions with blank spaces to fill
3. **Matching Questions**: Match items from two columns
4. **Drag-and-Drop Ordering**: Arrange items in correct order
5. **Dropdown Questions**: Select correct options from dropdowns

### Map Integration

- Interactive map questions for geography topics
- Automatic map data generation based on question content
- Support for various map entities (countries, states, cities, rivers, etc.)

### Authentication

- Simple client-side authentication system
- User registration and login functionality
- Session management using localStorage

## Map Pointing Feature

One of the standout features of Quiznetic is the interactive map pointing functionality:

- **Interactive Maps**: Unlike static images, our maps are fully interactive using Leaflet
- **Diverse Geography Learning**: Identify states, rivers, mountains, capitals, historical regions, and more
- **Class-specific Content**: Different map exercises for each class level (6-10)
- **Visual Feedback**: Highlighting of geographical features with appropriate styling
- **HUD-like Interface**: Modern, tech-inspired map interface for better engagement

### Map Categories Include:

- Indian States and Capitals
- Indian Rivers and Water Bodies
- Indian Mountain Ranges
- Telangana Geography
- World Geography
- Historical Maps

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Style

The project uses ESLint for code linting and TypeScript for type safety. All components are written in TypeScript with proper type definitions.

## Usage

1. Open the application in your browser
2. Select a class level (6-10)
3. Choose a subject (Mathematics, Science, Social)
4. Select a chapter or map pointing exercise
5. Complete the quiz, interacting with maps when applicable
6. See your score and progress

## Deployment

The application can be deployed to any static hosting service:

1. Build the application:
```bash
npm run build
```

2. Deploy the `dist` folder to your hosting service

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue in the repository.