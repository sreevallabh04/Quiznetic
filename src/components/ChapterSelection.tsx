import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import { chapterData } from '../data/chapterData';
import { subjects } from '../data/subjects';
import { Card } from './ui/Card';
import { PageTitle } from './ui/PageTitle';

export default function ChapterSelection() {
  const navigate = useNavigate();
  const { classId, subject } = useParams<{ classId: string; subject: string }>();

  const currentSubject = subjects.find((s) => s.id === subject);

  // Allowed class levels
  const allowedClassIds = [6, 7, 8, 9, 10] as const;

  // Safely parse and validate classId
  const parsedClassId = Number(classId);
  const isValidClassId = allowedClassIds.includes(parsedClassId as typeof allowedClassIds[number]);

  if (!isValidClassId || !currentSubject) {
    return (
      <div className="max-w-4xl mx-auto">
        <PageTitle title="Error" />
        <p className="text-center text-gray-400">
          Invalid class or subject. Please check your URL and try again.
        </p>
      </div>
    );
  }

  const subjectChapters = chapterData[subject as keyof typeof chapterData]?.[parsedClassId] || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      <PageTitle title={`${currentSubject.name} Chapters`} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {subjectChapters.length > 0 ? (
          subjectChapters.map((chapter) => (
            <Card
              key={chapter.id}
              onClick={() => navigate(`/class/${classId}/${subject}/${chapter.id}`)}
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 ${currentSubject.color || 'bg-purple-500/20'} rounded-full`}>
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-sm text-purple-300">Chapter {chapter.id}</span>
                  <h3 className="text-lg font-semibold">{chapter.title}</h3>
                  <p className="text-sm text-gray-300 mt-1">{chapter.description}</p>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <p className="text-gray-400 text-center col-span-2">
            No chapters available for this class and subject.
          </p>
        )}
      </div>
    </motion.div>
  );
}
