import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { LandingPage } from './pages/LandingPage';
import ClassSelection from './components/ClassSelection';
import SubjectSelection from './components/SubjectSelection';
import ChapterSelection from './components/ChapterSelection';
import Quiz from './components/Quiz';
import RefreshHandler from './pages/RefreshHandler';
import QuestionTypesShowcase from './pages/QuestionTypesShowcase';
import QuestionInitializer from './components/QuestionInitializer';
import ProductionReadyBanner from './components/ProductionReadyBanner';

export default function App() {
  // QuestionInitializer validates the static question database
  return (
    <>
      {/* The QuestionInitializer component validates the static question database */}
      <QuestionInitializer />
      <BrowserRouter>
        <div className="relative min-h-screen text-secondary-800 overflow-hidden bg-white">
          {/* Production Ready Banner */}
          <ProductionReadyBanner />
          
          {/* Light professional theme background elements */}
          <div className="fixed inset-0 bg-gradient-to-b from-white to-secondary-50 z-[-3]"></div>
          
          {/* Subtle pattern background */}
          <div className="fixed inset-0 bg-[radial-gradient(#f0f0f0_1px,transparent_1px)] bg-[size:20px_20px] opacity-30 z-[-2]"></div>
          
          {/* Light green accents */}
          <div className="fixed top-0 right-0 w-1/3 h-1/3 bg-primary-200/20 blur-[150px] rounded-full z-[-1]"></div>
          <div className="fixed bottom-0 left-0 w-1/2 h-1/2 bg-primary-100/30 blur-[150px] rounded-full z-[-1]"></div>
          
          <Header />
          <main className="pt-16 relative z-10">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/home" element={<ClassSelection />} />
              <Route path="/class/:classId" element={<SubjectSelection />} />
              <Route path="/class/:classId/:subject" element={<ChapterSelection />} />
              <Route path="/class/:classId/:subject/:chapter" element={<Quiz />} />
              <Route path="/question-types" element={<QuestionTypesShowcase />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </>
  );
}