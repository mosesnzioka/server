import jwt from "jsonwebtoken";

function verifyToken(req, res, next) {
  const { authToken } = req.cookies;
  if (!authToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(authToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.userId = decoded.id; // Ensure the correct user ID is set
    console.log("Decoded user ID:", req.userId);
    next();
  });
}

export default verifyToken;
