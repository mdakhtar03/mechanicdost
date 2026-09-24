const router = require('express').Router();

const {
    getAllShops,
    verifyShop,
    getAllpersons,
    blockUser,
    unblockUser,
    getDashboardStats
} = require('../controllers/adminController');

const { authMiddleware } = require('../middleware/authMiddleware');

const {authMiddlewarePlatformAdmin} = require('../middleware/roleMiddleware');

// Get all shops
router.get('/shops', authMiddleware, authMiddlewarePlatformAdmin, getAllShops);

// Verify shop
router.patch('/shops/:shopId/verify', authMiddleware, authMiddlewarePlatformAdmin, verifyShop);

// Get all users
router.get('/users', authMiddleware, authMiddlewarePlatformAdmin, getAllpersons);

// Block user
router.put('/users/:userId/block', authMiddleware, authMiddlewarePlatformAdmin, blockUser);

// Unblock user
router.put('/users/:userId/unblock', authMiddleware, authMiddlewarePlatformAdmin, unblockUser);

// Get dashboard stats
router.get('/stats', authMiddleware, authMiddlewarePlatformAdmin, getDashboardStats);

module.exports = router;