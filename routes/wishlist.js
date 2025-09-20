const express = require('express');
const router = express.Router(); 

const wishController = require('../controllers/wishlist')
const validation = require('../middleware/validate');


router.get('/', wishController.getAll);

router.get('/:id', wishController.getSingle);

router.post('/',  validation.saveWish, wishController.createWish);

router.put('/:id', validation.saveWish, wishController.updateWish)

router.delete('/:id', wishController.deleteWish);

module.exports = router;