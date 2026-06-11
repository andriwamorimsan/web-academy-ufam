import type { Request, Response } from 'express';

interface Product {
  id: string | number;
  nome: string;
  preco: number;
  estoque: number;
}

type ProductForm = Omit<Product, 'id'>;

const apiUrl = process.env.PRODUCTS_API_URL ?? 'http://localhost:3355/produtos';

async function requestApi<T>(path = '', init?: RequestInit) {
  const response = await fetch(`${apiUrl}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
    ...init,
  });

  if (!response.ok) {
    throw new Error(`Erro ao acessar API de produtos: ${response.status}`);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

function parseProduct(body: Record<string, string>): ProductForm {
  return {
    nome: body.nome ?? '',
    preco: Number(body.preco ?? 0),
    estoque: Number(body.estoque ?? 0),
  };
}

async function index(req: Request, res: Response) {
  const products = await requestApi<Product[]>();

  res.render('product/index', {
    title: 'Produtos',
    products,
  });
}

async function create(req: Request, res: Response) {
  if (req.method === 'GET') {
    res.render('product/form', {
      title: 'Novo produto',
      action: '/product/create',
      buttonLabel: 'Cadastrar',
    });
    return;
  }

  await requestApi('', {
    method: 'POST',
    body: JSON.stringify(parseProduct(req.body as Record<string, string>)),
  });

  res.redirect('/product');
}

async function read(req: Request, res: Response) {
  const product = await requestApi<Product>(`/${req.params.id}`);

  res.render('product/read', {
    title: product.nome,
    product,
  });
}

async function update(req: Request, res: Response) {
  const id = req.params.id;

  if (req.method === 'GET') {
    const product = await requestApi<Product>(`/${id}`);

    res.render('product/form', {
      title: 'Editar produto',
      action: `/product/update/${id}`,
      buttonLabel: 'Salvar',
      product,
    });
    return;
  }

  await requestApi(`/${id}`, {
    method: 'PUT',
    body: JSON.stringify(parseProduct(req.body as Record<string, string>)),
  });

  res.redirect('/product');
}

async function remove(req: Request, res: Response) {
  await requestApi(`/${req.params.id}`, {
    method: 'DELETE',
  });

  res.redirect('/product');
}

export default { index, read, create, update, remove };
