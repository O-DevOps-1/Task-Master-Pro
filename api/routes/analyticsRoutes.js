const express = require('express');
const { getTaskAnalytics, getProjectAnalytics } = require('../controllers/analyticsController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();


router.use(authMiddleware);
router.get('/tasks', getTaskAnalytics);
router.get('/projects', getProjectAnalytics);

module.exports = router;
