const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey"; 

function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];
  console.log("Auth Header:", req.headers["authorization"]);


  if (!authHeader) return res.status(401).json({ error: "No token provided" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Invalid token" });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    console.log("Decoded JWT:", decoded);
    if (err) return res.status(403).json({ error: "Invalid token" });
    req.user = decoded; // contains user id
    next();
  });
}

module.exports = authMiddleware;
