const router = require('express').Router();

router.use('/', require('./swagger'));

router.get("/", (req, res) => {
    //#swagger.tags=['Hello World']
    res.send("Hello World")
});

router.use('/games', require('./games'));
router.use('/wish', require('./wishlist'));

module.exports = router;