import { Router } from "express";
import isAdmin from "../../middlewares/isAdmin.js";
import validate from "../../middlewares/validate.js";
import userController from "./user.controller.js";
import { updateUserSchema, userSchema } from "./user.schema.js";

const router = Router();

router.get("/", userController.index);
router.post("/", isAdmin, validate(userSchema), userController.create);
router.get("/:id", userController.read);
router.put("/:id", isAdmin, validate(updateUserSchema), userController.update);
router.delete("/:id", isAdmin, userController.remove);

export default router;
