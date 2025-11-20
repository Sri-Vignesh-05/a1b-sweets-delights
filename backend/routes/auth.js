const express = require('express');
const authCtrl = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/signup', authCtrl.signup);
router.post('/login', authCtrl.login);
router.get('/me', authMiddleware, authCtrl.getUser);

module.exports = router;
