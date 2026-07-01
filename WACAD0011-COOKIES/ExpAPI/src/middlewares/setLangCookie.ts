import { NextFunction, Request, Response } from "express";

export default function setLangCookie(req: Request, res: Response, next: NextFunction) {
  if (!req.cookies?.lang) {
    res.cookie("lang", "pt-BR");
  }

  next();
}
