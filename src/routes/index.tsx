import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { HomePage } from '../pages/HomePage';
import { ClassicalCiphersPage } from '../pages/ClassicalCiphersPage';
import { ModernEncryptionPage } from '../pages/ModernEncryptionPage';
import { PracticePage } from '../pages/PracticePage';
import { AchievementsPage } from '../pages/AchievementsPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'classical-ciphers', element: <ClassicalCiphersPage /> },
      { path: 'modern-encryption', element: <ModernEncryptionPage /> },
      { path: 'practice', element: <PracticePage /> },
      { path: 'achievements', element: <AchievementsPage /> },
    ],
  },
]);