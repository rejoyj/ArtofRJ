import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const adminLogin = async (req, res) => {
 codex/create-full-blog-page-with-react-and-tailwind-nractx
  const email = req.body.email?.trim().toLowerCase();
  const password = req.body.password;

  const { email, password } = req.body;
 main

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

 codex/create-full-blog-page-with-react-and-tailwind-nractx
  const configuredEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
=======
  const configuredEmail = process.env.ADMIN_EMAIL;
main
  const configuredHash = process.env.ADMIN_PASSWORD_HASH;

  if (!configuredEmail || !configuredHash || !process.env.JWT_SECRET) {
    return res.status(500).json({ message: 'Admin credentials are not configured properly.' });
  }

 codex/create-full-blog-page-with-react-and-tailwind-nractx
  if (configuredHash === 'your_bcrypt_hash') {
    return res.status(500).json({ message: 'Set ADMIN_PASSWORD_HASH to a real bcrypt hash in server/.env.' });
  }

=======
 main
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
