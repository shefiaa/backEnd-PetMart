const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRole } = require('../middleware/auth');

const orderController = require('../controllers/orderController');

router.post('/', authenticateToken, authorizeRole('buyer'), orderController.create);

router.get('/', authenticateToken, authorizeRole(['admin']), orderController.retrieve);

// Retrieve order by ID
router.get('/', authenticateToken, authorizeRole(['seller']), orderController.show);

// Update an order by ID
router.put('/', authenticateToken, authorizeRole(['buyer', 'seller']), orderController.update);

// Delete an order by ID
router.delete('/', authenticateToken, authorizeRole(['buyer', 'seller']), orderController.delete);

module.exports = router;