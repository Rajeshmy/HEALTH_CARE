const express = require('express');
const authRouter = express.Router();
const { registerUser, loginUser } = require('../controlers/authController');

authRouter.post('/register', registerUser);
authRouter.post('/login', loginUser);

module.exports = authRouter;