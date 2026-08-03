'use client'

import { useState } from 'react'
import { CartSummary } from './components/CartSummary/CartSummary'
import { ProductList } from './components/ProductList/ProductList'
import type { Product } from './types/product'
import BootstrapClient from "@/app/components/Clients/BootstrapClient";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import { ToastContainer, toast } from 'react-toastify';


export default function Products() {
  const [totalItems, setTotalItems] = useState<number>(0)
  const [totalValue, setTotalValue] = useState<number>(0)

  const addToCart = (product: Product): void => {
    setTotalItems((currentTotalItems: number) => currentTotalItems + 1)
    setTotalValue(
      (currentTotalValue: number) => currentTotalValue + Number(product.preco),
    )
  }
  const notify = () => toast("Wow so easy!");

  return (
    <main>
      <div className='container p-5'>
        <CartSummary
          totalItems={totalItems}
          totalValue={totalValue}
        />
        <button onClick={notify}>Notify!</button>
        <ToastContainer />

        <h5 className='mb-3'>Produtos disponiveis:</h5>
        <ProductList addToCart={addToCart} />
      </div>
    </main>
  )
}
