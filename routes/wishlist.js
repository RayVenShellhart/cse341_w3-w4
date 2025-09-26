const express = require('express');
const router = express.Router(); 

const wishController = require('../controllers/wishlist')
const validation = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate')

router.get('/', wishController.getAll);

router.get('/:id', wishController.getSingle);

router.post('/', isAuthenticated , validation.saveWish, wishController.createWish);

router.put('/:id', isAuthenticated , validation.saveWish, wishController.updateWish)

router.delete('/:id', isAuthenticated , wishController.deleteWish);

module.exports = router;