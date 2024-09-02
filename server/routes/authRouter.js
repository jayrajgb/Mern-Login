const { handleSignUp, handleLogin } = require('../controllers/authController');
const { signupValidation, loginValidation } = require('../middlewares/validation');

const authRouter = require('express').Router();

authRouter.post("/login", loginValidation, handleLogin);
authRouter.post("/signup", signupValidation, handleSignUp);

module.exports = authRouter;