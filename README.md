# Quiznetic

A modern, interactive learning platform for Telangana State Board syllabus with quizzes, maps, and more.

![Quiznetic Screenshot](https://i.imgur.com/1pJ8xzM.png)

## Overview

Quiznetic is an educational platform designed to help students learn subjects based on the Telangana State Board syllabus. It features interactive quizzes with a special focus on geography through interactive map pointing exercises. The application provides a visually engaging learning experience with a cosmic space-themed UI.

## Features

- **Class-based Navigation**: Browse content by class (6-10)
- **Subject Categorization**: Access content by subject (Mathematics, Science, Social Studies)
- **Interactive Quizzes**: Test your knowledge with multiple-choice questions
- **Interactive Maps**: Learn geography with Leaflet-powered interactive maps
- **Map Pointing Exercises**: Identify states, rivers, mountains, capitals, and more
- **Responsive Design**: Works on desktop and mobile devices
- **Cosmic Space Theme**: Visually engaging user interface

## Technologies Used

- **Frontend**:
  - React
  - TypeScript
  - Tailwind CSS
  - Framer Motion (animations)
  - Leaflet (interactive maps)
  - Lucide React (icons)
  
- **Backend**:
  - Node.js
  - Express
  - Firebase (authentication)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/quiznetic.git
   cd quiznetic
   ```

2. Install dependencies for both frontend and backend:
   ```bash
   # Install frontend dependencies
   cd frontend
   npm install

   # Install backend dependencies
   cd ../backend
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the backend directory
   - Add necessary environment variables (see `.env.example`)

4. Start the development servers:
   ```bash
   # Start backend server
   cd backend
   npm run dev

   # Start frontend server
   cd frontend
   npm run dev
   ```

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

## Project Structure

```
quiznetic/
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── ui/         # Reusable UI components
│   │   │   ├── layout/     # Layout components
│   │   │   └── ...
│   │   ├── data/           # Quiz and map data
│   │   │   ├── maths/      # Mathematics questions
│   │   │   ├── science/    # Science questions
│   │   │   ├── social/     # Social studies questions
│   │   │   └── ...
│   │   ├── pages/          # Page components
│   │   └── utils/          # Utility functions
│   └── ...
└── backend/                # Node.js backend
    ├── Controllers/        # Request controllers
    ├── Middlewares/        # Express middlewares
    ├── Models/             # Data models
    ├── Routes/             # API routes
    └── ...
```

## Usage

1. Open the application in your browser
2. Select a class level (6-10)
3. Choose a subject (Mathematics, Science, Social)
4. Select a chapter or map pointing exercise
5. Complete the quiz, interacting with maps when applicable
6. See your score and progress

## Credits

This project was developed to enhance the learning experience for students following the Telangana State Board syllabus.

- Map data is based on educational standards
- Interactive maps powered by Leaflet
- Cosmic space theme inspired by educational exploration

## License

This project is licensed under the MIT License.