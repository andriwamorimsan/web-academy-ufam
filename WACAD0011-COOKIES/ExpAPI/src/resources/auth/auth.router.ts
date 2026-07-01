import { Router } from "express";
import validate from "../../middlewares/validate.js";
import authController from "./auth.controller.js";
import { loginSchema, signUpSchema } from "./auth.schema.js";

const router = Router();

router.post("/signup", validate(signUpSchema), authController.signup);
router.post("/login", validate(loginSchema), authController.login);
router.post("/logout", authController.logout);

export default router;
