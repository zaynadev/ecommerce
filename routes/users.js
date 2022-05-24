const express = require('express');
const { users, signup } = require('../controllers/users');
const {userSignUpValidator} = require('./../middleware/userValidator');

const router = express.Router();

router.get('/', users);
router.post('/signup', userSignUpValidator, signup);


module.exports = router;