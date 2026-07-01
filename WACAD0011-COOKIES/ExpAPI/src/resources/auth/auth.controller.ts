import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { UserTypes } from "../../types.js";
import { createUser, findUserByEmail } from "../user/user.service.js";
import { checkAuth } from "./auth.service.js";

function signup(req: Request, res: Response) {
  if (findUserByEmail(req.body.email)) {
    return res.status(StatusCodes.CONFLICT).json({ msg: "Email informado ja esta sendo usado" });
  }

  const user = createUser({ ...req.body, userTypeId: UserTypes.CLIENT });
  return res.status(StatusCodes.CREATED).json(user);
}

function login(req: Request, res: Response) {
  /*
  #swagger.summary = 'Autentica um usuario.'
  #swagger.parameters['body'] = {
    in: 'body',
    required: true,
    schema: { $ref: '#/definitions/LoginDto' }
  }
  #swagger.responses[200] = {
    description: 'Usuario autenticado'
  }
  */
  const user = checkAuth(req.body);
  if (!user) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Email e/ou senha incorretos" });
  }

  req.session.uid = user.id;
  req.session.userTypeId = user.userTypeId;
  return res.json({ msg: "Usuario autenticado" });
}

function logout(req: Request, res: Response) {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    return res.status(StatusCodes.NO_CONTENT).send();
  });
}

export default { signup, login, logout };
