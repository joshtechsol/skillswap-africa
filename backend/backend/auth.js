const jwt = require"jsonwebtoken": "^9.0.2",
const SECRET = process.env.JWT_SECRET;

function generateToken(user) {
  return jwt.sign({ id: user._id, name: user.name }, SECRET, { expiresIn: "1d" });
}

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "No token" });
  const token = authHeader.split(" ")[1];
  try {
    req.user = jwt.verify(token, SECRET);
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
}

module.exports = { generateToken, authMiddleware };