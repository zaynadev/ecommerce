const express = require('express');
const { createProduct } = require('../controllers/product');
const { requireAuth, isAuth, isAdmin } = require('../middleware/auth');

const router = express.Router();

router.post('/create', [requireAuth, isAuth, isAdmin], createProduct);

module.exports = router;