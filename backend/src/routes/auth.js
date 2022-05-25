const express = require('express');
const { users, signup, signin, signout } = require('../controllers/auth');
const { requireAuth } = require('../middleware/auth');
const {userSignUpValidator} = require('../middleware/userValidator');

const router = express.Router();

router.get('/', users);
router.post('/signup', userSignUpValidator, signup);
router.post('/signin', signin);
router.post('/signout', signout);
router.get('/hello', requireAuth, (req, res) => {
    res.send('hello');
});


module.exports = router;