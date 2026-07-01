import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { firstParam } from "../../utils/params.js";
import { getProduct } from "../product/product.service.js";
import { addToCart, checkout, getPurchasesByUser, removeFromCart } from "./purchase.service.js";

function cart(req: Request, res: Response) {
  return res.json(req.session.cart ?? []);
}

function addProduct(req: Request, res: Response) {
  const product = getProduct(req.body.productId);
  if (!product) return res.status(StatusCodes.NOT_FOUND).json({ msg: "Produto nao encontrado" });

  req.session.cart = addToCart(req.session.cart, req.body);
  return res.status(StatusCodes.CREATED).json(req.session.cart);
}

function removeProduct(req: Request, res: Response) {
  req.session.cart = removeFromCart(req.session.cart, firstParam(req.params.productId));
  return res.json(req.session.cart);
}

function finish(req: Request, res: Response) {
  try {
    const purchase = checkout(req.session.uid!, req.session.cart);
    if (!purchase) return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Carrinho vazio" });

    req.session.cart = [];
    return res.status(StatusCodes.CREATED).json(purchase);
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ msg: (error as Error).message });
  }
}

function history(req: Request, res: Response) {
  return res.json(getPurchasesByUser(req.session.uid!));
}

export default { cart, addProduct, removeProduct, finish, history };
