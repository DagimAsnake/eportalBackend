const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/', authController.createUser);
router.post('/register', authController.registerUser);
router.post('/login', authController.handleLogin);
router.post("/forgetpassword", authController.forgetPassword);
router.post("/passwordreset/:userId/:token", authController.changeForgetPassword);

module.exports = router;