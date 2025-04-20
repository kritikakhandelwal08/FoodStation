import jwt from 'jsonwebtoken';

const JWT_SECRET = "mysecretkey"; // Replace with the same secret key used in your app

const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];  // Extract token from Authorization header

  if (!token) {
    return res.status(401).json({ message: "Not authorized, token missing" });  // If no token is provided
  }

  try {
    // Verify token using jwt.verify
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;  // Attach the decoded user info to the request object
    next();  // Proceed to the next middleware/route handler
  } catch (err) {
    res.status(401).json({ message: "Not authorized, token invalid" });  // If token is invalid or expired
  }
};

export default protect;  // Use export default to export the middleware function
