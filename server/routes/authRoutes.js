const express = require('express');
const authRouter = express.Router();
const { registerUser, loginUser, registerDoctor } = require('../controlers/authController');

authRouter.post('/register', registerUser);
authRouter.post('/registerDoctor', registerDoctor);
authRouter.post('/login', loginUser);

module.exports = authRouter;