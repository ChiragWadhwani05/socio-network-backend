import { body } from "express-validator";
import { validate } from "../index.js";

const userRegisterValidator = validate([
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email is invalid"),
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .isLowercase()
    .withMessage("Username must be lowercase")
    .isLength({ min: 3 })
    .withMessage("Username must be at lease 3 characters long"),
  body("password")
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      minUppercase: 1,
    })
    .withMessage("Password must be strong."),
]);

export { userRegisterValidator };
