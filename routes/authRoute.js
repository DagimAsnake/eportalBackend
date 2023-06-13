const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: API endpoints for authentication and authorization
 */

/**
 * @swagger
 * /auth/:
 *   post:
 *     summary: Create a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               VatRegNo:
 *                 type: string
 *                 description: The VAT registration number of the user.
 *               TaxCenter:
 *                 type: string
 *                 description: The tax center of the user.
 *               TradeName:
 *                 type: string
 *                 description: The trade name of the user.
 *               TinNumber:
 *                 type: string
 *                 description: The TIN number of the user.
 *               Mobile:
 *                 type: string
 *                 description: The mobile number of the user.
 *               Email:
 *                 type: string
 *                 description: The email of the user.
 *             required:
 *               - VatRegNo
 *               - TaxCenter
 *               - TradeName
 *               - TinNumber
 *               - Mobile
 *               - Email
 *     responses:
 *       '201':
 *         description: A successful response, indicating that the user was created.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The ID of the created user.
 *                 vrn:
 *                   type: string
 *                   description: The VAT registration number of the user.
 *                 taxCenter:
 *                   type: string
 *                   description: The tax center of the user.
 *                 tname:
 *                   type: string
 *                   description: The trade name of the user.
 *                 tin:
 *                   type: string
 *                   description: The TIN number of the user.
 *                 phone:
 *                   type: string
 *                   description: The mobile number of the user.
 *                 email:
 *                   type: string
 *                   description: The email of the user.
 *       '400':
 *         description: A bad request, indicating that the form is incomplete.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The error message.
 *       '500':
 *         description: A server error, indicating that the user could not be created.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The error message.
 */
router.post('/', authController.createUser);

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               uuid:
 *                 type: string
 *                 description: Unique user identifier
 *               UserName:
 *                 type: string
 *                 description: User's desired username
 *               Password:
 *                 type: string
 *                 description: User's desired password
 *     responses:
 *       '200':
 *         description: User successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: Unique user identifier
 *                 username:
 *                   type: string
 *                   description: User's username
 *                 password:
 *                   type: string
 *                   description: User's hashed password
 *       '400':
 *         description: Invalid request body or form incomplete
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *       '404':
 *         description: User with the given UUID not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *       '500':
 *         description: Failed to register user due to server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 */
router.post('/register', authController.registerUser);

/**
 * @swagger
 *  /auth/login:
 *   post:
 *     summary: Authenticate user and generate access token
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: User's username
 *               password:
 *                 type: string
 *                 description: User's password
 *     responses:
 *       '200':
 *         description: User successfully authenticated and token generated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT access token
 *       '400':
 *         description: Form incomplete
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *       '401':
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *       '500':
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 */
router.post('/login', authController.handleLogin);

/**
 * @swagger
 * /auth/forgetpassword:
 *   post:
 *     summary: Send password reset link to user's email
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email address
 *     responses:
 *       '200':
 *         description: Password reset link sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Success message
 *       '401':
 *         description: User with the given email does not exist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Error message
 *       '500':
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Error message
 */
router.post("/forgetpassword", authController.forgetPassword);

/**
 * @swagger
 *  /auth/passwordreset/{userId}/{token}:
 *   post:
 *     summary: Change user's forgotten password using reset token
 *     tags: [Authentication]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: User's ID
 *         schema:
 *           type: string
 *       - in: path
 *         name: token
 *         required: true
 *         description: Password reset token received via email
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newPassword:
 *                 type: string
 *                 description: User's new password
 *               confirmNewPassword:
 *                 type: string
 *                 description: User's new password confirmation
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
 *       '401':
 *         description: Invalid or Expired Token, Passwords must match
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Error message
 *       '500':
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Error message
 */
router.post("/passwordreset/:userId/:token", authController.changeForgetPassword);

module.exports = router;