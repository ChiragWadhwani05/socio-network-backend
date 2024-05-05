import { Router } from "express";
import { registerUser } from "../../controllers/auth/user.controllers.js";
import { userRegisterValidator } from "../../validators/auth/user.validators.js";

/**
 * Creates and configures the users router.
 * @returns {Router} The configured users router.
 */
function createUsersRouter() {
  const router = Router();

  router.route("/register").post(userRegisterValidator, registerUser);

  return router;
}

export { createUsersRouter };
