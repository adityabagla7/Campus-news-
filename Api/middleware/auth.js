import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  // Get token from cookie
  const token = req.cookies.access_token;
  
  if (!token) {
    return res.status(401).json({ message: "You are not authenticated" });
  }
  
  // Verify token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Token is invalid or expired" });
    }
    
    // Set user info in request object
    req.user = user;
    next();
  });
};

// Middleware to check if user is the owner of a resource
export const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id) {
      next();
    } else {
      return res.status(403).json({ message: "You are not authorized to perform this action" });
    }
  });
};