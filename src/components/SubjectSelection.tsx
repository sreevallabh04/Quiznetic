import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { subjects } from '../data/subjects';
import { Card } from './ui/Card';
import { PageTitle } from './ui/PageTitle';

export default function SubjectSelection() {
  const navigate = useNavigate();
  const { classId } = useParams();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      <PageTitle title={`Class ${classId} Subjects`} />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {subjects.map(({ id, name, icon: Icon, color, description }) => (
          <Card key={id} onClick={() => navigate(`/class/${classId}/${id}`)}>
            <div className="flex flex-col items-center gap-4">
              <div className={`p-4 ${color} rounded-full`}>
                <Icon className="w-12 h-12" />
              </div>
              <div className="text-center">
                <span className="text-xl font-semibold block">{name}</span>
                <p className="text-sm text-gray-300 mt-2">{description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </motion.div>
  );
}