import type { ItemCarrinho } from '../types/cart'
import { products } from './products'

export const cartItems: ItemCarrinho[] = [
  {
    produto: products[0],
    quantidade: 2,
  },
  {
    produto: products[1],
    quantidade: 1,
  },
]

export function getCartQuantity(items: ItemCarrinho[]) {
  return items.reduce((total, item) => total + item.quantidade, 0)
}

export function getCartTotal(items: ItemCarrinho[]) {
  return items.reduce(
    (total, item) => total + Number(item.produto.preco) * item.quantidade,
    0,
  )
}
