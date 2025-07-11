const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const users = [
  { id: 1, email: 'admin@example.com', password: 'admin123', role: 'admin' },
  { id: 2, email: 'user@example.com', password: 'user123', role: 'user' }
];

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Email yoki parol noto‘g‘ri' });
  }

  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '1h'
  });

  res.json({ token, role: user.role });
});

module.exports = router;