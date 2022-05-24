const express = require('express');
const { userById } = require('../middleware/user');
const { getOneUser } = require('../controllers/user');
const { requireAuth, isAuth, isAdmin } = require('../middleware/auth');

const router = express.Router();

router.get('/profile/:userId', requireAuth, isAuth, getOneUser);

router.param('userId', userById);

module.exports = router;