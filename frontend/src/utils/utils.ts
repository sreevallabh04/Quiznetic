/**
 * Production-safe logging utilities
 */

const isDevelopment = import.meta.env.DEV;
const isDebugEnabled = import.meta.env.VITE_ENABLE_DEBUG === 'true';

export const logger = {
  log: (...args: any[]) => {
    if (isDevelopment || isDebugEnabled) {
      console.log(...args);
    }
  },
  
  warn: (...args: any[]) => {
    if (isDevelopment || isDebugEnabled) {
      console.warn(...args);
    }
  },
  
  error: (...args: any[]) => {
    // Always log errors, even in production
    console.error(...args);
  },
  
  info: (...args: any[]) => {
    if (isDevelopment || isDebugEnabled) {
      console.info(...args);
    }
  },
  
  debug: (...args: any[]) => {
    if (isDevelopment && isDebugEnabled) {
      console.debug(...args);
    }
  }
};

/**
 * Environment helpers
 */
export const env = {
  isDevelopment,
  isProduction: import.meta.env.PROD,
  isDebugEnabled,
  appName: import.meta.env.VITE_APP_NAME || 'Quiznetic',
  appVersion: import.meta.env.VITE_APP_VERSION || '1.0.0',
  appEnv: import.meta.env.VITE_APP_ENV || 'development'
};

/**
 * Feature flags
 */
export const features = {
  apiQuestions: import.meta.env.VITE_ENABLE_API_QUESTIONS === 'true',
  analytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  debug: isDebugEnabled
}; 