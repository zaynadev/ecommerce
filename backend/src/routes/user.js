const express = require('express');
const { userById } = require('../middleware/user');
const { getOneUser, editOneUser } = require('../controllers/user');
const { requireAuth, isAuth } = require('../middleware/auth');

const router = express.Router();

router.get('/profile/:userId', requireAuth, isAuth, getOneUser);
router.put('/profile/:userId', requireAuth, isAuth, editOneUser);

router.param('userId', userById);

module.exports = router;