import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ClerkProvider } from '@clerk/clerk-react';
import App from './App.tsx';
import './index.css';
import 'react-toastify/ReactToastify.css';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// Better error handling for missing Clerk key
if (!PUBLISHABLE_KEY) {
  console.error('🔑 Missing Clerk Publishable Key!');
  console.error('📋 Please set VITE_CLERK_PUBLISHABLE_KEY in your environment variables');
  console.error('🌐 For Vercel: Add it in Project Settings > Environment Variables');
  console.error('🔗 Get your key from: https://dashboard.clerk.com');
  
  // Create error display component
  const ErrorDisplay = () => (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '2rem',
      fontFamily: 'system-ui, sans-serif',
      backgroundColor: '#f8f9fa'
    }}>
      <div style={{
        maxWidth: '600px',
        padding: '2rem',
        backgroundColor: 'white',
        borderRadius: '8px',
        border: '2px solid #dc3545',
        textAlign: 'center'
      }}>
        <h1 style={{ color: '#dc3545', marginBottom: '1rem' }}>
          🔑 Configuration Required
        </h1>
        <p style={{ marginBottom: '1rem', color: '#666' }}>
          Missing Clerk Publishable Key. Please configure authentication:
        </p>
        <div style={{ 
          backgroundColor: '#f8f9fa', 
          padding: '1rem', 
          borderRadius: '4px',
          marginBottom: '1rem',
          textAlign: 'left'
        }}>
          <p><strong>For Vercel Deployment:</strong></p>
          <ol style={{ margin: '0.5rem 0', paddingLeft: '1.5rem' }}>
            <li>Go to your Vercel project dashboard</li>
            <li>Navigate to Settings → Environment Variables</li>
            <li>Add: <code>VITE_CLERK_PUBLISHABLE_KEY</code></li>
            <li>Get your key from <a href="https://dashboard.clerk.com" target="_blank">dashboard.clerk.com</a></li>
            <li>Redeploy your application</li>
          </ol>
        </div>
        <p style={{ fontSize: '0.9rem', color: '#666' }}>
          Check the browser console for more details.
        </p>
      </div>
    </div>
  );

  createRoot(document.getElementById('root')!).render(<ErrorDisplay />);
} else {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
        <App />
      </ClerkProvider>
    </StrictMode>
  );
}
