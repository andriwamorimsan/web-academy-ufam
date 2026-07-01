import { Router } from "express";
import isAuth from "../../middlewares/isAuth.js";
import validate from "../../middlewares/validate.js";
import purchaseController from "./purchase.controller.js";
import { cartItemSchema } from "./purchase.schema.js";

const router = Router();

router.use(isAuth);
router.get("/cart", purchaseController.cart);
router.post("/cart", validate(cartItemSchema), purchaseController.addProduct);
router.delete("/cart/:productId", purchaseController.removeProduct);
router.post("/checkout", purchaseController.finish);
router.get("/", purchaseController.history);

export default router;
