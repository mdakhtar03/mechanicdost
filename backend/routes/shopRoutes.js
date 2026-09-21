const router = require('express').Router();
const { createShop,getMyShop,updateShop, getShopMechanics, verifyMechanic } = require('../controllers/shopController');
const { authMiddleware } = require('../middleware/authMiddleware');

const { authMiddlewareShopOwner } = require('../middleware/roleMiddleware');

router.post('/create', authMiddleware, authMiddlewareShopOwner, createShop);
router.get('/myshop', authMiddleware, authMiddlewareShopOwner, getMyShop);
router.patch('/update', authMiddleware, authMiddlewareShopOwner, updateShop);
router.get('/mechanics', authMiddleware, authMiddlewareShopOwner, getShopMechanics);
router.patch('/verify/:mechanicId', authMiddleware, authMiddlewareShopOwner, verifyMechanic);
module.exports = router;