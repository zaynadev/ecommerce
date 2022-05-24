const express = require('express');
const { createProduct, getProduct } = require('../controllers/product');
const { requireAuth, isAuth, isAdmin } = require('../middleware/auth');
const { ProductById } = require('../middleware/product');

const router = express.Router();

router.post('/create', [requireAuth, isAuth, isAdmin], createProduct);
router.get('/:productId', getProduct);

router.param('productId', ProductById );

module.exports = router;