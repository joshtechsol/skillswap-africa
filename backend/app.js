const User = require("./models/User");
const bcrypt = require("bcrypt");"^5.1.0",
const { generateToken, authMiddleware } = require("./auth");

// Signup
app.post("/signup", async (req, res) => {
  const { name, email, password, location } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({ name, email, passwordHash, location, skillsOffered: [], skillsWanted: [] });
    res.json({ token: generateToken(user) });
  } catch (e) {
    res.status(400).json({ error: "Email already exists" });
  }
});

// Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ error: "Invalid credentials" });
  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return res.status(400).json({ error: "Invalid credentials" });
  res.json({ token: generateToken(user) });
});

// Protected route example
app.get("/me", authMiddleware, (req, res) => {
  res.json(req.user);
});