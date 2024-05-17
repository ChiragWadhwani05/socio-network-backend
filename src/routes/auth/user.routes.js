import { Router } from "express";
import {
  loginUser,
  registerUser,
} from "../../controllers/auth/user.controllers.js";
import {
  loginUserValidator,
  registerUserValidator,
} from "../../validators/auth/user.validators.js";

/**
 * Creates and configures the users router.
 * @returns {Router} The configured users router.
 */
function createUsersRouter() {
  const router = Router();

  router.route("/register").post(registerUserValidator, registerUser);
  router.route("/login").post(loginUserValidator, loginUser);

  return router;
}

export { createUsersRouter };
