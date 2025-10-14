const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticateJWT, authorizeAdmin } = require('../middlewares/authMiddleware');

router.post('/login', authController.login);
router.post('/register', authController.register);

router.get('/admin/dashboard', authenticateJWT, authorizeAdmin, (req, res) => {
  res.json({ message: 'Welcome to admin dashboard' });
});

module.exports = router;
