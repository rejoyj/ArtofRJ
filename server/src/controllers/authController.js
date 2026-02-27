import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'Email and password are required.' });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const configuredEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
    const configuredHash = process.env.ADMIN_PASSWORD_HASH;
    const jwtSecret = process.env.JWT_SECRET;

    if (!configuredEmail || !configuredHash || !jwtSecret) {
      return res
        .status(500)
        .json({ message: 'Admin credentials are not configured properly.' });
    }

    if (configuredHash === 'your_bcrypt_hash') {
      return res
        .status(500)
        .json({ message: 'Set ADMIN_PASSWORD_HASH to a real bcrypt hash in server/.env.' });
    }

    if (normalizedEmail !== configuredEmail) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const isMatch = await bcrypt.compare(password, configuredHash);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const token = jwt.sign(
      { role: 'admin', email: configuredEmail },
      jwtSecret,
      { expiresIn: '1d' }
    );

    return res.json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error.' });
  }
};