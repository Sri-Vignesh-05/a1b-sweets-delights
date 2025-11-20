const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    // Accept token from Authorization header, x-access-token header, or query param for flexibility
    let token = null;
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      token = req.headers.authorization.split(' ')[1];
    }
    token = token || req.headers['x-access-token'] || req.query.token;

    if (!token) {
      console.warn('Auth middleware: missing token');
      return res.status(401).json({ message: 'Authorization token required' });
    }

    const secret = process.env.JWT_SECRET || 'your-secret-key';
    let decoded;
    try {
      decoded = jwt.verify(token, secret);
    } catch (err) {
      console.warn('Auth middleware: token verification failed', err.message);
      return res.status(401).json({ message: 'Invalid or expired token' });
    }

    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error('Auth middleware error', error);
    res.status(401).json({ message: 'Authorization failed' });
  }
};

module.exports = authMiddleware;
