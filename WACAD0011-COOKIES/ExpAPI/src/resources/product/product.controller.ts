import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {
  createProduct,
  getAllProducts,
  getProduct,
  productAlreadyExists,
  removeProduct,
  updateProduct,
} from "./product.service.js";
import { firstParam } from "../../utils/params.js";

function index(_req: Request, res: Response) {
  res.json(getAllProducts());
}

function create(req: Request, res: Response) {
  /*
  #swagger.summary = 'Adiciona um novo produto.'
  #swagger.parameters['body'] = { in: 'body', schema: { $ref: '#/definitions/CreateProductDto' } }
  */
  if (productAlreadyExists(req.body.name)) {
    return res.status(StatusCodes.CONFLICT).json({ msg: "Produto ja existe" });
  }

  return res.status(StatusCodes.CREATED).json(createProduct(req.body));
}

function read(req: Request, res: Response) {
  /*
  #swagger.summary = 'Recupera um produto pelo ID.'
  #swagger.parameters['id'] = { description: 'ID do produto' }
  */
  const id = firstParam(req.params.id);
  const product = getProduct(id);
  if (!product) return res.status(StatusCodes.NOT_FOUND).json({ msg: "Produto nao encontrado" });

  return res.json(product);
}

function update(req: Request, res: Response) {
  const id = firstParam(req.params.id);
  if (productAlreadyExists(req.body.name, id)) {
    return res.status(StatusCodes.CONFLICT).json({ msg: "Produto ja existe" });
  }

  const product = updateProduct(id, req.body);
  if (!product) return res.status(StatusCodes.NOT_FOUND).json({ msg: "Produto nao encontrado" });

  return res.json(product);
}

function remove(req: Request, res: Response) {
  const id = firstParam(req.params.id);
  if (!removeProduct(id)) {
    return res.status(StatusCodes.NOT_FOUND).json({ msg: "Produto nao encontrado" });
  }

  return res.status(StatusCodes.NO_CONTENT).send();
}

export default { index, create, read, update, remove };
