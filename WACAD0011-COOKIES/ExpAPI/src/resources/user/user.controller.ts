import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { firstParam } from "../../utils/params.js";
import {
  createUser,
  deleteUser,
  findUserByEmail,
  findUserById,
  getAllUsers,
  toUserDto,
  updateUser,
} from "./user.service.js";

function index(_req: Request, res: Response) {
  return res.json(getAllUsers());
}

function create(req: Request, res: Response) {
  if (findUserByEmail(req.body.email)) {
    return res.status(StatusCodes.CONFLICT).json({ msg: "Email informado ja esta sendo usado" });
  }

  return res.status(StatusCodes.CREATED).json(createUser(req.body));
}

function read(req: Request, res: Response) {
  const user = findUserById(firstParam(req.params.id));
  if (!user) return res.status(StatusCodes.NOT_FOUND).json({ msg: "Usuario nao encontrado" });

  return res.json(toUserDto(user));
}

function update(req: Request, res: Response) {
  const sameEmail = req.body.email ? findUserByEmail(req.body.email) : null;
  const id = firstParam(req.params.id);
  if (sameEmail && sameEmail.id !== id) {
    return res.status(StatusCodes.CONFLICT).json({ msg: "Email informado ja esta sendo usado" });
  }

  const user = updateUser(id, req.body);
  if (!user) return res.status(StatusCodes.NOT_FOUND).json({ msg: "Usuario nao encontrado" });

  return res.json(user);
}

function remove(req: Request, res: Response) {
  if (!deleteUser(firstParam(req.params.id))) {
    return res.status(StatusCodes.NOT_FOUND).json({ msg: "Usuario nao encontrado" });
  }

  return res.status(StatusCodes.NO_CONTENT).send();
}

export default { index, create, read, update, remove };
