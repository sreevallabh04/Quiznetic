import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import ClassSelection from './components/ClassSelection';
import SubjectSelection from './components/SubjectSelection';
import ChapterSelection from './components/ChapterSelection';
import Quiz from './components/Quiz';
import { GraduationCap } from 'lucide-react';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white">
        <header className="p-4 flex items-center justify-center backdrop-blur-sm bg-black/20">
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex items-center gap-2"
          >
            <div className="p-2 bg-white/10 rounded-full">
              <GraduationCap className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold">Telangana Learning Hub</h1>
          </motion.div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<ClassSelection />} />
            <Route path="/class/:classId" element={<SubjectSelection />} />
            <Route path="/class/:classId/:subject" element={<ChapterSelection />} />
            <Route path="/class/:classId/:subject/:chapter" element={<Quiz />} />
          </Routes>
        </main>

        <footer className="text-center py-6 bg-black/20 backdrop-blur-sm">
          <p className="text-sm text-purple-200">Made by Kakarala Sreevallabh</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;