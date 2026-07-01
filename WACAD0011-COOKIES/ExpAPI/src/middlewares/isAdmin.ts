import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { checkIsAdmin } from "../resources/auth/auth.service.js";

export default function isAdmin(req: Request, res: Response, next: NextFunction) {
  const uid = req.session.uid;

  if (uid && checkIsAdmin(uid)) return next();

  return res.status(StatusCodes.FORBIDDEN).json({ msg: "Nao autorizado" });
}
