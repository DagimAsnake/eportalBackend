const express = require('express');
const router = express.Router();
const branchController = require('../controllers/branchController');
const isUserAuth = require('../util/isUserAuth')

/**
 * @swagger
 * tags:
 *   name: Branch
 *   description: API endpoints for Branches
 */

/**
 * @swagger
 * /branch/createbranch:
 *   post:
 *     summary: Create a new branch
 *     description: Endpoint to create a new branch with the user's provided location
 *     tags: [Branch]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               location:
 *                 type: string
 *                 description: The location of the new branch
 *                 example: "New York"
 *             required:
 *               - location
 *     responses:
 *       200:
 *         description: The branch was created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: A success message
 *                   example: "Location Added Successfully"
 *       400:
 *         description: Invalid input provided
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: An error message
 *                   example: "All input is required"
 *       401:
 *         description: Unauthorized request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: An error message
 *                   example: "No such user"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: An error message
 *                   example: "Server error"
 */
router.post("/createbranch", isUserAuth, branchController.CreateBranch)

/**
 * @swagger
 * /branch:
 *   get:
 *     summary: Get all branches
 *     description: Endpoint to get all branches created by the authenticated user
 *     tags: [Branch]
 *     responses:
 *       200:
 *         description: Returns an array of branches
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The unique identifier of the branch
 *                     example: 60c5f7c4b76a4c002098a7b8
 *                   userId:
 *                     type: string
 *                     description: The unique identifier of the user who created the branch
 *                     example: 60c5f7c4b76a4c002098a7b6
 *                   location:
 *                     type: string
 *                     description: The location of the branch
 *                     example: "New York"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: The timestamp when the branch was created
 *                     example: "2021-06-12T15:20:36.785Z"
 *       401:
 *         description: Unauthorized request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: An error message
 *                   example: "Unauthorized"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: An error message
 *                   example: "Server error"
 */
router.get("/", isUserAuth, branchController.viewBranch)

module.exports = router;