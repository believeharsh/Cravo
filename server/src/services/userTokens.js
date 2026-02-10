import JWT from 'jsonwebtoken';

import { EnvConfig } from '../config/env.config.js';

function createAccessToken(user) {
  const payload = {
    _id: user._id,
    email: user.email,
    // profilImageURL: user.profileImageURL,
    role: user.role,
  };
  const accessToken = JWT.sign(payload, EnvConfig.ACCESS_TOKEN_SECRET, {
    expiresIn: EnvConfig.ACCESS_TOKEN_EXPIRY,
  });
  return accessToken;
}

function createRefreshToken(userId) {
  const payload = { userId };
  const refreshToken = JWT.sign(payload, EnvConfig.REFRESH_TOKEN_SECRET, {
    expiresIn: EnvConfig.REFRESH_TOKEN_EXPIRY,
  });
  return refreshToken;
}

function validateToken(token) {
  const payload = JWT.verify(token, EnvConfig.ACCESS_TOKEN_SECRET);
  return payload;
}

export { createAccessToken, createRefreshToken, validateToken };
