// https://github.com/auth0/node-jsonwebtoken
// expiresIn: expressed in seconds or a string describing a time span vercel/ms.
import ms from 'ms';

export default {
  jwt: {
    secret: process.env.APP_SECRET || 'app_secret',
    expiresInToken: '7d',
  },
};
