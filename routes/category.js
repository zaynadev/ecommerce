const express = require('express');
const { createCategory } = require('../controllers/category');
const { requireAuth, isAuth, isAdmin } = require('../middleware/auth');

const router = express.Router();


router.post('/create',[requireAuth, isAuth, isAdmin], createCategory);

module.exports = router;