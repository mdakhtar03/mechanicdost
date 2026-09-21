const router = require('express').Router();

const { submitReview, getMechanicReviews, getMyReviews } = require('../controllers/reviewController');
const { authMiddleware } = require('../middleware/authMiddleware');


router.post('/submit', authMiddleware, submitReview);
router.get('/mechanic/:mechanicId', getMechanicReviews);
router.get('/my-reviews', authMiddleware, getMyReviews);

module.exports = router;