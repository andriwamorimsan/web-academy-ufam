import { Router } from "express";
import authRouter from "../resources/auth/auth.router.js";
import languageRouter from "../resources/language/language.router.js";
import productRouter from "../resources/product/product.router.js";
import purchaseRouter from "../resources/purchase/purchase.router.js";
import userRouter from "../resources/user/user.router.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/product", productRouter);
router.use("/language", languageRouter);
router.use("/user", userRouter);
router.use("/purchase", purchaseRouter);

export default router;
