const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const secret_key = process.env.SECRET_KEY;



const requireAuth = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, secret_key , (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid token' });
      } else {
        req.userId = decodedToken.userId;
        next();
      }
    });
  } else {
    res.status(401).json({ message: 'No token provided' });
  }
};

module.exports = requireAuth;