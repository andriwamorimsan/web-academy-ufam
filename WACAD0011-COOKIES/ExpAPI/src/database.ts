import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { Product, Purchase, User, UserTypes } from "./types.js";

const now = () => new Date().toISOString();

export const products = new Map<string, Product>();
export const users = new Map<string, User>();
export const purchases = new Map<string, Purchase>();

export function createId() {
  return uuidv4();
}

function seedProduct(product: Omit<Product, "id" | "createdAt" | "updatedAt">) {
  const id = createId();
  const date = now();
  products.set(id, { id, ...product, createdAt: date, updatedAt: date });
}

function seedUser(user: Omit<User, "id" | "createdAt" | "updatedAt">) {
  const id = createId();
  const date = now();
  users.set(id, { id, ...user, createdAt: date, updatedAt: date });
}

seedProduct({ name: "Notebook", price: 2000, stockQuantity: 10 });
seedProduct({ name: "Smartphone Motorola Edge 30", price: 1499, stockQuantity: 3 });

seedUser({
  name: "Administrador",
  email: "admin@shop.test",
  password: bcrypt.hashSync("admin123", 10),
  userTypeId: UserTypes.ADMIN,
});
