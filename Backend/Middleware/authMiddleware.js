const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const secret_key = process.env.SECRET_KEY;


const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if the authorization header is present and starts with "Bearer "
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1]; // Extract the token part after "Bearer "

    jwt.verify(token, secret_key, (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid token' });
      } else {
        req.userId = decodedToken.userId; // Attach the userId to the request object
        next();
      }
    });
  } else {
    res.status(401).json({ message: 'No token provided or invalid format' });
  }
};

module.exports = requireAuth;