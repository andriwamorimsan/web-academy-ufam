'use client'

import { useState } from 'react'
import { CartList } from '../components/CartList/CartList'
import { CartSummary } from '../components/CartSummary/CartSummary'
import {
  cartItems,
  getCartQuantity,
  getCartTotal,
} from '../mocks/cartItems'
import type { ItemCarrinho } from '../types/cart'

export default function Cart() {
  const [items, setItems] = useState<ItemCarrinho[]>(cartItems)

  const removeItemFromCart = (id: string): void => {
    setItems((currentItems: ItemCarrinho[]) =>
      currentItems.filter(
        (item: ItemCarrinho) => String(item.produto.id) !== id,
      ),
    )
  }

  return (
    <main>
      <div className='container p-5'>
        <CartList
          items={items}
          removeItemFromCart={removeItemFromCart}
        />
        <CartSummary
          totalItems={getCartQuantity(items)}
          totalValue={getCartTotal(items)}
        />
      </div> 
    </main>
  )
}
