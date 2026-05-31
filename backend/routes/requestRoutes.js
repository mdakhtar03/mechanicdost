const express = require("express");
const router = express.Router();

const {createRequest, getUserRequests, cancelRequest} = require('../controllers/requestController');

const {authMiddleware} = require('../middleware/authMiddleware');

router.post('/create', authMiddleware, createRequest);
router.get('/my-requests', authMiddleware, getUserRequests);
router.patch('/cancel/:id', authMiddleware, cancelRequest);

module.exports = router;