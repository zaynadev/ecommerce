const express = require('express');
const { createProduct, getProduct, deleteProduct, editProduct, getProducts, relatedProducts, searchProduct } = require('../controllers/product');
const { requireAuth, isAuth, isAdmin } = require('../middleware/auth');
const { ProductById } = require('../middleware/product');

const router = express.Router();

router.get('/', getProducts);
router.post('/create', [requireAuth, isAuth, isAdmin], createProduct);
router.post('/search', searchProduct);
router.get('/:productId', getProduct);
router.get('/related/:productId', relatedProducts);
router.put('/:productId', [requireAuth, isAuth, isAdmin], editProduct);
router.delete('/:productId', [requireAuth, isAuth, isAdmin], deleteProduct);

router.param('productId', ProductById );

module.exports = router;