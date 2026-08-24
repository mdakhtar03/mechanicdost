
const router = require('express').Router();

const {getNearbyRequests,acceptRequest, requestCompletionOTP, completeRequest} = require('../controllers/mechanicController');
const {authMiddleware} = require('../middleware/authMiddleware');


router.get('/nearby-requests', authMiddleware, getNearbyRequests);
router.patch('/accept/:id', authMiddleware, acceptRequest);
router.patch('/request-completion-otp/:id', authMiddleware, requestCompletionOTP);
router.patch('/complete/:id', authMiddleware, completeRequest);

module.exports = router;