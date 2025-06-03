import express from 'express'
import {login, logout, register} from '../controllers/authController';

const authRoute = express.Router();

authRoute.post("/login", login);
authRoute.post("/register", register);
authRoute.post("/logout", logout);


export default authRoute;