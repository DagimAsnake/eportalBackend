const express = require('express');
const router = express.Router();
const branchController = require('../controllers/branchController');
const isUserAuth = require('../util/isUserAuth')

router.post("/createbranch", isUserAuth, branchController.CreateBranch)
router.get("/", isUserAuth, branchController.viewBranch)

module.exports = router;