const {signup} = require('../Controllers/AuthContoller');
const { signupValidation } = require('../Midllewares/AuthValidation');
const router = require('express').Router();

router.post('/login', (req,res) => {
    res.send('login success');
});
router.post('/signup', signupValidation, signup);

module.exports = router;