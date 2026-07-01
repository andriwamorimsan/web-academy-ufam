import { Router } from "express";
import validate from "../../middlewares/validate.js";
import languageController from "./language.controller.js";
import languageSchema from "./language.schema.js";

const router = Router();

router.post("/change", validate(languageSchema), languageController.changeLanguage);
router.get("/change", languageController.changeLanguage);
router.delete("/", languageController.clearLanguage);

export default router;
