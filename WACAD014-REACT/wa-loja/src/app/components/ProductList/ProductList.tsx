import type { Product } from '../../types/product'
import { ProductCard } from '../ProductCard/ProductCard'

type ProductListProps = {
  products: Product[]
  addToCart: (product: Product) => void
}

export function ProductList({ products, addToCart }: ProductListProps) {
  return (
    <div className='row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3'>
      {products.map((product) => (
        <ProductCard
          product={product}
          addToCart={addToCart}
          key={product.id}
        />
      ))}
    </div>
  )
}
