const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRole } = require('../middleware/auth');
const productController = require('../controllers/productController');

router.post('/', authenticateToken, authorizeRole(['buyer', 'admin']), productController.create);

// Retrieve all products
router.get('/', authenticateToken, authorizeRole('admin'), productController.retrieve);

// Update a product by ID (requires the 'admin' role)
router.put('/', authenticateToken, authorizeRole('admin'), productController.update);

// Delete a product by ID (requires the 'admin' role)
router.delete('/', authenticateToken, authorizeRole('admin'), productController.delete);

module.exports = router;

