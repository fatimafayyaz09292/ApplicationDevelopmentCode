import { Router } from "express";
import { signUp, signIn, getUserById, updateUser, deleteUser } from "../controllers/auth.controller.js";
import { fetchProfileValidations, loginValidations, signupValidations } from "../validations/auth.validations.js";
import { validationErrors } from "../validations/validations.js";

const authRouter = Router();

// Authentication routes
authRouter.post("/signup", signupValidations(), validationErrors, signUp);
authRouter.post("/login", loginValidations(), validationErrors, signIn);

// User profile routes
authRouter.get("/profile/:id", fetchProfileValidations(), validationErrors, getUserById); 
authRouter.patch("/profile/:id", fetchProfileValidations(), validationErrors, updateUser);    
authRouter.delete("/profile/:id", fetchProfileValidations(), validationErrors, deleteUser); 

export default authRouter;
