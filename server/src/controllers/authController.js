import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  const configuredEmail = process.env.ADMIN_EMAIL;
  const configuredHash = process.env.ADMIN_PASSWORD_HASH;

  if (!configuredEmail || !configuredHash || !process.env.JWT_SECRET) {
    return res.status(500).json({ message: 'Admin credentials are not configured properly.' });
  }

  if (email !== configuredEmail) {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }

  const isMatch = await bcrypt.compare(password, configuredHash);

  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }

  const token = jwt.sign({ role: 'admin', email }, process.env.JWT_SECRET, { expiresIn: '1d' });

  return res.json({ token });
};
