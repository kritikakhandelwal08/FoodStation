import jwt from 'jsonwebtoken';

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Extract token from Authorization header

  if (!token) {
    return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
    req.user = decoded;  // Attach the user data to the request object
    next();  // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(400).json({ success: false, message: 'Invalid token' });
  }
};

export default authenticateToken;
