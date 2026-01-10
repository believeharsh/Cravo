import { EnvConfig } from './env.config.js';

const config = {
  nodeEnv: EnvConfig.NODE_ENV || 'development',
  port: EnvConfig.PORT || 8000,

  // Client configuration
  clientUrl: (EnvConfig.CLIENT_URL || 'http://localhost:5173').replace(
    /\/$/,
    ''
  ),

  // Multiple allowed origins for CORS and postMessage
  allowedOrigins: (EnvConfig.ALLOWED_ORIGINS || 'http://localhost:5173')
    .split(',')
    .map(origin => origin.trim().replace(/\/$/, '')),

  // Cookie settings based on environment
  cookie: {
    httpOnly: true,
    secure: EnvConfig.NODE_ENV === 'production',
    sameSite: EnvConfig.NODE_ENV === 'production' ? 'None' : 'Lax',
    path: '/',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  },
};

export { config };
