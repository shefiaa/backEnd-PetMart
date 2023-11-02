const { User, Product, Order } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
require('dotenv').config();

function generateAuthToken(user) {
  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET_KEY, {
    expiresIn: '1h',
  });
  return token;
}

// Skema validasi untuk data registrasi
const registrationSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('admin', 'buyer', 'seller').required(),
});

exports.register = async (req, res) => {
  try {
    // Validasi data registrasi
    const { error } = registrationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { name, email, password, role } = req.body;

    // Periksa apakah email sudah digunakan
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email sudah digunakan' });
    }

   
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword, role });
    const token = generateAuthToken(newUser);

    res.status(201).json({ user: newUser, token });
  } catch (error) {
    res.status(500).json({ error: 'Gagal mendaftarkan pengguna' });
  }
};

// Skema validasi untuk data login
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

exports.login = async (req, res) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'Email atau kata sandi salah' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Email atau kata sandi salah' });
    }

    const token = generateAuthToken(user);

    res.json({ user, token });
  } catch (error) {
    res.status(400).json({ error: 'Gagal masuk' });
  }
};