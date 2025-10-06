// config/app.config.js
const config = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 8000,

  // Client configuration
  clientUrl: (process.env.CLIENT_URL || 'http://localhost:5173').replace(
    /\/$/,
    ''
  ),

  // Multiple allowed origins for CORS and postMessage
  allowedOrigins: (process.env.ALLOWED_ORIGINS || 'http://localhost:5173')
    .split(',')
    .map(origin => origin.trim().replace(/\/$/, '')),

  // Cookie settings based on environment
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
    path: '/',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  },
};

export { config };
