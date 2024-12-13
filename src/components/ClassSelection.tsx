import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import { Card } from './ui/Card';
import { PageTitle } from './ui/PageTitle';

const classes = [6, 7, 8, 9, 10];

export default function ClassSelection() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto"
    >
      <PageTitle title="Select Your Class" />
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {classes.map((classNum) => (
          <Card key={classNum} onClick={() => navigate(`/class/${classNum}`)}>
            <div className="flex flex-col items-center gap-4">
              <div className="p-3 bg-purple-500/20 rounded-full">
                <BookOpen className="w-8 h-8" />
              </div>
              <span className="text-xl font-semibold">Class {classNum}</span>
            </div>
          </Card>
        ))}
      </div>
    </motion.div>
  );
}