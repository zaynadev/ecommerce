const express = require('express');
const { users, signup, signin, signout } = require('../controllers/users');
const {userSignUpValidator} = require('./../middleware/userValidator');

const router = express.Router();

router.get('/', users);
router.post('/signup', userSignUpValidator, signup);
router.post('/signin', signin);
router.post('/signout', signout);


module.exports = router;