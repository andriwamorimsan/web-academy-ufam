import { createId, purchases } from "../../database.js";
import { CartItem, Purchase, PurchaseItem } from "../../types.js";
import { getProduct, updateProduct } from "../product/product.service.js";

export function addToCart(cart: CartItem[] = [], item: CartItem): CartItem[] {
  const current = cart.find((cartItem) => cartItem.productId === item.productId);
  if (current) current.quantity += item.quantity;
  else cart.push(item);

  return cart;
}

export function removeFromCart(cart: CartItem[] = [], productId: string): CartItem[] {
  return cart.filter((item) => item.productId !== productId);
}

export function checkout(userId: string, cart: CartItem[] = []): Purchase | null {
  if (cart.length === 0) return null;

  const items: PurchaseItem[] = cart.map((item) => {
    const product = getProduct(item.productId);
    if (!product) throw new Error(`Produto ${item.productId} nao encontrado`);
    if (product.stockQuantity < item.quantity) {
      throw new Error(`Estoque insuficiente para ${product.name}`);
    }

    return {
      productId: product.id,
      productName: product.name,
      quantity: item.quantity,
      unitPrice: product.price,
      subtotal: product.price * item.quantity,
    };
  });

  for (const item of items) {
    const product = getProduct(item.productId);
    if (product) {
      updateProduct(product.id, {
        name: product.name,
        price: product.price,
        stockQuantity: product.stockQuantity - item.quantity,
      });
    }
  }

  const purchase: Purchase = {
    id: createId(),
    userId,
    items,
    total: items.reduce((sum, item) => sum + item.subtotal, 0),
    createdAt: new Date().toISOString(),
  };

  purchases.set(purchase.id, purchase);
  return purchase;
}

export function getPurchasesByUser(userId: string): Purchase[] {
  return [...purchases.values()].filter((purchase) => purchase.userId === userId);
}
