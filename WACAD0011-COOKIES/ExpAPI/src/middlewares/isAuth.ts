import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export default function isAuth(req: Request, res: Response, next: NextFunction) {
  if (req.session.uid) return next();

  return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Usuario nao autenticado" });
}
