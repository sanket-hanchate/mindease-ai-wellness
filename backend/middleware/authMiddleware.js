const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers["x-access-token"];
    const token = authHeader ? authHeader.split(" ").pop().trim() : null;
    const secret = process.env.JWT_SECRET;

    console.log("Authorization Header:", authHeader);
    console.log("Token provided:", token ? `${token.slice(0, 8)}...` : "none");
    console.log("JWT Secret configured:", !!secret);

    if (!token) {
      return res.status(401).json({
        message: "No token provided",
      });
    }

    if (!secret) {
      console.log("JWT secret is missing in environment.");
      return res.status(500).json({
        message: "Server configuration error",
      });
    }

    const decoded = jwt.verify(token, secret);

    console.log("Decoded JWT payload:", decoded);

    const userId = decoded.userId || decoded.id;
    if (!userId) {
      return res.status(401).json({
        message: "Invalid token payload",
      });
    }

    req.user = { ...decoded, userId };

    next();

  } catch (error) {
    console.log("JWT Error:", error);

    return res.status(401).json({
      message: "Invalid token",
      error: error.message
    });

  }
};

module.exports = authMiddleware;