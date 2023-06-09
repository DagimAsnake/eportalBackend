const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const isUserAuth = require('../util/isUserAuth')

router.put("/edit", isUserAuth, userController.EditUserProfile);
router.get('/', isUserAuth, userController.viewProfile)

module.exports = router;