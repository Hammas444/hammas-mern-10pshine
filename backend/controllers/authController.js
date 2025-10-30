
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import pino from "pino";
const logger = pino({
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
    },
  },
});

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey"; 

// Register
async function register(req, res) {
  try {
    const { username, email, password } = req.body;
    logger.info({ email, username }, "Attempting user registration");

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ username, email, password: hashedPassword });    

    logger.info({ userId: user.id, email }, "User registered successfully");
    res.status(201).json({ 
      message: "User registered", 
      user: { id: user.id, username, email } 
    });

  } catch (error) {
    logger.error({ err: error.message, email: req.body.email }, "Registration failed");

    if (error.name === 'SequelizeUniqueConstraintError') {
      const errors = error.errors.map(err => err.message);
      return res.status(400).json({ error: "Registration failed", details: errors });
    } else if (error.name === 'SequelizeValidationError') {
      const errors = error.errors.map(err => err.message);
      return res.status(400).json({ error: "Registration failed", details: errors });
    }

    res.status(500).json({ error: "Registration failed", details: error.message });
  }
}


// Login
async function login(req, res) {
  try {
    const { email, password } = req.body;
    logger.info({ email }, "Login attempt");

    // 1. Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      logger.warn({ email }, "Login failed: user not found");
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // 2. Compare entered password with hashed password in DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      logger.warn({ email }, "Login failed: incorrect password");
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // 3. Generate JWT token
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "30d" });

    logger.info({ userId: user.id, email }, "Login successful");
    res.json({
      message: "Login successful",
      token,
      user: { id: user.id, username: user.username, email: user.email },
    });

  } catch (err) {
    logger.error({ err: err.message, email: req.body.email }, "Server error during login");
    res.status(500).json({ error: "Server error" });
  }
}


async function getUsers(req, res) {

try {
  const  id  = req.user.id;
  const users = await User.findByPk(id);
  if (!users) {
    return res.status(404).json({ error: "User not found" });
  }
  res.json(users);

}  
catch (error) {

res.status(500).json({ error: "Failed to fetch users", details: error.message });

}



}


async function updateUser(req, res) {

try {

  const  userId  = req.params.id;
  const { username, email, password } = req.body;
  const user = await User.findByPk(userId);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  user.username = username || user.username;
  user.email = email || user.email;
  if (password) {
    user.password = await bcrypt.hash(password, 10);
  }
  await user.save();
  res.json(user);

} 
catch (error) {

res.status(500).json({ error: "Failed to update user", details: error.message });

}



}



export  { register, login, getUsers, updateUser };