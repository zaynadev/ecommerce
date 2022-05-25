const express = require('express');
const { createCategory, editCategory, deleteCategory, getCategory, getAllCategories } = require('../controllers/category');
const { requireAuth, isAuth, isAdmin } = require('../middleware/auth');
const { getOneCategory } = require('../middleware/category');

const router = express.Router();


router.post('/create',[requireAuth, isAuth, isAdmin], createCategory);
router.put('/:categoryId',[requireAuth, isAuth, isAdmin], editCategory);
router.delete('/:categoryId',[requireAuth, isAuth, isAdmin], deleteCategory);
router.get('/:categoryId', getCategory);
router.get('/', getAllCategories);

router.param('categoryId', getOneCategory);

module.exports = router;