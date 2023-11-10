const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { User } = require('../models');

dotenv.config(); // Memuat variabel lingkungan dari berkas .env
const secretKey = process.env.JWT_SECRET_KEY;

function authenticateToken(req, res, next) {
  const token = req.headers['x-auth-token'];

  if (!token) {
    return res.status(401).json({ message: 'Token tidak tersedia, akses ditolak' });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token tidak valid, akses ditolak' });
    }

    User.findByPk(user.id)
      .then((foundUser) => {
        if (!foundUser) {
          return res.status(401).json({ message: 'Pengguna tidak ditemukan, akses ditolak' });
        }

        req.user = foundUser; // Menambahkan informasi pengguna ke objek permintaan
        next();
      })
      .catch((error) => {
        return res.status(500).json({ message: 'Terjadi kesalahan dalam mengambil pengguna', error: error.message });
      });
  });
}

function authorizeRole(allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(403).json({ message: 'Akses ditolak, pengguna tidak diotentikasi' });
    }

    if (Array.isArray(allowedRoles) && allowedRoles.includes(req.user.role)) {
      next();
    } else if (req.user.role === allowedRoles) {
      next();
    } else {
      res.status(403).json({ message: 'Akses ditolak, peran pengguna tidak sesuai' });
    }
  };
}

module.exports = {
  authenticateToken,
  authorizeRole,
};
