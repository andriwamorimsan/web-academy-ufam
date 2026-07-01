import { createId, products } from "../../database.js";
import { CreateProductDto, Product, UpdateProductDto } from "../../types.js";

const normalizeName = (name: string) => name.trim().toLowerCase();
const now = () => new Date().toISOString();

export function getAllProducts(): Product[] {
  return [...products.values()];
}

export function productAlreadyExists(name: string, ignoreId?: string): boolean {
  return getAllProducts().some(
    (product) => product.id !== ignoreId && normalizeName(product.name) === normalizeName(name),
  );
}

export function createProduct(dto: CreateProductDto): Product {
  const date = now();
  const product: Product = {
    id: createId(),
    name: dto.name,
    price: dto.price,
    stockQuantity: dto.stockQuantity,
    createdAt: date,
    updatedAt: date,
  };

  products.set(product.id, product);
  return product;
}

export function getProduct(id: string): Product | null {
  return products.get(id) ?? null;
}

export function updateProduct(id: string, dto: UpdateProductDto): Product | null {
  const product = products.get(id);
  if (!product) return null;

  const updated = { ...product, ...dto, updatedAt: now() };
  products.set(id, updated);
  return updated;
}

export function removeProduct(id: string): boolean {
  return products.delete(id);
}
