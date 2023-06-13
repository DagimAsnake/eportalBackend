const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const isUserAuth = require('../util/isUserAuth')

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API endpoints for Users
 */


/**
 * @swagger
 * /user/edit:
 *   put:
 *     summary: Update a user's profile
 *     description: Update the details of a user's profile, including their username, email, tax identification number (TIN), value-added tax registration number (VRN), tax center, tax name, and phone number.
 *     tags: [Users]
 *     requestBody:
 *       description: User profile details to update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: User's new username
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's new email address
 *               tin:
 *                 type: string
 *                 description: User's new TIN
 *               vrn:
 *                 type: string
 *                 description: User's new VRN
 *               taxCenter:
 *                 type: string
 *                 description: User's new tax center
 *               tname:
 *                 type: string
 *                 description: User's new tax name
 *               phone:
 *                 type: string
 *                 description: User's new phone number
 *             required:
 *               - username
 *               - email
 *     responses:
 *       '200':
 *         description: User profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: User's ID
 *                     username:
 *                       type: string
 *                       description: User's username
 *                     email:
 *                       type: string
 *                       format: email
 *                       description: User's email address
 *                     tin:
 *                       type: string
 *                       description: User's TIN
 *                     vrn:
 *                       type: string
 *                       description: User's VRN
 *                     taxCenter:
 *                       type: string
 *                       description: User's tax center
 *                     tname:
 *                       type: string
 *                       description: User's tax name
 *                     phone:
 *                       type: string
 *                       description: User's phone number
 *       '400':
 *         description: Invalid request body
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *       '401':
 *         description: Unauthorized access
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *       '404':
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
router.put("/edit", isUserAuth, userController.EditUserProfile);

/**
 * @swagger
 * /user/:
 *   get:
 *     summary: Get the profile of the authenticated user
 *     description: Retrieve the details of the authenticated user's profile, excluding their password.
 *     tags: [Users]
 *     responses:
 *       '200':
 *         description: User profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: User's ID
 *                 username:
 *                   type: string
 *                   description: User's username
 *                 email:
 *                   type: string
 *                   format: email
 *                   description: User's email address
 *                 tin:
 *                   type: string
 *                   description: User's TIN
 *                 vrn:
 *                   type: string
 *                   description: User's VRN
 *                 taxCenter:
 *                   type: string
 *                   description: User's tax center
 *                 tname:
 *                   type: string
 *                   description: User's tax name
 *                 phone:
 *                   type: string
 *                   description: User's phone number
 *       '401':
 *         description: Unauthorized access
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
router.get('/', isUserAuth, userController.viewProfile)

/**
 * @swagger
 * /user/changepassword:
 *   post: 
 *     summary: Change the password of the authenticated user
 *     description: Update the password of the authenticated user.
 *     tags: [Users]
 *     requestBody:
 *       description: Old and new password details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *                 description: User's current password
 *               newPassword:
 *                 type: string
 *                 description: User's new password
 *               confirmNewPassword:
 *                 type: string
 *                 description: User's new password (confirmation)
 *             required:
 *               - oldPassword
 *               - newPassword
 *               - confirmNewPassword
 *     responses:
 *       '200':
 *         description: Password changed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Success message
 *       '400':
 *         description: Invalid request body
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Error message
 *       '401':
 *         description: Unauthorized access
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Error message
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
router.post("/changepassword", isUserAuth, userController.ChangePassword)


/**
 * @swagger
 * /user/addsector:
 *   post:
 *     summary: Add a sector to the user
 *     description: Endpoint to add a sector to the authenticated user's profile
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sector:
 *                 type: string
 *                 description: The sector to add to the user's profile
 *                 example: "Technology"
 *             required:
 *               - sector
 *     responses:
 *       200:
 *         description: The sector was added to the user's profile successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: A success message
 *                   example: "sector added Successfully"
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
router.post("/addsector", isUserAuth, userController.AddSector)

/**
 * @swagger
 * /user/sector:
 *   get:
 *     summary: Get the user's sector
 *     description: Endpoint to get the sector of the authenticated user
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Returns the user's sector
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The unique identifier of the user
 *                   example: 60c5f7c4b76a4c002098a7b6
 *                 name:
 *                   type: string
 *                   description: The name of the user
 *                   example: "John Doe"
 *                 email:
 *                   type: string
 *                   description: The email address of the user
 *                   example: "johndoe@example.com"
 *                 sector:
 *                   type: string
 *                   description: The sector of the user
 *                   example: "Technology"
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
router.get('/sector', isUserAuth, userController.viewSector)

module.exports = router;