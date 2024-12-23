import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import ClassSelection from './components/ClassSelection';
import SubjectSelection from './components/SubjectSelection';
import ChapterSelection from './components/ChapterSelection';
import Quiz from './components/Quiz';
import { useState } from 'react';
import RefreshHandler from './pages/RefreshHandler';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({ element }: { element: JSX.Element }) => {
    return isAuthenticated ? element : <Navigate to="/login" replace />;
  };

  return (
    <BrowserRouter>
      <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
      
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 text-white">
        <Header />
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

            <Route path="/home" element={<PrivateRoute element={<ClassSelection />} />} />
            <Route path="/class/:classId" element={<PrivateRoute element={<SubjectSelection />} />} />
            <Route path="/class/:classId/:subject" element={<PrivateRoute element={<ChapterSelection />} />} />
            <Route path="/class/:classId/:subject/:chapter" element={<PrivateRoute element={<Quiz />} />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
