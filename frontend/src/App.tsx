import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import ClassSelection from './components/ClassSelection';
import SubjectSelection from './components/SubjectSelection';
import ChapterSelection from './components/ChapterSelection';
import Quiz from './components/Quiz';



export default function App() {
  return (
    
      <BrowserRouter>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 text-white">
          <Header />
          
          <main className="pt-16">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />

             
              <Route
                path="/dashboard"
                element={
                  
                    <ClassSelection />
                }
              />
              <Route
                path="/class/:classId"
                element={
                  
                    <SubjectSelection />
                  
                }
              />
              <Route
                path="/class/:classId/:subject"
                element={
                  
                    <ChapterSelection />
                  
                }
              />
              <Route
                path="/class/:classId/:subject/:chapter"
                element={
                  
                    <Quiz />
                  
                }
              />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    
  );
}