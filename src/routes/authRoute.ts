import express from 'express'
import { login, logout, register } from '../controllers/authController';
import { validate } from '../middlewares/validate';
import { LoginValidation, RegisterValidation } from '../validations/authValidation';

const authRoute = express.Router();

authRoute.post("/login", validate(LoginValidation), login);
authRoute.post("/register", validate(RegisterValidation), register);
authRoute.post("/logout", logout);


export default authRoute;