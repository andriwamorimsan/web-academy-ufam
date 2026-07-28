'use client'

import { useState } from 'react'
import { CartSummary } from './components/CartSummary/CartSummary'
import { ProductList } from './components/ProductList/ProductList'
import { products } from './mocks/products'
import type { Product } from './types/product'

export default function Products() {
  const [totalItems, setTotalItems] = useState<number>(0)
  const [totalValue, setTotalValue] = useState<number>(0)

  const addToCart = (product: Product): void => {
    setTotalItems((currentTotalItems: number) => currentTotalItems + 1)
    setTotalValue(
      (currentTotalValue: number) => currentTotalValue + Number(product.preco),
    )
  }

  return (
    <main>
      <div className='container p-5'>
        <CartSummary
          totalItems={totalItems}
          totalValue={totalValue}
        />

        <h5 className='mb-3'>Produtos disponiveis:</h5>
        <ProductList products={products} addToCart={addToCart} />
      </div>
    </main>
  )
}
