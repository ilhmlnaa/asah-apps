const Jwt = require('jsonwebtoken');
const InvariantError = require('../exceptions/InvariantError');
const config = require('../utils/config');

const TokenManager = {
  generateAccessToken: (payload) => Jwt.sign(payload, config.jwt.accessTokenKey),
  generateRefreshToken: (payload) => Jwt.sign(payload, config.jwt.refreshTokenKey),
  verifyRefreshToken: (refreshToken) => {
    try {
      const artifacts = Jwt.verify(refreshToken, config.jwt.refreshTokenKey);
      return artifacts;
    } catch (error) {
      throw new InvariantError('Refresh token tidak valid');
    }
  },
};

module.exports = TokenManager;
