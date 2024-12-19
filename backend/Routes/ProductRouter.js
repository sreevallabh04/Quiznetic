const ensureAuthenticated = require('../Middlewares/Auth');

const router = require('express').Router();


router.get('/', ensureAuthenticated, (req,res)=>{
    res.status(200).json([
        {
            name : "john",
            price: "2000"

        },
        {
            name : "jk",
            price: "1000"

        }
    ])
});

module.exports = router;