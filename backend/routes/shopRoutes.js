const router = require('express').Router();
const { createShop,getMyShop,updateShop, getShopMechanics, verifyMechanic } = require('../controllers/shopController');
const { authMiddleware } = require('../middleware/authMiddleware');

const { authMiddlewareAdmin } = require('../middleware/roleMiddleware');

router.post('/create', authMiddleware, authMiddlewareAdmin, createShop);
router.get('/myshop', authMiddleware, authMiddlewareAdmin, getMyShop);
router.patch('/update', authMiddleware, authMiddlewareAdmin, updateShop);
router.get('/mechanics', authMiddleware, getShopMechanics);
router.patch('/verify/:mechanicId', authMiddleware, authMiddlewareAdmin, verifyMechanic);
module.exports = router;