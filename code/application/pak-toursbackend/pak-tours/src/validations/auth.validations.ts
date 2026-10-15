import { body, param } from "express-validator";

// Signup validations
const signupValidations = () => {
  return [
    body("name", "Name is required").notEmpty(),
    body("email", "Valid email is required").notEmpty().isEmail(),
    body("destination", "Destination is required").notEmpty(),
  ];
};

// Login validations
const loginValidations = () => {
  return [
    body("email", "Valid email is required").notEmpty().isEmail(),
  ];
};

// Profile fetch validation
const fetchProfileValidations = () => {
  return [
    param("id", "User ID must be a valid integer").isInt(),
  ];
};

// Profile update validations
const updateProfileValidations = () => {
  return [
    param("id", "User ID must be a valid integer").isInt(),
    body("name", "Name must be a string").optional().isString(),
    body("email", "Email must be valid").optional().isEmail(),
    body("destination", "Destination is required").notEmpty(),  
  ];
};

// Profile delete validation
const deleteProfileValidations = () => {
  return [
    param("id", "User ID must be a valid integer").isInt(),
  ];
};

export { 
  signupValidations, 
  loginValidations, 
  fetchProfileValidations, 
  updateProfileValidations, 
  deleteProfileValidations 
};

