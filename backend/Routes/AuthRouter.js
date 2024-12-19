const {signup, login} = require('../Controllers/AuthContoller');
const { signupValidation, loginValidation } = require('../Midllewares/AuthValidation');
const router = require('express').Router();


router.post('/login', loginValidation, login);
router.post('/signup', signupValidation, signup);

module.exports = router;