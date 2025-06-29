import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AuthGuard } from './components/auth/AuthGuard';
import { UserProfile } from './components/auth/UserProfile';
import { LandingPage } from './pages/LandingPage';
import { UserProfilePage } from './pages/UserProfilePage';
import QuestionTypesShowcase from './pages/QuestionTypesShowcase';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import ClassSelection from './components/ClassSelection';
import SubjectSelection from './components/SubjectSelection';
import ChapterSelection from './components/ChapterSelection';
import Quiz from './components/Quiz';
import { ErrorBoundary } from './components/ErrorBoundary';
import QuestionInitializer from './components/QuestionInitializer';
import ProductionReadyBanner from './components/ProductionReadyBanner';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <AuthGuard>
          <div className="min-h-screen bg-gray-50">
            <QuestionInitializer />
            <ProductionReadyBanner />
            
            <Header>
              <UserProfile />
            </Header>
            
            <main className="container mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8 min-h-[calc(100vh-16rem)]">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/profile" element={<UserProfilePage />} />
                <Route path="/question-types" element={<QuestionTypesShowcase />} />
                <Route path="/home" element={<ClassSelection />} />
                <Route path="/class/:classId" element={<SubjectSelection />} />
                <Route path="/class/:classId/:subject" element={<ChapterSelection />} />
                <Route path="/class/:classId/:subject/:chapter" element={<Quiz />} />
              </Routes>
            </main>
            
            <Footer />
            
            <ToastContainer 
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              className="!mt-16 sm:!mt-20"
            />
          </div>
        </AuthGuard>
      </Router>
    </ErrorBoundary>
  );
}

export default App;