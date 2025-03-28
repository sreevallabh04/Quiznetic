import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { LandingPage } from './pages/LandingPage';
import ClassSelection from './components/ClassSelection';
import SubjectSelection from './components/SubjectSelection';
import ChapterSelection from './components/ChapterSelection';
import Quiz from './components/Quiz';
import RefreshHandler from './pages/RefreshHandler';

export default function App() {
  return (
    <BrowserRouter>
      <div className="relative min-h-screen text-white overflow-hidden">
        {/* Space/Astronomy theme background elements */}
        <div className="fixed inset-0 bg-[url('https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-4.0.3')] bg-cover bg-center z-[-3]"></div>
        <div className="fixed inset-0 bg-gradient-to-br from-indigo-900/90 via-purple-900/80 to-black z-[-2]"></div>
        
        {/* Constellation/stars elements */}
        <div className="fixed inset-0 bg-[url('https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?ixlib=rb-4.0.3')] bg-cover bg-center opacity-40 mix-blend-screen z-[-1]"></div>
        
        {/* Animated stars */}
        <div className="fixed inset-0 bg-[radial-gradient(white_1px,transparent_1px)] bg-[size:50px_50px] z-0 opacity-30"></div>
        
        {/* Cosmic glow effect */}
        <div className="fixed top-0 right-0 w-1/3 h-1/3 bg-amber-500/10 blur-[150px] rounded-full z-0"></div>
        <div className="fixed bottom-0 left-0 w-1/2 h-1/2 bg-fuchsia-500/10 blur-[150px] rounded-full z-0"></div>
        
        <Header />
        <main className="pt-16 relative z-10">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<ClassSelection />} />
            <Route path="/class/:classId" element={<SubjectSelection />} />
            <Route path="/class/:classId/:subject" element={<ChapterSelection />} />
            <Route path="/class/:classId/:subject/:chapter" element={<Quiz />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}