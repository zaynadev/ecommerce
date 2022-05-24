const express = require('express');
const { createProduct, getProduct, deleteProduct, editProduct, getProducts } = require('../controllers/product');
const { requireAuth, isAuth, isAdmin } = require('../middleware/auth');
const { ProductById } = require('../middleware/product');

const router = express.Router();

router.post('/create', [requireAuth, isAuth, isAdmin], createProduct);
router.get('/:productId', getProduct);
router.get('/', getProducts);
router.put('/:productId', [requireAuth, isAuth, isAdmin], editProduct);
router.delete('/:productId', [requireAuth, isAuth, isAdmin], deleteProduct);

router.param('productId', ProductById );

module.exports = router;