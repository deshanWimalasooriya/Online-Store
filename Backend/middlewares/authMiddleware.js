const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
  let token = null;

  // Check Authorization header first
  if (req.headers['authorization']) {
    token = req.headers['authorization'].split(' ')[1];
  }

  // If no token in header, check cookies (requires cookie-parser)
  if (!token && req.cookies) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'yoursecretkey');
    req.user = decoded; // Attach decoded token info to request
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token.' });
  }
};

const authorizeAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied: Admins only' });
  }
  next();
};

module.exports = { authenticateJWT, authorizeAdmin };
