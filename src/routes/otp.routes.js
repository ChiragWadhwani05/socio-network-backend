import { Router } from "express";
import { registerOTP } from "../controllers/otp.controllers.js";

/**
 * Creates and configures the users router.
 * @returns {Router} The configured users router.
 */
function createOTPRouter() {
  const router = Router();

  router.route("/mail/register").post(registerOTP);

  return router;
}

export { createOTPRouter };
