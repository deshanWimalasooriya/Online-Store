const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'yoursecretkey';

// Register new user
exports.register = async (req, res) => {
  const { username, email, password, role = 'user' } = req.body;

  try {
    const existingUser = await userModel.getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userModel.createUser({ username, email, password: hashedPassword, role });

    res.status(201).json({ message: 'User registered successfully', user: { id: newUser.id, username, email, role } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login user and issue JWT in HTTP-only cookie
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.getUserByEmail(email);
    if (!user) return res.status(401).json({ message: 'Invalid email or password' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ message: 'Invalid email or password' });

    const payload = {
      id: user.id,
      username: user.username,
      role: user.role,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

    // Set token as HTTP-only cookie
    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 3600000 });

    res.json({ message: 'Login successful', user: payload });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
