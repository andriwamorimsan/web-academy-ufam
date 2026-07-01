import { Request, Response } from "express";

function changeLanguage(req: Request, res: Response) {
  const lang = req.body.lang ?? req.query.lang;
  res.cookie("lang", lang, { maxAge: 360000 });
  return res.json({ lang });
}

function clearLanguage(_req: Request, res: Response) {
  res.clearCookie("lang");
  return res.status(204).send();
}

export default { changeLanguage, clearLanguage };
