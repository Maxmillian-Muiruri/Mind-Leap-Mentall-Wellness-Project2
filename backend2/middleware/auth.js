
import jwt from "jsonwebtoken";

export const auth = () => {
  return async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) return res.status(401).json({ message: "Unauthorized" });
    
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ message: "Invalid token" });
        req.user = decoded;
        next();
      });
    } catch (error) {
      res.status(401).json({ message: "Invalid token" });
    }
  };
};

export const verifyAdmin = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({
      status: "fail",
      message: "Admin privileges required"
    });
  }
  next();
};
