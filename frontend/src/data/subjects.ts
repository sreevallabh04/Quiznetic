import { Calculator, Microscope, GlobeIcon, Map } from 'lucide-react';

export const subjects = [
  { 
    id: 'maths', 
    name: 'Mathematics', 
    icon: Calculator, 
    color: 'bg-blue-500/20',
    description: 'Learn mathematics concepts through interactive lessons and quizzes'
  },
  { 
    id: 'science', 
    name: 'Science', 
    icon: Microscope, 
    color: 'bg-green-500/20',
    description: 'Explore science concepts through engaging content and experiments'
  },
  { 
    id: 'social', 
    name: 'Social Studies', 
    icon: GlobeIcon, 
    color: 'bg-yellow-500/20',
    description: 'Discover history, geography, and civics through interactive lessons'
  },
  { 
    id: 'mapPointing', 
    name: 'Map Pointing', 
    icon: Map, 
    color: 'bg-purple-500/20',
    description: 'Test your geography knowledge with interactive map-based questions'
  },
];